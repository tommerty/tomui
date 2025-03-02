"use client";

import { Button } from "@/components/ui/button";
import { FAQ, FAQTypes } from "@/registry/faq/components/faq";
import { IconExternalLink } from "@tabler/icons-react";

export function FAQExample() {
    const dummyFAQ: FAQTypes[] = [
        {
            question: "What is the FAQ component?",
            category: "Basic Information",
            answer: "The FAQ component is a flexible, accessible accordion-based component designed to display frequently asked questions in an organized manner. It supports categorization, custom styling, and responsive design to fit seamlessly into your Next.js applications.",
        },
        {
            question: "How do I implement the FAQ component?",
            category: "Basic Information",
            answer: "To implement the FAQ component, import it from the registry and provide an array of FAQ items along with a title. Each FAQ item should have a question and answer property, and optionally a category and footer.\n\nExample:\n```jsx\nimport { FAQ } from '@/registry/faq/components/faq';\n\nconst myFAQs = [{ question: 'Example?', answer: 'Answer here', category: 'General' }];\n\n<FAQ faq={myFAQs} title=\"Frequently Asked Questions\" />\n```",
        },
        {
            question: "Can I customize the appearance of the FAQ component?",
            category: "Basic Information",
            answer: "Yes, the FAQ component is built with Tailwind CSS and can be customized by modifying the class names or extending the component. It uses shadcn's Accordion component underneath, so you can also customize the accordion styles.",
        },
        {
            question: "Does the FAQ component support categories?",
            category: "Features",
            answer: "Yes, one of the key features of this FAQ component is its built-in support for categorization. By providing a 'category' property to each FAQ item, the component will automatically group and display them by category.",
            footer: (
                <div className="mt-2 rounded-md bg-muted p-3 text-sm">
                    <strong>Tip:</strong> Categories are sorted alphabetically
                    by default.
                </div>
            ),
        },
        {
            question: "Can I add custom content to FAQ answers?",
            category: "Features",
            answer: "Yes, the FAQ component supports a 'footer' property that allows you to add any React node below the answer text. This is useful for adding links, buttons, code snippets, or other interactive elements.",
            footer: (
                <a href="#" className="w-fit">
                    <Button className="w-fit gap-2 font-bold" size={"sm"}>
                        See example
                        <IconExternalLink size={14} />
                    </Button>
                </a>
            ),
        },
        {
            question: "Is the FAQ component accessible?",
            category: "Features",
            answer: "Yes, the FAQ component is built with accessibility in mind. It uses the Accordion component from shadcn/ui which follows WAI-ARIA patterns for accordions. It supports keyboard navigation and proper ARIA attributes.",
        },
        {
            question: "How does the FAQ component handle mobile devices?",
            category: "Features",
            answer: "The FAQ component is fully responsive and adapts to different screen sizes. The accordion pattern works well on mobile devices as it allows users to expand only the content they're interested in, saving screen space.",
        },
        {
            question: "Where can I find more documentation?",
            category: "Basic Information",
            answer: "The FAQ component is part of the shadcn/ui registry. You can find more documentation and examples in the official repository.",
            footer: (
                <span className="font-bold">
                    Remember to check the shadcn/ui documentation for more
                    details on customization options.
                </span>
            ),
        },
    ];

    return (
        <section className="h-full w-full overflow-auto">
            <FAQ faq={dummyFAQ} title="FAQ Component Demo" />
        </section>
    );
}
