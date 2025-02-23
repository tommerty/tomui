"use client";

import {
    InfiniteScroll,
    InfiniteScrollItem,
    InfiniteScrollContent,
} from "@/registry/infinite-scroll/infinite-scroll";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import {
    AdaptiveModal,
    AdaptiveModalTrigger,
    AdaptiveModalContent,
    AdaptiveModalHeader,
    AdaptiveModalTitle,
    AdaptiveModalDescription,
    AdaptiveModalFooter,
} from "@/registry/adaptive-modal/components/adaptive-modal";

export default function InfiniteScrollExample() {
    const isMobile = useIsMobile();
    const randomAvatars = Array.from({ length: 20 }, (_, i) => i + 1).sort(
        () => Math.random() - 0.5
    );
    return (
        <div className="flex w-full">
            <InfiniteScroll>
                <InfiniteScrollContent pauseOnHover={false}>
                    {randomAvatars.map((num, index) => (
                        <InfiniteScrollItem
                            key={index}
                            className="flex flex-col items-center gap-2"
                        >
                            <img
                                src={`https://cdn.doras.to/placeholders/headshots/${num}.webp`}
                                alt={`Placeholder image ${num}`}
                                className={cn(
                                    "overflow-hidden rounded-full",
                                    isMobile ? "size-12" : "size-24"
                                )}
                                loading="eager"
                                decoding="async"
                            />
                            <p>User {num}</p>
                        </InfiniteScrollItem>
                    ))}
                </InfiniteScrollContent>
            </InfiniteScroll>
        </div>
    );
}
export function InfiniteScrollExample2() {
    const isMobile = useIsMobile();
    const randomAvatars = Array.from({ length: 20 }, (_, i) => i + 1).sort(
        () => Math.random() - 0.5
    );
    return (
        <div className="flex w-full">
            <InfiniteScroll showFade={false}>
                <InfiniteScrollContent pauseOnHover={true}>
                    {randomAvatars.map((num, index) => (
                        <InfiniteScrollItem
                            key={index}
                            className="-mx-3 flex flex-col items-center gap-2 rounded-full border-2 border-red-400 bg-card"
                        >
                            <img
                                src={`https://cdn.doras.to/placeholders/headshots/${num}.webp`}
                                alt={`Placeholder image ${num}`}
                                className={cn(
                                    "overflow-hidden rounded-full",
                                    isMobile ? "size-12" : "size-24"
                                )}
                                loading="eager"
                                decoding="async"
                            />
                        </InfiniteScrollItem>
                    ))}
                </InfiniteScrollContent>
            </InfiniteScroll>
        </div>
    );
}
