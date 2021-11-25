import session from 'express-session';
import connectPgSimple from 'connect-pg-simple';
import pool from '~/server/services/database';

const pgSession = connectPgSimple(session);

export default session({
    store: new pgSession({
        pool,
        tableName: 'session'
    }),
    secret: 'abcd1234',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 } // 30 days
});