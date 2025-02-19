import { AppSidebar } from "@/components/ui/app-sidebar";

import React, { Suspense } from "react";
import Loading from "../loading";
import Nav from "@/components/ui/Nav";

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex h-dvh">
            <Suspense fallback={<Loading />}>
                <AppSidebar absolute />

                <main className="mt-2 flex flex-1 flex-col overflow-hidden px-2">
                    <Nav />
                    <div className="flex-1 overflow-auto">{children}</div>
                </main>
            </Suspense>
        </div>
    );
}
