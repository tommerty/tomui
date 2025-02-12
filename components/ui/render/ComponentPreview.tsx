"use client";
import { IconBrandPnpm, IconCode } from "@tabler/icons-react";
import Snippet from "./Snippet";
import RegSnippet from "./Snippet";

interface Props {
    children: React.ReactNode;
    title: string;
    description: string;
    code: string;
}
export default function ComponentPreview({
    children,
    title,
    description,
    code,
}: Props) {
    return (
        <div className="mx-auto flex min-h-svh max-w-3xl flex-col gap-8 px-4 py-8">
            <header className="flex flex-col gap-1">
                <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
                <p className="text-muted-foreground">{description}</p>
            </header>
            <div className="flex flex-1 flex-col gap-8">
                <div className="relative flex min-h-full flex-col gap-4 rounded-lg border p-4">
                    <div
                        className="relative flex h-96 items-center justify-center"
                        style={{ contain: "paint, layout, size" }}
                    >
                        {children}
                    </div>
                </div>
                <RegSnippet />
            </div>
        </div>
    );
}
