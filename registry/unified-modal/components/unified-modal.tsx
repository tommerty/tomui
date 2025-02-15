"use client";
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
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";
import { useIsMobile } from "@/hooks/use-mobile";
import * as icon from "@tabler/icons-react";
import { cn } from "@/lib/utils";
interface Props {
    children: React.ReactNode;
    icon?: React.ReactNode;
    title: string;
    subTitle?: string;
    description?: string;
    trigger: React.ReactNode;
    footer?: React.ReactNode;
    color?: string;
    side?: "left" | "right" | "top" | "bottom";
    forceMobile?: boolean;
    contentClassName?: string;
    hideTop?: boolean;
    variant?: "sheet" | "dialog" | "popover";
}

export default function UnifiedModal({
    children,
    icon,
    title,
    subTitle,
    description,
    trigger,
    footer,
    color,
    side,
    forceMobile,
    contentClassName,
    hideTop,
    variant = "sheet", // Default to sheet
}: Props) {
    const isMobile = useIsMobile();

    const shouldUseMobileVersion = forceMobile || isMobile;

    if (shouldUseMobileVersion) {
        return (
            <Drawer shouldScaleBackground={true}>
                <DrawerTrigger asChild>{trigger}</DrawerTrigger>
                <DrawerContent
                    className={cn(
                        "z-[9999999999] max-h-[80dvh] px-4",
                        contentClassName
                    )}
                >
                    <DrawerHeader className={cn("px-0 pt-0")}>
                        {icon ? (
                            <div className="flex items-center gap-2">
                                <div
                                    className={cn(
                                        "rounded-md p-2",
                                        color ? color : "bg-primary"
                                    )}
                                >
                                    {icon}
                                </div>
                                <div className="flex flex-col justify-between gap-0">
                                    {title && (
                                        <DrawerTitle>{title}</DrawerTitle>
                                    )}
                                    {subTitle && (
                                        <DrawerTitle className="text-base text-muted-foreground">
                                            {subTitle}
                                        </DrawerTitle>
                                    )}
                                    {description && (
                                        <DrawerDescription>
                                            {description}
                                        </DrawerDescription>
                                    )}
                                </div>
                            </div>
                        ) : (
                            <>
                                {title && <DrawerTitle>{title}</DrawerTitle>}
                                {subTitle && (
                                    <DrawerTitle className="text-base text-muted-foreground">
                                        {subTitle}
                                    </DrawerTitle>
                                )}
                                {description && (
                                    <DrawerDescription>
                                        {description}
                                    </DrawerDescription>
                                )}
                            </>
                        )}
                    </DrawerHeader>
                    <div className="h-full overflow-auto">
                        {children}
                        {footer && <DrawerFooter>{footer}</DrawerFooter>}
                    </div>
                </DrawerContent>
            </Drawer>
        );
    }
    // Desktop variants
    if (variant === "dialog") {
        return (
            <Dialog>
                <DialogTrigger asChild>{trigger}</DialogTrigger>
                <DialogContent
                    className={cn("sm:max-w-[425px]", contentClassName)}
                >
                    <DialogHeader>
                        {icon ? (
                            <div className="flex items-center gap-2">
                                <div
                                    className={cn(
                                        "rounded-md p-2",
                                        color ? color : "bg-primary"
                                    )}
                                >
                                    {icon}
                                </div>
                                <div className="flex flex-col justify-between gap-0">
                                    {title && (
                                        <DialogTitle>{title}</DialogTitle>
                                    )}
                                    {subTitle && (
                                        <div className="text-base text-muted-foreground">
                                            {subTitle}
                                        </div>
                                    )}
                                    {description && (
                                        <DialogDescription>
                                            {description}
                                        </DialogDescription>
                                    )}
                                </div>
                            </div>
                        ) : (
                            <>
                                {title && <DialogTitle>{title}</DialogTitle>}
                                {subTitle && (
                                    <div className="text-base text-muted-foreground">
                                        {subTitle}
                                    </div>
                                )}
                                {description && (
                                    <DialogDescription>
                                        {description}
                                    </DialogDescription>
                                )}
                            </>
                        )}
                    </DialogHeader>
                    <div className="h-full overflow-auto">
                        {children}
                        {footer ? <DialogFooter>{footer}</DialogFooter> : null}
                    </div>
                </DialogContent>
            </Dialog>
        );
    }

    if (variant === "popover") {
        return (
            <Popover>
                <PopoverTrigger asChild>{trigger}</PopoverTrigger>
                <PopoverContent className={cn("w-[425px]", contentClassName)}>
                    <div className="flex flex-col gap-4">
                        {icon ? (
                            <div className="flex items-center gap-2">
                                <div
                                    className={cn(
                                        "rounded-md p-2",
                                        color ? color : "bg-primary"
                                    )}
                                >
                                    {icon}
                                </div>
                                <div className="flex flex-col justify-between gap-0">
                                    {title && (
                                        <p className="text-lg font-semibold leading-none tracking-tight">
                                            {title}
                                        </p>
                                    )}
                                    {subTitle && (
                                        <div className="text-base text-muted-foreground">
                                            {subTitle}
                                        </div>
                                    )}
                                    {description && (
                                        <p className="text-sm text-muted-foreground">
                                            {description}
                                        </p>
                                    )}
                                </div>
                            </div>
                        ) : (
                            <>
                                {title && <DialogTitle>{title}</DialogTitle>}
                                {subTitle && (
                                    <div className="text-base text-muted-foreground">
                                        {subTitle}
                                    </div>
                                )}
                                {description && (
                                    <DialogDescription>
                                        {description}
                                    </DialogDescription>
                                )}
                            </>
                        )}
                        {children}
                        {footer}
                    </div>
                </PopoverContent>
            </Popover>
        );
    }

    // Default sheet variant
    return (
        <Sheet>
            <SheetTrigger asChild>{trigger}</SheetTrigger>
            <SheetContent side={side ? side : "right"} className="p-4">
                <SheetHeader className="border-b">
                    {icon ? (
                        <div className="flex items-center gap-2">
                            <div
                                className={cn(
                                    "rounded-md p-2",
                                    color ? color : "bg-primary"
                                )}
                            >
                                {icon}
                            </div>
                            <div className="flex flex-col justify-between gap-0">
                                {title && <SheetTitle>{title}</SheetTitle>}
                                {subTitle && (
                                    <DrawerTitle className="text-base text-muted-foreground">
                                        {subTitle}
                                    </DrawerTitle>
                                )}
                                {description && (
                                    <SheetDescription>
                                        {description}
                                    </SheetDescription>
                                )}
                            </div>
                        </div>
                    ) : (
                        <>
                            {title && <SheetTitle>{title}</SheetTitle>}
                            {subTitle && (
                                <DrawerTitle className="text-base text-muted-foreground">
                                    {subTitle}
                                </DrawerTitle>
                            )}
                            {description && (
                                <SheetDescription>
                                    {description}
                                </SheetDescription>
                            )}
                        </>
                    )}
                </SheetHeader>
                <div className="h-full overflow-auto pb-16">
                    {children}
                    {footer}
                </div>
            </SheetContent>
        </Sheet>
    );
}
