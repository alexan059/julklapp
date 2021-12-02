import { SessionRequest } from '~/types';
import { ServerResponse } from 'http';
import { createError, sendError, useBody } from 'h3';
import { leaveGroup } from '~/server/queries/group';

export default async (req: SessionRequest, res: ServerResponse) => {

    if (!req.session.loggedIn) {
        return sendError(res, createError({ statusCode: 401 }));
    }

    const { userId } = req.session;

    switch (req.method) {
        case 'POST':
            const { uid } = await useBody(req);

            const success = await leaveGroup(userId, uid);

            return res.end(JSON.stringify({ success }));
        default:
            return sendError(res, createError({ statusCode: 404 }));
    }

}