"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

type SidebarContext = {
    open: boolean;
    isMobile: boolean;
    toggleSidebar: () => void;
    setOpen: (open: boolean) => void;
};

const SidebarContext = React.createContext<SidebarContext | null>(null);

export function useSidebar() {
    const context = React.useContext(SidebarContext);
    if (!context)
        throw new Error("useSidebar must be used within SidebarProvider");
    return context;
}

interface SidebarProviderProps {
    children: React.ReactNode;
    defaultOpen?: boolean;
    name?: string;
    className?: string;
}

export function SidebarProvider({
    children,
    defaultOpen = true,
    name,
    className,
}: SidebarProviderProps) {
    const isMobile = useIsMobile();
    const [open, setOpen] = React.useState(defaultOpen);

    const toggleSidebar = React.useCallback(() => {
        setOpen((prev) => !prev);
    }, []);

    const value = React.useMemo(
        () => ({
            open,
            isMobile,
            toggleSidebar,
            setOpen,
        }),
        [open, isMobile, toggleSidebar]
    );

    return (
        <SidebarContext.Provider value={value}>
            <div className={cn("group/sidebar flex", className)}>
                {children}
            </div>
        </SidebarContext.Provider>
    );
}

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
    side?: "left" | "right";
    collapsible?: "icon" | "offcanvas" | "none";
    variant?: "default" | "floating" | "inset";
}

export const Sidebar = React.forwardRef<HTMLDivElement, SidebarProps>(
    (
        {
            className,
            children,
            side = "left",
            collapsible = "offcanvas",
            variant = "default",
            ...props
        },
        ref
    ) => {
        const containerRef = React.useRef<HTMLDivElement>(null);
        const [maxHeight, setMaxHeight] = React.useState<number | undefined>();

        React.useEffect(() => {
            const container = containerRef.current;
            if (!container) return;

            const resizeObserver = new ResizeObserver((entries) => {
                const entry = entries[0];
                if (entry) {
                    const viewportHeight = window.innerHeight;
                    const containerTop =
                        entry.target.getBoundingClientRect().top;
                    const availableHeight = viewportHeight - containerTop - 16; // 16px buffer
                    setMaxHeight(availableHeight);
                }
            });

            resizeObserver.observe(container);
            return () => resizeObserver.disconnect();
        }, []);
        const { isMobile, open } = useSidebar();

        if (isMobile) {
            return (
                <Sheet open={open}>
                    <SheetContent side={side} className="p-0">
                        {children}
                    </SheetContent>
                </Sheet>
            );
        }

        return (
            <div
                ref={containerRef}
                className={cn(
                    "group peer relative hidden md:block",
                    variant === "floating" && "p-2",
                    "group-data-[collapsible=icon]:w-[--sidebar-width-icon]"
                )}
                data-state={open ? "open" : "closed"}
            >
                {/* This handles the sidebar gap */}
                <div
                    className={cn(
                        "relative w-[--sidebar-width] bg-transparent transition-[width] duration-200 ease-in-out",
                        "group-data-[collapsible=offcanvas]:w-0",
                        variant === "floating" &&
                            "group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)_+_theme(spacing.0))]",
                        "group-data-[collapsible=icon]:w-[--sidebar-width-icon]"
                    )}
                />

                <div
                    ref={ref}
                    data-state={open ? "open" : "closed"}
                    data-side={side}
                    data-collapsible={collapsible}
                    // style={{
                    //     maxHeight:
                    //         variant === "nested" && maxHeight
                    //             ? `${maxHeight}px`
                    //             : undefined,
                    // }}
                    className={cn(
                        "flex h-full w-64 flex-col transition-all duration-200",
                        collapsible === "icon" && !open && "w-16",
                        variant === "floating" &&
                            "rounded-lg border p-2 shadow-lg",

                        variant === "inset" && "",
                        className
                    )}
                    {...props}
                >
                    <div className="flex h-full w-full flex-col rounded-lg bg-background">
                        {children}
                    </div>
                </div>
            </div>
        );
    }
);
Sidebar.displayName = "Sidebar";

export const SidebarHeader = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div ref={ref} className={cn("px-4", className)} {...props} />
));
SidebarHeader.displayName = "SidebarHeader";

export const SidebarContent = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn("flex-1 overflow-auto px-4", className)}
        {...props}
    />
));
SidebarContent.displayName = "SidebarContent";

export const SidebarMenu = React.forwardRef<
    HTMLUListElement,
    React.HTMLAttributes<HTMLUListElement>
>(({ className, ...props }, ref) => (
    <ul ref={ref} className={cn("flex flex-col gap-1", className)} {...props} />
));
SidebarMenu.displayName = "SidebarMenu";

export const SidebarMenuItem = React.forwardRef<
    HTMLLIElement,
    React.HTMLAttributes<HTMLLIElement>
>(({ className, ...props }, ref) => (
    <li ref={ref} className={cn("relative", className)} {...props} />
));
SidebarMenuItem.displayName = "SidebarMenuItem";

interface SidebarMenuButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    asChild?: boolean;
    size?: "default" | "sm" | "lg";
    isActive?: boolean;
}

export const SidebarMenuButton = React.forwardRef<
    HTMLButtonElement,
    SidebarMenuButtonProps
>(
    (
        { className, asChild = false, size = "default", isActive, ...props },
        ref
    ) => {
        const Comp = asChild ? Slot : "button";
        const { open } = useSidebar();

        return (
            <Comp
                ref={ref}
                data-size={size}
                data-active={isActive}
                className={cn(
                    "flex w-full items-center gap-2 rounded-md p-2 text-sm outline-none transition-colors",
                    "hover:bg-accent hover:text-accent-foreground",
                    "focus-visible:bg-accent focus-visible:text-accent-foreground",
                    isActive && "bg-accent text-accent-foreground",
                    size === "sm" && "text-xs",
                    size === "lg" && "p-3",
                    !open && "justify-center",
                    className
                )}
                {...props}
            />
        );
    }
);
SidebarMenuButton.displayName = "SidebarMenuButton";

export const SidebarInset = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex-1", className)} {...props} />
));
SidebarInset.displayName = "SidebarInset";
