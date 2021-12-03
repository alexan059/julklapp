import runQuery, { transformAffected, transformExists, transformFirst } from '~/server/helpers/database';

export interface Group {
    // id: number,
    name: string,
    // owner_id: number,
    description: string,
    uid: string,
    is_admin?: boolean,
}

export async function groupNameExists(name: string): Promise<boolean> {
    return await runQuery(
        `SELECT COUNT(*)
         FROM groups
         WHERE name = $1`,
        [name],
        transformExists,
    );
}

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
    return runQuery(
        `INSERT INTO group_users (user_id, group_id)
         VALUES ($1, (SELECT id FROM groups WHERE uid = $2))
         ON CONFLICT (group_id, user_id) DO NOTHING`,
        [userId, uid],
        transformAffected,
    );
}

export async function leaveGroup(userId: number, uid: string): Promise<boolean> {
    return runQuery(
        `DELETE
         FROM group_users
         WHERE user_id = $1
           AND group_id IN (SELECT id FROM groups WHERE uid = $2)`,
        [userId, uid],
        transformAffected,
    );
}