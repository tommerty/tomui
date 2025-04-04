"use client";

import {
    Sidebar,
    SidebarButton,
    SidebarContent, // This is the component
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupHeader,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarNav,
    SidebarSeparator,
} from "@/registry/sidebar/sidebar";
import { HomeIcon, LayoutDashboardIcon, SettingsIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { SidebarContentType } from "@/types/sidebar"; // Import the type with the new name
import { useSidebarQuery } from "@/hooks/use-sidebar-query";
import { cn } from "@/lib/utils";
import { IconFileText } from "@tabler/icons-react";

interface DashboardSidebarProps {
    collapsed?: boolean;
    onCollapse?: (collapsed: boolean) => void;
    position?: "left" | "right";
    name?: string;

    sidebarContent?: SidebarContentType;
    onContentChange?: (content: SidebarContentType) => void;
    // Add these new props
    secondSidebarCollapsed?: boolean;
    onSecondSidebarCollapse?: (collapsed: boolean) => void;
}

export function DashboardSidebar5({
    collapsed,
    position,
    onCollapse,
    name = "dashboard-sidebar",
    sidebarContent,
    onContentChange,
    // Add these new props to the function parameters
    secondSidebarCollapsed,
    onSecondSidebarCollapse,
}: DashboardSidebarProps) {
    const pathname = usePathname();

    // Optional: Use Tanstack Query for state management
    // const { collapsed: queryCollapsed, setCollapsed } = useSidebarQuery(name);
    // const actualCollapsed = collapsed ?? queryCollapsed;
    // const handleCollapse = onCollapse ?? setCollapsed;

    // Add a function to toggle the second sidebar
    const toggleSecondSidebar = () => {
        if (onSecondSidebarCollapse) {
            onSecondSidebarCollapse(!secondSidebarCollapsed);
        }
    };

    return (
        <Sidebar
            name={name}
            position={position}
            collapsed={collapsed}
            onCollapse={onCollapse}
            sidebarContent={sidebarContent}
            onContentChange={onContentChange}
            className="pr-0"
            expandedWidth="w-48"
        >
            <SidebarHeader>
                <div
                    className={`font-semibold ${collapsed ? "hidden" : "block"}`}
                >
                    Dashboard
                </div>
            </SidebarHeader>
            <SidebarSeparator className={cn(collapsed ? "hidden" : "block")} />
            <SidebarContent>
                <SidebarNav>
                    <SidebarButton
                        href="/"
                        icon={<HomeIcon className="h-5 w-5" />}
                        active={pathname === "/"}
                    >
                        Home
                    </SidebarButton>
                    <SidebarButton
                        href="#"
                        icon={<LayoutDashboardIcon className="h-5 w-5" />}
                        active={pathname === "#"}
                    >
                        Dashboard
                    </SidebarButton>
                    {/* Add a new button to toggle the second sidebar */}
                    <SidebarButton
                        icon={<IconFileText className="h-5 w-5" />}
                        onClick={toggleSecondSidebar}
                        active={!secondSidebarCollapsed}
                    >
                        Edit
                    </SidebarButton>
                </SidebarNav>
                <SidebarSeparator />
            </SidebarContent>
        </Sidebar>
    );
}
