"use client";

import UnifiedModal from "@/registry/unified-modal/components/unified-modal";
import { Button } from "../ui/button";
import { IconHandLoveYou } from "@tabler/icons-react";
import { Input } from "../ui/input";

export default function UnifiedModalExample1() {
    return (
        <UnifiedModal
            title="Modal Title"
            subTitle="Subtitle to explain things"
            description="Also a description"
            trigger={<Button>Sheet/Drawer Example</Button>}
        >
            <div>
                This is the content of the modal. On desktop it can be a sheet,
                popover, or dialog. On mobile, it will use a drawer
            </div>
        </UnifiedModal>
    );
}
export function UnifiedModalExampleDialog() {
    return (
        <UnifiedModal
            variant="dialog"
            title="Welcome back!"
            subTitle="We're so excited to have you back!"
            icon={<IconHandLoveYou />}
            color="bg-red-500"
            trigger={<Button>Dialog/Drawer Example</Button>}
            footer={
                <div className="mt-4 flex w-full justify-end gap-2">
                    <Button variant="secondary">Cancel</Button>
                    <Button>Lets Go</Button>
                </div>
            }
        >
            <div className="flex flex-col gap-1">
                <Input placeholder="How are you?" />
            </div>
        </UnifiedModal>
    );
}
export function UnifiedModalExamplePopover() {
    return (
        <UnifiedModal
            variant="popover"
            title="Modal Title"
            subTitle="Subtitle to explain things"
            description="Also a description"
            trigger={<Button>Popover/Drawer Example</Button>}
            icon={<IconHandLoveYou />}
            color="bg-red-500"
        >
            <div>
                This is the content of the modal. On desktop it can be a sheet,
                popover, or dialog. On mobile, it will use a drawer
            </div>
        </UnifiedModal>
    );
}
