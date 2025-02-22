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
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarProvider,
} from "@/components/complex-sidebar/complex-sidebar";
import React from "react";
import { useRouter } from "next/navigation";
import { ComponentBlockViewer } from "./ComponentBlockViewer";
import Link from "next/link";

interface Props {
    component: ComponentItem;
    children: React.ReactNode;
    currentIndex: number;
}
export default function ComponentPreview({
    children,
    component,
    currentIndex,
}: Props) {
    const installScript = `pnpm dlx shadcn@latest add https://ui.tommerty.com/r/${component.code}.json`;
    const copyToClipboard = () => {
        navigator.clipboard.writeText(installScript);
    };
    const usageCopyToClipboard = () => {
        navigator.clipboard.writeText(component.usage);
    };

    type HeadingType = {
        id: string;
        text: string;
        level: number;
    };
    const [headings, setHeadings] = React.useState<HeadingType[]>([]);

    React.useEffect(() => {
        const elements = document.querySelectorAll("h1, h2, h3, h4, h5, h6");
        const headingsList = Array.from(elements).map((heading) => ({
            id:
                heading.id ||
                heading.textContent?.toLowerCase().replace(/\s+/g, "-") ||
                "",
            text: heading.textContent || "",
            level: parseInt(heading.tagName[1]),
        }));
        setHeadings(headingsList);
    }, []);

    const router = useRouter();

    const [activeSection, setActiveSection] = React.useState<string>("");

    React.useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            {
                rootMargin: "-100px 0px -80% 0px",
            }
        ); // Observe all section headings
        document
            .querySelectorAll("h1[id], h2[id], h3[id], h4[id], h5[id], h6[id]")
            .forEach((element) => {
                observer.observe(element);
            });

        return () => observer.disconnect();
    }, []);

    return (
        <>
            <div className="flex h-full flex-1 flex-col gap-4 overflow-scroll scroll-smooth p-4 pb-2 pt-12">
                <header className="relative flex flex-col gap-1">
                    <h1
                        className="scroll-mt-6 text-3xl font-bold tracking-tight"
                        id="title"
                    >
                        {component.title}
                    </h1>
                    <p className="text-muted-foreground">
                        {component.description}
                    </p>
                </header>
                <div className="flex flex-1 flex-col gap-8">
                    <ComponentBlockViewer exampleName={component.exampleName}>
                        {children}
                    </ComponentBlockViewer>
                    <div className="flex flex-col gap-4">
                        <h2
                            className="scroll-mt-6 border-b text-2xl font-bold"
                            id="install"
                        >
                            Install
                        </h2>
                        <Tabs defaultValue="install" className="gap-0">
                            <TabsList className="flex h-auto w-full items-center justify-start rounded-b-none border-b bg-card">
                                <TabsTrigger value="install">
                                    Install
                                </TabsTrigger>
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
                        <h2
                            className="scroll-mt-6 border-b text-2xl font-bold"
                            id="usage"
                        >
                            Usage
                        </h2>

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
                            <h3
                                className="scroll-mt-6 border-b text-2xl font-bold"
                                id="props"
                            >
                                Props
                            </h3>
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
                            <h2
                                className="scroll-mt-6 border-b text-2xl font-bold"
                                id="examples"
                            >
                                Examples
                            </h2>
                            <div className="flex flex-col gap-9">
                                {component.alternativeExamples.map(
                                    (example) => (
                                        <header
                                            key={example.title}
                                            className="flex flex-col gap-1"
                                        >
                                            <h3
                                                className="text-xl font-bold tracking-tight"
                                                id={example.title}
                                            >
                                                {example.title}
                                            </h3>
                                            <p className="text-sm text-muted-foreground">
                                                {example.description}
                                            </p>
                                            <div className="h-full">
                                                <ComponentBlockViewer>
                                                    <example.exampleComponent />
                                                </ComponentBlockViewer>
                                            </div>
                                        </header>
                                    )
                                )}
                            </div>
                        </div>
                    )}
                </div>
                <div className="mt-8 flex items-center justify-between border-t p-4">
                    {currentIndex > 0 ? (
                        <Button variant="outline" asChild>
                            <Link
                                href={`/component/${components[currentIndex - 1].code}`}
                            >
                                ← {components[currentIndex - 1].title}
                            </Link>
                        </Button>
                    ) : (
                        <div />
                    )}

                    {currentIndex < components.length - 1 ? (
                        <Button variant="outline" asChild>
                            <Link
                                href={`/component/${components[currentIndex + 1].code}`}
                            >
                                {components[currentIndex + 1].title} →
                            </Link>
                        </Button>
                    ) : (
                        <div />
                    )}
                </div>
            </div>
            <SidebarProvider
                name="right-sidebar"
                className="hidden lg:block"
                style={{
                    // @ts-ignore
                    "--sidebar-width": "12rem",
                }}
            >
                <Sidebar
                    className="border-none pl-0"
                    side="right"
                    absolute
                    collapsible="none"
                >
                    <SidebarHeader className="px-0 pb-0">
                        <SidebarGroup className="pb-0">
                            <SidebarGroupLabel>On this page</SidebarGroupLabel>
                        </SidebarGroup>
                    </SidebarHeader>
                    <SidebarContent>
                        <SidebarGroup>
                            <SidebarMenu>
                                {headings.map((heading) => (
                                    <SidebarMenuItem
                                        key={heading.id}
                                        className={
                                            heading.level === 1
                                                ? "pl-2"
                                                : heading.level === 2
                                                  ? "pl-2"
                                                  : heading.level === 3
                                                    ? "pl-6"
                                                    : heading.level === 4
                                                      ? "pl-8"
                                                      : heading.level === 5
                                                        ? "pl-10"
                                                        : "pl-12"
                                        }
                                    >
                                        <SidebarMenuButton
                                            isActive={
                                                activeSection === heading.id
                                            }
                                            size={"sm"}
                                            onClick={() =>
                                                router.push("#" + heading.id)
                                            }
                                            className="rounded-none border-l-2 border-transparent font-semibold hover:bg-transparent data-[active=true]:border-l-border data-[active=true]:bg-transparent data-[active=true]:font-semibold"
                                        >
                                            {heading.text === component.title
                                                ? "Overview"
                                                : heading.text}
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroup>
                    </SidebarContent>
                </Sidebar>
            </SidebarProvider>
        </>
    );
}
