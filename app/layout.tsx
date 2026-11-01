import type { Metadata, Viewport } from "next";
import { Atkinson_Hyperlegible, IBM_Plex_Mono, IBM_Plex_Sans, Pixelify_Sans } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { constructMetadata } from "@/lib/seo";
import { getSearchablePosts } from "@/lib/blog";
import { PREFS_BOOT_SCRIPT } from "@/lib/prefs";
import "./globals.css";

const plexMono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-plex-mono", display: "swap" });
const plexSans = IBM_Plex_Sans({ subsets: ["latin"], weight: ["400", "500", "600"], style: ["normal", "italic"], variable: "--font-plex-sans", display: "swap" });
const pixel = Pixelify_Sans({ subsets: ["latin"], variable: "--font-pixel", display: "swap" });
// Only downloaded when a reader picks the Hyperlegible font in the Display panel.
const hyper = Atkinson_Hyperlegible({ subsets: ["latin"], weight: ["400", "700"], style: ["normal", "italic"], variable: "--font-hyper", display: "swap", preload: false });

export const metadata: Metadata = constructMetadata();

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fbf6ea" },
    { media: "(prefers-color-scheme: dark)", color: "#04020e" },
  ],
  width: "device-width",
  initialScale: 1,
  // Never block pinch-zoom (WCAG 1.4.4).
  maximumScale: 5,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const searchPosts = getSearchablePosts();

  return (
    <html
      lang="en"
      data-theme="matrix"
      className={`${plexMono.variable} ${plexSans.variable} ${pixel.variable} ${hyper.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: PREFS_BOOT_SCRIPT }} />
        <link rel="alternate" type="application/rss+xml" title="RSS Feed" href="/feed.xml" />
      </head>
      <body className="min-h-screen flex flex-col antialiased">
        <a href="#main" className="skip-link">Skip to main content</a>
        <Header searchPosts={searchPosts} />
        <main id="main" tabIndex={-1} className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
