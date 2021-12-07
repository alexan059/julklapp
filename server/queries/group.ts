import runQuery, { transformAffected, transformExists, transformFirst } from '~/server/helpers/database';
import { isLast, shuffle } from '~/server/helpers/util';
import { Group } from '~/types';

export async function createGroup(userId: number, uid: number, name: string, description: string): Promise<boolean> {
    return await runQuery(
        `INSERT INTO groups (name, description, owner_id, uid)
         VALUES ($1, $2, $3, $4)`,
        [name, description, userId, uid],
        transformAffected,
    );
}

export async function groupUIDExists(uid: string): Promise<boolean> {
    return await runQuery(
        `SELECT COUNT(*)
         FROM groups
         WHERE uid = $1`,
        [uid],
        transformExists,
    );
}

export async function getGroupsByUserId(userId: number): Promise<Group[]> {
    return await runQuery(
        `SELECT uid, name
         FROM groups
         WHERE id IN (SELECT group_id FROM group_users WHERE user_id = $1)`,
        [userId],
    ) as Group[];
}

export async function getGroupByUID(userId: number, uid: string): Promise<Group> {
    return await runQuery(
        `SELECT name,
                description,
                is_closed,
                uid,
                CAST(CASE WHEN owner_id = $1 THEN TRUE ELSE FALSE END AS BOOLEAN) AS is_admin
         FROM groups
         WHERE id IN (SELECT group_id FROM group_users WHERE user_id = $1)
           AND uid = $2`,
        [userId, uid],
        transformFirst,
    ) as Group;
}

export async function deleteGroupById(userId: number, uid: string): Promise<boolean> {
    return await runQuery(
        `DELETE
         FROM groups
         WHERE owner_id = $1
           AND uid = $2`,
        [userId, uid],
        transformAffected,
    );
}

export async function joinGroup(userId: number, uid: string): Promise<boolean> {
    return await runQuery(
        `INSERT INTO group_users (user_id, group_id)
         VALUES ($1, (SELECT id FROM groups WHERE uid = $2 AND is_closed = FALSE))
         ON CONFLICT (group_id, user_id) DO NOTHING`,
        [userId, uid],
        transformAffected,
    );
}

export async function leaveGroup(userId: number, uid: string): Promise<boolean> {
    return await runQuery(
        `DELETE
         FROM group_users
         WHERE user_id = $1
           AND group_id IN (SELECT id FROM groups WHERE uid = $2)`,
        [userId, uid],
        transformAffected,
    );
}

// TODO maybe develop a postgres only query
// TODO maybe use a transaction
export async function closeGroup(userId: number, uid: string): Promise<boolean> {
    const users = await runQuery(
        `SELECT user_id AS id
         FROM group_users
         WHERE group_id IN (
             SELECT id
             FROM groups
             WHERE uid = $1
               AND owner_id = $2
         )`,
        [uid, userId],
        (result) => result.rows.map(({ id }) => id),
    );

    const pairs = shuffle(users).map((giver, index, takers) =>
        isLast(index, takers) ? [giver, takers[0]] : [giver, takers[index + 1]]);

    for (let pair of pairs) {
        await runQuery(
            `INSERT INTO user_pairs (group_id, user_giver_id, user_taker_id)
             VALUES ((SELECT id
                      FROM groups
                      WHERE uid = $1
                        AND owner_id = $2), $3, $4)
             ON CONFLICT DO NOTHING`,
            [uid, userId, ...pair],
        );
    }

    return await runQuery(
        `UPDATE groups
         SET is_closed = TRUE
         WHERE uid = $1
           AND owner_id = $2`,
        [uid, userId],
        transformAffected,
    );
}