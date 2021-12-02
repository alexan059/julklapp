import { QueryResult } from 'pg';
import pool from '~/server/services/database';

declare type QueryCallbackHandler = (v: QueryResult) => any;

export const resultFirst: QueryCallbackHandler = (qr) => qr.rowCount > 0 ? qr.rows[0] : null;
export const resultRows: QueryCallbackHandler = (qr) => qr.rows;
export const resultExists: QueryCallbackHandler = (qr) => parseInt(qr.rows[0]?.count ?? 0) > 0;
export const resultAffected: QueryCallbackHandler = (qr) => qr.rowCount > 0;

export default async function runQuery(query: string, values: any[], resultHandler: QueryCallbackHandler = resultRows): Promise<any> {
    try {
        const results = await pool.query(query, values);

        return resultHandler(results);
    } catch (e) {
        console.log(e);
    }
}