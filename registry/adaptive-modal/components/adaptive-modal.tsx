"use client";

import * as React from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from "@/components/ui/dialog";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
    DrawerFooter,
} from "@/components/ui/drawer";
import { Label } from "@/components/ui/label";

type VariantType = "sheet" | "dialog" | "popover";

const ModalContext = React.createContext<VariantType>("sheet");

interface ModalProps {
    children: React.ReactNode;
    variant?: VariantType;
    forceMobile?: boolean;
}

const useModalVariant = () => React.useContext(ModalContext);

const AdaptiveModal = React.forwardRef<HTMLDivElement, ModalProps>(
    ({ children, variant = "sheet", forceMobile }, ref) => {
        const isMobile = useIsMobile();
        const shouldUseMobileVersion = forceMobile || isMobile;

        if (shouldUseMobileVersion) {
            return <Drawer shouldScaleBackground>{children}</Drawer>;
        }

        return (
            <ModalContext.Provider value={variant}>
                {variant === "dialog" && <Dialog>{children}</Dialog>}
                {variant === "popover" && <Popover>{children}</Popover>}
                {variant === "sheet" && <Sheet>{children}</Sheet>}
            </ModalContext.Provider>
        );
    }
);
AdaptiveModal.displayName = "AdaptiveModal";

const AdaptiveModalTrigger = React.forwardRef<
    HTMLButtonElement,
    React.ComponentPropsWithoutRef<typeof SheetTrigger>
>(({ ...props }, ref) => {
    const variant = useModalVariant();
    const isMobile = useIsMobile();

    if (isMobile) {
        return <DrawerTrigger ref={ref} asChild {...props} />;
    }

    switch (variant) {
        case "dialog":
            return <DialogTrigger ref={ref} asChild {...props} />;
        case "popover":
            return <PopoverTrigger ref={ref} asChild {...props} />;
        default:
            return <SheetTrigger ref={ref} asChild {...props} />;
    }
});
AdaptiveModalTrigger.displayName = "AdaptiveModalTrigger";

const AdaptiveModalContent = React.forwardRef<
    HTMLDivElement,
    Omit<React.ComponentPropsWithoutRef<typeof SheetContent>, "variant">
>(({ className, children, side, ...props }, ref) => {
    const variant = useModalVariant();
    const isMobile = useIsMobile();

    if (isMobile) {
        return (
            <DrawerContent
                className={cn("z-[9999999999] max-h-[80dvh] px-4", className)}
                {...props}
            >
                {children}
            </DrawerContent>
        );
    }

    switch (variant) {
        case "dialog":
            return (
                <DialogContent
                    className={cn("p-4 sm:max-w-[425px]", className)}
                    {...props}
                >
                    {children}
                </DialogContent>
            );
        case "popover":
            return (
                <PopoverContent
                    className={cn("w-[425px]", className)}
                    {...props}
                >
                    {children}
                </PopoverContent>
            );
        default:
            return (
                <SheetContent
                    side={side}
                    className={cn("p-4", className)}
                    {...props}
                >
                    {children}
                </SheetContent>
            );
    }
});
AdaptiveModalContent.displayName = "AdaptiveModalContent";

const AdaptiveModalHeader = ({
    className,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
    const variant = useModalVariant();
    const isMobile = useIsMobile();

    if (isMobile) {
        return (
            <DrawerHeader
                className={cn("justify-start px-0 pt-0 text-left", className)}
                {...props}
            />
        );
    }

    switch (variant) {
        case "dialog":
            return <DialogHeader className={cn("", className)} {...props} />;
        case "sheet":
            return (
                <SheetHeader
                    className={cn("space-y-0 pb-2", className)}
                    {...props}
                />
            );
        default:
            return (
                <div
                    className={cn(
                        "flex flex-col pb-2 text-center sm:text-left",
                        className
                    )}
                    {...props}
                />
            );
    }
};
AdaptiveModalHeader.displayName = "AdaptiveModalHeader";

const AdaptiveModalTitle = React.forwardRef<
    HTMLHeadingElement,
    React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => {
    const variant = useModalVariant();
    const isMobile = useIsMobile();

    if (isMobile) {
        return <DrawerTitle ref={ref} {...props} />;
    }

    switch (variant) {
        case "dialog":
            return <DialogTitle ref={ref} {...props} />;
        case "sheet":
            return <SheetTitle ref={ref} {...props} />;
        default:
            return (
                <p
                    className={cn(
                        "text-lg font-semibold leading-none tracking-tight",
                        className
                    )}
                    ref={ref}
                    {...props}
                />
            );
    }
});
AdaptiveModalTitle.displayName = "AdaptiveModalTitle";

const AdaptiveModalDescription = React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
    const variant = useModalVariant();
    const isMobile = useIsMobile();

    if (isMobile) {
        return <DrawerDescription ref={ref} {...props} />;
    }

    switch (variant) {
        case "dialog":
            return <DialogDescription ref={ref} {...props} />;
        case "sheet":
            return <SheetDescription ref={ref} {...props} />;
        default: {
            return (
                <p
                    ref={ref}
                    className={cn("text-sm text-muted-foreground", className)}
                    {...props}
                />
            );
        }
    }
});
AdaptiveModalDescription.displayName = "AdaptiveModalDescription";

const AdaptiveModalFooter = ({
    className,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
    const variant = useModalVariant();
    const isMobile = useIsMobile();

    if (isMobile) {
        return <DrawerFooter {...props} />;
    }

    switch (variant) {
        case "dialog":
            return <DialogFooter {...props} />;
        default:
            return (
                <div
                    className={cn(
                        "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
                        className
                    )}
                    {...props}
                />
            );
    }
};
AdaptiveModalFooter.displayName = "AdaptiveModalFooter";

export {
    AdaptiveModal,
    AdaptiveModalTrigger,
    AdaptiveModalContent,
    AdaptiveModalHeader,
    AdaptiveModalTitle,
    AdaptiveModalDescription,
    AdaptiveModalFooter,
};
