import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { getSiteConfig } from "@/lib/about";
import { getSearchablePosts } from "@/lib/blog";
import "./globals.css";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteConfig = getSiteConfig();

export const metadata: Metadata = {
  title: {
    default: siteConfig.siteName,
    template: `%s | ${siteConfig.siteName}`,
  },
  description: siteConfig.siteDescription,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const searchPosts = getSearchablePosts();

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistMono.variable} font-mono antialiased min-h-screen flex flex-col`}
      >
        <ThemeProvider>
          <Header searchPosts={searchPosts} />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
