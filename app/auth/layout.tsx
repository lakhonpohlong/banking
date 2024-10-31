import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="h-full flex items-center justify-center bg-gray-100">
            {children}
        </div>
    );
}
