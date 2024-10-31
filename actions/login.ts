'use server'

import { authFormSchema } from "@/lib/utils";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";
import { signIn } from "@/auth";
import * as z from "zod";
import { getUserByEmail } from "@/data/user";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";

const formSchema = authFormSchema('sign-in')
export const login = async (values: z.infer<typeof formSchema>) => {
    const validatedFields = formSchema.safeParse(values)

    if (!validatedFields) {
        return { error: "Invalid fields!" };
    }
    const { email, password } = validatedFields.data;
    const existingUser = await getUserByEmail(email);
    if (!existingUser || !existingUser.email || !existingUser.password) {
        return { ok: false, error: "Email does not exist!" }
    }
    if (!existingUser.emailVerified) {
        const verificationToken = await generateVerificationToken(existingUser.email)
        const isVerificationSent = await sendVerificationEmail(
            verificationToken.email,
            verificationToken.token
        )
        console.log(isVerificationSent.error?.message);

        if (isVerificationSent.error) {
            return { ok: false, error: "Resend.com: Unable to send verification token!" }
        }
        return { ok: true, success: "Confirmation email sent!" }
    }
    try {
        await signIn("credentials", {
            email,
            password,
            redirectTo: DEFAULT_LOGIN_REDIRECT
        })
        return { ok: true, success: "success" }
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return { ok: false, error: "Invalid credentials" }
                    break;
                default:
                    return { ok: false, error: "Someting went wrong" }
                    break;
            }
        }
        throw error

    }
}