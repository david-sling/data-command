import { RegistryItem } from 'shadcn/registry'

export const getRegistryJson = (name: string) =>
  `${process.env.NEXT_PUBLIC_BASE_URL}/r/${name}.json`

export const getAddItemCommands = (name: string) => [
  {
    label: 'pnpm',
    command: `pnpm dlx shadcn@latest add ${getRegistryJson(name)}`,
  },
  {
    label: 'npx',
    command: `npx shadcn@latest add ${getRegistryJson(name)}`,
  },
  {
    label: 'yarn',
    command: `yarn shadcn@latest add ${getRegistryJson(name)}`,
  },
  {
    label: 'bun',
    command: `bunx --bun shadcn@latest add ${getRegistryJson(name)}`,
  },
  {
    label: 'antfu/ni',
    command: `nlx shadcn@latest add ${getRegistryJson(name)}`,
  },
]

export const getMainRegistryFile = (registryItem: RegistryItem) =>
  registryItem.files?.find((f) => f.target === registryItem.meta?.main)?.content
