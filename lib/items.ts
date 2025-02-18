import UnifiedModalExample1, {
    AdaptiveModalExampleDialog,
    AdaptiveModalExamplePopover,
} from "@/components/examples/unified-modal-example-1";
import { JSX } from "react";
import * as tabler from "@tabler/icons-react";
import AdaptiveModalExample1 from "@/components/examples/unified-modal-example-1";

export type ComponentItem = {
    title: string;
    group: string;
    iconName: keyof typeof tabler;
    example: () => JSX.Element;
    description: string;
    code: string;
    props?: {
        name: string;
        type: string;
        description: string;
        required?: boolean;
        default?: string;
    }[];
    alternativeExamples?: {
        title: string;
        description: string;
        exampleComponent: () => JSX.Element;
    }[];
    usage: string;
};
export const components: ComponentItem[] = [
    {
        title: "Adaptive Modal",
        group: "Modal",
        iconName: "IconLayoutDashboard",
        example: AdaptiveModalExample1,
        description:
            "A single modal that you can use to display any content, depending on if mobile or not. If you're viewing on a mobile device, the modal will always be a drawer. Using the variant prop you can choose between a sheet, dialog or popover.",
        code: "adaptive-modal",
        props: [
            {
                name: "variant",
                type: '"sheet" | "dialog" | "popover"',
                default: "sheet",
                description: "Controls the display style on desktop devices",
            },
            {
                name: "children",
                type: "React.ReactNode",
                required: true,
                description: "Content to be displayed inside the modal",
            },
            {
                name: "forceMobile",
                type: "boolean",
                description:
                    "Forces mobile drawer view regardless of screen size",
            },
        ],
        alternativeExamples: [
            {
                title: "Display a dialog instead of sheet on desktop",
                description:
                    "Utilizing the variant prop, we can display a dialog instead of a sheet on desktop.",
                exampleComponent: AdaptiveModalExampleDialog,
            },
            {
                title: "Display a popover instead of sheet on desktop",
                description:
                    "Utilizing the variant prop, we can display a dialog instead of a sheet on desktop.",
                exampleComponent: AdaptiveModalExamplePopover,
            },
        ],
        usage: `import {
    AdaptiveModal,
    AdaptiveModalTrigger,
    AdaptiveModalContent,
    AdaptiveModalHeader,
    AdaptiveModalTitle,
    AdaptiveModalDescription,
    AdaptiveModalFooter,
} from "@/ui/tommertyui/adaptive-modal";

<AdaptiveModal variant="dialog">
    <AdaptiveModalTrigger asChild>
        <Button>Open Modal</Button>
    </AdaptiveModalTrigger>
    <AdaptiveModalContent>
        <AdaptiveModalHeader>
            <AdaptiveModalTitle>Modal Title</AdaptiveModalTitle>
            <AdaptiveModalDescription>Modal Description</AdaptiveModalDescription>
        </AdaptiveModalHeader>
        <div>Your content here</div>
        <AdaptiveModalFooter>
            <Button>Action</Button>
        </AdaptiveModalFooter>
    </AdaptiveModalContent>
</AdaptiveModal>`,
    },
];
