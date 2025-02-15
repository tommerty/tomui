import UnifiedModalExample1, {
    UnifiedModalExampleDialog,
    UnifiedModalExamplePopover,
} from "@/components/examples/unified-modal-example-1";
import { JSX } from "react";
import * as tabler from "@tabler/icons-react";

export type ComponentItem = {
    title: string;
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
        title: "Unified Modal",
        iconName: "IconLayoutDashboard",
        example: UnifiedModalExample1,
        description:
            "A single modal that you can use to display any content, depending on if mobile or not. Using the variant prop you can choose between a sheet, dialog or popover.",
        code: "unified-modal",
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
                name: "icon",
                type: "React.ReactNode",
                description: "Optional icon component displayed in the header",
            },
            {
                name: "title",
                type: "string",
                required: true,
                description: "Main heading text",
            },
            {
                name: "subTitle",
                type: "string",
                description: "Secondary heading text",
            },
            {
                name: "description",
                type: "string",
                description: "Descriptive text below the title",
            },
            {
                name: "trigger",
                type: "React.ReactNode",
                required: true,
                description: "Element that triggers the modal",
            },
            {
                name: "footer",
                type: "React.ReactNode",
                description: "Content to be displayed in the modal footer",
            },
            {
                name: "color",
                type: "string",
                description: "Custom color class for the icon background",
            },
            {
                name: "side",
                type: '"left" | "right" | "top" | "bottom"',
                default: "right",
                description: "Position of the sheet variant",
            },
            {
                name: "forceMobile",
                type: "boolean",
                description:
                    "Forces mobile drawer view regardless of screen size",
            },
            {
                name: "contentClassName",
                type: "string",
                description: "Additional classes for the modal content wrapper",
            },
            {
                name: "hideTop",
                type: "boolean",
                description: "Option to hide the top section of the modal",
            },
        ],
        alternativeExamples: [
            {
                title: "Display a dialog instead of sheet on desktop",
                description:
                    "Utilizing the variant prop, we can display a dialog instead of a sheet on desktop.",
                exampleComponent: UnifiedModalExampleDialog,
            },
            {
                title: "Display a popover instead of sheet on desktop",
                description:
                    "Utilizing the variant prop, we can display a dialog instead of a sheet on desktop.",
                exampleComponent: UnifiedModalExamplePopover,
            },
        ],
        usage: `<UnifiedModal
    variant="popover" // Optional. Set to sheet, dialog, popover. Sheet is default
    title="Modal Title" // Required. title of the modal
    subTitle="Subtitle to explain things" // Optional. subtitle of the modal
    description="Also a description" // Optional. description of the modal
    trigger={<Button>Popover/Drawer Example</Button>} // Required. trigger to open the modal
    icon={<IconHandLoveYou />} // Optional. icon to display in the modal
    color="bg-red-500" // Optional. color of the icon
    >
    <div>
        This is the content of the modal. On desktop it can be a sheet,
        popover, or dialog. On mobile, it will use a drawer
    </div>
</UnifiedModal>`,
    },
];
