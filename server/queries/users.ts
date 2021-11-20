import pool from '~/server/services/database';

export async function createUser(email) {
    try {
        const results = await pool.query('INSERT INTO users (email) VALUES ($1)', [email]);
        console.log(results);
    } catch (e) {
        console.log(e);
    }
}

export async function getUser() {

}

export async function updateUserName(id, name) {
    try {
        const results = await pool.query('UPDATE users SET name = $1 WHERE id = $2', [name, id]);
        console.log(results);
    } catch (e) {
        console.log(e);
    }
}