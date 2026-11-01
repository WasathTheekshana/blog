import GithubSlugger from "github-slugger";

export type TocItem = { id: string; text: string; level: 2 | 3 };

/** Strip the markdown the heading text may contain so it matches what rehype-slug sees. */
const plain = (s: string) =>
  s
    .replace(/`([^`]*)`/g, "$1")
    .replace(/\*\*([^*]+)\*\*|__([^_]+)__/g, "$1$2")
    .replace(/[*_]/g, "")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .trim();

/** Remove a leading `# Title` line: the page renders the frontmatter title as its h1. */
export function stripLeadingH1(source: string): string {
  return source.replace(/^\s*# [^\n]*\n/, "");
}

/** Headings in document order with the same ids rehype-slug will generate (same slugger, same dedupe). */
export function extractHeadings(source: string): TocItem[] {
  const slugger = new GithubSlugger();
  const items: TocItem[] = [];
  let inFence = false;
  for (const line of source.split("\n")) {
    if (/^\s*(```|~~~)/.test(line)) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;
    const m = /^(#{2,3})\s+(.+?)\s*#*\s*$/.exec(line);
    if (!m) continue;
    const text = plain(m[2]);
    items.push({ id: slugger.slug(text), text, level: m[1].length as 2 | 3 });
  }
  return items;
}
