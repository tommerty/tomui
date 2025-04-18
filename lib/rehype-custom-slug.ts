import { visit } from "unist-util-visit";
import { toString } from "hast-util-to-string";
import type { Plugin, Transformer } from "unified";
import type { Element } from "hast";
import type { Node } from "unist";

// Custom rehype plugin to generate custom IDs for headings
export function rehypeCustomSlug(): Plugin {
    return function plugin(): Transformer {
        return function transformer(tree: Node): void {
            visit(tree, "element", (node: Element) => {
                if (node.tagName === "h1") {
                    const text = toString(node);

                    // Extract version number from heading like "1.0.0 (2025-03-15)"
                    const versionMatch = text.match(/^(\d+\.\d+\.\d+)/);

                    if (versionMatch) {
                        // Convert "1.0.0" to "1-0-0"
                        const version = versionMatch[1].replace(/\./g, "-");
                        node.properties = node.properties || {};
                        node.properties.id = version;
                    }
                }
            });
        };
    };
}
