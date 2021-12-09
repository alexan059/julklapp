import { ServerResponse } from 'http';
import { SessionRequest } from '~/types';
import { useBody, sendError, createError } from 'h3';

import { createUser, getUserByEmail, setUserEmailConfirmed } from '~/server/queries/user';
import { generateOTP, verifyOTP } from '~/server/services/otp';
import { sendOTPMail } from '~/server/services/mailer';
import { resetOTP } from '~/server/queries/otp';

export default async (req: SessionRequest, res: ServerResponse) => {

    await new Promise(resolve => setTimeout(() => resolve(), 1000));

    if (req.method !== 'POST') {
        return sendError(res, createError({ statusCode: 404 }));
    }

    const { email, otp } = await useBody(req);

    if (!email) {
        return sendError(res, createError({ statusCode: 400 }));
    }

    let user = await getUserByEmail(email);
    if (!user) {
        user = await createUser(email);
    }

    if (!otp) {
        const { digits, expires } = await generateOTP(email);
        if (!await sendOTPMail(email, digits)) {
            return sendError(res, createError({ statusCode: 500 }));
        }

        return res.end(JSON.stringify({ expires, success: true }));
    }

    if (!await verifyOTP(email, otp)) {
        return sendError(res, createError({ statusCode: 401 }));
    }

    if (!user.email_confirmed) {
        await setUserEmailConfirmed(user.id);
    }

    await resetOTP(email);

    req.session.loggedIn = true;
    req.session.userId = user.id;

    return res.end(JSON.stringify({ success: true }));
}