"use client";

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
    SidebarMenuItem,
    SidebarMenuButton,
} from "@/registry/complex-sidebar/complex-sidebar";
import { DialogTitle } from "@radix-ui/react-dialog";
import { User, CreditCard, Settings } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import * as tabler from "@tabler/icons-react";

interface Props {
    onClick?: () => void;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
}
export default function Search({ onClick, open, onOpenChange }: Props) {
    const [searchOpen, setSearchOpen] = React.useState(false);
    const router = useRouter();

    return (
        <>
            <CommandDialog open={open} onOpenChange={onOpenChange}>
                <DialogTitle className="sr-only">Search box</DialogTitle>
                <CommandInput placeholder="Search" />
                <CommandList>
                    <CommandEmpty>No results found.</CommandEmpty>
                    <CommandGroup heading="Components">
                        <CommandItem
                            onSelect={() => {
                                setSearchOpen(false);
                                onOpenChange?.(false);

                                router.push("/component/");
                                onClick?.();
                            }}
                        >
                            <tabler.IconLayoutNavbarExpand />
                            <span>All components</span>
                        </CommandItem>
                        {components.map((item) => {
                            const Icon = tabler[item.iconName];
                            return (
                                <CommandItem
                                    onSelect={() => {
                                        setSearchOpen(false);
                                        onOpenChange?.(false);
                                        router.push("/component/" + item.code);
                                        onClick?.();
                                    }}
                                    key={item.title}
                                >
                                    {/* @ts-ignore */}
                                    <Icon />
                                    {item.title}
                                </CommandItem>
                            );
                        })}
                    </CommandGroup>
                    <CommandSeparator />
                    <CommandGroup heading="Misc">
                        <CommandItem
                            onSelect={() => {
                                setSearchOpen(false);
                                onOpenChange?.(false);
                                router.push(
                                    "https://github.com/tommerty/tomui"
                                );
                                onClick?.();
                            }}
                        >
                            <tabler.IconBrandGithub />
                            <span>GitHub</span>
                        </CommandItem>
                    </CommandGroup>
                </CommandList>
            </CommandDialog>
        </>
    );
}
