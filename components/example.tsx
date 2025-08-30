import { getAddItemCommands } from '@/lib/registry'
import { FC, ReactNode } from 'react'
import { CodeBlock } from './codeblock'
import CommandBlock from './command-tabs'
import { OpenInV0Button } from './open-in-v0-button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'

export const Example: FC<{
  name: string
  code: string
  children: ReactNode
  openInV0?: boolean
  label?: string
}> = ({ children, code, name, openInV0, label }) => (
  <div className="flex flex-col gap-1">
    {label && <h2 className="text-2xl font-semibold">{label}</h2>}
    <Tabs defaultValue="preview">
      <div className="flex items-center justify-between">
        <TabsList className="-mx-3 bg-background">
          <TabsTrigger value="preview">Preview</TabsTrigger>
          <TabsTrigger value="code">Code</TabsTrigger>
        </TabsList>
        {openInV0 && <OpenInV0Button name={name} />}
      </div>
      <TabsContent value="preview">
        <div className="flex flex-col gap-4 border rounded-lg p-4 min-h-[450px] relative">
          <div className="flex items-center justify-center min-h-[400px] relative">{children}</div>
        </div>
      </TabsContent>
      <TabsContent value="code">
        <div className="flex flex-col gap-4 rounded-lg p-4 min-h-[450px] relative bg-card">
          <CodeBlock className="w-full h-full border-0 text-sm py-1 bg-card" lang="tsx">
            {code}
          </CodeBlock>
        </div>
      </TabsContent>
    </Tabs>
    <h3 className="mt-5 font-semibold opacity-70">
      Use the below command to copy the above code into your codebase
    </h3>
    <CommandBlock commands={getAddItemCommands(name)} />
  </div>
)
