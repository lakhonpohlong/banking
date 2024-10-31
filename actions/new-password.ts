'use server'

import { getPasswordResetTokenByToken } from "@/data/password-reset-token"
import { getUserByEmail } from "@/data/user"
import { db } from "@/lib/db"
import { z } from 'zod'
import { authNewPasswordSchema } from "@/lib/utils"
import { hash } from "bcryptjs"

interface tokenProps {
    token: string;
}
const formSchema = authNewPasswordSchema()
export const newPassword = async (values: z.infer<typeof formSchema>, { token }: tokenProps) => {

    if (!token) return { ok: false, error: "Missing token!" }

    const validatedFields = formSchema.safeParse(values);
    if (!validatedFields.success) {
        return { ok: false, error: "Invalid fields!" }
    }
    const { password } = validatedFields.data;

    const existingToken = await getPasswordResetTokenByToken(token)
    if (!existingToken) {
        return { ok: false, error: "Invalid token!" }
    }

    const hasExpired = new Date(existingToken.expires) < new Date();
    if (hasExpired) {
        return { ok: false, error: "Token has expired!" }
    }

    const existingUser = await getUserByEmail(existingToken.email)
    if (!existingUser) {
        return { ok: false, error: "Email does not exist!" }
    }

    const hashPassword = await hash(password, 10);
    await db.user.update({
        where: { id: existingUser.id },
        data: {
            password: hashPassword,
        }
    })
    // await db.passwordResetToken.delete({
    //     where: { id: existingToken.id }
    // })
    return { ok: true, success: "Password changed!" }
}