import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarInset,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarProvider,
    SidebarTrigger,
} from "@/registry/complex-sidebar/complex-sidebar";
import { AppSidebar } from "@/components/ui/app-sidebar";
import { IconHome } from "@tabler/icons-react";

export default function ExampleSidebar({
    children,
}: Readonly<{
    children?: React.ReactNode;
}>) {
    return (
        <SidebarProvider
            defaultOpen
            name="example-left"
            className="flex min-h-fit place-content-start items-start justify-start gap-3"
        >
            <Sidebar variant="primary" absolute>
                <SidebarContent>
                    <SidebarGroup>
                        <SidebarGroupLabel>Projects</SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                <SidebarMenuItem>
                                    <SidebarMenuButton>
                                        <IconHome />
                                        <span>Home</span>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                </SidebarContent>
            </Sidebar>

            <div className="h-full w-full flex-col">
                <SidebarProvider
                    defaultOpen
                    name="example-left"
                    className="flex min-h-fit place-content-start items-start justify-start"
                >
                    <Sidebar variant="floating" absolute>
                        <SidebarContent>
                            <SidebarGroup>
                                <SidebarGroupLabel>Projects</SidebarGroupLabel>
                                <SidebarGroupContent>
                                    <SidebarMenu>
                                        <SidebarMenuItem>
                                            <SidebarMenuButton>
                                                <IconHome />
                                                <span>Home</span>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    </SidebarMenu>
                                </SidebarGroupContent>
                            </SidebarGroup>
                        </SidebarContent>
                    </Sidebar>
                </SidebarProvider>
                <p>Hello</p>
            </div>
        </SidebarProvider>
    );
}
