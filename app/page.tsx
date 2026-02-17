import Link from "next/link";
import { getAllPosts } from "@/lib/blog";
import { PostCard } from "@/components/blog/PostCard";

export default function HomePage() {
  const posts = getAllPosts().slice(0, 3);

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <section className="mb-16">
        <div className="text-[var(--terminal-gray)] text-sm mb-4">
          <span className="text-[var(--terminal-green)]">$</span> whoami
        </div>
        <div className="border border-[var(--terminal-border)] bg-[var(--terminal-surface)] p-6">
          <h1 className="text-2xl text-[var(--terminal-green)] mb-2">
            Welcome to my blog<span className="cursor-blink">_</span>
          </h1>
          <p className="text-[var(--terminal-gray)] leading-relaxed">
            Thoughts, ideas, and stories about technology and life.
          </p>
          <div className="mt-4 text-sm">
            <span className="text-[var(--terminal-yellow)]">status:</span>{" "}
            <span className="text-[var(--terminal-green)]">online</span>
            <span className="mx-3 text-[var(--terminal-border)]">|</span>
            <span className="text-[var(--terminal-yellow)]">posts:</span>{" "}
            <span className="text-[var(--terminal-cyan)]">{posts.length}</span>
          </div>
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between mb-6">
          <div className="text-[var(--terminal-gray)] text-sm">
            <span className="text-[var(--terminal-green)]">$</span> ls -la ./posts | head -3
          </div>
          <Link
            href="/blog"
            className="text-[var(--terminal-cyan)] hover:text-[var(--terminal-green)] text-sm transition-colors"
          >
            [view all]
          </Link>
        </div>
        {posts.length === 0 ? (
          <div className="border border-[var(--terminal-border)] bg-[var(--terminal-surface)] p-4 text-[var(--terminal-gray)]">
            <span className="text-[var(--terminal-yellow)]">warning:</span> no posts found
          </div>
        ) : (
          <div className="space-y-4">
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
