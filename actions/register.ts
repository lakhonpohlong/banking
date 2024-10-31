'use server'

import { db } from "@/lib/db";
import { authFormSchema } from "@/lib/utils";
import * as z from "zod";
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { PrismaAdapter } from '@auth/prisma-adapter'
import { PrismaClient } from "@prisma/client";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";

const formSchema = authFormSchema('sign-up');

export const register = async (values: z.infer<typeof formSchema>) => {
    const validatedFields = formSchema.safeParse(values)
    const prisma = new PrismaClient();
    if (!validatedFields) {
        return { error: "Invalid fields!" };
    }
    const { firstName, lastName, email, address, city, state, pincode, dateOfBirth, password } = validatedFields.data
    const user = await db.user.findUnique({
        where: { email: email }
    })

    if (user) {
        return { ok: false, error: "Email already exist" }
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
    const verificationToken = await generateVerificationToken(email);

    await sendVerificationEmail(
        verificationToken.email,
        verificationToken.token
    )

    return { ok: true, success: "Confirmation email sent!" }
}
