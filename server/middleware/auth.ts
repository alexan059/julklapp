import { ServerResponse } from 'http';
import { SessionRequest } from '~/types';
import { sendRedirect, useQuery } from 'h3';
import { matchPath, usePath } from '~/server/helpers/server';

export default async function (req: SessionRequest, res: ServerResponse) {
    if (req.session.loggedIn) {

    } else if (req.url !== '/login') {
        // await sendRedirect(res, '/login');
    }
}