import { getAllPosts } from "@/lib/blog";
import { PostCard } from "@/components/blog/PostCard";

export const metadata = {
  title: "blog",
  description: "Read my latest blog posts",
};

export default function BlogPage() {
  const posts = getAllPosts();

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
