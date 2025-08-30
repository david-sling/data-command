import { Analytics } from '@vercel/analytics/next'
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { NuqsAdapter } from 'nuqs/adapters/next'
import { TooltipProvider } from '@/components/ui/tooltip'
import { Suspense } from 'react'
import { Footer } from '@/components/footer'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'useModalControlQuery',
  description: 'A hook to control shadcn modal components',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <Suspense>
        <TooltipProvider>
          <NuqsAdapter>
            <body
              className={`${geistSans.variable} ${geistMono.variable} antialiased dark bg-background text-foreground`}
            >
              {children}
              <Footer />
              <Analytics />
            </body>
          </NuqsAdapter>
        </TooltipProvider>
      </Suspense>
    </html>
  )
}
