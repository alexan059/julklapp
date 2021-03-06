import { SessionRequest } from '~/types';
import { ServerResponse } from 'http';
import { sendRedirect } from 'h3';

export default async function (req: SessionRequest, res: ServerResponse, next) {
    if (req.session.loggedIn) {
        await sendRedirect(res, '/dashboard');
    }

    next();
}
