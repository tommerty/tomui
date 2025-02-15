import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import {
    SidebarProvider,
    SidebarTrigger,
} from "@/registry/complex-sidebar/complex-sidebar";
import { AppSidebar } from "@/components/ui/app-sidebar";
import MobileNav from "@/components/MobileNav";
const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "tommerty/ui",
    description: "Yet another UI library based on shadcn/ui",
    icons: {
        icon: "/favicon.ico",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${geistSans.variable} ${geistMono.variable} dark mx-auto max-w-7xl antialiased`}
            >
                <SidebarProvider defaultOpen name="root">
                    <AppSidebar />
                    <main className="w-full">
                        <SidebarTrigger className="fixed left-3 top-3 hidden md:block" />
                        {children}
                        <MobileNav />
                    </main>
                </SidebarProvider>
            </body>
        </html>
    );
}
