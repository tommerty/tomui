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

export function DashboardSidebar6({
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
            theme="card"
            className="sticky top-12 max-h-[30dvh]"
            expandedWidth="w-48"
        >
            <SidebarHeader>
                <div className={`flex items-center gap-1 font-semibold`}>
                    <IconFileText size={18} />
                    Sticky
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
                </SidebarNav>
                <SidebarSeparator />
            </SidebarContent>
        </Sidebar>
    );
}
