import { Session } from 'express-session';
import { IncomingMessage } from 'http';

type CustomSession = Session & { loggedIn: boolean, userId: number };
type SessionRequest = IncomingMessage & { session: CustomSession };

interface GroupListItem {
    uid: string;
    name: string;
}

interface GroupItem {
    uid: string;
    name: string;
}