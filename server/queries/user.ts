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

export async function getUser(email) : Promise<User | null> {
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

export async function updateUserName(id, name) {
    try {
        const results = await pool.query('UPDATE users SET name = $1 WHERE id = $2', [name, id]);
        console.log(results);
    } catch (e) {
        console.log(e);
    }
}