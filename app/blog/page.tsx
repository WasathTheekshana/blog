import Link from "next/link";
import { getAllPosts, getAllTags } from "@/lib/blog";
import { PostCard } from "@/components/blog/PostCard";

export const metadata = {
  title: "blog",
  description: "Read my latest blog posts",
};

export default function BlogPage() {
  const posts = getAllPosts();
  const tags = getAllTags();

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="text-[var(--terminal-gray)] text-sm mb-4">
          <span className="text-[var(--terminal-green)]">$</span> ls -la ./posts
        </div>
        <div className="border border-[var(--terminal-border)] bg-[var(--terminal-surface)] p-4">
          <div className="text-sm text-[var(--terminal-gray)]">
            total {posts.length} file(s)
          </div>
        </div>
      </div>

      {/* Tags filter */}
      {tags.length > 0 && (
        <div className="mb-8">
          <div className="text-[var(--terminal-gray)] text-xs mb-2">
            <span className="text-[var(--terminal-green)]">$</span> ls ./tags
          </div>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Link
                key={tag}
                href={`/blog/tag/${encodeURIComponent(tag)}`}
                className="text-xs px-2 py-1 border border-[var(--terminal-border)] text-[var(--terminal-purple)] hover:border-[var(--terminal-purple)] hover:bg-[var(--terminal-surface)] transition-colors"
              >
                #{tag}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Posts */}
      {posts.length === 0 ? (
        <div className="border border-[var(--terminal-border)] bg-[var(--terminal-surface)] p-4 text-[var(--terminal-gray)]">
          <span className="text-[var(--terminal-yellow)]">warning:</span> directory is empty
        </div>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
