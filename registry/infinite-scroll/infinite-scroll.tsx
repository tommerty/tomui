"use client";

import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";
import FastMarquee from "react-fast-marquee";
import type { MarqueeProps as ScrollProps } from "react-fast-marquee";

export type MarqueeProps = HTMLAttributes<HTMLDivElement> & {
    showFade?: boolean;
};

export const InfiniteScroll = ({
    className,
    showFade = true,
    ...props
}: MarqueeProps) => (
    <div
        className={cn("relative w-full overflow-hidden", className)}
        {...props}
    >
        {showFade && (
            <>
                <div className="absolute bottom-0 left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-background to-transparent" />
                <div className="absolute bottom-0 right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-background to-transparent" />
            </>
        )}
        {props.children}
    </div>
);

export type InfiniteScrollContentProps = ScrollProps;

export const InfiniteScrollContent = ({
    loop = 0,
    autoFill = false,
    pauseOnHover = false,
    ...props
}: InfiniteScrollContentProps) => (
    <FastMarquee
        loop={loop}
        autoFill={autoFill}
        pauseOnHover={pauseOnHover}
        {...props}
    />
);

export type InfiniteScrollItemProps = HTMLAttributes<HTMLDivElement> & {
    zoom?: "none" | "sm" | "md" | "lg";
};
const zoomToScale = {
    none: "",
    sm: "hover:scale-110",
    md: "hover:scale-125",
    lg: "hover:scale-150",
} as const;
export const InfiniteScrollItem = ({
    className,
    zoom = "none",
    ...props
}: InfiniteScrollItemProps) => (
    <div
        className={cn(
            "scale- mx-2 flex-shrink-0 object-contain transition-all duration-150",
            zoomToScale[zoom as keyof typeof zoomToScale],
            className
        )}
        {...props}
    />
);
