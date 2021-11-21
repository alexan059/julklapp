import { SessionRequest } from '~/types';
import { ServerResponse } from 'http';
import { sendRedirect } from 'h3';
import { getUserBySessionId, updateUserSession } from '~/server/queries/user';

export default async function (req: SessionRequest, res: ServerResponse) {

    const user = await getUserBySessionId(req.session.id);

    if (user) {
        await updateUserSession(user.id, null);
    }

    req.session.loggedIn = false;

    return await sendRedirect(res, '/login');
}
