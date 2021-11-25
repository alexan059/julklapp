import pool from '~/server/services/database';
import { User } from '~/server/queries/user';

export interface Group {
    id: number,
    name: string,
    owner_id: number,
    description: string,
    uid: string,
}

export async function groupNameExists(name: string): Promise<boolean> {
    try {
        const results = await pool.query(
            `SELECT COUNT(*)
             FROM groups
             WHERE name = $1`,
            [name],
        );

        return parseInt(results.rows[0]?.count ?? 0) > 0;
    } catch (e) {
        console.log(e);
    }
}

export async function createGroup(userId: number, uid: number, name: string, description: string): Promise<boolean> {
    try {
        const results = await pool.query(
            `INSERT INTO groups (name, description, owner_id, uid)
             VALUES ($1, $2, $3, $4)`,
            [name, description, userId, uid],
        );
    } catch (e) {
        console.log(e);
    }
}

export async function groupUIDExists(uid: string): Promise<boolean> {
    try {
        const results = await pool.query(
            `SELECT COUNT(*)
             FROM groups
             WHERE uid = $1`,
            [uid],
        );

        return parseInt(results.rows[0]?.count ?? 0) > 0;
    } catch (e) {
        console.log(e);
    }
}

export async function getGroupByUID(userId: number, uid: string): Promise<Group> {
    try {
        const results = await pool.query(
            `SELECT *
             FROM groups
             WHERE owner_id = $1
               AND uid = $2`,
            [userId, uid],
        );

        if (results.rowCount !== 1) {
            return;
        }

        return results.rows[0] as Group;
    } catch (e) {
        console.log(e);
    }
}