import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
im
import { NextRequest, NextResponse } from 'next/server.js';

const prisma = new PrismaClient();

export default async function handler(req: NextRequest, res: NextResponse) {
    if (req.method === 'POST') {
        const { email, password }: { email: string, password: string } = req.body;

        try {
            const user = await prisma.user.findUnique({
                where: { email },
            });

            if (!user) {
                return res.status(401).json({ error: 'Invalid email or password' });
            }

            const isPasswordValid = await bcrypt.compare(password, user.password);

            if (!isPasswordValid) {
                return res.status(401).json({ error: 'Invalid email or password' });
            }

            const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
                expiresIn: '1h',
            });

            res.status(200).json({ token });
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}
