"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import * as tabler from "@tabler/icons-react";
import { SidebarBaseProps, SidebarContentType } from "@/types/sidebar";

// Define theme options for the sidebar
export type SidebarTheme = "default" | "card";

// Define types for our sidebar context
type SidebarContextType = {
    collapsed: boolean;
    setCollapsed: (value: boolean) => void;
    name: string;
    variant: "default" | "hidden";
    collapsible: boolean; // Add collapsible to context
    position: "left" | "right";
    theme: SidebarTheme; // Add theme to context

    sidebarContent: SidebarContentType;
    setContent: (content: SidebarContentType) => void;
};

// Create a context for the sidebar
const SidebarContext = React.createContext<SidebarContextType | undefined>(
    undefined
);

// Add content to the sidebar props
interface SidebarProps
    extends React.HTMLAttributes<HTMLDivElement>,
        SidebarBaseProps {
    children: React.ReactNode;
    collapsible?: boolean; // Add new collapsible prop
    theme?: SidebarTheme; // Add theme prop
}

const SIDEBAR_COLLAPSED_PREFIX = "sidebar-collapsed";

// Helper function to get cookie name based on sidebar name
const getSidebarCookieName = (name?: string) => {
    return name
        ? `${SIDEBAR_COLLAPSED_PREFIX}-${name}`
        : SIDEBAR_COLLAPSED_PREFIX;
};

// Helper function to get cookie value
const getCookieValue = (name: string): string | undefined => {
    if (typeof document === "undefined") return undefined;

    const match = document.cookie.match(
        new RegExp("(^| )" + name + "=([^;]+)")
    );
    return match ? match[2] : undefined;
};

// Helper function to set cookie value
const setCookieValue = (name: string, value: string, days: number = 365) => {
    if (typeof document === "undefined") return;

    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    const expires = "; expires=" + date.toUTCString();
    document.cookie = name + "=" + value + expires + "; path=/";
};

export function useSidebar() {
    const context = React.useContext(SidebarContext);
    if (!context) {
        throw new Error("useSidebar must be used within a Sidebar component");
    }
    return context;
}

export function Sidebar({
    children,
    className,
    collapsed: controlledCollapsed,
    onCollapse,
    position = "left",
    defaultCollapsed = false,
    name = "default",
    variant = "default",
    theme = "default", // Add theme prop with default value
    collapsible = true, // Default to true for backward compatibility
    sidebarContent: controlledContent,
    onContentChange,
    ...props
}: SidebarProps) {
    const cookieName = getSidebarCookieName(name);

    // Initialize with defaultCollapsed
    const [internalCollapsed, setInternalCollapsed] =
        React.useState(defaultCollapsed);

    // State for content
    const [internalContent, setInternalContent] =
        React.useState<SidebarContentType>(controlledContent || null);

    // Only update from cookie if there is a cookie value and sidebar is collapsible
    React.useEffect(() => {
        if (collapsible) {
            const cookieValue = getCookieValue(cookieName);
            if (cookieValue !== undefined) {
                setInternalCollapsed(cookieValue === "true");
            }
        }
    }, [cookieName, collapsible]);

    // Update internal content when controlled content changes
    React.useEffect(() => {
        if (controlledContent !== undefined) {
            setInternalContent(controlledContent);
        }
    }, [controlledContent]);

    const collapsed = controlledCollapsed ?? internalCollapsed;

    const handleCollapse = (newValue: boolean) => {
        // Only allow collapsing if the sidebar is collapsible
        if (collapsible) {
            setInternalCollapsed(newValue);
            // Save to cookie
            setCookieValue(cookieName, String(newValue));
            onCollapse?.(newValue);
        }
    };

    const handleContentChange = (newContent: SidebarContentType) => {
        setInternalContent(newContent);
        onContentChange?.(newContent);
    };
    return (
        <SidebarContext.Provider
            value={{
                collapsed,
                setCollapsed: handleCollapse,
                name,
                variant,
                collapsible, // Add collapsible to context
                sidebarContent: internalContent,
                setContent: handleContentChange,
                position,
                theme, // Add theme to context
            }}
        >
            <aside
                className={cn(
                    "relative flex h-full flex-none flex-col overflow-x-hidden transition-all duration-300 ease-in-out",
                    variant === "default"
                        ? collapsed
                            ? "w-16"
                            : "w-64"
                        : collapsed
                          ? "w-0"
                          : "w-64",
                    position === "right" ? "border-l" : "border-r",
                    variant === "hidden" && collapsed && "border-0",
                    theme === "default" && "",
                    theme === "card" && "border-none p-2",
                    theme === "card" && position === "left" && "pr-0",
                    theme === "card" && position === "right" && "pl-0",
                    className
                )}
                {...props}
            >
                <div
                    className={cn(
                        "flex h-full flex-col overflow-y-auto overflow-x-hidden bg-sidebar p-2",
                        theme === "card" && "rounded-md border"
                    )}
                >
                    {children}
                </div>
            </aside>
        </SidebarContext.Provider>
    );
}

export function SidebarHeader({
    children,
    className,
    position = "left",
    ...props
}: Omit<
    SidebarProps,
    | "collapsed"
    | "onCollapse"
    | "defaultCollapsed"
    | "name"
    | "variant"
    | "sidebarContent"
    | "onContentChange"
    | "collapsible"
>) {
    const { collapsed, setCollapsed, collapsible } = useSidebar();

    const handleCollapse = () => {
        setCollapsed(!collapsed);
    };

    return (
        <div
            className={cn(
                "flex w-full justify-between gap-1",
                collapsed
                    ? "flex-col-reverse items-center"
                    : "flex-row items-center",
                className
            )}
            {...props}
        >
            {children}
            {collapsible && (
                <Button
                    variant="ghost"
                    size="icon"
                    className={cn("h-8 w-8 border hover:bg-sidebar-accent")}
                    onClick={handleCollapse}
                >
                    {position === "left" ? (
                        collapsed ? (
                            <tabler.IconLayoutSidebarLeftExpandFilled className="h-4 w-4" />
                        ) : (
                            <tabler.IconLayoutSidebarLeftCollapseFilled className="h-4 w-4" />
                        )
                    ) : collapsed ? (
                        <tabler.IconLayoutSidebarRightExpandFilled className="h-4 w-4" />
                    ) : (
                        <tabler.IconLayoutSidebarRightCollapseFilled className="h-4 w-4" />
                    )}
                </Button>
            )}
        </div>
    );
}

export function SidebarContent({
    children,
    className,
    ...props
}: Omit<
    SidebarProps,
    | "collapsed"
    | "onCollapse"
    | "defaultCollapsed"
    | "name"
    | "variant"
    | "sidebarContent"
    | "onContentChange"
>) {
    return (
        <div className={cn("flex-1 overflow-auto", className)} {...props}>
            {children}
        </div>
    );
}

// Simple SidebarButton component based on the styles from sidebar-nav.tsx
interface SidebarButtonProps
    extends React.ComponentPropsWithoutRef<typeof Button> {
    href?: string;
    icon?: React.ReactNode;
    active?: boolean;
}

export function SidebarButton({
    href,
    icon,
    active = false,
    children,
    className,
    ...props
}: SidebarButtonProps) {
    const { collapsed } = useSidebar();

    const buttonContent = (
        <>
            {icon}
            {!collapsed && <span className="ml-2">{children}</span>}
        </>
    );

    return (
        <Button
            variant={active ? "secondary" : "ghost"}
            size={collapsed ? "icon" : "default"}
            className={cn(
                "w-full justify-start hover:bg-sidebar-accent",
                collapsed
                    ? "flex h-8 w-8 items-center justify-center p-1"
                    : "justify-start px-4",
                className
            )}
            asChild={!!href}
            {...props}
        >
            {href ? <Link href={href}>{buttonContent}</Link> : buttonContent}
        </Button>
    );
}

// Simple container for sidebar buttons
interface SidebarGroupWithLabelProps
    extends React.HTMLAttributes<HTMLDivElement> {
    label: string;
    children: React.ReactNode;
}

// Add this component after the existing SidebarGroup component
// Keep the existing SidebarGroup component but modify it to be a container
export function SidebarGroup({
    children,
    className,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            className={cn("flex w-full flex-col gap-0.5 py-2", className)}
            {...props}
        >
            {children}
        </div>
    );
}

// Add a SidebarGroupHeader component to contain the label and action
export function SidebarGroupHeader({
    children,
    className,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) {
    const { collapsed } = useSidebar();

    if (collapsed) return null;

    return (
        <div className={cn("flex items-center", className)} {...props}>
            {children}
        </div>
    );
}

// Add a SidebarGroupLabel component
export function SidebarGroupLabel({
    children,
    className,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <span
            className={cn(
                "text-sm font-medium text-muted-foreground",
                className
            )}
            {...props}
        >
            {children}
        </span>
    );
}

// Add a SidebarGroupAction component
export function SidebarGroupAction({
    children,
    className,
    onClick,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <Button
            variant="ghost"
            size="icon"
            className={cn(
                "ml-auto flex h-8 w-8 items-center justify-center p-1",
                className
            )}
            onClick={() => onClick}
        >
            {children}
        </Button>
    );
}

// Add a SidebarGroupContent component for the navigation items
export function SidebarGroupContent({
    children,
    className,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <nav
            className={cn("flex flex-col items-center gap-0.5 py-1", className)}
            {...props}
        >
            {children}
        </nav>
    );
}
export function SidebarNav({
    children,
    className,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <nav
            className={cn("flex flex-col items-center gap-0.5", className)}
            {...props}
        >
            {children}
        </nav>
    );
}

// Sidebar Separator
export function SidebarSeparator({
    className,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            className={cn("my-2 h-px w-full bg-border", className)}
            {...props}
        />
    );
}

// New component to render dynamic content
interface SidebarDynamicContentProps {
    renderContent: (content: SidebarContentType) => React.ReactNode;
    fallback?: React.ReactNode;
}

export function SidebarDynamicContent({
    renderContent,
    fallback,
}: SidebarDynamicContentProps) {
    const { sidebarContent } = useSidebar();
    if (!sidebarContent && fallback) {
        return <>{fallback}</>;
    }
    return <>{sidebarContent ? renderContent(sidebarContent) : null}</>;
}
