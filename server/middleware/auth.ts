import { ServerResponse } from 'http';
import { SessionRequest } from '~/types';
import { sendRedirect } from 'h3';

export default async function (req: SessionRequest, res: ServerResponse) {
    if (req.session.loggedIn) {

    } else if (req.url !== '/login') {
        // await sendRedirect(res, '/login');
    }
}