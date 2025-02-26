"use client";

import * as React from "react";
import { Highlight, themes } from "prism-react-renderer";
import { ToggleGroup, ToggleGroupItem } from "../toggle-group";
import { Label } from "../label";
import {
    IconCode,
    IconDeviceDesktop,
    IconDeviceMobile,
    IconDeviceTablet,
} from "@tabler/icons-react";
import { Separator } from "../separator";

// Create a context to provide the mocked mobile state
export const ViewportContext = React.createContext<{
    isMobile: boolean;
    setIsMobile: (value: boolean) => void;
}>({
    isMobile: false,
    setIsMobile: () => null,
});

export function useViewport() {
    return React.useContext(ViewportContext);
}

interface ComponentBlockViewerProps {
    children: React.ReactNode;
    exampleName?: string;
    code?: string;
}

export function ComponentBlockViewer({
    children,
    exampleName,
    code,
}: ComponentBlockViewerProps) {
    const [viewMode, setViewMode] = React.useState<string>("100"); // Track the current view mode
    const [isMobile, setIsMobile] = React.useState(false);
    const previewRef = React.useRef<HTMLDivElement>(null);

    const handleViewportChange = (value: string) => {
        if (!value) return; // Guard against empty value

        setViewMode(value); // Update the current view mode

        if (value === "code") {
            setIsMobile(false);
            return;
        }

        const newWidth = parseInt(value);
        setIsMobile(newWidth === 30);

        if (previewRef.current) {
            previewRef.current.style.width = `${newWidth}%`;
            if (newWidth === 30) {
                previewRef.current.style.maxWidth = "375px";
            } else if (newWidth === 60) {
                previewRef.current.style.maxWidth = "768px";
            } else {
                previewRef.current.style.maxWidth = "100%";
            }
        }
    };

    // Determine if we should show code or preview
    const showCode = viewMode === "code";

    return (
        <ViewportContext.Provider value={{ isMobile, setIsMobile }}>
            <div className="flex flex-col gap-2 rounded-md border p-2">
                <div className="flex items-center justify-between">
                    <Label className="font-bold">
                        {exampleName ? exampleName : "Preview"}
                    </Label>
                    <div className="ml-auto flex items-center gap-1.5 rounded-md border p-1">
                        <ToggleGroup
                            type="single"
                            value={viewMode} // Use the viewMode state
                            onValueChange={handleViewportChange}
                        >
                            <ToggleGroupItem
                                value="100"
                                className="!size-9 !p-1"
                                title="Desktop"
                            >
                                <IconDeviceDesktop />
                            </ToggleGroupItem>
                            <ToggleGroupItem
                                value="60"
                                className="!size-9 !p-1"
                                title="Tablet"
                            >
                                <IconDeviceTablet />
                            </ToggleGroupItem>
                            <ToggleGroupItem
                                value="30"
                                className="!size-9 !p-1"
                                title="Mobile"
                            >
                                <IconDeviceMobile />
                            </ToggleGroupItem>
                            {code && (
                                <>
                                    <Separator
                                        orientation="vertical"
                                        className="!h-6"
                                    />
                                    <ToggleGroupItem
                                        value="code"
                                        className="!size-9 !p-1"
                                        title="Code"
                                    >
                                        <IconCode />
                                    </ToggleGroupItem>
                                </>
                            )}
                        </ToggleGroup>
                    </div>
                </div>
                <div
                    className="relative flex h-72 max-h-96"
                    style={{
                        contain: "paint, layout, size",
                    }}
                >
                    {showCode ? (
                        <div className="w-full overflow-auto rounded-md border">
                            <Highlight
                                theme={themes.vsDark}
                                code={code || "// No code available"}
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
                                        className={`${className} h-full overflow-auto !bg-transparent p-4 text-xs !text-foreground`}
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
                        </div>
                    ) : (
                        <div
                            ref={previewRef}
                            className="flex h-full w-full place-content-center items-center rounded-md border p-3 transition-all duration-200"
                        >
                            {children}
                        </div>
                    )}
                </div>
            </div>
        </ViewportContext.Provider>
    );
}
