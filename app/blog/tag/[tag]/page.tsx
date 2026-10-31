import Link from "next/link";
import { getPostsByTag, getAllTags } from "@/lib/blog";
import { PostCard } from "@/components/blog/PostCard";

interface TagPageProps {
  params: Promise<{ tag: string }>;
}

export async function generateStaticParams() {
  return getAllTags().map((tag) => ({ tag: encodeURIComponent(tag) }));
}

export async function generateMetadata({ params }: TagPageProps) {
  const { tag } = await params;
  const decoded = decodeURIComponent(tag);
  return { title: `#${decoded}`, description: `Posts tagged with ${decoded}` };
}

export default async function TagPage({ params }: TagPageProps) {
  const { tag } = await params;
  const decoded = decodeURIComponent(tag);
  const posts = getPostsByTag(decoded);
  const allTags = getAllTags();

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <nav aria-label="Breadcrumb" className="mb-4 text-sm">
        <ol className="flex items-center gap-2 text-muted" role="list">
          <li><Link href="/" className="underline underline-offset-4 inline-flex items-center min-h-8">Home</Link></li>
          <li aria-hidden="true">/</li>
          <li><Link href="/blog" className="underline underline-offset-4 inline-flex items-center min-h-8">Blog</Link></li>
          <li aria-hidden="true">/</li>
          <li aria-current="page" className="text-ink">#{decoded}</li>
        </ol>
      </nav>

      <header className="mb-8">
        <h1 className="text-3xl font-semibold">
          <span className="text-pink">#</span>{decoded}
        </h1>
        <p className="mt-2 text-muted">
          {posts.length} post{posts.length === 1 ? "" : "s"} with this tag
        </p>
      </header>

      <section aria-labelledby="tags-heading" className="mb-8">
        <h2 id="tags-heading" className="text-sm text-muted mb-2">All tags</h2>
        <ul className="flex flex-wrap gap-2" role="list">
          {allTags.map((t) => (
            <li key={t}>
              <Link
                href={`/blog/tag/${encodeURIComponent(t)}`}
                className="tag"
                aria-current={t === decoded ? "page" : undefined}
              >
                #{t}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {posts.length === 0 ? (
        <p className="card text-muted">No posts use the tag &ldquo;{decoded}&rdquo;.</p>
      ) : (
        <div className="space-y-4">
          {posts.map((post, i) => (
            <PostCard key={post.slug} post={post} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}
