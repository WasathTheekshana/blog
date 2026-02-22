import Link from "next/link";
import type { PostMeta } from "@/types/blog";

interface PostCardProps {
  post: PostMeta;
}

export function PostCard({ post }: PostCardProps) {
  const { slug, frontmatter, readingTime } = post;

  return (
    <article className="group border border-[var(--terminal-border)] bg-[var(--terminal-surface)] p-4 transition-all hover:border-[var(--terminal-green)] hover:shadow-[0_0_10px_rgba(63,185,80,0.1)]">
      <div className="flex items-center gap-2 text-xs text-[var(--terminal-gray)] mb-2">
        <span className="text-[var(--terminal-green)]">$</span>
        <span>cat</span>
        <span className="text-[var(--terminal-cyan)]">{slug}.mdx</span>
      </div>

      <div className="pl-4 border-l-2 border-[var(--terminal-border)]">
        <Link href={`/blog/${slug}`}>
          <h2 className="text-lg text-[var(--terminal-green)] group-hover:text-[var(--terminal-cyan)] transition-colors cursor-pointer">
            {frontmatter.title}
          </h2>
        </Link>
        <p className="mt-1 text-sm text-[var(--terminal-gray)] line-clamp-2">
          {frontmatter.description}
        </p>

        <div className="mt-3 flex items-center gap-4 text-xs text-[var(--terminal-gray)]">
          <span>
            <span className="text-[var(--terminal-yellow)]">date:</span>{" "}
            {new Date(frontmatter.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </span>
          <span>
            <span className="text-[var(--terminal-yellow)]">read:</span> {readingTime}
          </span>
        </div>

        {frontmatter.tags && frontmatter.tags.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-2">
            {frontmatter.tags.map((tag) => (
              <Link
                key={tag}
                href={`/blog/tag/${encodeURIComponent(tag)}`}
                className="text-xs text-[var(--terminal-purple)] hover:text-[var(--terminal-cyan)] transition-colors"
              >
                #{tag}
              </Link>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
