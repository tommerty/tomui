import * as React from "react";
import { OpenInV0Button } from "@/components/open-in-v0-button";

import {
    IconBrandGithub,
    IconCode,
    IconLayout,
    IconLoader2,
    IconNavigation,
    IconProgress,
} from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import Nav from "@/components/ui/Nav";
import Link from "next/link";

// This page displays items from the custom registry.
// You are free to implement this with your own design as needed.

export default function Home() {
    return (
        <div className="mx-auto flex min-h-svh max-w-3xl flex-col gap-8 px-4 py-8">
            <header className="flex flex-col gap-1">
                <h1 className="flex w-fit items-center gap-2 rounded-md bg-card px-3 text-3xl font-bold tracking-tight">
                    <img
                        src="https://cdn.doras.to/doras/assets/83bda65b-8d42-4011-9bf0-ab23402776f2/b81da5ac-e5be-45c1-b9b1-80b4f51e83af.png"
                        alt="TomUI"
                        className="size-10"
                    />
                    TomUI
                </h1>
                <p className="text-muted-foreground">
                    A collection of components built on top of shadcn/ui.
                </p>
            </header>
            <div className="flex flex-1 flex-col gap-8">
                <div className="flex flex-col gap-3 rounded-md border bg-card p-3">
                    <h2 className="flex items-center gap-2 text-xl font-bold tracking-tight">
                        <div
                            className="animate-spin"
                            style={{ animation: "spin 15s linear infinite" }}
                        >
                            <IconLayout className="animate-pulse" />
                        </div>
                        Explore
                    </h2>
                    <p className="text-muted-foreground">
                        Explore the existing components.
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
                        it is not yet ready for public use. Expect bugs,
                        changes, and missing features.
                    </p>
                    <a href="https://github.com/tommerty/tomui" target="_blank">
                        <Button className="flex w-fit items-center gap-1 border border-transparent bg-accent font-bold text-foreground hover:border-border hover:bg-background/50">
                            <IconBrandGithub />
                            GitHub Repository
                        </Button>
                    </a>
                </div>
            </div>
        </div>
    );
}
