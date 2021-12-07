import { SessionRequest } from '~/types';
import { ServerResponse } from 'http';
import { createError, sendError, useBody, useQuery } from 'h3';
import {
    createGroup,
    groupUIDExists,
    getGroupByUID,
    getGroupsByUserId,
    deleteGroupById,
} from '~/server/queries/group';
import { isEmpty, isMaxLength } from '~/server/helpers/validation';
import { nanoid } from '~/server/services/uid-code';
import { getUsersByGroup } from '~/server/queries/user';

export default async (req: SessionRequest, res: ServerResponse) => {

    if (!req.session.loggedIn) {
        return sendError(res, createError({ statusCode: 401 }));
    }

    const { userId } = req.session;

    switch (req.method) {
        case 'GET': {
            const { uid } = await useQuery(req);
            if (!uid) {
                const groups = await getGroupsByUserId(userId);

                return res.end(JSON.stringify({ single: false, groups, success: true }));
            }
            const group = await getGroupByUID(userId, uid as string);
            const users = await getUsersByGroup(userId, uid as string);

            if (!group) {
                return sendError(res, createError({ statusCode: 404 }));
            }

            return res.end(JSON.stringify({ single: true, group: { ...group, users }, success: true }));
        }
        case 'POST': {
            const { name, description } = await useBody(req);
            if (isEmpty(name)) {
                return sendError(res, createError({ statusCode: 400, statusMessage: 'Name cannot be empty.' }));
            }
            if (isMaxLength(name, 16)) {
                return sendError(res, createError({ statusCode: 400, statusMessage: 'Name is too long. (16 characters max.)' }));
            }
            let uid;
            do {
                uid = nanoid();
            } while (await groupUIDExists(uid));
            const success = await createGroup(userId, uid, name, description);

            return res.end(JSON.stringify({ uid, success }));
        }
        case 'DELETE': {
            const { uid } = useQuery(req);
            const success = await deleteGroupById(userId, uid as string);

            return res.end(JSON.stringify({ success }));
        }
        default:
            return sendError(res, createError({ statusCode: 404 }));
    }

}