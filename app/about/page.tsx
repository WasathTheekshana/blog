import type { Metadata } from "next";
import Link from "next/link";
import { getAboutMe } from "@/lib/about";
import { siteConfig } from "@/lib/seo";
import { PersonJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { ExternalLink } from "@/components/ui/ExternalLink";

export const metadata: Metadata = {
  title: "About",
  description: `Learn more about ${siteConfig.author} - ${siteConfig.description}`,
  alternates: { canonical: `${siteConfig.url}/about` },
  openGraph: {
    title: `About | ${siteConfig.title}`,
    description: `Learn more about ${siteConfig.author}`,
    url: `${siteConfig.url}/about`,
    type: "profile",
  },
};

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section aria-labelledby={id} className="card mb-6">
      <h2 id={id} className="text-lg font-semibold mb-3">
        <span className="text-ok" aria-hidden="true">$ </span>{title}
      </h2>
      {children}
    </section>
  );
}

export default function AboutPage() {
  const about = getAboutMe();
  const socialLinks = Object.values(about.social).filter(Boolean) as string[];
  const links = [
    { href: about.social.github, label: "GitHub" },
    { href: about.social.linkedin, label: "LinkedIn" },
    { href: about.social.instagram, label: "Instagram" },
    { href: about.social.website, label: "Portfolio terminal" },
  ].filter((l): l is { href: string; label: string } => Boolean(l.href));

  return (
    <>
      <PersonJsonLd
        name={about.name}
        url={siteConfig.url}
        jobTitle={about.title}
        description={about.bio}
        image={about.avatar ? `${siteConfig.url}${about.avatar}` : undefined}
        sameAs={socialLinks}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: siteConfig.url },
          { name: "About", url: `${siteConfig.url}/about` },
        ]}
      />

      <div className="max-w-4xl mx-auto px-4 py-10">
        <nav aria-label="Breadcrumb" className="mb-4 text-sm">
          <ol className="flex items-center gap-2 text-muted" role="list">
            <li><Link href="/" className="underline underline-offset-4 inline-flex items-center min-h-8">Home</Link></li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-ink">About</li>
          </ol>
        </nav>

        <header className="card mb-6">
          <h1 className="text-3xl font-semibold">{about.name}</h1>
          <p className="text-accent-ink mt-1">{about.title}</p>
          <p className="reading text-lg leading-relaxed mt-3 max-w-[62ch]">{about.bio}</p>
          <dl className="mt-5 grid gap-2 text-sm sm:grid-cols-2">
            <div className="flex gap-2"><dt className="text-hot">Location</dt><dd>{about.location}</dd></div>
            <div className="flex gap-2">
              <dt className="text-hot">Email</dt>
              <dd><a href={`mailto:${about.email}`} className="text-link underline underline-offset-4">{about.email}</a></dd>
            </div>
          </dl>
        </header>

        <Section id="skills-heading" title="Skills">
          <ul className="flex flex-wrap gap-2" role="list">
            {about.skills.map((s) => (
              <li key={s} className="tag !text-ink">{s}</li>
            ))}
          </ul>
        </Section>

        {about.experience.length > 0 ? (
          <Section id="experience-heading" title="Experience">
            <ul className="space-y-4" role="list">
              {about.experience.map((e) => (
                <li key={`${e.company}-${e.period}`}>
                  <h3 className="font-semibold">{e.role} <span className="text-muted font-normal">at</span> {e.company}</h3>
                  <p className="text-sm text-muted">{e.period}</p>
                  {e.description ? <p className="reading mt-1">{e.description}</p> : null}
                </li>
              ))}
            </ul>
          </Section>
        ) : null}

        {about.education.length > 0 ? (
          <Section id="education-heading" title="Education">
            <ul className="space-y-4" role="list">
              {about.education.map((e) => (
                <li key={`${e.institution}-${e.year}`}>
                  <h3 className="font-semibold">{e.degree}</h3>
                  <p>{e.institution}</p>
                  <p className="text-sm text-muted">{e.year}</p>
                  {e.description ? <p className="reading mt-1">{e.description}</p> : null}
                </li>
              ))}
            </ul>
          </Section>
        ) : null}

        {about.interests.length > 0 ? (
          <Section id="interests-heading" title="Interests">
            <ul className="flex flex-wrap gap-x-4 gap-y-1" role="list">
              {about.interests.map((i) => (
                <li key={i} className="text-pink">#{i.toLowerCase().replace(/\s+/g, "-")}</li>
              ))}
            </ul>
          </Section>
        ) : null}

        <Section id="links-heading" title="Find me elsewhere">
          <ul className="flex flex-wrap gap-x-5" role="list">
            {links.map((l) => (
              <li key={l.label}>
                <ExternalLink href={l.href} me className="text-link underline underline-offset-4 inline-flex items-center min-h-11">
                  {l.label}
                </ExternalLink>
              </li>
            ))}
          </ul>
        </Section>
      </div>
    </>
  );
}
