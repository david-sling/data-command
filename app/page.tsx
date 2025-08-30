import CommandBlock from "@/components/command-tabs";
import { Example } from "@/components/example";
import { getAddItemCommands, getMainRegistryFile } from "@/lib/registry";
import ApiExample from "@/registry/data-command/app/api-example/page";
import DefaultChainExample from "@/registry/data-command/app/default-chain-example/page";
import SimpleExample from "@/registry/data-command/app/simple-example/page";
import { RegistryItem } from "shadcn/registry";

import apiExample from "@/public/r/api-example-data-command.json";
import dataCommand from "@/public/r/data-command.json";
import defaultChainExample from "@/public/r/default-chain-example-data-command.json";
import simpleExample from "@/public/r/simple-example-data-command.json";

// This page displays items from the custom registry.
// You are free to implement this with your own design as needed.

export default function Home() {
  return (
    <div className="max-w-3xl mx-auto flex flex-col min-h-svh px-4 py-8 gap-8">
      <header className="flex flex-col gap-1">
        <div className="mb-2 flex items-center gap-3 md:gap-5 flex-wrap">
          <h1 className="text-2xl md:text-4xl font-bold tracking-tight break-words flex-1 max-w-full">
            {"<DataCommand/>"}
          </h1>
        </div>
        <p className="text-muted-foreground">
          A data-driven command component built on shadcn/ui. Add async
          fetching, nested commands, and instant search to your app with just a
          few lines of code.
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
          description={
            <>
              <p>
                You can fetch and populate command items dynamically by
                providing a <code>loadItems</code> function. This function
                should return an array of CommandDataItem objects.
              </p>
              <p>Here's an example using a simulated API call:</p>
            </>
          }
          name={apiExample.name}
          code={getMainRegistryFile(apiExample as RegistryItem) ?? ""}
        >
          <ApiExample />
        </Example>

        <Example
          label="Opening with a prefilled chain before fetching data"
          description={
            <>
              <p>
                You can initialize the DataCommand with a prefilled chain, even
                before any API calls are made.
              </p>
              <p>
                If you don't want to load the full list of items, you can
                provide a <code>loadOneItem</code> function. This will be called
                only when the full <code>loadItems</code> call isn't required.
                To use this pattern, make sure to also pass the defaultPath
                prop.
              </p>
            </>
          }
          name={defaultChainExample.name}
          code={getMainRegistryFile(defaultChainExample as RegistryItem) ?? ""}
        >
          <DefaultChainExample />
        </Example>
      </main>
    </div>
  );
}
