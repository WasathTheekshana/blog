import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";
import type { Post, PostMeta, PostFrontmatter } from "@/types/blog";

const postsDirectory = path.join(process.cwd(), "content/posts");

export function getPostSlugs(): string[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }
  return fs
    .readdirSync(postsDirectory)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

export function getPostBySlug(slug: string): Post | null {
  const fullPath = path.join(postsDirectory, `${slug}.mdx`);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);
  const stats = readingTime(content);

  return {
    slug,
    frontmatter: data as PostFrontmatter,
    content,
    readingTime: stats.text,
  };
}

export function getAllPosts(): PostMeta[] {
  const slugs = getPostSlugs();

  const posts = slugs
    .map((slug) => {
      const post = getPostBySlug(slug);
      if (!post) return null;

      return {
        slug: post.slug,
        frontmatter: post.frontmatter,
        readingTime: post.readingTime,
      };
    })
    .filter((post): post is PostMeta => post !== null)
    .filter((post) => post.frontmatter.published !== false)
    .sort((a, b) => {
      const dateA = new Date(a.frontmatter.date);
      const dateB = new Date(b.frontmatter.date);
      return dateB.getTime() - dateA.getTime();
    });

  return posts;
}

export function getPostsByTag(tag: string): PostMeta[] {
  return getAllPosts().filter((post) =>
    post.frontmatter.tags?.includes(tag)
  );
}

export function getAllTags(): string[] {
  const posts = getAllPosts();
  const tags = new Set<string>();

  posts.forEach((post) => {
    post.frontmatter.tags?.forEach((tag) => tags.add(tag));
  });

  return Array.from(tags).sort();
}

export interface SearchablePost {
  slug: string;
  title: string;
  description: string;
  content: string;
  tags: string[];
  date: string;
  readingTime: string;
}

export function getSearchablePosts(): SearchablePost[] {
  const slugs = getPostSlugs();

  return slugs
    .map((slug) => {
      const post = getPostBySlug(slug);
      if (!post || post.frontmatter.published === false) return null;

      return {
        slug: post.slug,
        title: post.frontmatter.title,
        description: post.frontmatter.description,
        content: post.content,
        tags: post.frontmatter.tags || [],
        date: post.frontmatter.date,
        readingTime: post.readingTime,
      };
    })
    .filter((post): post is SearchablePost => post !== null);
}
