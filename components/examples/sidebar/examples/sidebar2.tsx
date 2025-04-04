"use client";

import {
    Sidebar,
    SidebarButton,
    SidebarContent,
    SidebarDynamicContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarSeparator,
} from "@/registry/sidebar/sidebar";
import { HomeIcon, LayoutDashboardIcon, SettingsIcon } from "lucide-react";
import { usePathname } from "next/navigation";

import { ActivityContent, SidebarContentType } from "@/types/sidebar";

interface DashboardSidebarProps {
    collapsed?: boolean;
    onCollapse?: (collapsed: boolean) => void;
    position?: "left" | "right";
    name?: string;

    sidebarContent?: SidebarContentType;
    onContentChange?: (content: SidebarContentType) => void;
}

export function DashboardSidebarRight({
    collapsed = true,
    position,
    onCollapse,
    name = "right-sidebar",
    sidebarContent,
    onContentChange,
}: DashboardSidebarProps) {
    const pathname = usePathname();

    // Render function for activity content
    const renderActivityContent = (content: SidebarContentType) => {
        if (!content || content.type !== "activity") return null;
        // Type assertion to ActivityContent
        const activityContent = content as ActivityContent;

        return (
            <SidebarGroup>
                <SidebarGroupContent>
                    <div className="space-y-4">
                        <div>
                            <h3 className="text-sm font-medium text-muted-foreground">
                                Date
                            </h3>
                            <p>{activityContent.date}</p>
                        </div>

                        <div>
                            <h3 className="text-sm font-medium text-muted-foreground">
                                Status
                            </h3>
                            <div className="mt-1 flex items-center">
                                <span className="mr-2 h-2 w-2 rounded-full bg-green-500"></span>
                                <span>{activityContent.status}</span>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-sm font-medium text-muted-foreground">
                                Description
                            </h3>

                            <p className="mt-1">
                                {activityContent.description}
                            </p>
                        </div>

                        <div>
                            <h3 className="text-sm font-medium text-muted-foreground">
                                Related Items
                            </h3>
                            <ul className="mt-1 space-y-1">
                                {activityContent.relatedItems.map(
                                    (item: string, index: number) => (
                                        <li key={index}>• {item}</li>
                                    )
                                )}
                            </ul>
                        </div>
                    </div>
                </SidebarGroupContent>
            </SidebarGroup>
        );
    };

    // Fallback content when no activity is selected
    const fallbackContent = (
        <SidebarGroup>
            <SidebarGroupContent>
                <div className="grid gap-4">
                    <div className="rounded-lg border bg-card p-6">
                        <p className="text-xl font-semibold">
                            No Activity Selected
                        </p>
                        <p className="mt-2 text-muted-foreground">
                            Click on an activity from the main panel to view its
                            details here.
                        </p>
                    </div>
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
    );

    return (
        <Sidebar
            name={name}
            position={position}
            collapsed={collapsed}
            onCollapse={onCollapse}
            variant="hidden"
            sidebarContent={sidebarContent}
            onContentChange={onContentChange}
        >
            <SidebarHeader>
                <div
                    className={`font-semibold ${collapsed ? "hidden" : "block"}`}
                >
                    {sidebarContent?.title || "Details"}
                </div>
            </SidebarHeader>

            <SidebarContent>
                <SidebarDynamicContent
                    renderContent={renderActivityContent}
                    fallback={fallbackContent}
                />
            </SidebarContent>
        </Sidebar>
    );
}
