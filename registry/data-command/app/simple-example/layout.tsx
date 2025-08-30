import { NuqsAdapter } from 'nuqs/adapters/next'
import { ReactNode } from 'react'

export default function Layout({ children }: { children: ReactNode }) {
  return <NuqsAdapter>{children}</NuqsAdapter>
}
