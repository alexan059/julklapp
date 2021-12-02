import { SessionRequest } from '~/types';
import { ServerResponse } from 'http';
import { sendRedirect } from 'h3';
import { groupUIDExists } from '~/server/queries/group';

export default async function (req: SessionRequest, res: ServerResponse, next) {
    let redirect = '/';

    const uid = req.url?.toString().replace('/', '');

    if (await groupUIDExists(uid)) {
        const route = req.session.loggedIn ? 'lobby' : 'login';
        redirect = `http://localhost:3000/${ route }?ref=${ uid }`;
    }

    await sendRedirect(res, redirect);

    next();
}