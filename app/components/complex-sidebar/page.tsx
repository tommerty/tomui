import * as React from "react";
import { OpenInV0Button } from "@/components/open-in-v0-button";
import { HelloWorld } from "@/registry/hello-world/hello-world";
import { ExampleForm } from "@/registry/example-form/example-form";
import PokemonPage from "@/registry/complex-component/page";
import ExampleSidebar from "@/registry/complex-sidebar/Example";

// This page displays items from the custom registry.
// You are free to implement this with your own design as needed.

export default function Home() {
    return (
        <div className="mx-auto flex min-h-svh max-w-3xl flex-col gap-8 px-4 py-8">
            <header className="flex flex-col gap-1">
                <h1 className="text-3xl font-bold tracking-tight">
                    Complex Sidebar
                </h1>
                <p className="text-muted-foreground">
                    A complex sidebar, based off ShadCN UI Sidebar
                </p>
            </header>
            <main className="flex flex-1 flex-col gap-8">
                <div className="relative flex min-h-full flex-col gap-4 rounded-lg border p-4">
                    <div
                        className="relative flex h-96 items-center justify-center"
                        style={{ contain: "paint, layout, size" }}
                    >
                        <ExampleSidebar />
                    </div>
                </div>
            </main>
        </div>
    );
}
