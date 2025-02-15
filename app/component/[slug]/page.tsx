import { components } from "@/lib/items";
import ComponentPreview from "@/components/ui/render/ComponentPreview";
import { notFound } from "next/navigation";
import type { Metadata, ResolvingMetadata } from "next";

interface Props {
    params: {
        slug: string;
    };
}

export async function generateMetadata(
    { params }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
    const component = components.find((c) => c.code === params.slug);

    if (!component) {
        return {
            title: "Component Not Found",
        };
    }

    return {
        title: `${component.title} Component`,
        description: component.description || "UI Component from Registry",
        openGraph: {
            title: `${component.title} - UI Component`,
            description: component.description || "UI Component from Registry",
            type: "website",
        },
        twitter: {
            card: "summary",
            title: component.title,
            description: component.description || "UI Component from Registry",
        },
    };
}

export function generateStaticParams() {
    return components.map((component) => ({
        slug: component.code,
    }));
}

export default async function ComponentPage({ params }: Props) {
    const component = await components.find((c) => c.code === params.slug);

    if (!component) {
        notFound();
    }

    return (
        <ComponentPreview component={component}>
            <component.example />
        </ComponentPreview>
    );
}
