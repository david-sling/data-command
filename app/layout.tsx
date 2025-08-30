import { Footer } from "@/components/footer";
import { TooltipProvider } from "@/components/ui/tooltip";
import { formatMetadata } from "@/lib/metadata";
import { Analytics } from "@vercel/analytics/next";
import { Geist, Geist_Mono } from "next/font/google";
import { NuqsAdapter } from "nuqs/adapters/next";
import { Suspense } from "react";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = formatMetadata({
  title: "DataCommand",
  description:
    " A data-driven command component built on top of shadcn/ui Add async fetching, nested commands, and instant search to your app with just a few lines of code.",
  image: "/cover.png",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
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
  );
}
