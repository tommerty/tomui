"use client";

import { useState } from "react";
import { DashboardSidebar } from "./examples/sidebar1";
import { BarChart2, FileText, Mail } from "lucide-react";
import { IconBell, IconSearch, IconUser } from "@tabler/icons-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DashboardSidebarRight } from "./examples/sidebar2";
import { ActivityContent, SidebarContentType } from "@/types/sidebar";

export function RootLayoutClient() {
    const [leftSidebarCollapsed, setLeftSidebarCollapsed] = useState(true);
    const [rightSidebarCollapsed, setRightSidebarCollapsed] = useState(true);
    const [rightSidebarContent, setRightSidebarContent] =
        useState<SidebarContentType>(null);
    const [activeActivityIndex, setActiveActivityIndex] = useState<
        number | null
    >(null);

    // Function to handle activity click
    const handleActivityClick = (activityIndex: number) => {
        // If clicking the same activity that's already active, close the sidebar
        if (activeActivityIndex === activityIndex && !rightSidebarCollapsed) {
            setRightSidebarCollapsed(true);
            setActiveActivityIndex(null);
            return;
        }

        // Set content for the right sidebar
        const activityContent: ActivityContent = {
            type: "activity",
            id: activityIndex,
            title: `Activity ${activityIndex + 1}`,
            date: new Date().toLocaleDateString(),
            status: "Active",
            description: `This is detailed information about Activity ${activityIndex + 1}.`,
            relatedItems: [
                `Item ${activityIndex + 1}.1`,
                `Item ${activityIndex + 1}.2`,
                `Item ${activityIndex + 1}.3`,
                `Item ${activityIndex + 1}.4`,
                `Item ${activityIndex + 1}.5`,
                `Item ${activityIndex + 1}.6`,
                `Item ${activityIndex + 1}.7`,
                `Item ${activityIndex + 1}.8`,
                `Item ${activityIndex + 1}.9`,
                `Item ${activityIndex + 1}.10`,
                `Item ${activityIndex + 1}.11`,
                `Item ${activityIndex + 1}.12`,
                `Item ${activityIndex + 1}.13`,
                `Item ${activityIndex + 1}.14`,
                `Item ${activityIndex + 1}.15`,
                `Item ${activityIndex + 1}.16`,
                `Item ${activityIndex + 1}.17`,
                `Item ${activityIndex + 1}.18`,
                `Item ${activityIndex + 1}.19`,
                `Item ${activityIndex + 1}.20`,
            ],
        };

        setRightSidebarContent(activityContent);
        setRightSidebarCollapsed(false);
        setActiveActivityIndex(activityIndex);
    };

    // Handle sidebar close from the sidebar component
    const handleSidebarClose = () => {
        setRightSidebarCollapsed(true);
        setActiveActivityIndex(null);
    };

    return (
        <div className="flex h-full w-full flex-col overflow-hidden rounded-lg">
            <div className="border-b bg-sidebar">
                <div className="flex items-center p-2">
                    <div className="flex flex-1 items-center space-x-4">
                        <div className="w-64 lg:w-80">
                            <div className="relative">
                                <IconSearch className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input
                                    placeholder="Search..."
                                    className="pl-8"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center space-x-4">
                        <Button variant="ghost" size="icon">
                            <IconBell className="h-5 w-5" />
                        </Button>
                        <Button variant="ghost" size="icon">
                            <IconUser className="h-5 w-5" />
                        </Button>
                    </div>
                </div>
            </div>
            <div className="flex flex-1 overflow-hidden">
                <DashboardSidebar
                    collapsed={leftSidebarCollapsed}
                    onCollapse={setLeftSidebarCollapsed}
                    name="left-sidebar-sidebar1"
                />
                <main className="flex-1 overflow-auto bg-background">
                    <div className="mx-auto max-w-5xl p-3">
                        {/* Analytics Section */}
                        <section className="space-y-4">
                            <p className="text-2xl font-bold">
                                Analytics Overview
                            </p>
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                                {[
                                    {
                                        icon: BarChart2,
                                        label: "Total Sales",
                                        value: "$24,563",
                                    },
                                    {
                                        icon: FileText,
                                        label: "Orders",
                                        value: "456",
                                    },
                                    {
                                        icon: Mail,
                                        label: "Messages",
                                        value: "23",
                                    },
                                ].map((stat, i) => (
                                    <div
                                        key={i}
                                        className="rounded-lg border bg-card p-6"
                                    >
                                        <div className="flex items-center space-x-2">
                                            <stat.icon className="h-5 w-5 text-muted-foreground" />
                                            <p className="font-medium">
                                                {stat.label}
                                            </p>
                                        </div>
                                        <p className="mt-2 text-2xl font-bold">
                                            {stat.value}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </section>
                        {/* Additional Content */}
                        <section className="space-y-4">
                            <p className="text-2xl font-bold">
                                Recent Activity
                            </p>
                            <div className="grid gap-4">
                                {Array.from({ length: 15 }).map((_, i) => (
                                    <div
                                        key={i}
                                        className={`cursor-pointer select-none rounded-lg border p-6 transition-colors ${
                                            activeActivityIndex === i
                                                ? "border-primary bg-primary/10"
                                                : "bg-card hover:bg-muted"
                                        }`}
                                        onClick={() => handleActivityClick(i)}
                                    >
                                        <p className="text-xl font-semibold">
                                            Activity {i + 1}
                                        </p>
                                        <p className="mt-2 text-muted-foreground">
                                            This is an example activity card to
                                            demonstrate scrolling content. Each
                                            card represents a different activity
                                            or notification.
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>
                </main>
                <DashboardSidebarRight
                    collapsed={rightSidebarCollapsed}
                    position="right"
                    onCollapse={(collapsed) => {
                        setRightSidebarCollapsed(collapsed);
                        if (collapsed) {
                            setActiveActivityIndex(null);
                        }
                    }}
                    name="right-sidebar-sidebar1"
                    sidebarContent={rightSidebarContent}
                    onContentChange={setRightSidebarContent}
                />
            </div>
        </div>
    );
}
