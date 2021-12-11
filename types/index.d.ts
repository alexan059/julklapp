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

declare module '@nuxt/schema' {
    interface PublicRuntimeConfig {

    }

    interface PrivateRuntimeConfig {
        ENVIRONMENT: string;
        BASE_URL: string;
        SESSION_SECRET: string;
        PG_USER: string;
        PG_PASSWORD: string;
        PG_HOST: string;
        PG_DATABASE: string;
        EMAIL_DEBUG: boolean;
        SMTP_HOST: string;
        SMTP_USER: string;
        SMTP_PASS: string;
    }
}