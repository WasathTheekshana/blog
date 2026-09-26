import Link from "next/link";
import aboutData from "@/data/aboutme.json";

export function Footer() {
  const { social } = aboutData;

  return (
    <footer className="border-t border-[var(--terminal-border)] mt-auto">
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-[var(--terminal-gray)]">
          <p>
            {social.gpg ? (
              <Link
                href={social.gpg}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--terminal-purple)] hover:text-[var(--terminal-green)] transition-colors"
              >
                {social.gpgFingerprint}
              </Link>
            ) : (
              <span className="text-[var(--terminal-purple)]">{social.gpgFingerprint}</span>
            )}
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
            {social.instagram && (
              <Link
                href={social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[var(--terminal-cyan)] transition-colors"
              >
                [instagram]
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
