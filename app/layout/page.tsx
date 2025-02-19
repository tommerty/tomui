import {
    Sidebar,
    SidebarProvider,
    SidebarHeader,
    SidebarContent,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
    SidebarInset,
    SidebarGroup,
} from "@/components/complex-sidebar/complex-sidebar";

export default function Home() {
    return (
        <div className="flex h-full">
            <div className="flex flex-1 flex-col gap-4 overflow-scroll p-4">
                {Array.from({ length: 40 }).map((_, index) => (
                    <div
                        key={index}
                        className="aspect-video h-12 w-full rounded-lg bg-card"
                    />
                ))}
            </div>
            <SidebarProvider
                name="right-sidebar"
                className="hidden lg:block"
                style={{
                    // @ts-ignore
                    "--sidebar-width": "15rem",
                }}
            >
                <Sidebar
                    className="border-none pl-0"
                    side="right"
                    absolute
                    collapsible="none"
                >
                    <SidebarContent>
                        <SidebarGroup>
                            <SidebarMenu>
                                {Array.from({ length: 50 }).map((_, i) => (
                                    <SidebarMenuItem key={i}>
                                        <SidebarMenuButton>
                                            Item {i + 1}
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroup>
                    </SidebarContent>
                </Sidebar>
            </SidebarProvider>
        </div>
    );
}
