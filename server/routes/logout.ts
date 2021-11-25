import { SessionRequest } from '~/types';
import { ServerResponse } from 'http';
import { sendRedirect } from 'h3';

export default async function (req: SessionRequest, res: ServerResponse, next) {

    delete req.session.loggedIn;
    delete req.session.userId;

    await sendRedirect(res, '/login');
    next();
}
