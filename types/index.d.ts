import { Session } from 'express-session';
import { IncomingMessage } from 'http';

type CustomSession = Session & { loggedIn: boolean };
type SessionRequest = IncomingMessage & { session: CustomSession };