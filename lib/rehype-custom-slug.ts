import { visit } from "unist-util-visit";
import { toString } from "hast-util-to-string";
import type { Plugin } from "unified";
import type { Node } from "unist";

// Custom rehype plugin to generate custom IDs for headings
export function rehypeCustomSlug(): Plugin {
    return function () {
        return function (tree: Node) {
            visit(tree, "element", (node: any) => {
                if (node.tagName === "h1") {
                    const text = toString(node);

                    // Extract version number from heading like "1.0.0 (2025-03-15)"
                    const versionMatch = text.match(/^(\d+\.\d+\.\d+)/);

                    if (versionMatch) {
                        // Convert "1.0.0" to "1-0-0"
                        const version = versionMatch[1].replace(/\./g, "-");
                        node.properties.id = version;
                    }
                }
            });
        };
    };
}
