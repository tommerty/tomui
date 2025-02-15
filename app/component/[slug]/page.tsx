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

export default async function ComponentPage({ params }: Props) {
    const component = await components.find((c) => c.code === params.slug);

    if (!component) {
        notFound();
    }

    return (
        <ComponentPreview component={component}>
            {/* Here you can dynamically import and render your component */}
            <component.example />
        </ComponentPreview>
    );
}
