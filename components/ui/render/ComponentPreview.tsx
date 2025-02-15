"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Highlight, themes } from "prism-react-renderer";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../table";

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "../breadcrumb";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "../dropdown-menu";
import {
    IconChevronCompactDown,
    IconChevronDown,
    IconChevronRight,
    IconCopy,
    IconSlash,
} from "@tabler/icons-react";
import { ComponentItem, components } from "@/lib/items";
import { ReactNode } from "react";
import { Button } from "../button";
import { Separator } from "../separator";

interface Props {
    component: ComponentItem;
    children: React.ReactNode;
}
export default function ComponentPreview({ children, component }: Props) {
    const installScript = `pnpm dlx shadcn@latest add https://ui.tommerty.com/registry/${component.code}.json`;
    const copyToClipboard = () => {
        navigator.clipboard.writeText(installScript);
    };
    const usageCopyToClipboard = () => {
        navigator.clipboard.writeText(component.usage);
    };
    return (
        <div className="relative mx-auto flex min-h-svh w-full flex-col gap-8 px-4 py-3">
            <Breadcrumb className="sticky top-3 z-50 w-fit rounded-md bg-card px-2">
                <BreadcrumbList className="sm:gap-1">
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/">Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator>
                        <IconSlash size={16} />
                    </BreadcrumbSeparator>
                    <BreadcrumbPage>
                        <DropdownMenu>
                            <DropdownMenuTrigger className="flex items-center gap-1 [&[data-state=open]>svg]:rotate-90">
                                {component.title}
                                <IconChevronRight
                                    className="transition-transform duration-200 data-[state=open]:rotate-90"
                                    size={16}
                                />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="start" className="">
                                {components.map((component) => (
                                    <DropdownMenuItem key={component.code}>
                                        <BreadcrumbLink
                                            href={`/component/${component.code}`}
                                        >
                                            {component.title}
                                        </BreadcrumbLink>
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </BreadcrumbPage>
                </BreadcrumbList>
            </Breadcrumb>
            <header className="relative flex flex-col gap-1">
                <h1 className="text-3xl font-bold tracking-tight">
                    {component.title}
                </h1>
                <p className="text-muted-foreground">{component.description}</p>
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
                <div className="flex flex-col gap-4">
                    <h2 className="border-b text-2xl font-bold">Install</h2>
                    <Tabs defaultValue="install" className="gap-0">
                        <TabsList className="flex h-auto w-full items-center justify-start rounded-b-none border-b bg-card">
                            <TabsTrigger value="install">Install</TabsTrigger>
                            {/* <TabsTrigger value="password" disabled>
                            Manual
                        </TabsTrigger> */}
                        </TabsList>
                        <TabsContent
                            value="install"
                            className="mt-0 flex items-center justify-between rounded-b-md bg-card p-3"
                        >
                            <Highlight
                                theme={themes.vsDark} // or themes.vsDark for dark mode
                                code={installScript}
                                language="bash"
                            >
                                {({
                                    className,
                                    style,
                                    tokens,
                                    getLineProps,
                                    getTokenProps,
                                }) => (
                                    <pre
                                        className={`${className} overflow-auto !bg-transparent p-4 text-xs !text-foreground`}
                                        style={style}
                                    >
                                        {tokens.map((line, i) => (
                                            <div
                                                key={i}
                                                {...getLineProps({ line })}
                                            >
                                                {line.map((token, key) => (
                                                    <span
                                                        key={key}
                                                        {...getTokenProps({
                                                            token,
                                                        })}
                                                    />
                                                ))}
                                            </div>
                                        ))}
                                    </pre>
                                )}
                            </Highlight>
                            <Button
                                onClick={copyToClipboard}
                                size={"icon"}
                                variant={"outline"}
                                className="h-auto w-auto p-2"
                            >
                                <IconCopy />
                            </Button>
                        </TabsContent>
                        {/* <TabsContent value="password">
                        Change your password here.
                    </TabsContent> */}
                    </Tabs>
                </div>
                <div className="flex flex-col gap-4">
                    <h2 className="border-b text-2xl font-bold">Usage</h2>

                    <div className="relative mt-0 flex items-center justify-between rounded-md bg-card text-xs">
                        <Highlight
                            theme={themes.vsDark} // or themes.vsDark for dark mode
                            code={component.usage}
                            language="tsx"
                        >
                            {({
                                className,
                                style,
                                tokens,
                                getLineProps,
                                getTokenProps,
                            }) => (
                                <pre
                                    className={`${className} overflow-auto !bg-transparent p-4`}
                                    style={style}
                                >
                                    {tokens.map((line, i) => (
                                        <div
                                            key={i}
                                            {...getLineProps({ line })}
                                        >
                                            {line.map((token, key) => (
                                                <span
                                                    key={key}
                                                    {...getTokenProps({
                                                        token,
                                                    })}
                                                />
                                            ))}
                                        </div>
                                    ))}
                                </pre>
                            )}
                        </Highlight>
                        <Button
                            onClick={usageCopyToClipboard}
                            size={"icon"}
                            variant={"outline"}
                            className="absolute right-2 top-2 h-auto w-auto p-2"
                        >
                            <IconCopy />
                        </Button>
                    </div>
                </div>

                {component.props && (
                    <div className="flex flex-col gap-4">
                        <h2 className="border-b text-2xl font-bold">Props</h2>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Prop</TableHead>
                                    <TableHead>Type</TableHead>
                                    <TableHead>Description</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {component.props.map((prop) => (
                                    <TableRow key={prop.name}>
                                        <TableCell className="font-mono font-medium">
                                            <span className="rounded-md bg-accent p-1">
                                                {prop.name}
                                            </span>
                                        </TableCell>
                                        <TableCell className="text-nowrap font-mono text-sm text-foreground">
                                            <span className="rounded-md bg-background/80 p-1">
                                                {prop.type}
                                            </span>
                                        </TableCell>
                                        <TableCell className="text-sm text-muted-foreground">
                                            {prop.default &&
                                                "Defaults to " +
                                                    prop.default +
                                                    ". "}
                                            {prop.description}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                )}

                {component.alternativeExamples && (
                    <div className="flex flex-col gap-4">
                        <h2 className="border-b text-2xl font-bold">
                            Examples
                        </h2>
                        <div className="flex flex-col gap-9">
                            {component.alternativeExamples.map((example) => (
                                <header
                                    key={example.title}
                                    className="flex flex-col gap-1"
                                >
                                    <h1 className="text-xl font-bold tracking-tight">
                                        {example.title}
                                    </h1>
                                    <p className="text-sm text-muted-foreground">
                                        {example.description}
                                    </p>
                                    <div className="relative flex min-h-full flex-col gap-4 rounded-lg border p-4">
                                        <div
                                            className="relative flex h-72 items-center justify-center"
                                            style={{
                                                contain: "paint, layout, size",
                                            }}
                                        >
                                            <example.exampleComponent />
                                        </div>
                                    </div>
                                </header>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
