import { components } from "@/lib/items";
import ComponentPreview from "@/components/ui/render/ComponentPreview";
import { notFound } from "next/navigation";

interface Props {
    params: {
        slug: string;
    };
}

export function generateStaticParams() {
    return components.map((component) => ({
        slug: component.code,
    }));
}

export default function ComponentPage({ params }: Props) {
    const component = components.find((c) => c.code === params.slug);

    if (!component) {
        notFound();
    }

    return (
        <ComponentPreview
            title={component.title}
            description={component.description}
            code={component.code}
        >
            {/* Here you can dynamically import and render your component */}
            <div>Component: {component.code}</div>
        </ComponentPreview>
    );
}
