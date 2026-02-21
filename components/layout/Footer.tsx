import Link from "next/link";
import aboutData from "@/data/aboutme.json";

export function Footer() {
  const { social, siteConfig } = aboutData;

  return (
    <footer className="border-t border-[var(--terminal-border)] mt-auto">
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-[var(--terminal-gray)]">
          <p>
            <span className="text-[var(--terminal-green)]">&gt;</span> EOF{" "}
            <span className="text-[var(--terminal-gray)]">|</span>{" "}
            <span className="text-[var(--terminal-cyan)]">&copy; {new Date().getFullYear()} {aboutData.name}</span>{" "}
            <span className="text-[var(--terminal-gray)]">|</span>{" "}
            <span className="text-[var(--terminal-purple)]">{siteConfig.copyright}</span>
          </p>
          <div className="flex gap-4">
            {social.github && (
              <Link
                href={social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[var(--terminal-green)] transition-colors"
              >
                [github]
              </Link>
            )}
            {social.twitter && (
              <Link
                href={social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[var(--terminal-cyan)] transition-colors"
              >
                [twitter]
              </Link>
            )}
            {social.linkedin && (
              <Link
                href={social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[var(--terminal-cyan)] transition-colors"
              >
                [linkedin]
              </Link>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
