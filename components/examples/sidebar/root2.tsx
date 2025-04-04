"use client";

import { useState } from "react";
import { DashboardSidebar } from "./examples/sidebar1";
import { BarChart2, FileText, Mail } from "lucide-react";
import { IconBell, IconSearch, IconUser } from "@tabler/icons-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DashboardSidebarRight } from "./examples/sidebar2";
import { ActivityContent, SidebarContentType } from "@/types/sidebar";
import { DashboardSidebar3 } from "./examples/sidebar3";
import { DashboardSidebar4 } from "./examples/sidebar4";

export function RootLayoutClient2() {
    const [leftSidebarCollapsed, setLeftSidebarCollapsed] = useState(true);
    const [left2SidebarCollapsed, setLeft2SidebarCollapsed] = useState(false);
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
        <div className="flex h-full w-full flex-col overflow-hidden rounded-lg bg-muted">
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
                <DashboardSidebar3
                    collapsed={leftSidebarCollapsed}
                    onCollapse={setLeftSidebarCollapsed}
                    name="left-sidebar-sidebar2"
                />
                <DashboardSidebar4
                    collapsed={left2SidebarCollapsed}
                    onCollapse={setLeft2SidebarCollapsed}
                    name="left-sidebar-sidebar3"
                />
                <main className="flex-1 overflow-auto bg-muted">
                    <div className="mx-auto max-w-5xl p-2">
                        {/* Analytics Section */}
                    </div>
                </main>
            </div>
        </div>
    );
}
