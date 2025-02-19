import * as React from "react";
import { useViewport } from "@/components/ui/render/ComponentBlockViewer";

export function useIsMobile() {
    const viewport = useViewport();
    const [isMobile, setIsMobile] = React.useState<boolean>(false);

    React.useEffect(() => {
        const mql = window.matchMedia(`(max-width: 767px)`);
        const onChange = () => {
            setIsMobile(window.innerWidth < 768);
        };

        // If we're in the ComponentBlockViewer context, use that value
        if (viewport) {
            setIsMobile(viewport.isMobile);
            return;
        }

        // Otherwise use the regular mobile detection
        mql.addEventListener("change", onChange);
        setIsMobile(window.innerWidth < 768);
        return () => mql.removeEventListener("change", onChange);
    }, [viewport]);

    return viewport ? viewport.isMobile : isMobile;
}
