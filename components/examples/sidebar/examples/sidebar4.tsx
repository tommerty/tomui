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
import { Input } from "@/components/ui/input";
import { IconFileText, IconPencil } from "@tabler/icons-react";
import DummyForm1 from "./dummyform";

interface DashboardSidebarProps {
    collapsed?: boolean;
    onCollapse?: (collapsed: boolean) => void;
    position?: "left" | "right";
    name?: string;

    sidebarContent?: SidebarContentType;
    onContentChange?: (content: SidebarContentType) => void;
}

export function DashboardSidebar4({
    collapsed,
    position,
    onCollapse,
    name = "dashboard-sidebar-sub-2",
    sidebarContent,
    onContentChange,
}: DashboardSidebarProps) {
    const pathname = usePathname();

    // Optional: Use Tanstack Query for state management
    // const { collapsed: queryCollapsed, setCollapsed } = useSidebarQuery(name);
    // const actualCollapsed = collapsed ?? queryCollapsed;
    // const handleCollapse = onCollapse ?? setCollapsed;

    return (
        <Sidebar
            name={name}
            position={position}
            collapsed={collapsed}
            onCollapse={onCollapse}
            sidebarContent={sidebarContent}
            onContentChange={onContentChange}
            variant="hidden"
            theme="card"
            className="pl-0"
            expandedWidth="w-48"
        >
            <SidebarHeader>
                <div
                    className={`flex items-center gap-1 font-semibold ${collapsed ? "hidden" : "block"}`}
                >
                    <IconFileText size={18} />
                    Content
                </div>
            </SidebarHeader>
            <SidebarSeparator className={cn(collapsed ? "hidden" : "block")} />
            <SidebarContent>
                <SidebarNav>
                    <DummyForm1 />
                </SidebarNav>
                <SidebarSeparator />
            </SidebarContent>
        </Sidebar>
    );
}
