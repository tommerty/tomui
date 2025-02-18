import { cn } from "@/lib/utils";
import {
    Sidebar,
    SidebarProvider,
    SidebarHeader,
    SidebarContent,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
} from "@/registry/sidebar/sidebar";

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex h-dvh max-h-dvh min-h-dvh">
            <div className="flex flex-1 flex-col">
                <div className="sticky top-0 z-10 flex w-full items-center border-b bg-background/80 p-3 backdrop-blur">
                    <p>test</p>
                    <p className="ml-auto">test</p>
                </div>
                <div className="flex flex-1 overflow-hidden">
                    <SidebarProvider>
                        <Sidebar className="border-r">
                            <SidebarHeader>
                                <SidebarMenu>
                                    <SidebarMenuItem>
                                        <SidebarMenuButton>
                                            Dashboard
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                    <SidebarMenuItem>
                                        <SidebarMenuButton>
                                            Settings
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                </SidebarMenu>
                            </SidebarHeader>
                            <SidebarContent>
                                <SidebarMenu>
                                    {Array.from({ length: 50 }).map((_, i) => (
                                        <SidebarMenuItem key={i}>
                                            <SidebarMenuButton>
                                                Item {i + 1}
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    ))}
                                </SidebarMenu>
                            </SidebarContent>
                        </Sidebar>
                    </SidebarProvider>
                    <main className="flex-1 overflow-y-auto">
                        <div className="space-y-4 p-3">{children}</div>
                    </main>
                </div>
            </div>

            <SidebarProvider>
                <Sidebar side="right" className="h-screen border-l">
                    <SidebarHeader>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton>
                                    Right Menu
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarHeader>
                    <SidebarContent>
                        {/* Right sidebar content */}
                    </SidebarContent>
                </Sidebar>
            </SidebarProvider>
        </div>
    );
}
