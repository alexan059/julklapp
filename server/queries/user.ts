import pool from '~/server/services/database';

export interface User {
    id: number;
    email: string;
    role: 'user' | 'admin';
    otp: string | null;
    created_at: Date;
    updated_at: Date;
    email_confirmed: boolean;
}

export async function createUser(email): Promise<User> {
    try {
        const results = await pool.query('INSERT INTO users (email) VALUES ($1)', [email]);
    } catch (e) {
        console.log(e);
    }
}

export async function getUserByEmail(email): Promise<User> {
    try {
        const results = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

        if (results.rowCount !== 1) {
            return;
        }

        return results.rows[0] as User;
    } catch (e) {
        console.log(e);
    }
}

export async function getUserById(userId): Promise<User> {
    try {
        const results = await pool.query('SELECT * FROM users WHERE id = $1', [userId]);

        if (results.rowCount !== 1) {
            return;
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