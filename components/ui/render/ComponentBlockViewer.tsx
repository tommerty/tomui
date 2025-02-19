"use client";

import * as React from "react";

import { ToggleGroup, ToggleGroupItem } from "../toggle-group";
import { Label } from "../label";
import {
    IconDeviceDesktop,
    IconDeviceMobile,
    IconDeviceTablet,
} from "@tabler/icons-react";

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
}

export function ComponentBlockViewer({
    children,
    exampleName,
}: ComponentBlockViewerProps) {
    const [width, setWidth] = React.useState<number>(100);
    const [isMobile, setIsMobile] = React.useState(false);
    const previewRef = React.useRef<HTMLDivElement>(null);

    const handleViewportChange = (value: string) => {
        const newWidth = parseInt(value);
        setWidth(newWidth);
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
                            value={width.toString()}
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
                        </ToggleGroup>
                    </div>
                </div>
                <div
                    className="relative flex h-72 max-h-96"
                    style={{
                        contain: "paint, layout, size",
                    }}
                >
                    <div
                        ref={previewRef}
                        className="flex h-full w-full place-content-center items-center rounded-md bg-card p-3 transition-all duration-200"
                    >
                        {children}
                    </div>
                </div>
            </div>
        </ViewportContext.Provider>
    );
}
