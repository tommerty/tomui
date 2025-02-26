import { components } from "@/lib/items";
import Link from "next/link";
import * as tabler from "@tabler/icons-react";

export default function ComponentsPage() {
    const groupedComponents = components.reduce(
        (acc, item) => {
            const group = item.group || "Other";
            if (!acc[group]) {
                acc[group] = [];
            }
            acc[group].push(item);
            return acc;
        },
        {} as Record<string, typeof components>
    );
    return (
        <div className="px-4 py-8">
            <h1 className="mb-8 text-3xl font-bold">Components</h1>
            {Object.entries(groupedComponents).map(([groupName, items]) => (
                <div key={groupName} className="mb-12">
                    <h2 className="mb-2 text-xl font-semibold text-foreground">
                        {groupName}
                    </h2>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {items.map((item) => {
                            const Icon =
                                tabler[item.iconName as keyof typeof tabler];
                            return (
                                <Link
                                    key={item.code}
                                    href={`/component/${item.code}`}
                                    className="rounded-md border border-border/50 p-6 transition-colors hover:border-border hover:bg-card"
                                >
                                    <div className="flex items-center gap-2">
                                        {/* @ts-ignore */}
                                        <Icon />
                                        <h2 className="font-bold">
                                            {item.title}
                                        </h2>
                                    </div>
                                    <p className="max-w-prose text-sm text-muted-foreground">
                                        {item.description}
                                    </p>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            ))}
        </div>
    );
}
