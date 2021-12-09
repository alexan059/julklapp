import config from '#config';
import pg from 'pg';

const { Pool } = pg;

// https://blog.logrocket.com/nodejs-expressjs-postgresql-crud-rest-api-example/
// https://node-postgres.com/api/pool

const pool = new Pool({
    user: config.PG_USER,
    password: config.PG_PASSWORD,
    host: config.PG_HOST,
    database: config.PG_DATABASE,
    port: 5432,
});

export default pool;