import * as React from "react";
import fs from "fs";
import path from "path";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ChangelogSidebar } from "@/components/changelog/ChangelogSidebar";
import { rehypeCustomSlug } from "@/lib/rehype-custom-slug";

async function getChangelogContent() {
    const filePath = path.join(process.cwd(), "CHANGELOG.md");
    const fileContent = fs.readFileSync(filePath, "utf8");
    return fileContent;
}

export default async function Changelog() {
    const changelogContent = await getChangelogContent();

    return (
        <div className="flex">
            <div className="mx-auto flex max-w-3xl flex-1 flex-col gap-8 px-4 py-8">
                <h2 className="text-4xl font-bold">TomUI Changelog</h2>
                <p>
                    Versioning is automatically handled through our CI/CD
                    pipeline based on conventional commit messages. This content
                    is fetched from the{" "}
                    <a
                        className="underline"
                        target="_blank"
                        href="https://github.com/tommerty/tomui/blob/main/CHANGELOG.md"
                    >
                        CHANGELOG.md
                    </a>
                    .
                </p>

                <div className="prose dark:prose-invert max-w-none">
                    <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        rehypePlugins={[rehypeCustomSlug]} // Use our custom plugin
                    >
                        {changelogContent}
                    </ReactMarkdown>
                </div>
            </div>
            <ChangelogSidebar />
        </div>
    );
}
