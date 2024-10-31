import { auth } from "@/auth"

import NextAuth from "next-auth";
import authConfig from "./auth.config"

import {
    DEFAULT_LOGIN_REDIRECT,
    apiAuthPrefix,
    authRoutes,
    publicRoutes
} from '@/routes'
import { useCurrentRole } from "./hooks/use-current-role";
import { UserRole } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export default auth((req) => {
    // req.auth
    const { nextUrl, auth } = req
    const role = auth?.user.role;
    const isLoggedIn = !!req.auth;
    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix)
    const isPublicRoutes = publicRoutes.includes(nextUrl.pathname)
    const isAuthRoutes = authRoutes.includes(nextUrl.pathname)
    if (isApiAuthRoute) {
        return null;
    }
    if (isAuthRoutes) {
        if (isLoggedIn) {
            return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
        }
        return null;
    }
    if (!isLoggedIn && !isPublicRoutes) {
        return Response.redirect(new URL("/auth/sign-in", nextUrl))
    }

    if (req.nextUrl.pathname.startsWith('/admin') && role !== UserRole.ADMIN) {
        return NextResponse.rewrite(new URL('/denied', req.url))
    }

    if (req.nextUrl.pathname.startsWith('/manager') && role !== UserRole.ADMIN
        && role !== UserRole.MANAGER) {
        return NextResponse.rewrite(new URL('/denied', req.url))
    }
    return null;
})


export const config = {
    matcher: [
        // Skip Next.js internals and all static files, unless found in search params
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        // Always run for API routes
        '/(api|trpc)(.*)',
    ],
}