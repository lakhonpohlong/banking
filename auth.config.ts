import Credentials from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth";
import { authFormSchema } from "./lib/utils";
import { getUserByEmail } from "@/data/user";
import { compare } from "bcryptjs";
import Google from "next-auth/providers/google"

const formSchema = authFormSchema('sign-in')

export default {
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }),
        Credentials({
            async authorize(credentials) {
                const validatedFields = formSchema.safeParse(credentials)
                if (validatedFields.success) {
                    const { email, password } = validatedFields.data

                    const user = await getUserByEmail(email);
                    if (!user || !user.password) return null


                    const passwordMatch = await compare(password, user.password);
                    if (passwordMatch) return user;
                }


                return null;
            }
        })
    ]
} satisfies NextAuthConfig