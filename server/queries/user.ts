import runQuery, { transformAffected, transformFirst } from '~/server/helpers/database';
import { User } from '~/types';

export async function createUser(email: string): Promise<User> {
    return await runQuery(
        `INSERT INTO users (email)
         VALUES ($1)`,
        [email],
        transformFirst,
    );
}

export async function updateUser(userId: number, { name, avatar, item_like, item_dislike }) {
    return await runQuery(
        `UPDATE users
         SET name         = $1,
             avatar       = $2,
             item_like    = $3,
             item_dislike = $4
         WHERE id = $5`,
        [name, avatar, item_like, item_dislike, userId],
        transformAffected,
    );
}

export async function getUsersByGroup(userId: number, groupUID: string): Promise<User[]> {
    const users = await runQuery(
        `SELECT id, name, avatar, item_like, item_dislike
         FROM users
         WHERE id IN (
             SELECT user_id
             FROM group_users
             WHERE group_id = (
                 SELECT id
                 FROM groups
                 WHERE uid = $1
             )
         )`,
        [groupUID],
    ) as User[];

    const takerId = await runQuery(
        `SELECT id
         FROM users
         WHERE id IN (
             SELECT user_taker_id
             FROM user_pairs
             WHERE group_id IN (
                 SELECT id
                 FROM groups
                 WHERE uid = $1
             )
               AND user_giver_id = $2
         )`,
        [groupUID, userId],
        (result) => result.rowCount > 0 ? result.rows[0].id : null,
    );

    return users.map(({ id, item_like, item_dislike, ...user }) =>
        takerId === id ? { ...user, item_like, item_dislike } : { ...user }) as User[];
}

export async function getUserByEmail(email: string): Promise<User> {
    return await runQuery(
        `SELECT id,
                email,
                name,
                role,
                email_confirmed,
                avatar,
                item_like,
                item_dislike
         FROM users
         WHERE email = $1`,
        [email],
        transformFirst,
    );
}

export async function getUserById(userId: number): Promise<User> {
    return await runQuery(
        `SELECT email, name, role, email_confirmed, avatar, item_like, item_dislike
         FROM users
         WHERE id = $1`,
        [userId],
        transformFirst,
    );
}

export async function setUserEmailConfirmed(userId: number) {
    return await runQuery(
        `UPDATE users
         SET email_confirmed = TRUE
         WHERE id = $2`,
        [userId],
        transformAffected,
    );
}