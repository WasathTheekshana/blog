"use client";

import { useEffect, useMemo, useRef, useState, type KeyboardEvent } from "react";
import { useRouter } from "next/navigation";

export interface SearchablePost {
  slug: string;
  title: string;
  description: string;
  content: string;
  tags: string[];
  date: string;
  readingTime: string;
}

type Match = "title" | "tag" | "description" | "content";
type Result = SearchablePost & { match: Match };

interface SearchProps {
  posts: SearchablePost[];
  onClose: () => void;
}

/**
 * Modal search. Rendered only while open, so its state resets each time.
 * Pattern: dialog > combobox input controlling a listbox, with aria-activedescendant
 * so focus stays in the input while arrow keys move through results.
 */
export function Search({ posts, onClose }: SearchProps) {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const input = useRef<HTMLInputElement>(null);
  const dialog = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const results = useMemo<Result[]>(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    const out: Result[] = [];
    for (const p of posts) {
      const match: Match | null = p.title.toLowerCase().includes(q)
        ? "title"
        : p.tags.some((t) => t.toLowerCase().includes(q))
          ? "tag"
          : p.description.toLowerCase().includes(q)
            ? "description"
            : p.content.toLowerCase().includes(q)
              ? "content"
              : null;
      if (match) out.push({ ...p, match });
    }
    return out.slice(0, 10);
  }, [query, posts]);

  // Move focus in on open, give it back to the opener on close, and stop the page behind scrolling.
  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    input.current?.focus();
    return () => {
      document.body.style.overflow = prev;
      opener?.focus();
    };
  }, []);

  useEffect(() => {
    document.getElementById(`search-opt-${active}`)?.scrollIntoView({ block: "nearest" });
  }, [active]);

  const go = (r: Result) => {
    router.push(`/blog/${r.slug}`);
    onClose();
  };

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Escape") {
      e.preventDefault();
      onClose();
    } else if (e.key === "ArrowDown" && results.length) {
      e.preventDefault();
      setActive((i) => (i + 1) % results.length);
    } else if (e.key === "ArrowUp" && results.length) {
      e.preventDefault();
      setActive((i) => (i - 1 + results.length) % results.length);
    } else if (e.key === "Enter" && results[active]) {
      e.preventDefault();
      go(results[active]);
    } else if (e.key === "Tab") {
      // Keep Tab inside the dialog.
      const items = dialog.current?.querySelectorAll<HTMLElement>("input, button");
      if (!items?.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  };

  const label: Record<Match, string> = { title: "title", tag: "tag", description: "description", content: "post text" };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div
        ref={dialog}
        role="dialog"
        aria-modal="true"
        aria-label="Search posts"
        onKeyDown={onKeyDown}
        className="panel mx-auto mt-[8vh] w-[min(42rem,calc(100vw-1.5rem))]"
      >
        <div className="flex items-center gap-2 border-b border-line p-3">
          <label htmlFor="search-input" className="text-ok shrink-0">
            <span aria-hidden="true">$ grep</span>
            <span className="sr-only">Search posts</span>
          </label>
          <input
            id="search-input"
            ref={input}
            type="search"
            role="combobox"
            aria-expanded={results.length > 0}
            aria-controls="search-results"
            aria-autocomplete="list"
            aria-activedescendant={results.length ? `search-opt-${active}` : undefined}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActive(0);
            }}
            placeholder="title, tag or text"
            autoComplete="off"
            spellCheck={false}
            className="min-h-11 flex-1 min-w-0 bg-transparent text-base text-ink outline-none placeholder:text-muted"
          />
          <button type="button" className="btn" onClick={onClose}>
            Close<span className="sr-only"> search</span>
          </button>
        </div>

        <div role="status" aria-live="polite" className="sr-only">
          {query.trim() ? (results.length ? `${results.length} result${results.length === 1 ? "" : "s"}. Use up and down arrows to review, Enter to open.` : "No results.") : ""}
        </div>

        <div className="max-h-[60vh] overflow-y-auto">
          {results.length > 0 ? (
            <ul id="search-results" role="listbox" aria-label="Search results" className="py-2">
              {results.map((r, i) => (
                <li
                  key={r.slug}
                  id={`search-opt-${i}`}
                  role="option"
                  aria-selected={i === active}
                  onClick={() => go(r)}
                  onMouseMove={() => i !== active && setActive(i)}
                  className={`cursor-pointer px-4 py-3 border-l-4 ${i === active ? "bg-page border-accent-ink" : "border-transparent"}`}
                >
                  <div className="font-semibold text-ink">{r.title}</div>
                  <div className="text-sm text-muted line-clamp-2 reading">{r.description}</div>
                  <div className="mt-1 text-xs text-muted">
                    Matched {label[r.match]} · {r.readingTime}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="p-4 text-sm text-muted">
              {query.trim() ? (
                <>No posts match &ldquo;{query}&rdquo;.</>
              ) : (
                <>Search titles, tags and post text. Use the up and down arrows to move, Enter to open, Escape to close.</>
              )}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
