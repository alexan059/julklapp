import pool from '~/server/services/database';
import otpGenerator from 'otp-generator';
import bcrypt from 'bcrypt';

const SECONDS_TO_EXPIRE = 120;

export async function generateOTP(email) {
    const digits = otpGenerator.generate(4, {
        alphabets: false,
        specialChars: false,
        upperCase: false,
        digits: true,
    });

    const expires = Date.now() + ((SECONDS_TO_EXPIRE + 30) * 1000); // expires after 150 seconds
    const hash = await bcrypt.hash(email + digits + expires, 10);
    const otp = JSON.stringify({ hash, expires });

    await pool.query('UPDATE users SET otp = $1 WHERE email = $2', [otp, email]);

    return { digits, expires: SECONDS_TO_EXPIRE };
}

export async function verifyOTP(email, digits) {
    const results = await pool.query('SELECT otp FROM users WHERE email = $1', [email]);

    await resetOTP(email);

    if (results.rowCount <= 0) {
        throw new Error('email not found');
    }

    const { otp } = results.rows[0];
    const { hash, expires } = JSON.parse(otp);

    if (Date.now() > expires) {
        throw new Error('timeout');
    }

    return await bcrypt.compare(email + digits + expires, hash);
}

export async function resetOTP(email) {
    await pool.query('UPDATE users SET otp = $1 WHERE email = $2', [null, email]);
}

export async function login() {

}

export async function logout() {

}