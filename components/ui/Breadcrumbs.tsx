"use client";

import { ComponentItem, components } from "@/lib/items";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "./breadcrumb";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "./dropdown-menu";
import { IconChevronRight, IconSlash } from "@tabler/icons-react";

interface BreadcrumbsProps {
    component?: ComponentItem;
}

export function Breadcrumbs({ component }: BreadcrumbsProps) {
    if (!component)
        return (
            <Breadcrumb className="flex h-full w-fit items-center justify-center rounded-md bg-card pl-2 pr-4">
                <BreadcrumbList className="sm:gap-1">
                    <BreadcrumbItem className="hidden sm:flex">
                        <BreadcrumbLink href="/">Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator className="hidden sm:flex">
                        <IconSlash size={16} />
                    </BreadcrumbSeparator>
                    <BreadcrumbItem>
                        <BreadcrumbPage>Components</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
        );

    return (
        <Breadcrumb className="flex h-full w-fit items-center justify-center rounded-md bg-card pl-2 pr-4">
            <BreadcrumbList className="sm:gap-1">
                <BreadcrumbItem className="hidden sm:flex">
                    <BreadcrumbLink href="/">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden sm:flex">
                    <IconSlash size={16} />
                </BreadcrumbSeparator>
                <BreadcrumbItem>
                    <BreadcrumbLink href="/component">
                        Components
                    </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator>
                    <IconSlash size={16} />
                </BreadcrumbSeparator>
                <BreadcrumbPage>
                    <DropdownMenu>
                        <DropdownMenuTrigger className="flex items-center gap-1 [&[data-state=open]>svg]:rotate-90">
                            {component.title}
                            <IconChevronRight
                                className="transition-transform duration-200 data-[state=open]:rotate-90"
                                size={16}
                            />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start" className="">
                            {components.map((component) => (
                                <DropdownMenuItem key={component.code}>
                                    <BreadcrumbLink
                                        href={`/component/${component.code}`}
                                    >
                                        {component.title}
                                    </BreadcrumbLink>
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </BreadcrumbPage>
            </BreadcrumbList>
        </Breadcrumb>
    );
}
