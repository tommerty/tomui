"use client";
import * as React from "react";

// import { SearchForm } from "@/components/search-form"
// import { VersionSwitcher } from "@/components/version-switcher"
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
} from "@/registry/complex-sidebar/complex-sidebar";
import { IconCode } from "@tabler/icons-react";
import { components } from "@/lib/items";
import { useRouter, usePathname } from "next/navigation";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const router = useRouter();
    const pathname = usePathname();
    console.log(pathname);
    return (
        <Sidebar {...props} variant="primary">
            <SidebarHeader>
                <SidebarMenuItem>
                    <SidebarMenuButton
                        isActive={pathname === "/"}
                        onClick={() => router.push("/")}
                    >
                        <IconCode />
                        TomUI
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarHeader>
            <SidebarContent>
                {/* {data.navMain.map((item) => ( */}
                <SidebarGroup>
                    <SidebarGroupLabel>Components</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton
                                    asChild
                                    isActive={pathname === `/component`}
                                >
                                    <a href={`/component`}>All Components</a>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            {components.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton
                                        asChild
                                        isActive={
                                            pathname ===
                                            `/component/${item.code}`
                                        }
                                    >
                                        <a href={`/component/${item.code}`}>
                                            {item.title}
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
                {/* ))} */}
            </SidebarContent>
            <SidebarRail />
        </Sidebar>
    );
}
