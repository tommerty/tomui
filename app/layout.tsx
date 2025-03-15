import type { Metadata } from "next";

import "@fontsource-variable/geist";
import "@fontsource-variable/geist-mono";
import "./globals.css";
import {
    SidebarProvider,
    SidebarTrigger,
} from "@/components/complex-sidebar/complex-sidebar";
import { AppSidebar } from "@/components/ui/app-sidebar";
import MobileNav from "@/components/MobileNav";
import { Suspense } from "react";
import Loading from "./loading";
import Nav from "@/components/ui/Nav";

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
            <body className={`dark antialiased`}>
                <div className="relative mx-auto w-full max-w-screen-2xl">
                    <div className="flex h-dvh">
                        <Suspense fallback={<Loading />}>
                            <AppSidebar absolute />

                            <main className="mt-2 flex flex-1 flex-col overflow-hidden px-2">
                                <Nav />
                                <div className="flex-1 overflow-auto">
                                    {children}
                                </div>
                            </main>
                        </Suspense>
                    </div>
                </div>
            </body>
        </html>
    );
}
