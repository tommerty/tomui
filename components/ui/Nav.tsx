"use client";

import {
    IconBrandGithub,
    IconLayoutNavbarExpand,
    IconLayoutSidebarLeftExpand,
    IconMenu,
    IconSearch,
} from "@tabler/icons-react";
import SidebarButton from "./SidebarButton";
import { Input } from "./input";
import React from "react";
import Search from "../Search";
import { Button } from "./button";
import { useIsMobile } from "@/hooks/use-mobile";
import { SidebarMenuButton } from "../complex-sidebar/complex-sidebar";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useSidebarStore } from "@/store/use-sidebar-store";
import { Breadcrumbs } from "./Breadcrumbs";
import { components } from "@/lib/items";

export default function Nav() {
    const [searchOpen, setSearchOpen] = React.useState(false);
    const isMobile = useIsMobile();
    const router = useRouter();
    const pathname = usePathname();
    const isOpen = useSidebarStore(
        (state) => state.sidebarStates["app-sidebar"]
    );
    const currentComponent = pathname.startsWith("/component/")
        ? components.find((c) => c.code === pathname.split("/").pop())
        : undefined;

    return (
        <header className="flex w-full items-center gap-2 rounded-md border bg-background/20 p-2 backdrop-blur">
            <Search open={searchOpen} onOpenChange={setSearchOpen} />
            {isMobile == false ? (
                <SidebarButton sidebarName="app-sidebar">
                    <IconLayoutSidebarLeftExpand
                        className={cn(
                            "transition-all duration-300",
                            isOpen ? "rotate-180" : "rotate-0"
                        )}
                    />
                </SidebarButton>
            ) : (
                <div className="flex items-center gap-2">
                    <Button
                        variant={"outline"}
                        onClick={() => router.push("/")}
                    >
                        <img
                            src="https://cdn.doras.to/doras/assets/83bda65b-8d42-4011-9bf0-ab23402776f2/b81da5ac-e5be-45c1-b9b1-80b4f51e83af.png"
                            alt="TomUI"
                            className="size-4"
                        />
                        TomUI
                    </Button>
                    <Button
                        variant={"outline"}
                        className="!h-9 !w-9"
                        onClick={() => setSearchOpen(true)}
                    >
                        <IconMenu />
                    </Button>
                </div>
            )}
            <Button
                variant={"outline"}
                onClick={() => router.push("/")}
                className={cn(isOpen && "hidden")}
            >
                <img
                    src="https://cdn.doras.to/doras/assets/83bda65b-8d42-4011-9bf0-ab23402776f2/b81da5ac-e5be-45c1-b9b1-80b4f51e83af.png"
                    alt="TomUI"
                    className="size-4"
                />
                TomUI
            </Button>
            <Breadcrumbs component={currentComponent} />

            <div className="ml-auto flex items-center gap-2">
                <Button
                    variant={"outline"}
                    className="hidden w-full items-center justify-normal gap-2 pl-2 pr-12 text-muted-foreground md:flex"
                    onClick={() => setSearchOpen(true)}
                >
                    <IconSearch />
                    Search...
                </Button>
                <Button variant={"outline"} className="!h-9 !w-9">
                    <IconBrandGithub />
                </Button>
            </div>
        </header>
    );
}
