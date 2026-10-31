import Link from "next/link";
import { getAllPosts } from "@/lib/blog";
import { getBasicInfo, getAboutMe } from "@/lib/about";
import { siteConfig } from "@/lib/seo";
import { PostCard } from "@/components/blog/PostCard";
import { WebsiteJsonLd, PersonJsonLd } from "@/components/seo/JsonLd";

const ASCII = [
  "██╗    ██╗ █████╗ ███████╗ █████╗ ████████╗██╗  ██╗",
  "██║    ██║██╔══██╗██╔════╝██╔══██╗╚══██╔══╝██║  ██║",
  "██║ █╗ ██║███████║███████╗███████║   ██║   ███████║",
  "██║███╗██║██╔══██║╚════██║██╔══██║   ██║   ██╔══██║",
  "╚███╔███╔╝██║  ██║███████║██║  ██║   ██║   ██║  ██║",
  " ╚══╝╚══╝ ╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝   ╚═╝   ╚═╝  ╚═╝",
];

export default function HomePage() {
  const all = getAllPosts();
  const posts = all.slice(0, 3);
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

      <div className="max-w-4xl mx-auto px-4 py-10">
        <section aria-labelledby="intro-heading" className="mb-14">
          <p className="prompt mb-3" aria-hidden="true"><b>$</b> whoami</p>
          <div className="card !border-l-[3px]">
            <pre className="ascii mb-4" aria-hidden="true">{ASCII.join("\n")}</pre>
            <h1 id="intro-heading" className="text-2xl font-semibold">{info.name}</h1>
            <p className="text-accent-ink mt-1">{info.title}</p>
            <p className="reading text-lg leading-relaxed mt-3 max-w-[60ch]">{info.tagline}</p>
            <dl className="mt-5 flex flex-wrap gap-x-8 gap-y-2 text-sm">
              <div className="flex gap-2"><dt className="text-hot">Location</dt><dd>{info.location}</dd></div>
              <div className="flex gap-2"><dt className="text-hot">Posts</dt><dd>{all.length}</dd></div>
            </dl>
          </div>
        </section>

        <section aria-labelledby="posts-heading">
          <div className="flex flex-wrap items-baseline justify-between gap-3 mb-5">
            <h2 id="posts-heading" className="text-xl font-semibold">
              <span className="text-ok" aria-hidden="true">$ </span>Latest posts
            </h2>
            <Link href="/blog" className="text-link underline underline-offset-4 inline-flex items-center min-h-11">
              All posts<span className="sr-only"> ({all.length})</span> <span aria-hidden="true">→</span>
            </Link>
          </div>
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
    </>
  );
}
