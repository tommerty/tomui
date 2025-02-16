"use client";

import {
    SidebarGroupLabel,
    SidebarInput,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarTrigger,
} from "@/components/complex-sidebar/complex-sidebar";
import { SheetTrigger } from "./ui/sheet";
import * as tabler from "@tabler/icons-react";
import { useRouter, usePathname } from "next/navigation";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "./ui/drawer";
import { Button } from "./ui/button";
import { IconMenu2 } from "@tabler/icons-react";
import { components } from "@/lib/items";
import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
} from "./ui/command";
import {
    Calculator,
    Calendar,
    CreditCard,
    Settings,
    Smile,
    User,
} from "lucide-react";
import React from "react";
import { DialogTitle } from "@radix-ui/react-dialog";
import Search from "./Search";

export default function MobileNav() {
    const router = useRouter();
    const pathname = usePathname();
    const [searchOpen, setSearchOpen] = React.useState(false);
    const [drawerOpen, setDrawerOpen] = React.useState(false);

    return (
        <div className="fixed right-3 top-3 md:hidden">
            <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
                <DrawerTrigger asChild>
                    <Button variant={"outline"} size={"icon"}>
                        <IconMenu2 />
                    </Button>
                </DrawerTrigger>
                <DrawerContent>
                    <DrawerHeader className="sr-only text-left">
                        <DrawerTitle>Menu</DrawerTitle>
                    </DrawerHeader>
                    <div className="flex flex-col gap-2 p-3">
                        <SidebarMenu>
                            <>
                                <SidebarMenuItem
                                    onClick={() => {
                                        router.push("/");
                                        setSearchOpen(false);
                                        setDrawerOpen(false);
                                    }}
                                >
                                    <SidebarMenuButton>
                                        {/* @ts-ignore */}
                                        <tabler.IconHome />
                                        Home
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                                <SidebarMenuItem
                                    onClick={() => setSearchOpen(true)}
                                >
                                    <SidebarMenuButton>
                                        {/* @ts-ignore */}
                                        <tabler.IconSearch />
                                        Search...
                                    </SidebarMenuButton>
                                </SidebarMenuItem>

                                <Search
                                    open={searchOpen}
                                    onOpenChange={setSearchOpen}
                                    onClick={() => setDrawerOpen(false)}
                                />
                            </>
                            <SidebarGroupLabel>Components</SidebarGroupLabel>
                            {components.map((item) => {
                                const Icon = tabler[item.iconName];
                                return (
                                    <SidebarMenuItem
                                        key={item.title}
                                        onClick={() => {
                                            router.push(
                                                "/component/" + item.code
                                            );
                                            setSearchOpen(false);
                                            setDrawerOpen(false);
                                        }}
                                    >
                                        <SidebarMenuButton
                                            isActive={
                                                pathname ===
                                                `/component/${item.code}`
                                            }
                                        >
                                            {/* @ts-ignore */}
                                            <Icon />
                                            {item.title}
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                );
                            })}
                        </SidebarMenu>
                    </div>
                    {/* <ProfileForm className="px-4" /> */}
                </DrawerContent>
            </Drawer>
        </div>
    );
}
