import NextAuth, { type DefaultSession } from "next-auth";
import authConfig from "./auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "./lib/db";
import { getUserById } from "./data/user";
import { UserRole } from "@prisma/client";
import { NextAuthConfig } from "next-auth";


export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut
} = NextAuth({
    pages: {
        signIn: '/auth/sign-in',
        error: '/auth/error'
    },
    events: {
        async linkAccount({ user }) {
            await db.user.update({
                where: { id: user.id },
                data: { emailVerified: new Date() }
            })
        }
    },
    callbacks: {
        async signIn({ user, account }) {
            if (account?.provider !== 'credentials') return true;

            const existingUser = await getUserById(user.id);
            if (!existingUser?.emailVerified) return false;
            return true;
        },
        async jwt({ token, user, session }) {
            // console.log("jwt callback", { user });

            if (!token.sub) return token;
            const existingUser = await getUserById(token.sub);
            if (!existingUser) return token;
            token.role = existingUser.role

            //console.log("jwt callback", token.role);
            return { ...token, ...user };
        },
        async session({ token, session, user }) {
            if (token.sub && session.user) {
                session.user.id = token.sub;
            }
            if (token.role) {
                session.user.role = token.role as UserRole;
            }
            return session;
        },

    },
    adapter: PrismaAdapter(db),
    session: { strategy: "jwt" },
    ...authConfig,
})