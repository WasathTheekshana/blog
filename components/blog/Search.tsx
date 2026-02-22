"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface SearchResult {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  date: string;
  readingTime: string;
  matchType: "title" | "description" | "content" | "tag";
}

interface SearchablePost {
  slug: string;
  title: string;
  description: string;
  content: string;
  tags: string[];
  date: string;
  readingTime: string;
}

interface SearchProps {
  posts: SearchablePost[];
  isOpen: boolean;
  onClose: () => void;
}

export function Search({ posts, isOpen, onClose }: SearchProps) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const prevQueryRef = useRef(query);

  const results = useMemo((): SearchResult[] => {
    if (!query.trim()) return [];

    const lowerQuery = query.toLowerCase();
    const matched: SearchResult[] = [];

    posts.forEach((post) => {
      // Check title
      if (post.title.toLowerCase().includes(lowerQuery)) {
        matched.push({ ...post, matchType: "title" });
        return;
      }

      // Check tags
      if (post.tags.some((tag) => tag.toLowerCase().includes(lowerQuery))) {
        matched.push({ ...post, matchType: "tag" });
        return;
      }

      // Check description
      if (post.description.toLowerCase().includes(lowerQuery)) {
        matched.push({ ...post, matchType: "description" });
        return;
      }

      // Check content
      if (post.content.toLowerCase().includes(lowerQuery)) {
        matched.push({ ...post, matchType: "content" });
        return;
      }
    });

    return matched.slice(0, 10);
  }, [query, posts]);

  // Reset selected index when query changes
  if (prevQueryRef.current !== query) {
    prevQueryRef.current = query;
    if (selectedIndex !== 0) {
      setSelectedIndex(0);
    }
  }

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => Math.min(prev + 1, results.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => Math.max(prev - 1, 0));
      } else if (e.key === "Enter" && results[selectedIndex]) {
        router.push(`/blog/${results[selectedIndex].slug}`);
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, results, selectedIndex, router, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* Search Modal */}
      <div className="min-h-screen flex items-start justify-center pt-[15vh] px-4">
        <div
          className="relative w-full max-w-2xl bg-[var(--background)] border border-[var(--terminal-border)] shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Search Input */}
          <div className="flex items-center border-b border-[var(--terminal-border)] p-4">
            <span className="text-[var(--terminal-green)] mr-2">$</span>
            <span className="text-[var(--terminal-gray)] mr-2">grep</span>
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="search posts..."
              className="flex-1 bg-transparent text-[var(--foreground)] outline-none placeholder:text-[var(--terminal-gray)]"
              autoComplete="off"
              spellCheck={false}
            />
            <kbd className="hidden sm:inline-block text-xs text-[var(--terminal-gray)] border border-[var(--terminal-border)] px-1.5 py-0.5 ml-2">
              ESC
            </kbd>
          </div>

          {/* Results */}
          <div className="max-h-[60vh] overflow-y-auto">
            {query && results.length === 0 && (
              <div className="p-4 text-[var(--terminal-gray)] text-sm">
                <span className="text-[var(--terminal-yellow)]">warning:</span>{" "}
                no results found for &quot;{query}&quot;
              </div>
            )}

            {results.length > 0 && (
              <div className="py-2">
                {results.map((result, index) => (
                  <Link
                    key={result.slug}
                    href={`/blog/${result.slug}`}
                    onClick={onClose}
                    className={`block px-4 py-3 transition-colors ${
                      index === selectedIndex
                        ? "bg-[var(--terminal-surface)]"
                        : "hover:bg-[var(--terminal-surface)]"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-[var(--terminal-green)] text-sm mt-0.5">
                        &gt;
                      </span>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-[var(--terminal-green)] font-medium truncate">
                          {result.title}
                        </h3>
                        <p className="text-sm text-[var(--terminal-gray)] line-clamp-1 mt-0.5">
                          {result.description}
                        </p>
                        <div className="flex items-center gap-3 mt-1 text-xs text-[var(--terminal-gray)]">
                          <span className="text-[var(--terminal-cyan)]">
                            {result.matchType === "title" && "matched: title"}
                            {result.matchType === "description" &&
                              "matched: description"}
                            {result.matchType === "content" &&
                              "matched: content"}
                            {result.matchType === "tag" && "matched: tag"}
                          </span>
                          <span>{result.readingTime}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {!query && (
              <div className="p-4 text-sm text-[var(--terminal-gray)]">
                <p className="mb-2">
                  <span className="text-[var(--terminal-cyan)]">tip:</span>{" "}
                  search by title, tags, description, or content
                </p>
                <div className="flex flex-wrap gap-2 text-xs">
                  <span className="text-[var(--terminal-gray)]">
                    <kbd className="border border-[var(--terminal-border)] px-1">↑</kbd>
                    <kbd className="border border-[var(--terminal-border)] px-1 ml-1">↓</kbd>
                    {" "}navigate
                  </span>
                  <span className="text-[var(--terminal-gray)]">
                    <kbd className="border border-[var(--terminal-border)] px-1">Enter</kbd>
                    {" "}select
                  </span>
                  <span className="text-[var(--terminal-gray)]">
                    <kbd className="border border-[var(--terminal-border)] px-1">ESC</kbd>
                    {" "}close
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
