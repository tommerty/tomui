import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const ctaVariants = cva(
    "relative flex rounded-md border bg-card transition-all",
    {
        variants: {
            variant: {
                default: "bg-card shadow-sm",
                highlight:
                    "border-primary bg-primary/20 backdrop-blur-sm shadow-sm",
                centered: "flex-col items-center text-center",
                banner: "w-fit flex-col md:flex-row !p-1 !pl-3",
                minimal: "border-none shadow-none w-full",
            },
            size: {
                default: "gap-4 p-4",
                sm: "gap-2 p-2",
                lg: "gap-6 p-6",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
);

type CallToActionVariants = VariantProps<typeof ctaVariants>;
type CallToActionVariant = NonNullable<CallToActionVariants["variant"]>;

const CallToActionContext = React.createContext<{
    variant?: CallToActionVariant;
}>({});

const CallToAction = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof ctaVariants>
>(({ className, variant = "default", size, ...props }, ref) => (
    <CallToActionContext.Provider
        value={{ variant: variant as CallToActionVariant }}
    >
        <div
            ref={ref}
            className={cn(ctaVariants({ variant, size, className }))}
            {...props}
        />
    </CallToActionContext.Provider>
));
CallToAction.displayName = "CallToAction";

const CallToActionContent = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
    const { variant } = React.useContext(CallToActionContext);
    return (
        <div
            ref={ref}
            className={cn(
                "flex flex-col gap-2",
                variant === "banner" && "mx-auto flex-row items-center",
                className
            )}
            {...props}
        />
    );
});
CallToActionContent.displayName = "CallToActionContent";

const CallToActionTitle = React.forwardRef<
    HTMLHeadingElement,
    React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => {
    const { variant } = React.useContext(CallToActionContext);
    return (
        <h3
            ref={ref}
            className={cn(
                "text-2xl font-semibold tracking-tight text-foreground",
                variant === "minimal" && "text-lg font-normal",
                variant === "highlight" && "text-2xl font-bold",
                variant === "banner" && "text-sm",
                className
            )}
            {...props}
        />
    );
});
CallToActionTitle.displayName = "CallToActionTitle";

const CallToActionDescription = React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
    const { variant } = React.useContext(CallToActionContext);
    return (
        <p
            ref={ref}
            className={cn(
                "text-muted-foreground",
                variant === "minimal" && "text-sm",
                variant === "banner" && "text-sm",
                className
            )}
            {...props}
        />
    );
});
CallToActionDescription.displayName = "CallToActionDescription";

const CallToActionAction = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
    const { variant } = React.useContext(CallToActionContext);
    return (
        <div
            ref={ref}
            className={cn(
                "mt-auto flex items-center gap-2 text-foreground",
                variant === "minimal" && "mt-2",
                variant === "banner" && "ml-auto",
                className
            )}
            {...props}
        />
    );
});
CallToActionAction.displayName = "CallToActionAction";

const CallToActionMedia = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
    const { variant } = React.useContext(CallToActionContext);
    return (
        <div
            ref={ref}
            className={cn(
                "flex items-center",
                variant === "banner" && "w-full md:w-1/3",
                className
            )}
            {...props}
        />
    );
});
CallToActionMedia.displayName = "CallToActionMedia";

export {
    CallToAction,
    CallToActionContent,
    CallToActionTitle,
    CallToActionDescription,
    CallToActionAction,
    CallToActionMedia,
};
