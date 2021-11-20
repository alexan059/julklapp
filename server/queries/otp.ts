import pool from '~/server/services/database';

interface OTP {
    hash: string;
    expires: number;
}

export async function updateOTP(email, { hash, expires }) {
    const otp = JSON.stringify({ hash, expires });

    try {
        await pool.query('UPDATE users SET otp = $1 WHERE email = $2', [otp, email]);
    } catch (e) {
        console.log(e);
    }
}

export async function getOTP(email): Promise<OTP> {
    try {
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

        return { hash, expires };
    } catch (e) {
        console.log(e);

        return { hash: '', expires: 0 };
    }
}

export async function resetOTP(email) {
    try {
        await pool.query('UPDATE users SET otp = $1 WHERE email = $2', [null, email]);
    } catch (e) {
        console.log(e);
    }
}