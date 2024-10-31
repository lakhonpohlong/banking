'use server'

import { getUserByEmail } from "@/data/user"
import { getVerificationTokenByEmail, getVerificationTokenByToken } from "@/data/verificationToken"
import { db } from "@/lib/db"

export const newVerification = async (token: string) => {
    const existingToken = await getVerificationTokenByToken(token)

    if (!existingToken) {
        return { ok: false, error: "Token does not exist!" }
    }
    const hasExpired = new Date(existingToken.expires) < new Date();
    if (hasExpired) {
        return { ok: false, error: "Token has expired!" }
    }

    const existingUser = await getUserByEmail(existingToken.email)
    if (!existingUser) {
        return { ok: false, error: "Email does not exist!" }
    }

    await db.user.update({
        where: { id: existingUser.id },
        data: {
            emailVerified: new Date(),
            email: existingToken.email
        }
    })
    await db.verificationToken.delete({
        where: { id: existingToken.id }
    })
    return { ok: true, success: "Email verified!" }
}