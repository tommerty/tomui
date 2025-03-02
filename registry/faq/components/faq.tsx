"use client";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Label } from "@/components/ui/label";

export interface FAQTypes {
    question: string;
    answer: string;
    footer?: React.ReactNode;
    category?: string;
}

interface FAQProps {
    faq: FAQTypes[];
    title: string;
}

export function FAQ({ faq, title }: FAQProps) {
    // Group FAQ items by category
    const groupedByCategory = faq.reduce(
        (groups, item) => {
            const category = item.category || "Uncategorized";
            if (!groups[category]) {
                groups[category] = [];
            }
            groups[category].push(item);
            return groups;
        },
        {} as Record<string, FAQTypes[]>
    );

    // Get sorted category names
    const categories = Object.keys(groupedByCategory).sort();
    return (
        <>
            <div className="w-full space-y-3">
                <Label className="pointer-events-auto mx-auto flex w-fit items-center gap-1 rounded-3xl border bg-card/70 px-8 py-2 text-sm font-bold leading-tight text-foreground shadow-[0_6px_20px_hsl(var(--primary)/23%)] backdrop-blur-sm transition duration-200 ease-linear peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    FAQ
                </Label>
                <Label className="pointer-events-auto mx-auto block w-full items-center gap-1 pb-0 text-center text-2xl font-bold leading-tight text-foreground peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    {title}
                </Label>
            </div>

            <div className="space-y-10">
                {categories.map((category, categoryIndex) => (
                    <div
                        key={`category-${categoryIndex}`}
                        className="space-y-4"
                    >
                        <Label className="pointer-events-auto flex items-center gap-1 text-base font-semibold text-foreground peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            {category}
                        </Label>

                        <Accordion
                            type="single"
                            collapsible
                            className="w-full space-y-6"
                        >
                            {groupedByCategory[category].map((item, index) => (
                                <AccordionItem
                                    key={`faq-item-${categoryIndex}-${index}`}
                                    value={`item-${categoryIndex}-${index}`}
                                    className="overflow-hidden rounded-xl border bg-card p-0 transition-all duration-200 hover:shadow-[0_0_20px_1px_hsl(var(--primary)/10%)] data-[state=open]:shadow-[0_0_20px_1px_hsl(var(--primary)/10%)]"
                                >
                                    <AccordionTrigger className="items-start whitespace-pre-wrap p-3 text-left text-xl font-bold hover:no-underline data-[state=open]:bg-muted/50 data-[state=open]:text-foreground [&>svg]:size-6">
                                        {item.question}
                                    </AccordionTrigger>
                                    <AccordionContent className="flex flex-col gap-2 whitespace-pre-wrap p-3 text-lg leading-loose tracking-wide">
                                        {item.answer}
                                        {item.footer ? item.footer : null}
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </div>
                ))}
            </div>
        </>
    );
}
