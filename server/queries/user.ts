import pool from '~/server/services/database';

export interface User {
    id: number;
    email: string;
    role: 'user' | 'admin';
    otp: string | null;
    created_at: Date;
    updated_at: Date;
    session_id: string | null;
    email_confirmed: boolean;
}

export async function createUser(email) {
    try {
        const results = await pool.query('INSERT INTO users (email) VALUES ($1)', [email]);
    } catch (e) {
        console.log(e);
    }
}

export async function getUserByEmail(email) : Promise<User | null> {
    try {
        const results = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

        if (results.rowCount !== 1 ) {
            return null;
        }

        return results.rows[0] as User;
    } catch (e) {
        console.log(e);
    }
}

export async function getUserBySessionId(sessionId) : Promise<User | null> {
    try {
        const results = await pool.query('SELECT * FROM users WHERE session_id = $1', [sessionId]);

        if (results.rowCount !== 1 ) {
            return null;
        }

        return results.rows[0] as User;
    } catch (e) {
        console.log(e);
    }
}

export async function setUserEmailConfirmed(userId) {
    try {
        const results = await pool.query('UPDATE users SET email_confirmed = $1 WHERE id = $2', [true, userId]);
    } catch (e) {
        console.log(e);
    }
}

export async function updateUserName(userId, name) {
    try {
        const results = await pool.query('UPDATE users SET name = $1 WHERE id = $2', [name, userId]);
    } catch (e) {
        console.log(e);
    }
}

export async function updateUserSession(userId, sessionId) {
    try {
        const results = await pool.query('UPDATE users SET session_id = $1 WHERE id = $2', [sessionId, userId])
    } catch (e) {
        console.log(e);
    }
}