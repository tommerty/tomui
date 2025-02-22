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
                                    <p className="ml-auto rounded-md bg-sidebar-accent p-0.5 px-1 text-xs text-muted-foreground">
                                        {item.group}
                                    </p>
                                </CommandItem>
                            );
                        })}
                    </CommandGroup>
                    <CommandSeparator />
                    <CommandGroup heading="Other Links">
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
                        <CommandItem
                            onSelect={() => {
                                setSearchOpen(false);
                                onOpenChange?.(false);
                                router.push(
                                    "https://github.com/tommerty/tomui/issues"
                                );
                                onClick?.();
                            }}
                        >
                            <tabler.IconListSearch />
                            <span>Issues</span>
                        </CommandItem>
                        <CommandItem
                            onSelect={() => {
                                setSearchOpen(false);
                                onOpenChange?.(false);
                                router.push("https://doras.to");
                                onClick?.();
                            }}
                        >
                            <tabler.IconExternalLink />
                            <span>Doras.to</span>
                        </CommandItem>
                    </CommandGroup>
                </CommandList>
            </CommandDialog>
        </>
    );
}
