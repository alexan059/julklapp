import otpGenerator from 'otp-generator';
import bcrypt from 'bcrypt';
import { getOTP, updateOTP } from '~/server/queries/otp';
import exp from 'constants';

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

    await updateOTP(email, { hash, expires });

    return { digits, expires: SECONDS_TO_EXPIRE };
}

export async function verifyOTP(email, digits): Promise<boolean> {
    const { hash, expires } = await getOTP(email);

    return await bcrypt.compare(email + digits + expires, hash);
}