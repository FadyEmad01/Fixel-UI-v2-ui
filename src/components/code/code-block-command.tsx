"use client";

import * as React from "react";
import { Check, Copy, Terminal } from "lucide-react";

import { copyToClipboardWithMeta } from "../ui/copy-button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Button } from "../ui/button";

type PackageManager = "pnpm" | "npm" | "yarn" | "bun";

export function CodeBlockCommand({
  __npm__,
  __yarn__,
  __pnpm__,
  __bun__,
}: React.ComponentProps<"pre"> & {
  __npm__?: string;
  __yarn__?: string;
  __pnpm__?: string;
  __bun__?: string;
}) {
  const [packageManager, setPackageManager] =
    React.useState<PackageManager>("pnpm");

  const [hasCopied, setHasCopied] = React.useState(false);

  React.useEffect(() => {
    if (!hasCopied) return;

    const timer = setTimeout(() => {
      setHasCopied(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [hasCopied]);

  const tabs = React.useMemo(
    () => ({
      pnpm: __pnpm__,
      npm: __npm__,
      yarn: __yarn__,
      bun: __bun__,
    }),
    [__npm__, __pnpm__, __yarn__, __bun__],
  );

  const copyCommand = React.useCallback(() => {
    const command = tabs[packageManager];

    if (!command) return;

    copyToClipboardWithMeta(command);

    setHasCopied(true);
  }, [packageManager, tabs]);

  return (
    <div className="relative overflow-x-auto bg-muted rounded-xl">
      <Tabs
        value={packageManager}
        className="gap-0"
        onValueChange={(value) => {
          setPackageManager(value as PackageManager);
        }}
      >
        <div className="flex items-center gap-2 border-b border-border/50 px-3 py-1">
          <div className="flex size-4 items-center justify-center rounded-[1px] opacity-70">
            <Terminal className="size-4 text-code" />
          </div>

          <TabsList className="rounded-none bg-transparent p-0">
            {Object.entries(tabs).map(([key]) => (
              <TabsTrigger
                key={key}
                value={key}
                className="h-7 border-none pt-0.5 shadow-none! font-archivo data-[state=active]:bg-background!"
              >
                {key}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        <div className="no-scrollbar overflow-x-auto">
          {Object.entries(tabs).map(([key, value]) => (
            <TabsContent
              key={key}
              value={key}
              className="mt-0 px-4 py-3.5"
            >
              <pre>
                <code
                  className="relative font-mono text-sm leading-none"
                  data-language="bash"
                >
                  {value}
                </code>
              </pre>
            </TabsContent>
          ))}
        </div>
      </Tabs>

      <Button
        data-slot="copy-button"
        size="icon"
        variant="ghost"
        className="absolute right-2 top-2 z-10 size-7 opacity-70 hover:opacity-100 focus-visible:opacity-100"
        onClick={copyCommand}
        aria-label={hasCopied ? "Copied command" : "Copy command"}
      >
        <span className="sr-only">Copy</span>
        {hasCopied ? <Check className="text-green-600 dark:text-green-500"/> : <Copy />}
      </Button>
    </div>
  );
}