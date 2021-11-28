import { SessionRequest } from '~/types';
import { ServerResponse } from 'http';
import { createError, sendError, useQuery } from 'h3';

export default async (req: SessionRequest, res: ServerResponse) => {

    if (!req.session.loggedIn) {
        return sendError(res, createError({ statusCode: 401 }));
    }

    switch (req.method) {
        case 'GET':
            const { uid } = await useQuery(req);
            const url = 'http://localhost:3000/i/' + uid;

            return res.end(JSON.stringify({ url }));
        default:
            return sendError(res, createError({ statusCode: 404 }));
    }

}