import * as React from "react";

import {
    IconBrandGithub,
    IconCode,
    IconLayout,
    IconLoader2,
    IconNavigation,
    IconParachute,
    IconProgress,
    IconTextCaption,
} from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SidebarMenuButton } from "@/components/complex-sidebar/complex-sidebar";
import {
    AdaptiveModal,
    AdaptiveModalTrigger,
    AdaptiveModalContent,
    AdaptiveModalHeader,
    AdaptiveModalTitle,
} from "@/registry/adaptive-modal/components/adaptive-modal";
// This page displays items from the custom registry.
// You are free to implement this with your own design as needed.

export default function Home() {
    return (
        <div className="mx-auto flex min-h-svh max-w-3xl flex-col gap-8 px-4 py-8">
            <div className="flex flex-1 flex-col gap-8">
                <div className="flex flex-col gap-3 rounded-md border bg-card p-3">
                    <h2 className="flex w-fit items-center gap-2 rounded-md bg-accent p-2 text-xl font-bold tracking-tight">
                        <div>
                            <img
                                src="https://cdn.doras.to/doras/assets/83bda65b-8d42-4011-9bf0-ab23402776f2/b81da5ac-e5be-45c1-b9b1-80b4f51e83af.png"
                                alt="TomUI"
                                className="size-6"
                            />
                        </div>
                        TomUI
                    </h2>
                    <p className="text-muted-foreground">
                        TomUI is a custom registry of components built on top of
                        shadcn/ui. It is designed to be used with React
                        projects, expanding the amazing components of shadcn/ui,
                        while also adding a new flavor and features on top.
                    </p>
                    <p className="text-muted-foreground">
                        Getting started is easy. Just simply have a React
                        project with shadcn/ui installed, and then you can
                        install any of our components through shadcn/ui's CLI.
                    </p>
                </div>
                <div className="flex flex-col gap-3 rounded-md border bg-card p-3">
                    <h2 className="flex items-center gap-2 text-xl font-bold tracking-tight">
                        <div>
                            <IconLayout />
                        </div>
                        Components
                    </h2>
                    <p className="text-muted-foreground">
                        Explore components. The list is ever growing, and it's
                        fully open source.
                    </p>
                    <Link href="/component">
                        <Button className="flex w-fit items-center gap-1 border border-transparent bg-accent font-bold text-foreground hover:border-border hover:bg-background/50">
                            <IconNavigation />
                            Explore
                        </Button>
                    </Link>
                </div>
                <div className="flex flex-col gap-3 rounded-md border bg-card p-3">
                    <h2 className="flex items-center gap-2 text-xl font-bold tracking-tight">
                        <div
                            className="animate-spin"
                            style={{ animation: "spin 15s linear infinite" }}
                        >
                            <IconProgress className="animate-pulse" />
                        </div>
                        Current state
                    </h2>
                    <p className="text-muted-foreground">
                        This is a work in progress. While the registry is live,
                        expect bugs, rapid changes, and missing features.
                    </p>
                    <a href="https://github.com/tommerty/tomui" target="_blank">
                        <Button className="flex w-fit items-center gap-1 border border-transparent bg-accent font-bold text-foreground hover:border-border hover:bg-background/50">
                            <IconBrandGithub />
                            GitHub Repository
                        </Button>
                    </a>
                </div>
                <AdaptiveModal variant="dialog">
                    <AdaptiveModalTrigger>
                        <div className="flex cursor-pointer flex-col gap-3 rounded-md border bg-card p-3 hover:bg-background">
                            <h2 className="flex items-center gap-2 text-xl font-bold tracking-tight">
                                <img
                                    src="https://cdn.doras.to/doras/assets/05c5db48-cfba-49d7-82a1-5b4a3751aa40/49ca4647-65ed-412e-95c6-c475633d62af.png"
                                    className="size-10"
                                    alt="doras logo"
                                />
                                Powered by Doras.to
                            </h2>
                        </div>
                    </AdaptiveModalTrigger>
                    <AdaptiveModalContent>
                        <AdaptiveModalHeader>
                            <AdaptiveModalTitle>Doras.to</AdaptiveModalTitle>
                        </AdaptiveModalHeader>
                        <div className="space-y-2">
                            <p>
                                tommerty/ui is built be the co-founder and
                                frontend developer of Doras.to.
                            </p>
                            <p>
                                The purpose of tommerty/ui is to provide a set
                                of accessible, customizable, and easy-to-use
                                components that can be used to build our
                                website.
                            </p>
                            <p>
                                We open source what we can, and this UI library
                                is part of that. You can feel free to use this
                                in your own projects.
                            </p>
                        </div>
                        <Button className="ml-auto w-fit">
                            Check out Doras.to
                        </Button>
                    </AdaptiveModalContent>
                </AdaptiveModal>
            </div>
        </div>
    );
}
