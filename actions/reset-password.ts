'use server'
import { getUserByEmail } from "@/data/user"
import { sendPasswordResetEmail } from "@/lib/mail"
import { generatePasswordResetToken } from "@/lib/tokens"
import { authResetSchema } from "@/lib/utils"
import { emit } from "process"
import { z } from "zod"

const formSchema = authResetSchema()
export const resetPassword = async (values: z.infer<typeof formSchema>) => {

    const validatedFields = formSchema.safeParse(values);
    if (!validatedFields.success) {
        return { ok: false, error: "Invalid email!" }
    }
    const { email } = validatedFields.data;
    const existingUser = await getUserByEmail(email)
    if (!existingUser) {
        return { ok: false, error: "Email not found!" }
    }

    const passwordResetToken = await generatePasswordResetToken(email);
    await sendPasswordResetEmail(
        passwordResetToken.email,
        passwordResetToken.token,
    )

    return { ok: true, success: "Reset email sent!" }


}