import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import {
    SidebarProvider,
    SidebarTrigger,
} from "@/components/complex-sidebar/complex-sidebar";
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
    title: {
        template: "%s | tommerty/ui",
        default: "tommerty/ui", // a default is required when creating a template
    },
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
                className={`${geistSans.variable} ${geistMono.variable} dark antialiased`}
            >
                <SidebarProvider defaultOpen name="root">
                    <AppSidebar />
                    <div className="relative mx-auto w-full max-w-screen-lg">
                        {/* <SidebarTrigger className="fixed left-3 top-3 hidden md:block" /> */}
                        {children}
                        <MobileNav />
                    </div>
                </SidebarProvider>
            </body>
        </html>
    );
}
