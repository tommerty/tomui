"use client";

import {
    Snippet,
    SnippetCopyButton,
    SnippetHeader,
    SnippetTabsContent,
    SnippetTabsList,
    SnippetTabsTrigger,
} from "@/components/ui/kibo-ui/snippet";
import { IconBrandPnpm, IconCode } from "@tabler/icons-react";
import { HeartIcon, BoxIcon } from "lucide-react";
import { useState } from "react";

const commands = [
    {
        label: "pnpm",
        icon: IconCode,
        code: `pnpm dlx shadcn@latest add`,
    },
];

const RegSnippet = () => {
    const [value, setValue] = useState(commands[0].label);

    return (
        <div className="w-full">
            <Snippet value={value} onValueChange={setValue} className="w-full">
                <SnippetHeader>
                    <SnippetTabsList>
                        {commands.map((command) => (
                            <SnippetTabsTrigger
                                key={command.label}
                                value={command.label}
                            >
                                <command.icon size={14} />
                                <span>{command.label}</span>
                            </SnippetTabsTrigger>
                        ))}
                    </SnippetTabsList>
                    <SnippetCopyButton
                        value={"code"}
                        onCopy={() => console.log(`Copied "test" to clipboard`)}
                        onError={() =>
                            console.error(`Failed to copy "test" to clipboard`)
                        }
                    />
                </SnippetHeader>
                {commands.map((command) => (
                    <SnippetTabsContent
                        key={command.label}
                        value={command.label}
                    >
                        {command.code}
                    </SnippetTabsContent>
                ))}
            </Snippet>
        </div>
    );
};

export default RegSnippet;
