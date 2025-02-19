import { AppSidebar } from "@/components/ui/app-sidebar";
import { cn } from "@/lib/utils";
import {
    Sidebar,
    SidebarProvider,
    SidebarHeader,
    SidebarContent,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
    SidebarTrigger,
} from "@/components/complex-sidebar/complex-sidebar";
import React, { Suspense } from "react";
import SidebarButton from "@/components/ui/SidebarButton";
import { IconLayoutNavbarExpand, IconMenu2 } from "@tabler/icons-react";
import Loading from "../loading";

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex h-dvh">
            <Suspense fallback={<Loading />}>
                <AppSidebar />

                <main className="mt-2 flex flex-1 flex-col overflow-hidden px-2">
                    <header className="flex w-full items-center rounded-md border bg-background/80 p-3 backdrop-blur">
                        <SidebarButton sidebarName="app-sidebar">
                            <IconLayoutNavbarExpand />
                        </SidebarButton>
                        <p className="ml-auto">test</p>
                    </header>
                    <div className="flex-1 overflow-auto">{children}</div>
                </main>
            </Suspense>
        </div>
    );
}
