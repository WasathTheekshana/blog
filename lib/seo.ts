import type { Metadata } from "next";
import aboutData from "@/data/aboutme.json";

const siteUrl = aboutData.social.website || "https://blog.wasath.site";

export const siteConfig = {
  name: aboutData.name,
  title: aboutData.siteConfig.siteName,
  description: aboutData.siteConfig.siteDescription,
  url: siteUrl,
  ogImage: `${siteUrl}/og-image.png`,
  author: aboutData.name,
  email: aboutData.email,
  social: aboutData.social,
  keywords: [
    aboutData.name,
    "blog",
    "tech blog",
    "developer blog",
    ...aboutData.skills,
    ...aboutData.interests,
  ],
};

export function constructMetadata({
  title = siteConfig.title,
  description = siteConfig.description,
  image = siteConfig.ogImage,
  icons = "/favicon.ico",
  noIndex = false,
  canonicalUrl,
}: {
  title?: string;
  description?: string;
  image?: string;
  icons?: string;
  noIndex?: boolean;
  canonicalUrl?: string;
} = {}): Metadata {
  return {
    title: {
      default: title,
      template: `%s | ${siteConfig.title}`,
    },
    description,
    keywords: siteConfig.keywords,
    authors: [{ name: siteConfig.author, url: siteConfig.url }],
    creator: siteConfig.author,
    publisher: siteConfig.author,
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: canonicalUrl || siteConfig.url,
      types: {
        "application/rss+xml": `${siteConfig.url}/feed.xml`,
      },
    },
    openGraph: {
      type: "website",
      locale: "en_US",
      url: siteConfig.url,
      title,
      description,
      siteName: siteConfig.title,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      creator: "@wasathlk",
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    icons: {
      icon: icons,
      shortcut: icons,
      apple: "/apple-touch-icon.png",
    },
    manifest: "/manifest.json",
    verification: {
      google: aboutData.verification?.google || undefined,
    },
  };
}

export function generateBlogPostMetadata({
  title,
  description,
  date,
  tags,
  slug,
  author,
  image,
}: {
  title: string;
  description: string;
  date: string;
  tags?: string[];
  slug: string;
  author?: string;
  image?: string;
}): Metadata {
  const postUrl = `${siteConfig.url}/blog/${slug}`;
  const ogImage = image || siteConfig.ogImage;

  return {
    title,
    description,
    keywords: [...(tags || []), ...siteConfig.keywords],
    authors: [{ name: author || siteConfig.author }],
    alternates: {
      canonical: postUrl,
    },
    openGraph: {
      type: "article",
      locale: "en_US",
      url: postUrl,
      title,
      description,
      siteName: siteConfig.title,
      publishedTime: new Date(date).toISOString(),
      authors: [author || siteConfig.author],
      tags: tags,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
      creator: "@wasathlk",
    },
  };
}
