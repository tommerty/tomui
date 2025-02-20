"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { IconCopy, IconCheck } from "@tabler/icons-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Highlight, themes } from "prism-react-renderer";
import { cn } from "@/lib/utils";

interface CodeSnippetProps {
    code?: string;
    language?: string;
    variant?: "default" | "minimal";
    className?: string;
    containerClassName?: string;
    preClassName?: string;
    tabsListClassName?: string;
    tabsTriggerClassName?: string;
    tabsContentClassName?: string;
    copyButtonClassName?: string;
    tabs?: {
        label: string;
        code: string;
        language?: string;
    }[];
}

const CodeSnippet = React.forwardRef<HTMLDivElement, CodeSnippetProps>(
    (
        {
            code = "",
            language = "bash",
            variant = "default",
            className,
            containerClassName,
            preClassName,
            tabsListClassName,
            tabsTriggerClassName,
            tabsContentClassName,
            copyButtonClassName,
            tabs,
        },
        ref
    ) => {
        const [copied, setCopied] = React.useState(false);

        const copyToClipboard = async (textToCopy: string) => {
            await navigator.clipboard.writeText(textToCopy);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        };

        const CodeBlock = ({
            code,
            language,
        }: {
            code: string;
            language: string;
        }) => (
            <Highlight theme={themes.vsDark} code={code} language={language}>
                {({
                    className,
                    style,
                    tokens,
                    getLineProps,
                    getTokenProps,
                }) => (
                    <pre
                        className={cn(
                            className,
                            "overflow-auto !bg-transparent px-2 text-xs !text-foreground",
                            preClassName
                        )}
                        style={style}
                    >
                        {tokens.map((line, i) => (
                            <div key={i} {...getLineProps({ line })}>
                                {line.map((token, key) => (
                                    <span
                                        key={key}
                                        {...getTokenProps({ token })}
                                    />
                                ))}
                            </div>
                        ))}
                    </pre>
                )}
            </Highlight>
        );

        const CopyButton = ({ textToCopy }: { textToCopy: string }) => (
            <Button
                onClick={() => copyToClipboard(textToCopy)}
                size="icon"
                variant="outline"
                className={cn(
                    "h-auto w-auto p-2 opacity-0 transition-opacity group-hover:opacity-100",
                    copyButtonClassName
                )}
            >
                {copied ? (
                    <IconCheck className="h-4 w-4" />
                ) : (
                    <IconCopy className="h-4 w-4" />
                )}
            </Button>
        );

        if (variant === "minimal") {
            return (
                <div
                    className={cn(
                        "group flex items-center justify-between gap-3 rounded-md border bg-card p-3",
                        containerClassName
                    )}
                >
                    <CodeBlock code={code} language={language} />
                    <CopyButton textToCopy={code} />
                </div>
            );
        }

        return (
            <Tabs defaultValue="0" className="w-full">
                <TabsList
                    className={cn(
                        "flex h-auto w-full items-center justify-start rounded-b-none border-b bg-card",
                        tabsListClassName
                    )}
                >
                    {tabs?.map((tab, index) => (
                        <TabsTrigger
                            key={index}
                            value={index.toString()}
                            className={tabsTriggerClassName}
                        >
                            {tab.label}
                        </TabsTrigger>
                    ))}
                </TabsList>
                {tabs?.map((tab, index) => (
                    <TabsContent
                        key={index}
                        value={index.toString()}
                        className="mt-0"
                    >
                        <div
                            className={cn(
                                "group flex items-center justify-between rounded-b-md bg-card p-2",
                                tabsContentClassName
                            )}
                        >
                            <CodeBlock
                                code={tab.code}
                                language={tab.language ?? language}
                            />
                            <CopyButton textToCopy={tab.code} />
                        </div>
                    </TabsContent>
                ))}
            </Tabs>
        );
    }
);

CodeSnippet.displayName = "CodeSnippet";

export { CodeSnippet };
