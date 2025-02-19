"use client";
import { Button } from "./button";
import { useSidebarStore } from "@/store/use-sidebar-store";

type SidebarName = "app-sidebar" | "left-sidebar" | "right-sidebar";

interface ButtonProps {
    children: React.ReactNode;
    sidebarName: SidebarName;
}

export default function SidebarButton({ children, sidebarName }: ButtonProps) {
    const toggleSidebar = useSidebarStore((state) => state.toggleSidebar);

    return (
        <Button
            onClick={() => toggleSidebar(sidebarName)}
            variant="ghost"
            size="icon"
        >
            {children}
        </Button>
    );
}
