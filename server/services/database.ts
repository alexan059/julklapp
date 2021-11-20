import pg from 'pg';

const { Pool } = pg;

// https://blog.logrocket.com/nodejs-expressjs-postgresql-crud-rest-api-example/
// https://node-postgres.com/api/pool

const pool = new Pool({
    user: 'postgres',
    password: 'changeme',
    host: 'localhost',
    database: 'secret_friend',
    port: 5432,
});

export default pool;