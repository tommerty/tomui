"use client";

import { Button } from "../ui/button";
import { IconHandLoveYou } from "@tabler/icons-react";
import { Input } from "../ui/input";
import {
    AdaptiveModal,
    AdaptiveModalTrigger,
    AdaptiveModalContent,
    AdaptiveModalHeader,
    AdaptiveModalTitle,
    AdaptiveModalDescription,
    AdaptiveModalFooter,
} from "@/registry/adaptive-modal/components/adaptive-modal";

export default function AdaptiveModalExample1() {
    return (
        <AdaptiveModal>
            <AdaptiveModalTrigger>
                <Button>Sheet</Button>
            </AdaptiveModalTrigger>
            <AdaptiveModalContent>
                <AdaptiveModalHeader>
                    <AdaptiveModalTitle>Welcome</AdaptiveModalTitle>
                    <AdaptiveModalDescription>
                        This is a description
                    </AdaptiveModalDescription>
                </AdaptiveModalHeader>
                <div>Content goes here</div>
                <AdaptiveModalFooter>
                    <Button>Save changes</Button>
                </AdaptiveModalFooter>
            </AdaptiveModalContent>
        </AdaptiveModal>
    );
}
export function AdaptiveModalExampleDialog() {
    return (
        <AdaptiveModal variant="dialog">
            <AdaptiveModalTrigger>
                <Button>Dialog</Button>
            </AdaptiveModalTrigger>
            <AdaptiveModalContent>
                <AdaptiveModalHeader>
                    <AdaptiveModalTitle>Welcome</AdaptiveModalTitle>
                    <AdaptiveModalDescription>
                        This is a description
                    </AdaptiveModalDescription>
                </AdaptiveModalHeader>
                <div>Content goes here</div>
                <AdaptiveModalFooter>
                    <Button>Save changes</Button>
                </AdaptiveModalFooter>
            </AdaptiveModalContent>
        </AdaptiveModal>
    );
}
export function AdaptiveModalExamplePopover() {
    return (
        <AdaptiveModal variant="popover">
            <AdaptiveModalTrigger>
                <Button>Popover</Button>
            </AdaptiveModalTrigger>
            <AdaptiveModalContent>
                <AdaptiveModalHeader>
                    <AdaptiveModalTitle>Welcome</AdaptiveModalTitle>
                    <AdaptiveModalDescription>
                        This is a description
                    </AdaptiveModalDescription>
                </AdaptiveModalHeader>
                <div>Content goes here</div>
                <AdaptiveModalFooter>
                    <Button>Save changes</Button>
                </AdaptiveModalFooter>
            </AdaptiveModalContent>
        </AdaptiveModal>
    );
}
