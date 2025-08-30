import CommandBlock from "@/components/command-tabs";
import { Example } from "@/components/example";
import { getAddItemCommands, getMainRegistryFile } from "@/lib/registry";
import { Logo } from "@/components/logo";
import ApiExample from "@/registry/data-command/app/api-example/page";
import SimpleExample from "@/registry/data-command/app/simple-example/page";
import { RegistryItem } from "shadcn/registry";
import DefaultChainExample from "@/registry/data-command/app/default-chain-example/page";

import apiExample from "@/public/r/api-example-data-command.json";
import dataCommand from "@/public/r/data-command.json";
import simpleExample from "@/public/r/simple-example-data-command.json";
import defaultChainExample from "@/public/r/default-chain-example-data-command.json";

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

        <Example
          label="Populating command items from an API"
          description="You can populate items from an API call using the `fetchSubItems` function. Here is an example with a simulated API call:"
          name={apiExample.name}
          code={getMainRegistryFile(apiExample as RegistryItem) ?? ""}
        >
          <ApiExample />
        </Example>

        <Example
          label="Opening with a prefilled chain before API call"
          description="You can open the data-command component with the chain prefilled even if the api calls for fetching the lists haven't been made yet. If you wish to not make a call to your list API, you can use the `fetchOneSubItem` function. This will be invoked if there is no necessity to invoke the `fetchSubItems` function. You also need to pass in the `defaultCommandChain` prop"
          name={defaultChainExample.name}
          code={getMainRegistryFile(defaultChainExample as RegistryItem) ?? ""}
        >
          <DefaultChainExample />
        </Example>
      </main>
    </div>
  );
}
