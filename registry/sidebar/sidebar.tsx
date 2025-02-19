"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

const SIDEBAR_COOKIE_NAME = "sidebar:state";
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;
const SIDEBAR_WIDTH = "16rem";
const SIDEBAR_WIDTH_MOBILE = "60vw";
const SIDEBAR_WIDTH_ICON = "3rem";
const SIDEBAR_KEYBOARD_SHORTCUT = "b";
type SidebarContext = {
    state: "expanded" | "collapsed";
    open: boolean;
    setOpen: (open: boolean) => void;
    openMobile: boolean;
    setOpenMobile: (open: boolean) => void;
    isMobile: boolean;
    toggleSidebar: () => void;
    // setGlobalOpen: (open: boolean) => void;
};

const SidebarContext = React.createContext<SidebarContext | null>(null);

export function useSidebar() {
    const context = React.useContext(SidebarContext);
    if (!context)
        throw new Error("useSidebar must be used within SidebarProvider");
    return context;
}

export const SidebarProvider = React.forwardRef<
    HTMLDivElement,
    React.ComponentProps<"div"> & {
        defaultOpen?: boolean;
        open?: boolean;
        onOpenChange?: (open: boolean) => void;
        name?: string;
    }
>(
    (
        {
            defaultOpen = true,
            open: openProp,
            onOpenChange: setOpenProp,
            className,
            style,
            children,
            name,
            ...props
        },
        ref
    ) => {
        const isMobile = useIsMobile();
        const [openMobile, setOpenMobile] = React.useState(false);
        React.useEffect(() => {
            if (isMobile) {
                document.cookie = `sidebar:main:state=true; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`;
            }
        }, [isMobile, name]);
        // This is the internal state of the sidebar.
        // We use openProp and setOpenProp for control from outside the component.
        const [_open, _setOpen] = React.useState(defaultOpen);
        const open = openProp ?? _open;
        const setOpen = React.useCallback(
            (value: boolean | ((value: boolean) => boolean)) => {
                const newValue =
                    typeof value === "function" ? value(open) : value;

                // Set cookie to true if isMobile, otherwise use newValue
                const cookieValue = isMobile ? true : newValue;
                document.cookie = `sidebar:${name}:state=${cookieValue}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`;

                if (setOpenProp) {
                    return setOpenProp(newValue);
                }
                _setOpen(newValue);
            },
            [setOpenProp, open, name, isMobile]
        );

        // Helper to toggle the sidebar.
        const toggleSidebar = React.useCallback(() => {
            return isMobile
                ? setOpenMobile((open) => !open)
                : setOpen((open) => !open);
        }, [isMobile, setOpen, setOpenMobile]);

        // Helper to toggle the sidebar.
        // const setGlobalOpen = React.useCallback(
        //     (value: boolean | ((value: boolean) => boolean)) => {
        //         setOpenMobile(value);
        //         setOpen(value);
        //         return;
        //     },
        //     [isMobile, setOpen, setOpenMobile]
        // );
        // Adds a keyboard shortcut to toggle the sidebar.
        React.useEffect(() => {
            const handleKeyDown = (event: KeyboardEvent) => {
                if (
                    event.key === SIDEBAR_KEYBOARD_SHORTCUT &&
                    (event.metaKey || event.ctrlKey)
                ) {
                    event.preventDefault();
                    toggleSidebar();
                }
            };

            window.addEventListener("keydown", handleKeyDown);
            return () => window.removeEventListener("keydown", handleKeyDown);
        }, [toggleSidebar]);

        // We add a state so that we can do data-state="expanded" or "collapsed".
        // This makes it easier to style the sidebar with Tailwind classes.
        const state = open ? "expanded" : "collapsed";

        const contextValue = React.useMemo<SidebarContext>(
            () => ({
                state,
                open,
                setOpen,
                isMobile,
                openMobile,
                setOpenMobile,
                toggleSidebar,
                // setGlobalOpen,
            }),
            [
                state,
                open,
                setOpen,
                isMobile,
                openMobile,
                setOpenMobile,
                toggleSidebar,
            ]
        );

        return (
            <SidebarContext.Provider value={contextValue}>
                <div
                    ref={ref}
                    className={cn("group/sidebar flex", className)}
                    style={
                        {
                            "--sidebar-width": SIDEBAR_WIDTH,
                            "--sidebar-width-icon": SIDEBAR_WIDTH_ICON,
                            ...style,
                        } as React.CSSProperties
                    }
                >
                    {children}
                </div>
            </SidebarContext.Provider>
        );
    }
);

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
    side?: "left" | "right";
    collapsible?: "icon" | "offcanvas" | "none";
    variant?: "default" | "floating" | "inset";
}

export const Sidebar = React.forwardRef<
    HTMLDivElement,
    React.ComponentProps<"div"> & {
        side?: "left" | "right";
        variant?: "sidebar" | "floating" | "inset" | "primary";
        collapsible?: "offcanvas" | "icon" | "none";
        absolute?: boolean;
        subClassName?: string;
    }
>(
    (
        {
            side = "left",
            variant = "sidebar",
            collapsible = "offcanvas",
            className,
            children,
            subClassName,
            absolute = false,
            ...props
        },
        ref
    ) => {
        const { isMobile, state, openMobile, setOpenMobile } = useSidebar();

        if (collapsible === "none") {
            return (
                <div
                    className={cn(
                        "flex h-full w-[--sidebar-width] flex-col bg-sidebar text-sidebar-foreground",
                        className
                    )}
                    ref={ref}
                    {...props}
                >
                    {children}
                </div>
            );
        }

        if (isMobile) {
            return (
                <Sheet
                    open={openMobile}
                    onOpenChange={setOpenMobile}
                    {...props}
                >
                    <SheetContent
                        data-sidebar="sidebar"
                        data-mobile="true"
                        className="w-[--sidebar-width] bg-sidebar p-0 text-sidebar-foreground [&>button]:hidden"
                        style={
                            {
                                "--sidebar-width": SIDEBAR_WIDTH_MOBILE,
                            } as React.CSSProperties
                        }
                        side={side}
                    >
                        <div className="flex h-full w-full flex-col">
                            {children}
                        </div>
                    </SheetContent>
                </Sheet>
            );
        }

        return (
            <div
                ref={ref}
                className="group peer relative hidden md:block"
                data-state={state}
                data-collapsible={state === "collapsed" ? collapsible : ""}
                data-variant={variant}
                data-side={side}
            >
                {/* This is what handles the sidebar gap on desktop */}
                <div
                    className={cn(
                        "relative w-[--sidebar-width] bg-transparent transition-[width] duration-200 ease-in-out",
                        "group-data-[collapsible=offcanvas]:w-0",
                        "group-data-[side=right]:rotate-180",
                        variant === "floating" ||
                            variant === "primary" ||
                            variant === "inset"
                            ? "group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)_+_theme(spacing.0))]"
                            : "group-data-[collapsible=icon]:w-[--sidebar-width-icon]"
                    )}
                />
                <div
                    className={cn(
                        "inset-y-0 z-10 hidden w-[--sidebar-width] transition-[left,right,width] duration-200 ease-in-out md:flex",
                        side === "left"
                            ? "left-0 group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]"
                            : "right-0 group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]",
                        // Adjust the padding for floating and inset variants.
                        variant === "floating" || variant === "inset"
                            ? "p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)_+_theme(spacing.0)_+0px)]"
                            : variant === "primary"
                              ? "py-2 group-data-[collapsible=icon]:w-[--sidebar-width-icon]"
                              : "group-data-[collapsible=icon]:w-[--sidebar-width-icon] group-data-[side=left]:border-r group-data-[side=right]:border-l",
                        absolute ? "absolute" : "fixed",
                        className
                    )}
                    {...props}
                >
                    <div
                        data-sidebar="sidebar"
                        className={cn(
                            "flex h-full w-full flex-col bg-sidebar group-data-[variant=floating]:rounded-lg group-data-[variant=primary]:rounded-r-lg group-data-[variant=floating]:border group-data-[variant=primary]:border group-data-[variant=primary]:border-l-0 group-data-[variant=floating]:border-sidebar-border group-data-[variant=primary]:border-sidebar-border group-data-[variant=floating]:shadow group-data-[variant=primary]:shadow",

                            absolute && variant === "floating" && "bg-popover",
                            subClassName
                        )}
                    >
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

export const SidebarGroup = React.forwardRef<
    HTMLDivElement,
    React.ComponentProps<"div">
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        data-sidebar="group"
        className={cn("relative flex w-full min-w-0 flex-col p-2", className)}
        {...props}
    />
));
SidebarGroup.displayName = "SidebarGroup";

export const SidebarGroupLabel = React.forwardRef<
    HTMLDivElement,
    React.ComponentProps<"div"> & { asChild?: boolean }
>(({ className, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "div";
    return (
        <Comp
            ref={ref}
            data-sidebar="group-label"
            className={cn(
                "flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-medium text-sidebar-foreground/70 outline-none ring-sidebar-ring transition-[margin,opa] duration-200 ease-in-out focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
                "group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0",
                className
            )}
            {...props}
        />
    );
});
SidebarGroupLabel.displayName = "SidebarGroupLabel";

export const SidebarGroupContent = React.forwardRef<
    HTMLDivElement,
    React.ComponentProps<"div">
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        data-sidebar="group-content"
        className={cn("w-full text-sm", className)}
        {...props}
    />
));
SidebarGroupContent.displayName = "SidebarGroupContent";
