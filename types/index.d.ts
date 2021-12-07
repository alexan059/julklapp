import { Session } from 'express-session';
import { IncomingMessage } from 'http';

type CustomSession = Session & { loggedIn: boolean, userId: number };
type SessionRequest = IncomingMessage & { session: CustomSession };

export interface Group {
    name: string;
    description: string;
    uid: string;
    is_closed: boolean;
    is_admin?: boolean;
}

declare type GroupList = Group[];

export interface User {
    name: string;
    email: string;
    role: 'user' | 'admin';
    email_confirmed: boolean;
    avatar: string;
    item_like: string;
    item_dislike: string;
}