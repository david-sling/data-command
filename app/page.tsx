import CommandBlock from "@/components/command-tabs";
import { Example } from "@/components/example";
import { getAddItemCommands, getMainRegistryFile } from "@/lib/registry";

import { Logo } from "@/components/logo";
import dataCommand from "@/public/r/data-command.json";
import simpleExample from "@/public/r/simple-example-data-command.json";
import SimpleExample from "@/registry/data-command/app/simple-example/page";
import { RegistryItem } from "shadcn/registry";

// This page displays items from the custom registry.
// You are free to implement this with your own design as needed.

export default function Home() {
  return (
    <div className="max-w-3xl mx-auto flex flex-col min-h-svh px-4 py-8 gap-8">
      <header className="flex flex-col gap-1">
        <div className="mb-2 flex items-center gap-3 md:gap-5 flex-wrap">
          <Logo className="h-5 w-10 md:h-10 md:w-20" />
          <h1 className="text-2xl md:text-4xl font-bold tracking-tight break-words flex-1 max-w-full">
            data-command
          </h1>
        </div>
        <p className="text-muted-foreground">
          A command component build on top op shadcn command
        </p>
      </header>
      <main className="flex flex-col flex-1 gap-16">
        <div className="flex flex-col gap-2 font-semibold">
          <h2 className="text-2xl">Installation</h2>
          <CommandBlock commands={getAddItemCommands(dataCommand.name)} />
        </div>
        <Example
          label="Usage"
          name={simpleExample.name}
          code={getMainRegistryFile(simpleExample as RegistryItem) ?? ""}
        >
          <SimpleExample />
        </Example>
      </main>
    </div>
  );
}
