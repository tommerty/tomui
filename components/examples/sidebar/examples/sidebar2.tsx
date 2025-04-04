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

export function DashboardSidebarRight({
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
            variant="hidden"
        >
            <SidebarHeader>
                <div
                    className={`font-semibold ${collapsed ? "hidden" : "block"}`}
                >
                    Details
                </div>
            </SidebarHeader>

            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <div className="grid gap-4">
                            {Array.from({ length: 15 }).map((_, i) => (
                                <div
                                    key={i}
                                    className="rounded-lg border bg-card p-6"
                                >
                                    <p className="text-xl font-semibold">
                                        Activity {i + 1}
                                    </p>
                                    <p className="mt-2 text-muted-foreground">
                                        This is an example activity card to
                                        demonstrate scrolling content. Each card
                                        represents a different activity or
                                        notification.
                                    </p>
                                </div>
                            ))}
                        </div>
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
