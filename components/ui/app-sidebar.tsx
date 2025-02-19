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
    SidebarProvider,
    useSidebar,
} from "@/components/complex-sidebar/complex-sidebar";
import { IconCode, IconLayoutNavbarExpand } from "@tabler/icons-react";
import { components } from "@/lib/items";
import { useRouter, usePathname } from "next/navigation";
import * as tabler from "@tabler/icons-react";
import Search from "../Search";
import { useSidebarStore } from "@/store/use-sidebar-store";
import { useIsMobile } from "@/hooks/use-mobile";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const router = useRouter();
    const pathname = usePathname();
    const [searchOpen, setSearchOpen] = React.useState(false);
    const isOpen = useSidebarStore(
        (state) => state.sidebarStates["app-sidebar"]
    );
    const openMobile = useSidebarStore((state) => state.openMobile);
    const setOpenMobile = useSidebarStore((state) => state.setOpenMobile);
    const isMobile = useIsMobile();

    return (
        <SidebarProvider open={isOpen} name="app-sidebar">
            <Sidebar {...props} variant="floating" className="">
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
                        {isMobile == true && (
                            <SidebarMenuItem
                                onClick={() => setSearchOpen(true)}
                            >
                                <SidebarMenuButton>
                                    {/* @ts-ignore */}
                                    <tabler.IconSearch />
                                    Search...
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        )}
                        <Search
                            open={searchOpen}
                            onOpenChange={setSearchOpen}
                        />
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
                                                <a
                                                    href={`/component/${item.code}`}
                                                >
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
        </SidebarProvider>
    );
}
