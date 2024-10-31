import { getVerificationTokenByEmail } from '@/data/verificationToken';
import { v4 as uuid4 } from 'uuid'
import { db } from './db';
import { getPasswordResetTokenByEmail } from '@/data/password-reset-token';
export const generateVerificationToken = async (email: string) => {
    const token = uuid4();
    const expires = new Date(new Date().getTime() + 3600 * 1000);

    const existingtoken = await getVerificationTokenByEmail(email);

    if (existingtoken) {
        await db.verificationToken.delete({
            where: { id: existingtoken.id }
        })
    }

    const verificationToken = await db.verificationToken.create({
        data: {
            email,
            token,
            expires,
        }
    })
    return verificationToken;
}

export const generatePasswordResetToken = async (email: string) => {
    const token = uuid4();
    const expires = new Date(new Date().getTime() + 3600 * 1000);

    const existingtoken = await getPasswordResetTokenByEmail(email);

    if (existingtoken) {
        await db.passwordResetToken.delete({
            where: { id: existingtoken.id }
        })
    }
    const passwordReset = await db.passwordResetToken.create({
        data: {
            email,
            token,
            expires,
        }
    })
    return passwordReset;
}
