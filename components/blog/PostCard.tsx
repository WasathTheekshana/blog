import Link from "next/link";
import type { PostMeta } from "@/types/blog";

export function PostCard({ post, index = 0 }: { post: PostMeta; index?: number }) {
  const { slug, frontmatter, readingTime } = post;
  const date = new Date(frontmatter.date);

  return (
    <article className="card rise" style={{ "--i": index } as React.CSSProperties}>
      <p className="prompt mb-1" aria-hidden="true">
        <b>$</b> cat {slug}.mdx
      </p>

      <h2 className="text-xl font-semibold leading-snug">
        <Link href={`/blog/${slug}`} className="card-link">
          {frontmatter.title}
        </Link>
      </h2>

      <p className="reading mt-2 text-muted leading-relaxed line-clamp-3">{frontmatter.description}</p>

      <p className="mt-3 text-sm text-muted">
        <time dateTime={frontmatter.date}>
          {date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
        </time>
        <span aria-hidden="true"> · </span>
        <span className="sr-only">, </span>
        {readingTime}
      </p>

      {frontmatter.tags && frontmatter.tags.length > 0 ? (
        <ul className="mt-3 flex flex-wrap gap-2" role="list" aria-label="Tags">
          {frontmatter.tags.map((tag) => (
            <li key={tag}>
              <Link href={`/blog/tag/${encodeURIComponent(tag)}`} className="tag tag-link">
                #{tag}
              </Link>
            </li>
          ))}
        </ul>
      ) : null}
    </article>
  );
}
