"use client";

import { Button } from "@/components/ui/button";
import {
    CallToAction,
    CallToActionContent,
    CallToActionTitle,
    CallToActionDescription,
    CallToActionAction,
    CallToActionMedia,
} from "@/registry/call-to-action/components/call-to-action";
import Image from "next/image";

export default function CallToActionExample() {
    return (
        <CallToAction>
            <CallToActionContent>
                <CallToActionTitle>
                    The ultimate tool for creators
                </CallToActionTitle>
                <CallToActionDescription>
                    Enhance how your audience engages with your content. Create
                    a link in bio, blog, forms, and more.
                </CallToActionDescription>
                <CallToActionAction>
                    <Button size="lg" className="font-bold">
                        Get Started
                    </Button>
                </CallToActionAction>
            </CallToActionContent>
            <CallToActionMedia>
                <div className="relative h-36 w-36">
                    <Image
                        src="https://cdn.doras.to/doras/assets/83bda65b-8d42-4011-9bf0-ab23402776f2/1444ffe0-a86d-413f-8278-9753e84d1eb5.png"
                        alt="Preview"
                        fill
                        className="object-cover"
                    />
                </div>
            </CallToActionMedia>
        </CallToAction>
    );
}

export function CallToActionHighlight() {
    return (
        <CallToAction variant="highlight">
            <CallToActionContent>
                <CallToActionTitle>Try Premium Features</CallToActionTitle>
                <CallToActionDescription>
                    Get access to all premium components and features with our
                    Pro plan.
                </CallToActionDescription>
                <CallToActionAction>
                    <Button variant="default">Upgrade Now</Button>
                </CallToActionAction>
            </CallToActionContent>
        </CallToAction>
    );
}

export function CallToActionBanner() {
    return (
        <CallToAction variant="banner">
            <CallToActionContent>
                <CallToActionTitle>Update</CallToActionTitle>

                <CallToActionAction>
                    <Button variant="outline" size={"sm"}>
                        New UI and more
                    </Button>
                </CallToActionAction>
            </CallToActionContent>
        </CallToAction>
    );
}
export function CallToActionMinimal() {
    return (
        <CallToAction variant="minimal">
            <CallToActionContent>
                <CallToActionTitle>Join Our Newsletter</CallToActionTitle>
                <CallToActionDescription>
                    Stay updated with our latest components and features.
                </CallToActionDescription>
                <CallToActionAction>
                    <Button variant="outline">Subscribe</Button>
                </CallToActionAction>
            </CallToActionContent>
        </CallToAction>
    );
}
