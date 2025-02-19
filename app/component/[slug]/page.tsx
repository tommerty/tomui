import { components } from "@/lib/items";
import ComponentPreview from "@/components/ui/render/ComponentPreview";
import { notFound } from "next/navigation";
import type { Metadata, ResolvingMetadata } from "next";
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarProvider,
} from "@/components/complex-sidebar/complex-sidebar";

interface PageProps {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({
    params,
}: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const component = components.find((c) => c.code === slug);

    if (!component) {
        return {
            title: "Component Not Found",
        };
    }

    return {
        title: `${component.title}`,
        description: component.description || "UI Component from Registry",
        openGraph: {
            title: `${component.title}`,
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

export default async function ComponentPage({ params }: PageProps) {
    const { slug } = await params;
    const component = components.find((c) => c.code === slug);

    if (!component) {
        notFound();
    }

    return (
        <div className="flex h-full">
            <ComponentPreview component={component}>
                <component.example />
            </ComponentPreview>
        </div>
    );
}
