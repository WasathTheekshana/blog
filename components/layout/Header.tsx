"use client";

import Link from "next/link";
import { useTheme } from "@/components/ThemeProvider";
import aboutData from "@/data/aboutme.json";

export function Header() {
  const { theme, toggleTheme, mounted } = useTheme();

  return (
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
        <div className="flex items-center gap-4 text-sm">
          <Link
            href="/"
            className="text-[var(--terminal-gray)] hover:text-[var(--terminal-green)] transition-colors"
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
            className="text-[var(--terminal-gray)] hover:text-[var(--terminal-green)] transition-colors"
          >
            [about]
          </Link>
          <button
            onClick={toggleTheme}
            className="text-[var(--terminal-gray)] hover:text-[var(--terminal-yellow)] transition-colors min-w-[60px]"
            aria-label="Toggle theme"
          >
            {mounted ? (theme === "dark" ? "[light]" : "[dark]") : "[    ]"}
          </button>
        </div>
      </nav>
    </header>
  );
}
