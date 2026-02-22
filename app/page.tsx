import Link from "next/link";
import { getAllPosts } from "@/lib/blog";
import { getBasicInfo, getAboutMe } from "@/lib/about";
import { siteConfig } from "@/lib/seo";
import { PostCard } from "@/components/blog/PostCard";
import { WebsiteJsonLd, PersonJsonLd } from "@/components/seo/JsonLd";

export default function HomePage() {
  const posts = getAllPosts().slice(0, 3);
  const info = getBasicInfo();
  const about = getAboutMe();

  const socialLinks = Object.values(about.social).filter(Boolean) as string[];

  return (
    <>
      <WebsiteJsonLd />
      <PersonJsonLd
        name={about.name}
        url={siteConfig.url}
        jobTitle={about.title}
        description={about.bio}
        image={about.avatar ? `${siteConfig.url}${about.avatar}` : undefined}
        sameAs={socialLinks}
      />

      <div className="max-w-4xl mx-auto px-4 py-12">
        <section className="mb-16" aria-labelledby="intro-heading">
          <div className="text-[var(--terminal-gray)] text-sm mb-4">
            <span className="text-[var(--terminal-green)]">$</span> whoami
          </div>
          <div className="border border-[var(--terminal-border)] bg-[var(--terminal-surface)] p-6">
            <h1 id="intro-heading" className="text-2xl text-[var(--terminal-green)] mb-2">
              {info.name}<span className="cursor-blink">_</span>
            </h1>
            <p className="text-[var(--terminal-cyan)] text-sm mb-3">
              {info.title}
            </p>
            <p className="text-[var(--terminal-gray)] leading-relaxed">
              {info.tagline}
            </p>
            <div className="mt-4 text-sm flex flex-wrap gap-4">
              <span>
                <span className="text-[var(--terminal-yellow)]">status:</span>{" "}
                <span className="text-[var(--terminal-green)]">online</span>
              </span>
              <span>
                <span className="text-[var(--terminal-yellow)]">location:</span>{" "}
                <span className="text-[var(--terminal-gray)]">{info.location}</span>
              </span>
              <span>
                <span className="text-[var(--terminal-yellow)]">posts:</span>{" "}
                <span className="text-[var(--terminal-cyan)]">{posts.length}</span>
              </span>
            </div>
          </div>
        </section>

        <section aria-labelledby="posts-heading">
          <div className="flex items-center justify-between mb-6">
            <h2 id="posts-heading" className="text-[var(--terminal-gray)] text-sm">
              <span className="text-[var(--terminal-green)]">$</span> ls -la ./posts | head -3
            </h2>
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
    </>
  );
}
