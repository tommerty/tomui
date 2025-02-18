import * as React from "react";
import { OpenInV0Button } from "@/components/open-in-v0-button";

import {
    IconBrandGithub,
    IconCode,
    IconLoader2,
    IconProgress,
} from "@tabler/icons-react";
import { Button } from "@/components/ui/button";

// This page displays items from the custom registry.
// You are free to implement this with your own design as needed.

export default function Home() {
    return (
        <div className="flex flex-1 flex-col gap-4 overflow-scroll">
            {Array.from({ length: 20 }).map((_, index) => (
                <div key={index} className="h-12 w-full rounded-lg bg-card" />
            ))}
        </div>
    );
}
