import type { Metadata } from "next";
import { Inter, IBM_Plex_Serif } from "next/font/google"
import "./globals.css";
import { SessionProvider, useSession } from "next-auth/react";
import { auth } from "@/auth";

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const ibmPlexSerif = IBM_Plex_Serif({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-ibm-plex-serif'
})

export const metadata: Metadata = {
  title: "Horizon",
  description: "Horizon is a modern banking app for everyone",
  icons: {
    icon: '/icon/logo.svg'
  }
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth()
  return (
    <SessionProvider session={session}>
      <html lang="en">
        <body
          className={`${inter.variable} ${ibmPlexSerif.variable} antialiased`}>
          {children}
        </body>
      </html>
    </SessionProvider>
  );
}
