import { SessionRequest } from '~/types';
import { ServerResponse } from 'http';
import { createError, sendError, useQuery } from 'h3';
import { groupNameExists } from '~/server/queries/group';

export default async (req: SessionRequest, res: ServerResponse) => {

    if (!req.session.loggedIn) {
        return sendError(res, createError({ statusCode: 401 }));
    }

    switch (req.method) {
        case 'GET':
            const { name } = await useQuery(req);
            const exists = await groupNameExists(name);

            return res.end(JSON.stringify({ exists }));
        default:
            return sendError(res, createError({ statusCode: 404 }));
    }

}