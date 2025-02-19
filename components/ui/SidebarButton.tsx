"use client";
import { Button } from "./button";
import { useSidebarStore } from "@/store/use-sidebar-store";
import { useIsMobile } from "@/hooks/use-mobile";
import React from "react";

type SidebarName = "app-sidebar" | "right-sidebar";

interface ButtonProps {
    children: React.ReactNode;
    sidebarName: SidebarName;
}

export default function SidebarButton({ children, sidebarName }: ButtonProps) {
    const toggleSidebar = useSidebarStore((state) => state.toggleSidebar);
    const setOpenMobile = useSidebarStore((state) => state.setOpenMobile);
    const isMobile = useIsMobile();
    const handleClick = () => {
        if (isMobile) {
            setOpenMobile(true);
        } else {
            toggleSidebar(sidebarName);
        }
    };
    return (
        <Button onClick={handleClick} variant="ghost" size="icon">
            {children}
        </Button>
    );
}
