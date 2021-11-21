import { SessionRequest } from '~/types';
import { ServerResponse } from 'http';
import { sendRedirect } from 'h3';

export default async function (req: SessionRequest, res: ServerResponse) {

    req.session.loggedIn = false;

    return await sendRedirect(res, '/login');
}
