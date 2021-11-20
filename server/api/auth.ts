import { ServerResponse } from 'http';
import { SessionRequest } from '~/types';
import { useBody, sendError, createError } from 'h3';

import { createUser, getUser } from '~/server/queries/user';
import { generateOTP, verifyOTP } from '~/server/services/otp';
import { sendOTPMail } from '~/server/services/mailer';

export default async (req: SessionRequest, res: ServerResponse) => {

    if (req.method !== 'POST') {
        return sendError(res, createError({ statusCode: 404 }));
    }

    const { email } = await useBody(req);
    const user = await getUser(email);

    if (!user) {
        await createUser(email);
    }

    const { digits, expires } = await generateOTP(email);
    await sendOTPMail(email, digits);

    // console.log(user);
    // console.log(req.session.id);

    if (!email) {
        return sendError(res, createError({ statusCode: 400 }));
    }

    // await createUser(email); // 5520
    // const { digits, expires } = await generateOTP(email);
    // console.log(otp);
    // const result = await verifyOTP(email, 2172);
    // console.log(result);

    res.end(JSON.stringify({ email, expires }));
}