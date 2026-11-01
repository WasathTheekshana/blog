"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, type SearchablePost } from "@/components/blog/Search";
import { DisplaySettings } from "@/components/layout/DisplaySettings";
import aboutData from "@/data/aboutme.json";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
] as const;

export function Header({ searchPosts = [] }: { searchPosts?: SearchablePost[] }) {
  const pathname = usePathname();
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const isCurrent = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header>
      <div className="bars" aria-hidden="true">
        <div className="bar-1">
          <span>Wasath.x64_x86</span>
          <span>blog</span>
        </div>
        <div className="stripe s2" />
        <div className="stripe s3" />
        <div className="stripe s4" />
        <div className="stripe s5" />
      </div>

      <div className="max-w-4xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-x-6 gap-y-2">
        <Link href="/" className="inline-flex items-center min-h-11 text-sm no-underline" aria-label={`${aboutData.name}'s blog, home`}>
          <span className="text-muted">{aboutData.username}@blog</span>
          <span className="text-ok">:</span>
          <span className="text-link">~</span>
          <span className="text-ok">$</span>
          <span className="cursor ml-1" aria-hidden="true">_</span>
        </Link>

        <div className="flex flex-wrap items-center gap-x-1 gap-y-1">
          <nav aria-label="Primary">
            <ul className="flex flex-wrap items-center" role="list">
              {LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="navlink" aria-current={isCurrent(l.href) ? "page" : undefined}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <button type="button" className="btn" onClick={() => setSearchOpen(true)} aria-haspopup="dialog" aria-keyshortcuts="Control+K Meta+K">
            Search <span className="kbd hidden md:inline" aria-hidden="true">Ctrl K</span>
          </button>
          <DisplaySettings />
        </div>
      </div>

      {searchOpen ? <Search posts={searchPosts} onClose={() => setSearchOpen(false)} /> : null}
    </header>
  );
}
