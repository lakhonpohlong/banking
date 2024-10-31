import { NextResponse } from "next/server.js"
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { db } from '@/lib/db'
//const prisma = new PrismaClient()
export const GET = async (req: Request, res: Response) => {
    const prisma = new PrismaClient();

    const { email, password }: { email: string; password: string } = req.body;

    try {
        const user = await db.user.findUnique({
            where: { email },
        });

        if (!user) {
            return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
        }

        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET as string, {
            expiresIn: '1h',
        });

        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}

export const POST = async (req: Request) => {
    const prisma = new PrismaClient();
    try {
        const body = await req.json();
        const { firstName, lastName, email, address, city, state, pincode, dateOfBirth, password } = body
        const existUserByEmail = await prisma.user.findUnique({
            where: { email: email }
        })
        if (existUserByEmail) {
            return NextResponse.json({ status: 'Failed', user: existUserByEmail.email, message: "User with this email already exists" }, { status: 409 })
        }
        const hashPassword = await bcrypt.hash(password, 10)
        const newUser = await prisma.user.create({
            data: {
                name: `${firstName} ${lastName}`,
                email,
                address,
                city,
                state,
                pincode,
                dateOfBirth,
                password: hashPassword,
                image: ""
            }
        })
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password: userPassword, ...rest } = newUser
        return NextResponse.json({ message: "User created successfully", user: rest }, { status: 201 })
    } catch (error) {
        return NextResponse.json({ message: "Internal Server Error", error }, { status: 500 })
    }
}