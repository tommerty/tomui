import { components } from "@/lib/items";
import Link from "next/link";

export default function ComponentsPage() {
    return (
        <div className="container px-4 py-8">
            <h1 className="mb-8 text-3xl font-bold">Components</h1>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {components.map((component) => (
                    <Link
                        key={component.code}
                        href={`/component/${component.code}`}
                        className="rounded-md border border-border/50 p-6 transition-colors hover:border-border hover:bg-card"
                    >
                        <component.icon className="mb-2 h-8 w-8" />
                        <h2 className="mb-2 font-semibold">
                            {component.title}
                        </h2>
                        <p className="text-sm text-muted-foreground">
                            {component.description}
                        </p>
                    </Link>
                ))}
            </div>
        </div>
    );
}
