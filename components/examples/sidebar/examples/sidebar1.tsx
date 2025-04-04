"use client";

import { useState } from "react";
import {
    Sidebar,
    SidebarButton,
    SidebarContent,
    SidebarGroup,
    SidebarGroupAction,
    SidebarGroupContent,
    SidebarGroupHeader,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarNav,
    SidebarSeparator,
} from "@/registry/sidebar/sidebar";
import { HomeIcon, LayoutDashboardIcon, SettingsIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { IconDotsVertical } from "@tabler/icons-react";

interface DashboardSidebarProps {
    collapsed?: boolean;
    onCollapse?: (collapsed: boolean) => void;
    position?: "left" | "right";
    name?: string;
}

export function DashboardSidebar({
    collapsed = true,
    position,
    onCollapse,
    name,
}: DashboardSidebarProps) {
    const pathname = usePathname();
    return (
        <Sidebar
            name={name}
            position={position}
            collapsed={collapsed}
            onCollapse={onCollapse}
            defaultCollapsed={collapsed} // Add this line
        >
            <SidebarHeader>
                <div
                    className={`font-semibold ${collapsed ? "hidden" : "block"}`}
                >
                    My App
                </div>
            </SidebarHeader>

            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupHeader>
                        <SidebarGroupLabel>Home</SidebarGroupLabel>
                        <SidebarGroupAction>
                            <IconDotsVertical className="h-4 w-4" />
                        </SidebarGroupAction>
                    </SidebarGroupHeader>
                    <SidebarGroupContent>
                        <SidebarButton
                            href="/"
                            icon={<HomeIcon className="h-5 w-5" />}
                            active={pathname === "/"}
                        >
                            Home
                        </SidebarButton>

                        <SidebarButton
                            href="/dashboard"
                            icon={<LayoutDashboardIcon className="h-5 w-5" />}
                            active={pathname === "/dashboard"}
                        >
                            Dashboard
                        </SidebarButton>
                        <SidebarSeparator />
                        <SidebarButton
                            href="/settings"
                            icon={<SettingsIcon className="h-5 w-5" />}
                            active={pathname === "/settings"}
                        >
                            Settings
                        </SidebarButton>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    );
}
