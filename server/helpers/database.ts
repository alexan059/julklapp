import { QueryResult } from 'pg';
import pool from '~/server/services/database';

declare type QueryTransformCallback = (v: QueryResult) => any;

export const transformFirst: QueryTransformCallback = (qr) => qr.rowCount > 0 ? qr.rows[0] : null;
export const transformRows: QueryTransformCallback = (qr) => qr.rows;
export const transformExists: QueryTransformCallback = (qr) => parseInt(qr.rows[0]?.count ?? 0) > 0;
export const transformAffected: QueryTransformCallback = (qr) => qr.rowCount > 0;

export default async function runQuery(query: string, values: any[], transformCallback: QueryTransformCallback = transformRows): Promise<any> {
    try {
        const results = await pool.query(query, values);

        return transformCallback(results);
    } catch (e) {
        console.log(e);
    }
}