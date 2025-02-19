"use client";

import { Button } from "../ui/button";
import { IconHandLoveYou, IconUser } from "@tabler/icons-react";
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
import { Label } from "../ui/label";

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
            <AdaptiveModalTrigger asChild>
                <div className="flex w-full cursor-pointer items-center rounded-md border bg-card p-3 transition-all duration-150 hover:bg-border">
                    <IconUser size={36} />
                    <div className="flex flex-col">
                        <p className="font-bold">User</p>
                        <p>email@domain.com</p>
                    </div>
                </div>
            </AdaptiveModalTrigger>
            <AdaptiveModalContent>
                <AdaptiveModalHeader>
                    <AdaptiveModalTitle>Edit</AdaptiveModalTitle>
                </AdaptiveModalHeader>
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col">
                        <Label className="text-sm font-semibold">
                            Username
                        </Label>
                        <Input placeholder="user" />
                    </div>
                    <div className="flex flex-col">
                        <Label className="text-sm font-semibold">Email</Label>
                        <Input placeholder="email@domain.com" />
                    </div>
                </div>
                <AdaptiveModalFooter>
                    <Button>Update</Button>
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
