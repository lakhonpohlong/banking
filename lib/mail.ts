import { EmailTemplate } from "@/components/EmailTemplate";
import { randomUUID } from "crypto";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY)
export const sendVerificationEmail = async (email: string, token: string) => {
    const confirmLink = `http://localhost:3000/auth/new-verification?token=${token}&id=${randomUUID()}`;
    const sendMail = await resend.emails.send({
        from: 'Travel Destiny <onboarding@resend.dev>',
        to: email,
        subject: 'Verify Email',
        html: `<p>Click <a href="${confirmLink}">here</a> to verify your Email!</p>`
    })
    return sendMail;
}

export const sendPasswordResetEmail = async (email: string, token: string) => {
    const resetLink = `http://localhost:3000/auth/new-password?token=${token}&id=${randomUUID()}`
    const sendMail = await resend.emails.send({
        from: 'Travel Destiny <onboarding@resend.dev>',
        to: email,
        subject: 'Password Reset Link',
        html: `<p>Click <a href="${resetLink}">here</a> to Your password!</p>`
    })
    return sendMail;
}