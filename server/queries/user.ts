import pool from '~/server/services/database';
import { Group } from '~/server/queries/group';

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

export async function getUsersByGroup(userId, groupUID) {
    try {
        const results = await pool.query(
            `SELECT id, name
             FROM users
             WHERE id IN (
                 SELECT user_id FROM group_users WHERE group_id = (SELECT id FROM groups WHERE uid = $1)
             )`,
            [userId, groupUID],
        );

        if (results.rowCount !== 1) {
            return;
        }

        return results.rows[0] as Group;
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