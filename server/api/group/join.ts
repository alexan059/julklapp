import { SessionRequest } from '~/types';
import { ServerResponse } from 'http';
import { createError, sendError, useBody } from 'h3';
import { joinGroup } from '~/server/queries/group';

export default async (req: SessionRequest, res: ServerResponse) => {

    if (!req.session.loggedIn) {
        return sendError(res, createError({ statusCode: 401 }));
    }

    const { userId } = req.session;

    switch (req.method) {
        case 'POST':
            const { uid } = await useBody(req);

            const success = await joinGroup(userId, uid);

            const redirect = '/group/' + uid;

            return res.end(JSON.stringify({ success, redirect }));
        default:
            return sendError(res, createError({ statusCode: 404 }));
    }

}