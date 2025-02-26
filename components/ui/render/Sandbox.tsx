"use client";

import {
    SandboxCodeEditor,
    SandboxConsole,
    SandboxFileExplorer,
    SandboxLayout,
    SandboxPreview,
    SandboxProvider,
    SandboxTabs,
    SandboxTabsContent,
    SandboxTabsList,
    SandboxTabsTrigger,
} from "@/components/ui/kibo-ui/sandbox";
import * as Portal from "@radix-ui/react-portal";
import {
    CodeIcon,
    AppWindowIcon,
    TerminalIcon,
    FolderIcon,
} from "lucide-react";
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable";
import React from "react";
import { cn } from "@/lib/utils";

interface SandboxProps {
    exampleName?: string;
    componentCode?: string;
    children?: React.ReactNode;
}

export function Sandbox({
    exampleName,
    componentCode,
    children,
}: SandboxProps) {
    // Create files for the sandbox with the provided component code
    const files = {
        "/App.js": {
            code:
                componentCode ||
                `import React from "react";

export default function App() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">${exampleName || "Component Example"}</h1>
      {/* Your component preview is shown in the preview tab */}
    </div>
  );
}`,
        },
    };

    return (
        <div className="h-full max-h-96 min-h-80 overflow-hidden rounded-lg border text-inherit">
            <SandboxProvider
                template="nextjs"
                className="text-inherit"
                theme="dark"
                files={files}
                options={{
                    recompileMode: "delayed",
                    recompileDelay: 500,
                }}
            >
                <SandboxLayout>
                    <SandboxTabs defaultValue={children ? "preview" : "code"}>
                        <SandboxTabsList>
                            <SandboxTabsTrigger
                                value="code"
                                className={cn(!componentCode && "hidden")}
                            >
                                <CodeIcon size={14} />
                                Code
                            </SandboxTabsTrigger>
                            <SandboxTabsTrigger value="preview">
                                <AppWindowIcon size={14} />
                                {exampleName ? exampleName : "Preview"}
                            </SandboxTabsTrigger>
                        </SandboxTabsList>
                        <SandboxTabsContent value="code">
                            <SandboxCodeEditor />
                        </SandboxTabsContent>
                        <SandboxTabsContent value="preview">
                            <div className="relative isolate flex h-full w-full items-center justify-center bg-background p-4 text-inherit">
                                {children}
                            </div>
                        </SandboxTabsContent>
                    </SandboxTabs>
                </SandboxLayout>
            </SandboxProvider>
        </div>
    );
}
