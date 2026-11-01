import Link from "next/link";
import { getAllPosts, getAllTags } from "@/lib/blog";
import { PostCard } from "@/components/blog/PostCard";

export const metadata = {
  title: "Blog",
  description: "Posts on DevOps, cloud infrastructure, security and the tools I use.",
};

export default function BlogPage() {
  const posts = getAllPosts();
  const tags = getAllTags();

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <nav aria-label="Breadcrumb" className="mb-4 text-sm">
        <ol className="flex items-center gap-2 text-muted" role="list">
          <li><Link href="/" className="underline underline-offset-4 inline-flex items-center min-h-8">Home</Link></li>
          <li aria-hidden="true">/</li>
          <li aria-current="page" className="text-ink">Blog</li>
        </ol>
      </nav>

      <header className="mb-8">
        <h1 className="text-3xl font-semibold">Blog</h1>
        <p className="mt-2 text-muted">
          {posts.length} post{posts.length === 1 ? "" : "s"}
        </p>
      </header>

      {tags.length > 0 ? (
        <section aria-labelledby="tags-heading" className="mb-8">
          <h2 id="tags-heading" className="text-sm text-muted mb-2">Browse by tag</h2>
          <ul className="flex flex-wrap gap-2" role="list">
            {tags.map((tag) => (
              <li key={tag}>
                <Link href={`/blog/tag/${encodeURIComponent(tag)}`} className="tag">#{tag}</Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <section aria-labelledby="all-posts-heading">
        <h2 id="all-posts-heading" className="sr-only">All posts</h2>
        {posts.length === 0 ? (
          <p className="card text-muted">No posts yet.</p>
        ) : (
          <div className="space-y-4">
            {posts.map((post, i) => (
              <PostCard key={post.slug} post={post} index={i} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
