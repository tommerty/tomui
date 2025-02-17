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
    SidebarMenuAction,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
    SidebarTrigger,
} from "@/components/complex-sidebar/complex-sidebar";
import { IconCode, IconLayoutNavbarExpand } from "@tabler/icons-react";
import { components } from "@/lib/items";
import { useRouter, usePathname } from "next/navigation";
import * as tabler from "@tabler/icons-react";
import Search from "../Search";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const router = useRouter();
    const pathname = usePathname();
    const [searchOpen, setSearchOpen] = React.useState(false);

    return (
        <Sidebar {...props} variant="inset" className="border-r">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            isActive={pathname === "/"}
                            onClick={() => router.push("/")}
                        >
                            <img
                                src="https://cdn.doras.to/doras/assets/83bda65b-8d42-4011-9bf0-ab23402776f2/b81da5ac-e5be-45c1-b9b1-80b4f51e83af.png"
                                alt="TomUI"
                                className="size-4"
                            />
                            TomUI
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem onClick={() => setSearchOpen(true)}>
                        <SidebarMenuButton>
                            {/* @ts-ignore */}
                            <tabler.IconSearch />
                            Search...
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <Search open={searchOpen} onOpenChange={setSearchOpen} />
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                {/* {data.navMain.map((item) => ( */}
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton
                                    asChild
                                    isActive={pathname === `/component`}
                                >
                                    <a href={`/component`}>
                                        <IconLayoutNavbarExpand />
                                        Components
                                    </a>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            {components.map((item) => {
                                const Icon = tabler[item.iconName];
                                return (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton
                                            asChild
                                            isActive={
                                                pathname ===
                                                `/component/${item.code}`
                                            }
                                        >
                                            <a href={`/component/${item.code}`}>
                                                {/* @ts-ignore */}
                                                <Icon />
                                                {item.title}
                                            </a>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                );
                            })}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
                {/* ))} */}
            </SidebarContent>
        </Sidebar>
    );
}
