import { SessionRequest } from '~/types';
import { ServerResponse } from 'http';
import { createError, sendError, useBody } from 'h3';
import { getUserById, updateUser } from '~/server/queries/user';
import { isEmpty } from '~/server/helpers/validation';

export default async (req: SessionRequest, res: ServerResponse) => {

    if (!req.session.loggedIn) {
        return sendError(res, createError({ statusCode: 401 }));
    }

    const { userId } = req.session;

    switch (req.method) {
        case 'GET': {
            const user = await getUserById(userId);

            return res.end(JSON.stringify({ success: true, user }));
        }
        case 'PUT': {
            const { name, avatar, item_like, item_dislike } = await useBody(req);
            if (isEmpty(name)) {
                return sendError(res, createError({ statusCode: 400, statusMessage: 'Name cannot be empty.' }));
            }
            const success = await updateUser(userId, { name, avatar, item_like, item_dislike });

            return res.end(JSON.stringify({ success }));
        }
        default:
            return sendError(res, createError({ statusCode: 404 }));
    }

}