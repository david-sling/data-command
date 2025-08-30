import CommandBlock from "@/components/command-tabs";
import { Example } from "@/components/example";
import { getAddItemCommands, getMainRegistryFile } from "@/lib/registry";

import { Logo } from "@/components/logo";
import { RegistryItem } from "shadcn/registry";
import { Button } from "@/registry/test";
import buttonExample from "@/public/r/button.json";

// This page displays items from the custom registry.
// You are free to implement this with your own design as needed.

export default function Home() {
  return (
    <div className="max-w-3xl mx-auto flex flex-col min-h-svh px-4 py-8 gap-8">
      <header className="flex flex-col gap-1">
        <div className="mb-2 flex items-center gap-3 md:gap-5 flex-wrap">
          <Logo className="h-5 w-10 md:h-10 md:w-20" />
          <h1 className="text-2xl md:text-4xl font-bold tracking-tight break-words flex-1 max-w-full">
            useModalControlQuery
          </h1>
        </div>
        <p className="text-muted-foreground">
          A hook to control shadcn modal components using query params
        </p>
      </header>
      <main className="flex flex-col flex-1 gap-16">
        <div className="flex flex-col gap-2 font-semibold">
          <h2 className="text-2xl">Installation</h2>
          <CommandBlock
            commands={getAddItemCommands("use-modal-control-query")}
          />
        </div>
        <Example
          label="Usage"
          name={buttonExample.name}
          code={getMainRegistryFile(buttonExample as RegistryItem) ?? ""}
        >
          <Button />
        </Example>
      </main>
    </div>
  );
}
