import { auth } from "@/auth";
import MobileNavbar from "@/components/MobileNavbar";
import Sidebar from "@/components/Sidebar";
import { SessionProvider } from "next-auth/react";
import Image from "next/image.js";

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const loggedIn = { firstName: 'Lucky', lastName: 'Pohlong' };
    return (
        <main className="flex h-screen w-full font-inter">
            <Sidebar user={loggedIn} />
            <div className="flex size-full flex-col">
                <div className="root-layout">
                    <Image
                        src='/icons/logo.svg'
                        width={30}
                        height={30}
                        alt="logo"
                    />
                    <div>
                        <MobileNavbar user={loggedIn} />
                    </div>
                </div>
                {children}
            </div>
        </main>
    );
}
