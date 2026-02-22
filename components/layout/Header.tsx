"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "@/components/ThemeProvider";
import { Search } from "@/components/blog/Search";
import aboutData from "@/data/aboutme.json";

interface SearchablePost {
  slug: string;
  title: string;
  description: string;
  content: string;
  tags: string[];
  date: string;
  readingTime: string;
}

interface HeaderProps {
  searchPosts?: SearchablePost[];
}

export function Header({ searchPosts = [] }: HeaderProps) {
  const { theme, toggleTheme, mounted } = useTheme();
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <header className="border-b border-[var(--terminal-border)]">
        <nav className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="text-[var(--terminal-green)] hover:text-[var(--terminal-cyan)] transition-colors"
          >
            <span className="text-[var(--terminal-gray)]">{aboutData.username}@blog</span>
            <span className="text-[var(--terminal-green)]">:</span>
            <span className="text-[var(--terminal-cyan)]">~</span>
            <span className="text-[var(--terminal-green)]">$</span>
            <span className="cursor-blink ml-1">_</span>
          </Link>
          <div className="flex items-center gap-3 sm:gap-4 text-sm">
            <Link
              href="/"
              className="text-[var(--terminal-gray)] hover:text-[var(--terminal-green)] transition-colors hidden sm:block"
            >
              [home]
            </Link>
            <Link
              href="/blog"
              className="text-[var(--terminal-gray)] hover:text-[var(--terminal-green)] transition-colors"
            >
              [blog]
            </Link>
            <Link
              href="/about"
              className="text-[var(--terminal-gray)] hover:text-[var(--terminal-green)] transition-colors hidden sm:block"
            >
              [about]
            </Link>
            <button
              onClick={() => setSearchOpen(true)}
              className="text-[var(--terminal-gray)] hover:text-[var(--terminal-green)] transition-colors flex items-center"
              aria-label="Search"
            >
              <span>[/]</span>
              <kbd className="hidden md:inline-block text-xs border border-[var(--terminal-border)] px-1 py-0.5 ml-1 text-[var(--terminal-gray)]">
                ⌘K
              </kbd>
            </button>
            <button
              onClick={toggleTheme}
              className="text-[var(--terminal-gray)] hover:text-[var(--terminal-yellow)] transition-colors"
              aria-label="Toggle theme"
            >
              {mounted ? (theme === "dark" ? "[☀]" : "[☾]") : "[ ]"}
            </button>
          </div>
        </nav>
      </header>

      <Search
        posts={searchPosts}
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
      />
    </>
  );
}
