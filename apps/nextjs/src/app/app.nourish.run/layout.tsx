import type { Metadata, Viewport } from "next";
import { cache } from "react";
import { headers } from "next/headers";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import { Provider } from "jotai";

import { cn } from "@nourish/ui";
import { ThemeProvider } from "@nourish/ui/theme";
import { Toaster } from "@nourish/ui/toast";

import { env } from "~/env";
import { TRPCReactProvider } from "~/trpc/react";

import "~/app/globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(
    env.VERCEL_ENV === "production"
      ? "https://www.nourish.run"
      : "http://localhost:3000",
  ),
  title: "Nourish",
  description: "Simple monorepo with shared backend for web & mobile apps",
  openGraph: {
    title: "Nourish",
    description: "Simple monorepo with shared backend for web & mobile apps",
    url: "https://www.nourish.run",
    siteName: "Create T3 Turbo",
  },
  twitter: {
    card: "summary_large_image",
    site: "@jullerino",
    creator: "@jullerino",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "white" },
  ],
};

const getHeaders = cache(async () => headers());

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className="h-full">
      <body
        className={cn(
          "h-full bg-background font-sans text-foreground antialiased",
          GeistSans.variable,
          GeistMono.variable,
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="light">
          <TRPCReactProvider headersPromise={getHeaders()}>
            <Provider>{props.children}</Provider>
          </TRPCReactProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
