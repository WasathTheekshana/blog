import { ExternalLink } from "@/components/ui/ExternalLink";
import aboutData from "@/data/aboutme.json";

export function Footer() {
  const { social } = aboutData;
  const links = [
    { href: social.github, label: "GitHub" },
    { href: social.linkedin, label: "LinkedIn" },
    { href: social.instagram, label: "Instagram" },
    { href: social.website, label: "Portfolio terminal" },
  ].filter((l) => l.href);

  return (
    <footer className="border-t border-hairline mt-16">
      <div className="max-w-4xl mx-auto px-4 py-8 grid gap-6 text-sm sm:grid-cols-[1fr_auto] sm:items-start">
        <div className="space-y-1">
          <p className="text-muted">
            {aboutData.siteConfig.copyright} © {new Date().getFullYear()} {aboutData.name}
          </p>
          <p>
            <ExternalLink href={social.gpg} className="text-link underline underline-offset-4 inline-block min-h-8">
              GPG public key
            </ExternalLink>
            <span className="text-muted"> · fingerprint </span>
            <code className="text-code break-words">{social.gpgFingerprint}</code>
          </p>
        </div>
        <nav aria-label="Elsewhere">
          <ul className="flex flex-wrap gap-x-4" role="list">
            {links.map((l) => (
              <li key={l.label}>
                <ExternalLink href={l.href} me className="text-link underline underline-offset-4 inline-flex items-center min-h-11">
                  {l.label}
                </ExternalLink>
              </li>
            ))}
            <li>
              <a href="/feed.xml" className="text-link underline underline-offset-4 inline-flex items-center min-h-11">
                RSS feed
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}
