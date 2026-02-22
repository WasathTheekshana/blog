import { siteConfig } from "@/lib/seo";

interface WebsiteJsonLdProps {
  url?: string;
}

export function WebsiteJsonLd({ url = siteConfig.url }: WebsiteJsonLdProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.title,
    description: siteConfig.description,
    url: url,
    author: {
      "@type": "Person",
      name: siteConfig.author,
      url: siteConfig.url,
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${url}/blog?search={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

interface PersonJsonLdProps {
  name: string;
  url: string;
  jobTitle?: string;
  description?: string;
  image?: string;
  sameAs?: string[];
}

export function PersonJsonLd({
  name,
  url,
  jobTitle,
  description,
  image,
  sameAs,
}: PersonJsonLdProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name,
    url,
    jobTitle,
    description,
    image,
    sameAs,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

interface BlogPostJsonLdProps {
  title: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified?: string;
  author: string;
  image?: string;
  tags?: string[];
}

export function BlogPostJsonLd({
  title,
  description,
  url,
  datePublished,
  dateModified,
  author,
  image,
  tags,
}: BlogPostJsonLdProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description,
    url,
    datePublished: new Date(datePublished).toISOString(),
    dateModified: dateModified
      ? new Date(dateModified).toISOString()
      : new Date(datePublished).toISOString(),
    author: {
      "@type": "Person",
      name: author,
      url: siteConfig.url,
    },
    publisher: {
      "@type": "Person",
      name: siteConfig.author,
      url: siteConfig.url,
    },
    image: image || siteConfig.ogImage,
    keywords: tags?.join(", "),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

interface BreadcrumbJsonLdProps {
  items: { name: string; url: string }[];
}

export function BreadcrumbJsonLd({ items }: BreadcrumbJsonLdProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
