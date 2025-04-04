import UnifiedModalExample1, {
    AdaptiveModalExampleDialog,
    AdaptiveModalExamplePopover,
} from "@/components/examples/unified-modal-example-1";
import { JSX } from "react";
import * as tabler from "@tabler/icons-react";
import AdaptiveModalExample1 from "@/components/examples/unified-modal-example-1";
import CodeCopyExample, {
    CodeCopyMinimal,
} from "@/components/examples/code-snippet";
import InfiniteScrollExample, {
    InfiniteScrollExample2,
} from "@/components/examples/infinite-scroll";
import CallToActionExample, {
    CallToActionBanner,
    CallToActionHighlight,
    CallToActionMinimal,
} from "@/components/examples/call-to-action";
import { FAQExample } from "@/components/examples/faq";
import { RootLayoutClient } from "@/components/examples/sidebar/root";
import { RootLayoutClient2 } from "@/components/examples/sidebar/root2";
import { RootLayoutClient3 } from "@/components/examples/sidebar/root3";

export type ComponentItem = {
    title: string;
    group: string;
    iconName: keyof typeof tabler;
    example: () => JSX.Element;
    exampleName?: string;
    description: string;
    inspiredBy?: {
        title: string;
        url: string;
    };
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
        code?: string;
    }[];
    req?: {
        title: string;
        url: string;
    }[];
    usage: string;
};
export const components: ComponentItem[] = [
    {
        title: "Adaptive Modal",
        group: "Modal",
        iconName: "IconLayoutDashboard",
        example: AdaptiveModalExample1,
        exampleName: "Adaptive Modal",
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
                title: "Dialog",
                description:
                    "Utilizing the variant prop, we can display a dialog instead of a sheet on desktop.",
                exampleComponent: AdaptiveModalExampleDialog,
            },
            {
                title: "Popover",
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
    {
        title: "Code Snippet",
        group: "Misc",
        iconName: "IconCode",
        example: CodeCopyExample,
        exampleName: "Code Snippet",
        description:
            "A versatile code snippet component with copy functionality and multiple display variants. Supports tabs for different code examples and syntax highlighting.",
        code: "code-snippet",
        props: [
            {
                name: "code",
                type: "string",
                required: true,
                description: "The code content to display",
            },
            {
                name: "language",
                type: "string",
                default: "bash",
                description: "Programming language for syntax highlighting",
            },
            {
                name: "variant",
                type: '"default" | "minimal"',
                default: "default",
                description: "Display style of the code snippet",
            },
            {
                name: "className",
                type: "string",
                description: "Additional classes for the component",
            },
            {
                name: "containerClassName",
                type: "string",
                description: "Classes for the container element",
            },
            {
                name: "preClassName",
                type: "string",
                description: "Classes for the pre element",
            },
            {
                name: "tabsListClassName",
                type: "string",
                description: "Classes for the tabs list",
            },
            {
                name: "tabsTriggerClassName",
                type: "string",
                description: "Classes for tab triggers",
            },
            {
                name: "tabsContentClassName",
                type: "string",
                description: "Classes for tabs content",
            },
            {
                name: "copyButtonClassName",
                type: "string",
                description: "Classes for the copy button",
            },
            {
                name: "tabs",
                type: "{ label: string; code: string; language?: string; }[]",
                description:
                    "Array of tab configurations for multiple code examples",
            },
        ],
        alternativeExamples: [
            {
                title: "Minimal",
                description:
                    "A simplified version with just code and copy button",
                exampleComponent: CodeCopyMinimal,
            },
        ],
        usage: `import { CodeSnippet } from "@/components/ui/code-snippet";
    
    // Default with tabs
    <CodeSnippet
      code="npm install @shadcn/ui"
      tabs={[
        {
          label: "npm",
          code: "npm install @shadcn/ui",
        },
        {
          label: "pnpm",
          code: "pnpm add @shadcn/ui",
        },
        {
          label: "yarn",
          code: "yarn add @shadcn/ui",
        },
      ]}
    />
    
    // Minimal variant
    <CodeSnippet
      code="git clone https://github.com/shadcn/ui.git"
      variant="minimal"
    />`,
    },
    {
        title: "Infinite Scroll",
        group: "Marketing",
        iconName: "IconKeyframes",
        example: InfiniteScrollExample,
        exampleName: "Infinite Scroll",
        description:
            "A simple infinite scrolling component for displaying long lists of content. Useful for landing pages showing off supporters or companies using your product.",
        code: "infinite-scroll",
        inspiredBy: {
            title: "Kibo UI",
            url: "https://www.kibo-ui.com/components/marquee",
        },
        req: [
            {
                title: "react-fast-marquee",
                url: "https://www.react-fast-marquee.com/",
            },
        ],
        props: [
            {
                name: "showFade",
                type: "boolean",
                default: "true",
                description:
                    "Shows gradient fade effect on the edges of the scroll",
            },
            {
                name: "loop",
                type: "number",
                default: "0",
                description:
                    "Number of times to loop the content (0 for infinite)",
            },
            {
                name: "autoFill",
                type: "boolean",
                default: "false",
                description:
                    "Automatically fills the empty space by duplicating children",
            },
            {
                name: "pauseOnHover",
                type: "boolean",
                default: "false",
                description:
                    "Pauses the animation when hovering over the content",
            },
            {
                name: "className",
                type: "string",
                description: "Additional classes for styling",
            },
        ],
        alternativeExamples: [
            {
                title: "No fade & pause",
                description:
                    "No fade effect on the edges of the scroll and also having it stop on hover",
                exampleComponent: InfiniteScrollExample2,
            },
        ],
        usage: `import { InfiniteScroll, InfiniteScrollContent, InfiniteScrollItem } from "@/components/tomui/infinite-scroll";

<InfiniteScroll>
    <InfiniteScrollContent pauseOnHover>
        {items.map((item, index) => (
            <InfiniteScrollItem key={index} className="flex items-center gap-2">
                <img 
                    src={item.image} 
                    alt={item.name}
                    className="size-24 rounded-full"
                />
                <span>{item.name}</span>
            </InfiniteScrollItem>
        ))}
    </InfiniteScrollContent>
</InfiniteScroll>`,
    },
    {
        title: "Call To Action",
        group: "Marketing",
        iconName: "IconHeartStar",
        example: CallToActionExample,
        exampleName: "Call To Action",
        description:
            "A versatile Call To Action component with multiple variants for creating engaging sections. Perfect for marketing pages, hero sections, and promotional content.",
        code: "call-to-action",
        props: [
            {
                name: "variant",
                type: '"default" | "highlight" | "centered" | "banner" | "minimal"',
                default: "default",
                description: "Controls the visual style of the CTA",
            },
            {
                name: "size",
                type: '"default" | "sm" | "lg"',
                default: "default",
                description: "Sets the size and padding of the CTA",
            },
        ],
        alternativeExamples: [
            {
                title: "Highlight",
                description: "A highlighted version with primary color accents",
                exampleComponent: CallToActionHighlight,
                code: `<CallToAction variant="highlight">
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
</CallToAction>`,
            },
            {
                title: "Banner",
                description: "Full-width banner style with responsive layout",
                exampleComponent: CallToActionBanner,
                code: `<CallToAction variant="banner">
    <CallToActionContent>
        <CallToActionTitle>Update</CallToActionTitle>
        <CallToActionAction>
            <Button variant="outline" size={"sm"}>
                New UI and more
            </Button>
        </CallToActionAction>
    </CallToActionContent>
</CallToAction>`,
            },
            {
                title: "Minimal",
                description: "A minimal style with a subtle background",
                exampleComponent: CallToActionMinimal,
                code: `<CallToAction variant="minimal">
    <CallToActionContent>
        <CallToActionTitle>Join Our Newsletter</CallToActionTitle>
        <CallToActionDescription>
            Stay updated with our latest components and features.
        </CallToActionDescription>
        <CallToActionAction>
            <Button variant="outline">Subscribe</Button>
        </CallToActionAction>
    </CallToActionContent>
</CallToAction>`,
            },
        ],
        usage: `<CallToAction>
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
                src="..."
                alt="Preview"
                fill
                className="object-cover"
                />
        </div>
    </CallToActionMedia>
</CallToAction>`,
    },
    {
        title: "FAQ",
        group: "Marketing",
        iconName: "IconQuestionMark",
        example: FAQExample,
        exampleName: "FAQ",
        props: [
            {
                name: "faq",
                type: "FAQTypes[]",
                default: "[]",
                description: "Array of FAQ items",
            },
            {
                name: "title",
                type: "string",
                default: "undefined",
                description: "The title of the FAQ section",
            },
            // Properties inside each FAQTypes item
            {
                name: "faq[].question",
                type: "string",
                required: true,
                description: "The question text to display in the FAQ item",
            },
            {
                name: "faq[].answer",
                type: "string",
                required: true,
                description: "The answer text for the FAQ item",
            },
            {
                name: "faq[].category",
                type: "string",
                default: "Uncategorized",
                description: "Optional category to group FAQ items",
            },
            {
                name: "faq[].footer",
                type: "React.ReactNode",
                description:
                    "Optional additional content to display below the answer, such as links or buttons",
            },
        ],

        description:
            "A styled accordion, based off the shadcn/ui accordion component. Provides a customizable FAQ component for answering common questions and providing support. Supports categories, collapsible items, and responsive design.",
        code: "faq",
        usage: `// Define your FAQ items
    const faqItems: FAQTypes[] = [
      {
        question: "What is this product?",
        category: "General",
        answer: "This is a fantastic product that solves all your problems.",
      },
      {
        question: "How much does it cost?",
        category: "Pricing",
        answer: "Our pricing starts at $9.99 per month with a free tier available.",
      },
      {
        question: "Do you offer support?",
        category: "Support",
        answer: "Yes, we offer 24/7 support for all paid plans.",
        footer: (
          <a href="#" className="text-primary hover:underline">
            Contact our support team
          </a>
        ),
      },
    ];
    
    // Use the FAQ component
    <FAQ 
      faq={faqItems} 
      title="Frequently Asked Questions" 
    />`,
    },
    {
        title: "Sidebar",
        group: "Application",
        iconName: "IconLayoutSidebar",
        example: RootLayoutClient,
        exampleName: "Sidebar 1",
        inspiredBy: {
            title: "shadcn/ui",
            url: "https://ui.shadcn.com/docs/components/sidebar",
        },
        props: [
            {
                name: "collapsed",
                type: "boolean",
                description: "Controls whether the sidebar is collapsed",
            },
            {
                name: "onCollapse",
                type: "(collapsed: boolean) => void",
                description:
                    "Callback function when sidebar collapse state changes",
            },
            {
                name: "position",
                type: '"left" | "right"',
                default: "left",
                description: "Position of the sidebar relative to the content",
            },
            {
                name: "defaultCollapsed",
                type: "boolean",
                default: "false",
                description: "Initial collapsed state of the sidebar",
            },
            {
                name: "name",
                type: "string",
                default: "default",
                description:
                    "Unique identifier for the sidebar, used for storing collapse state in cookies",
            },
            {
                name: "variant",
                type: '"default" | "hidden"',
                default: "default",
                description: "Controls visibility behavior when collapsed",
            },
            {
                name: "theme",
                type: '"default" | "card"',
                default: "default",
                description: "Visual theme of the sidebar",
            },
            {
                name: "collapsible",
                type: "boolean",
                default: "true",
                description: "Whether the sidebar can be collapsed by the user",
            },
            {
                name: "sidebarContent",
                type: "SidebarContentType",
                description:
                    "Content to be displayed in the sidebar, can be used for dynamic content",
            },
            {
                name: "onContentChange",
                type: "(content: SidebarContentType) => void",
                description: "Callback function when sidebar content changes",
            },
            {
                name: "collapsedWidth",
                type: "string",
                default: "w-16",
                description:
                    "Width of the sidebar when collapsed (Tailwind class)",
            },
            {
                name: "expandedWidth",
                type: "string",
                default: "w-64",
                description:
                    "Width of the sidebar when expanded (Tailwind class)",
            },
            {
                name: "className",
                type: "string",
                description: "Additional CSS classes to apply to the sidebar",
            },
            {
                name: "children",
                type: "React.ReactNode",
                required: true,
                description: "Content to be rendered inside the sidebar",
            },
        ],

        description:
            "While I love shad's sidebar component and the power it provides, looking in the issues and discussions on the repository some things start to emerge. Mostly, it's difficult to implement multiple sidebars, on different sections or nested within your application. TomUI Sidebar is a complete rebuild and is made different from the ground up, supporting nested and multiple sidebars, and doing away with any 'fixed' positions. While it's simpler, it also means it's more basic, allowing you to fully design it to your hearts content.",
        code: "sidebar",
        usage: `<Sidebar
  name={name}
  position={position}
  collapsed={collapsed}
  onCollapse={onCollapse}
  sidebarContent={sidebarContent}
  onContentChange={onContentChange}
  theme="card"
>
  <SidebarHeader>
    <div className={...}>
      Dashboard
    </div>
  </SidebarHeader>
  <SidebarSeparator className={cn(collapsed ? "hidden" : "block")} />
  <SidebarContent>
    <SidebarNav>
      <SidebarButton
        href="/"
        icon={<HomeIcon className="h-5 w-5" />}
        active={pathname === "/"}
      >
        Home
      </SidebarButton>
      <SidebarButton
        href="/dashboard"
        icon={<LayoutDashboardIcon className="h-5 w-5" />}
        active={pathname === "/dashboard"}
      >
        Dashboard
      </SidebarButton>
    </SidebarNav>
    <SidebarSeparator />
  </SidebarContent>
</Sidebar>`,
        alternativeExamples: [
            {
                title: "Toggling sidebars from sidebars",
                description: "Clean example of toggling sidebars from sidebars",
                exampleComponent: RootLayoutClient2,
            },
            {
                title: "Nested",
                description: "Nested layouts, similar to this page",
                exampleComponent: RootLayoutClient3,
            },
        ],
    },
];
