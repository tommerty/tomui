"use client";

import React, { useEffect, useState } from "react";
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarProvider,
} from "@/components/complex-sidebar/complex-sidebar";
import { useRouter } from "next/navigation";

type HeadingType = {
    id: string;
    text: string;
    level: number;
};

export function ChangelogSidebar() {
    const [headings, setHeadings] = useState<HeadingType[]>([]);
    const [activeSection, setActiveSection] = useState<string>("");
    const router = useRouter();

    useEffect(() => {
        // Only select h1 elements
        const elements = document.querySelectorAll("h1");
        const headingsList = Array.from(elements).map((heading) => ({
            id: heading.id || "",
            text: heading.textContent || "",
            level: parseInt(heading.tagName[1]),
        }));
        setHeadings(headingsList);
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            {
                rootMargin: "-100px 0px -80% 0px",
            }
        );

        document.querySelectorAll("h1[id]").forEach((element) => {
            observer.observe(element);
        });

        return () => observer.disconnect();
    }, []);

    return (
        <SidebarProvider
            name="changelog-sidebar"
            className="hidden lg:block"
            style={{
                // @ts-ignore
                "--sidebar-width": "12rem",
            }}
        >
            <Sidebar
                className="border-none bg-transparent pl-0"
                side="right"
                absolute
                collapsible="none"
            >
                <SidebarHeader className="px-0 pb-0">
                    <SidebarGroup className="pb-0">
                        <SidebarGroupLabel>Versions</SidebarGroupLabel>
                    </SidebarGroup>
                </SidebarHeader>
                <SidebarContent>
                    <SidebarGroup>
                        <SidebarMenu>
                            {headings.map((heading) => (
                                <SidebarMenuItem
                                    key={heading.id}
                                    className="pl-2"
                                >
                                    <SidebarMenuButton
                                        isActive={activeSection === heading.id}
                                        size={"sm"}
                                        onClick={() =>
                                            router.push("#" + heading.id)
                                        }
                                        className="rounded-none border-l-2 border-transparent font-semibold hover:bg-transparent data-[active=true]:border-l-border data-[active=true]:bg-transparent data-[active=true]:font-semibold"
                                    >
                                        {/* Display just the version number for cleaner sidebar */}
                                        v{heading.text.split(" ")[0]}
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroup>
                </SidebarContent>
            </Sidebar>
        </SidebarProvider>
    );
}
