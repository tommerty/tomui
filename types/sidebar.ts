import { ReactNode } from "react";

// Define the base content type
export interface SidebarContentBase {
    type: string;
    id: string | number;
    title: string;
}

// Activity-specific content type
export interface ActivityContent extends SidebarContentBase {
    type: "activity";
    date: string;
    status: string;
    description: string;
    relatedItems: string[];
}

// You can add more content types as needed
export interface UserContent extends SidebarContentBase {
    type: "user";
    name: string;
    email: string;
    role: string;
}

// Rename SidebarContent type to SidebarContentType
export type SidebarContentType = ActivityContent | UserContent | null;

// Sidebar state type
export interface SidebarState {
    collapsed: boolean;
    content: SidebarContentType;
}

// Define sidebar props separately from HTML attributes
export interface SidebarBaseProps {
    collapsed?: boolean;
    onCollapse?: (collapsed: boolean) => void;
    position?: "left" | "right";
    defaultCollapsed?: boolean;
    name?: string;
    variant?: "default" | "hidden";

    sidebarContent?: SidebarContentType;
    onContentChange?: (content: SidebarContentType) => void;
}
