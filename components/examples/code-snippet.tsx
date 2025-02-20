"use client";

import { CodeSnippet } from "@/registry/code-snippet/code-snippet";

export default function CodeCopyExample() {
    return (
        <CodeSnippet
            tabs={[
                {
                    label: "npm",
                    code: "npm install @shadcn/ui",
                },
                {
                    label: "pnpm",
                    code: "pnpm add @shadcn/ui",
                },
                {
                    label: "yarn",
                    code: "yarn add @shadcn/ui",
                },
            ]}
        />
    );
}

export function CodeCopyMinimal() {
    return (
        <CodeSnippet
            code="git clone https://github.com/shadcn/ui.git"
            variant="minimal"
        />
    );
}
