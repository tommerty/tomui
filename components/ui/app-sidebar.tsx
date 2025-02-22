"use client";
import * as React from "react";

// import { SearchForm } from "@/components/search-form"
// import { VersionSwitcher } from "@/components/version-switcher"
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubItem,
    SidebarProvider,
    SidebarSeparator,
    useSidebar,
} from "@/components/complex-sidebar/complex-sidebar";
import { IconCode, IconLayoutNavbarExpand } from "@tabler/icons-react";
import { components } from "@/lib/items";
import { useRouter, usePathname } from "next/navigation";
import * as tabler from "@tabler/icons-react";
import Search from "../Search";
import { useSidebarStore } from "@/store/use-sidebar-store";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import {
    AdaptiveModal,
    AdaptiveModalContent,
    AdaptiveModalDescription,
    AdaptiveModalFooter,
    AdaptiveModalHeader,
    AdaptiveModalTitle,
    AdaptiveModalTrigger,
} from "@/registry/adaptive-modal/components/adaptive-modal";
import { Button } from "./button";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const router = useRouter();
    const pathname = usePathname();
    const [searchOpen, setSearchOpen] = React.useState(false);
    const isOpen = useSidebarStore(
        (state) => state.sidebarStates["app-sidebar"]
    );
    const openMobile = useSidebarStore((state) => state.openMobile);
    const setOpenMobile = useSidebarStore((state) => state.setOpenMobile);
    const isMobile = useIsMobile();

    const groupedComponents = components.reduce(
        (acc, item) => {
            if (!acc[item.group]) {
                acc[item.group] = [];
            }
            acc[item.group].push(item);
            return acc;
        },
        {} as Record<string, typeof components>
    );

    return (
        <SidebarProvider open={isOpen} name="app-sidebar">
            <Sidebar {...props} variant="floating" className="h-fit max-h-dvh">
                <SidebarHeader>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <SidebarMenuButton
                                isActive={pathname === "/"}
                                onClick={() => router.push("/")}
                            >
                                <img
                                    src="https://cdn.doras.to/doras/assets/83bda65b-8d42-4011-9bf0-ab23402776f2/b81da5ac-e5be-45c1-b9b1-80b4f51e83af.png"
                                    alt="TomUI"
                                    className="size-4"
                                />
                                TomUI
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                        {isMobile == true && (
                            <SidebarMenuItem
                                onClick={() => setSearchOpen(true)}
                            >
                                <SidebarMenuButton>
                                    {/* @ts-ignore */}
                                    <tabler.IconSearch />
                                    Search...
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        )}
                        <Search
                            open={searchOpen}
                            onOpenChange={setSearchOpen}
                        />
                    </SidebarMenu>
                </SidebarHeader>
                <SidebarContent className="md:max-h-[50dvh]">
                    {/* {data.navMain.map((item) => ( */}
                    <SidebarGroup>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                <SidebarMenuItem>
                                    <SidebarMenuButton
                                        asChild
                                        isActive={pathname === `/component`}
                                    >
                                        <a href={`/component`}>
                                            <IconLayoutNavbarExpand />
                                            Components
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                                {Object.entries(groupedComponents).map(
                                    ([groupName, items]) => (
                                        <Collapsible
                                            key={groupName}
                                            defaultOpen={items.some(
                                                (item) =>
                                                    pathname ===
                                                    `/component/${item.code}`
                                            )}
                                            className="group/collapsible transition-all duration-200"
                                        >
                                            <SidebarMenuItem>
                                                <CollapsibleTrigger asChild>
                                                    <SidebarMenuButton
                                                        className={cn(
                                                            "transition-all duration-200",
                                                            items.some(
                                                                (item) =>
                                                                    pathname ===
                                                                    `/component/${item.code}`
                                                            ) &&
                                                                "text-sidebar-foreground group-data-[state=closed]/collapsible:bg-sidebar-accent"
                                                        )}
                                                    >
                                                        <tabler.IconChevronDown className="transition-all duration-200 group-data-[state=closed]/collapsible:-rotate-90" />
                                                        {groupName}
                                                    </SidebarMenuButton>
                                                </CollapsibleTrigger>
                                                <CollapsibleContent className="transition-all duration-200">
                                                    <SidebarMenuSub>
                                                        {items.map((item) => {
                                                            const Icon =
                                                                tabler[
                                                                    item
                                                                        .iconName
                                                                ];
                                                            return (
                                                                <SidebarMenuSubItem
                                                                    key={
                                                                        item.title
                                                                    }
                                                                >
                                                                    <SidebarMenuButton
                                                                        onClick={() =>
                                                                            router.push(
                                                                                `/component/${item.code}`
                                                                            )
                                                                        }
                                                                        asChild
                                                                        isActive={
                                                                            pathname ===
                                                                            `/component/${item.code}`
                                                                        }
                                                                    >
                                                                        <div className="cursor-pointer">
                                                                            {/* @ts-ignore */}
                                                                            <Icon />
                                                                            {
                                                                                item.title
                                                                            }
                                                                        </div>
                                                                    </SidebarMenuButton>
                                                                </SidebarMenuSubItem>
                                                            );
                                                        })}
                                                    </SidebarMenuSub>
                                                </CollapsibleContent>
                                            </SidebarMenuItem>
                                        </Collapsible>
                                    )
                                )}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                    {/* ))} */}
                    <SidebarSeparator />
                </SidebarContent>
                <SidebarFooter>
                    <SidebarMenu className="rounded-md border-sidebar-border bg-sidebar-accent p-2">
                        <SidebarMenuItem
                            onClick={() => router.push("https://doras.to")}
                        >
                            <div className="cursor-pointer p-3">
                                <p className="text-xs text-sidebar-accent-foreground">
                                    Powered by
                                </p>
                                <p className="text-sm font-bold text-sidebar-accent-foreground">
                                    Doras.to
                                </p>
                                <p className="pt-3 text-xs text-sidebar-accent-foreground">
                                    The ultimate tool for any content creator
                                </p>
                            </div>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                            <AdaptiveModal variant="dialog">
                                <AdaptiveModalTrigger>
                                    <SidebarMenuButton className="bg-sidebar text-sidebar-foreground hover:bg-sidebar/70">
                                        Learn More
                                    </SidebarMenuButton>
                                </AdaptiveModalTrigger>
                                <AdaptiveModalContent>
                                    <AdaptiveModalHeader>
                                        <AdaptiveModalTitle>
                                            Doras.to
                                        </AdaptiveModalTitle>
                                    </AdaptiveModalHeader>
                                    <div className="space-y-2">
                                        <p>
                                            tommerty/ui is built be the
                                            co-founder and frontend developer of
                                            Doras.to.
                                        </p>
                                        <p>
                                            The purpose of tommerty/ui is to
                                            provide a set of accessible,
                                            customizable, and easy-to-use
                                            components that can be used to build
                                            our website.
                                        </p>
                                        <p>
                                            We open source what we can, and this
                                            UI library is part of that. You can
                                            feel free to use this in your own
                                            projects.
                                        </p>
                                    </div>
                                    <Button
                                        className="ml-auto w-fit"
                                        onClick={() =>
                                            router.push(
                                                "https://doras.to?ref=tomui"
                                            )
                                        }
                                    >
                                        Check out Doras.to
                                    </Button>
                                </AdaptiveModalContent>
                            </AdaptiveModal>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarFooter>
            </Sidebar>
        </SidebarProvider>
    );
}
