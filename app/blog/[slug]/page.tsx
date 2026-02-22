import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getPostBySlug, getPostSlugs } from "@/lib/blog";
import { generateBlogPostMetadata, siteConfig } from "@/lib/seo";
import { mdxComponents } from "@/components/blog/MDXComponents";
import { BlogPostJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import Link from "next/link";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return { title: "Post Not Found" };
  }

  return generateBlogPostMetadata({
    title: post.frontmatter.title,
    description: post.frontmatter.description,
    date: post.frontmatter.date,
    tags: post.frontmatter.tags,
    slug: post.slug,
    author: post.frontmatter.author,
    image: post.frontmatter.image,
  });
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const postUrl = `${siteConfig.url}/blog/${slug}`;

  return (
    <>
      <BlogPostJsonLd
        title={post.frontmatter.title}
        description={post.frontmatter.description}
        url={postUrl}
        datePublished={post.frontmatter.date}
        author={post.frontmatter.author || siteConfig.author}
        image={post.frontmatter.image}
        tags={post.frontmatter.tags}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: siteConfig.url },
          { name: "Blog", url: `${siteConfig.url}/blog` },
          { name: post.frontmatter.title, url: postUrl },
        ]}
      />

      <article className="max-w-3xl mx-auto px-4 py-8">
        <nav aria-label="Breadcrumb" className="mb-4">
          <ol className="flex items-center gap-2 text-xs text-[var(--terminal-gray)]">
            <li>
              <Link href="/" className="hover:text-[var(--terminal-green)]">
                ~
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link href="/blog" className="hover:text-[var(--terminal-green)]">
                blog
              </Link>
            </li>
            <li>/</li>
            <li className="text-[var(--terminal-cyan)]">{slug}</li>
          </ol>
        </nav>

        <Link
          href="/blog"
          className="text-[var(--terminal-gray)] hover:text-[var(--terminal-green)] text-sm mb-8 inline-block transition-colors"
        >
          <span className="text-[var(--terminal-green)]">$</span> cd ..
        </Link>

        <header className="mb-8 border border-[var(--terminal-border)] bg-[var(--terminal-surface)] p-6">
          <div className="text-xs text-[var(--terminal-gray)] mb-4">
            <span className="text-[var(--terminal-green)]">$</span> cat {slug}.mdx
          </div>

          <h1 className="text-2xl text-[var(--terminal-green)] mb-2">
            {post.frontmatter.title}
          </h1>
          <p className="text-[var(--terminal-gray)]">
            {post.frontmatter.description}
          </p>

          <div className="mt-4 pt-4 border-t border-[var(--terminal-border)] flex flex-wrap gap-4 text-xs text-[var(--terminal-gray)]">
            <time dateTime={post.frontmatter.date}>
              <span className="text-[var(--terminal-yellow)]">date:</span>{" "}
              {new Date(post.frontmatter.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
            <span>
              <span className="text-[var(--terminal-yellow)]">read:</span>{" "}
              {post.readingTime}
            </span>
            {post.frontmatter.author && (
              <span>
                <span className="text-[var(--terminal-yellow)]">author:</span>{" "}
                <span itemProp="author">{post.frontmatter.author}</span>
              </span>
            )}
          </div>

          {post.frontmatter.tags && post.frontmatter.tags.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {post.frontmatter.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/blog/tag/${encodeURIComponent(tag)}`}
                  className="text-xs text-[var(--terminal-purple)] hover:text-[var(--terminal-cyan)] transition-colors"
                  rel="tag"
                >
                  #{tag}
                </Link>
              ))}
            </div>
          )}
        </header>

        <div className="prose-terminal">
          <MDXRemote source={post.content} components={mdxComponents} />
        </div>

        <footer className="mt-12 pt-6 border-t border-[var(--terminal-border)] text-sm text-[var(--terminal-gray)]">
          <span className="text-[var(--terminal-green)]">&gt;</span> EOF
        </footer>
      </article>
    </>
  );
}
