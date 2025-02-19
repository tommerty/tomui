import {
    Sidebar,
    SidebarProvider,
    SidebarHeader,
    SidebarContent,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
    SidebarInset,
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
            <SidebarProvider name="right" className="">
                <Sidebar className="pl-0" side="right" absolute>
                    <SidebarHeader>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton>Dashboard</SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton>Settings</SidebarMenuButton>
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
        </div>
    );
}
