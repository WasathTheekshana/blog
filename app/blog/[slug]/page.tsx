import { notFound } from "next/navigation";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import { getPostBySlug, getPostSlugs } from "@/lib/blog";
import { generateBlogPostMetadata, siteConfig } from "@/lib/seo";
import { extractHeadings, stripLeadingH1 } from "@/lib/toc";
import { mdxComponents } from "@/components/blog/MDXComponents";
import { BlogPostJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Post not found" };

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
  if (!post) notFound();

  const postUrl = `${siteConfig.url}/blog/${slug}`;
  const body = stripLeadingH1(post.content);
  const headings = extractHeadings(body);
  const date = new Date(post.frontmatter.date);

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

      <article className="max-w-3xl mx-auto px-4 py-10">
        <nav aria-label="Breadcrumb" className="mb-5 text-sm">
          <ol className="flex flex-wrap items-center gap-2 text-muted" role="list">
            <li><Link href="/" className="underline underline-offset-4 inline-flex items-center min-h-8">Home</Link></li>
            <li aria-hidden="true">/</li>
            <li><Link href="/blog" className="underline underline-offset-4 inline-flex items-center min-h-8">Blog</Link></li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-ink break-all">{slug}</li>
          </ol>
        </nav>

        <header className="mb-8">
          <h1 className="text-3xl font-semibold leading-tight">{post.frontmatter.title}</h1>
          <p className="reading text-lg text-muted mt-3 leading-relaxed max-w-[65ch]">{post.frontmatter.description}</p>

          <p className="mt-4 text-sm text-muted">
            <time dateTime={post.frontmatter.date}>
              {date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
            </time>
            <span aria-hidden="true"> · </span><span className="sr-only">, </span>
            {post.readingTime}
            {post.frontmatter.author ? (
              <>
                <span aria-hidden="true"> · </span><span className="sr-only">, </span>
                by <span itemProp="author">{post.frontmatter.author}</span>
              </>
            ) : null}
          </p>

          {post.frontmatter.tags && post.frontmatter.tags.length > 0 ? (
            <ul className="mt-4 flex flex-wrap gap-2" role="list" aria-label="Tags">
              {post.frontmatter.tags.map((tag) => (
                <li key={tag}>
                  <Link href={`/blog/tag/${encodeURIComponent(tag)}`} className="tag" rel="tag">#{tag}</Link>
                </li>
              ))}
            </ul>
          ) : null}
        </header>

        {headings.length >= 3 ? (
          <nav aria-label="On this page" className="toc card mb-10 max-w-[72ch]">
            <details>
              <summary className="cursor-pointer min-h-11 inline-flex items-center font-semibold">Contents ({headings.length} sections)</summary>
              <ol className="mt-2 space-y-0.5" role="list">
                {headings.map((h) => (
                  <li key={h.id} className={h.level === 3 ? "pl-5" : ""}>
                    <a href={`#${h.id}`}>{h.text}</a>
                  </li>
                ))}
              </ol>
            </details>
          </nav>
        ) : null}

        <div className="prose-terminal">
          <MDXRemote
            source={body}
            components={mdxComponents}
            options={{ mdxOptions: { remarkPlugins: [remarkGfm], rehypePlugins: [rehypeSlug] } }}
          />
        </div>

        <footer className="mt-14 pt-6 border-t border-hairline flex flex-wrap items-center justify-between gap-4 text-sm">
          <Link href="/blog" className="text-link underline underline-offset-4 inline-flex items-center min-h-11">
            <span aria-hidden="true">← </span>All posts
          </Link>
          <a href="#main" className="text-link underline underline-offset-4 inline-flex items-center min-h-11">
            Back to top <span aria-hidden="true">↑</span>
          </a>
        </footer>
      </article>
    </>
  );
}
