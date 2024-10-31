import { PrismaClient } from '@prisma/client'

const globalThisForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined
}
const prisma = globalThisForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== "production") globalThisForPrisma.prisma = prisma

export const db = prisma