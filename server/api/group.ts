import { SessionRequest } from '~/types';
import { ServerResponse } from 'http';
import { createError, sendError, useBody, useQuery } from 'h3';
import { createGroup, groupNameExists, groupUIDExists, getGroupByUID } from '~/server/queries/group';
import { isEmpty } from '~/server/helpers/validation';
import { nanoid } from '~/server/services/uid-code';

export default async (req: SessionRequest, res: ServerResponse) => {

    if (!req.session.loggedIn) {
        return sendError(res, createError({ statusCode: 401 }));
    }

    const { userId } = req.session;

    switch (req.method) {
        case 'GET': {
            const { uid } = await useQuery(req);
            if (!uid) {
                // TODO get all groups from user
            }
            const group = await getGroupByUID(userId, uid);
            return res.end(JSON.stringify({ group, success: true }));
        }
        case 'POST': {
            const { name, description } = await useBody(req);
            if (await groupNameExists(name)) {
                return sendError(res, createError({ statusCode: 400, statusMessage: 'Name already exists.' }));
            }
            if (isEmpty(name)) {
                return sendError(res, createError({ statusCode: 400, statusMessage: 'Name cannot be empty.' }));
            }
            let uid;
            do {
                uid = nanoid();
            } while (await groupUIDExists(uid));
            const success = await createGroup(userId, uid, name, description);

            return res.end(JSON.stringify({ uid, success }));
        }
        default:
            return sendError(res, createError({ statusCode: 404 }));
    }

}