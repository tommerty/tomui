import {
    Sidebar,
    SidebarProvider,
    SidebarHeader,
    SidebarContent,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
} from "@/registry/sidebar/sidebar";

export default function Home() {
    return (
        <div
            className="relative flex flex-1 gap-4 overflow-hidden"
            style={{
                contain: "paint, layout, size",
            }}
        >
            <div className="relative flex-1 overflow-y-auto">
                {Array.from({ length: 40 }).map((_, index) => (
                    <div
                        key={index}
                        className="mb-4 h-12 w-full rounded-lg bg-card"
                    />
                ))}
            </div>

            <SidebarProvider>
                <Sidebar variant="floating">
                    <SidebarHeader>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton>
                                    Nested Menu
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarHeader>
                    <SidebarContent>
                        {Array.from({ length: 50 }).map((_, index) => (
                            <div
                                key={index}
                                className="mb-2 h-12 w-full rounded-lg bg-muted"
                            />
                        ))}
                    </SidebarContent>
                </Sidebar>
            </SidebarProvider>
        </div>
    );
}
