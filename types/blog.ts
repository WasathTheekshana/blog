export interface PostFrontmatter {
  title: string;
  description: string;
  date: string;
  tags?: string[];
  published?: boolean;
  author?: string;
  image?: string;
}

export interface Post {
  slug: string;
  frontmatter: PostFrontmatter;
  content: string;
  readingTime: string;
}

export interface PostMeta {
  slug: string;
  frontmatter: PostFrontmatter;
  readingTime: string;
}
