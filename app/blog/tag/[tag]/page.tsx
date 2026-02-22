import Link from "next/link";
import { getPostsByTag, getAllTags } from "@/lib/blog";
import { PostCard } from "@/components/blog/PostCard";

interface TagPageProps {
  params: Promise<{ tag: string }>;
}

export async function generateStaticParams() {
  const tags = getAllTags();
  return tags.map((tag) => ({ tag: encodeURIComponent(tag) }));
}

export async function generateMetadata({ params }: TagPageProps) {
  const { tag } = await params;
  const decodedTag = decodeURIComponent(tag);

  return {
    title: `#${decodedTag}`,
    description: `Posts tagged with ${decodedTag}`,
  };
}

export default async function TagPage({ params }: TagPageProps) {
  const { tag } = await params;
  const decodedTag = decodeURIComponent(tag);
  const posts = getPostsByTag(decodedTag);
  const allTags = getAllTags();

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <Link
          href="/blog"
          className="text-[var(--terminal-gray)] hover:text-[var(--terminal-green)] text-sm transition-colors"
        >
          <span className="text-[var(--terminal-green)]">$</span> cd /blog
        </Link>
      </div>

      <div className="mb-8">
        <div className="text-[var(--terminal-gray)] text-sm mb-4">
          <span className="text-[var(--terminal-green)]">$</span> grep -r &quot;{decodedTag}&quot; ./posts
        </div>
        <div className="border border-[var(--terminal-border)] bg-[var(--terminal-surface)] p-4">
          <h1 className="text-xl text-[var(--terminal-purple)]">
            #{decodedTag}
          </h1>
          <p className="text-sm text-[var(--terminal-gray)] mt-1">
            {posts.length} post{posts.length !== 1 ? "s" : ""} found
          </p>
        </div>
      </div>

      {/* Other tags */}
      <div className="mb-8">
        <div className="text-[var(--terminal-gray)] text-xs mb-2">
          <span className="text-[var(--terminal-green)]">$</span> ls ./tags
        </div>
        <div className="flex flex-wrap gap-2">
          {allTags.map((t) => (
            <Link
              key={t}
              href={`/blog/tag/${encodeURIComponent(t)}`}
              className={`text-xs px-2 py-1 border transition-colors ${
                t === decodedTag
                  ? "border-[var(--terminal-purple)] text-[var(--terminal-purple)] bg-[var(--terminal-surface)]"
                  : "border-[var(--terminal-border)] text-[var(--terminal-gray)] hover:border-[var(--terminal-purple)] hover:text-[var(--terminal-purple)]"
              }`}
            >
              #{t}
            </Link>
          ))}
        </div>
      </div>

      {/* Posts */}
      {posts.length === 0 ? (
        <div className="border border-[var(--terminal-border)] bg-[var(--terminal-surface)] p-4 text-[var(--terminal-gray)]">
          <span className="text-[var(--terminal-yellow)]">warning:</span> no posts found with tag &quot;{decodedTag}&quot;
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
