import { UserRole } from "@prisma/client";
import { type DefaultSession } from "next-auth";
import { JWT, DefaultJWT } from 'next-auth/jwt'

export type ExtendedUser = {
    role: UserRole
} & DefaultSession["user"]

declare module 'next-auth' {
    interface Session extends DefaultSession {
        user: ExtendedUser
    }
}

declare module 'next-auth/jwt' {
    interface JWT extends DefaultJWT {
        role: UserRole
    }
}