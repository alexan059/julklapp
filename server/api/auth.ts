import { IncomingMessage, ServerResponse } from 'http';
import { SessionRequest } from '~/types';
import { Session } from 'express-session';
import { useBody, sendError, createError } from 'h3';

import { createUser } from '~/server/queries/users';
import { generateOTP, verifyOTP } from '~/server/queries/otp';

export default async (req: SessionRequest, res: ServerResponse) => {

    if (req.method !== 'POST') {
        return sendError(res, createError({ statusCode: 404 }));
    }

    const { email } = await useBody(req);

    console.log(req.session);

    if (!email) {
        return sendError(res, createError({ statusCode: 400 }));
    }

    console.log(email);

    // await createUser(email); // 5520
    // const { digits, expires } = await generateOTP(email);
    // console.log(otp);
    // const result = await verifyOTP(email, 2172);
    // console.log(result);



    res.end(JSON.stringify({ email }));


}