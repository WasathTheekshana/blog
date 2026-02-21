import Link from "next/link";
import { getAboutMe } from "@/lib/about";

export const metadata = {
  title: "about",
  description: "Learn more about me",
};

export default function AboutPage() {
  const about = getAboutMe();

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="text-[var(--terminal-gray)] text-sm mb-4">
        <span className="text-[var(--terminal-green)]">$</span> cat ./about.md
      </div>

      {/* Basic Info */}
      <section className="border border-[var(--terminal-border)] bg-[var(--terminal-surface)] p-6 mb-6">
        <h1 className="text-2xl text-[var(--terminal-green)] mb-2">
          {about.name}
        </h1>
        <p className="text-[var(--terminal-cyan)] mb-4">{about.title}</p>
        <p className="text-[var(--terminal-gray)] leading-relaxed">{about.bio}</p>

        <div className="mt-4 pt-4 border-t border-[var(--terminal-border)] grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
          <div>
            <span className="text-[var(--terminal-yellow)]">location:</span>{" "}
            <span className="text-[var(--terminal-gray)]">{about.location}</span>
          </div>
          <div>
            <span className="text-[var(--terminal-yellow)]">email:</span>{" "}
            <Link
              href={`mailto:${about.email}`}
              className="text-[var(--terminal-cyan)] hover:text-[var(--terminal-green)]"
            >
              {about.email}
            </Link>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className="border border-[var(--terminal-border)] bg-[var(--terminal-surface)] p-6 mb-6">
        <div className="text-xs text-[var(--terminal-gray)] mb-3">
          <span className="text-[var(--terminal-green)]">$</span> echo $SKILLS
        </div>
        <div className="flex flex-wrap gap-2">
          {about.skills.map((skill) => (
            <span
              key={skill}
              className="text-sm border border-[var(--terminal-border)] px-2 py-1 text-[var(--terminal-cyan)]"
            >
              {skill}
            </span>
          ))}
        </div>
      </section>

      {/* Experience */}
      {about.experience.length > 0 && (
        <section className="border border-[var(--terminal-border)] bg-[var(--terminal-surface)] p-6 mb-6">
          <div className="text-xs text-[var(--terminal-gray)] mb-4">
            <span className="text-[var(--terminal-green)]">$</span> cat ./experience.log
          </div>
          <div className="space-y-4">
            {about.experience.map((exp, index) => (
              <div
                key={index}
                className="pl-4 border-l-2 border-[var(--terminal-border)]"
              >
                <h3 className="text-[var(--terminal-green)]">{exp.role}</h3>
                <p className="text-sm text-[var(--terminal-cyan)]">{exp.company}</p>
                <p className="text-xs text-[var(--terminal-gray)]">{exp.period}</p>
                {exp.description && (
                  <p className="text-sm text-[var(--terminal-gray)] mt-1">
                    {exp.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {about.education.length > 0 && (
        <section className="border border-[var(--terminal-border)] bg-[var(--terminal-surface)] p-6 mb-6">
          <div className="text-xs text-[var(--terminal-gray)] mb-4">
            <span className="text-[var(--terminal-green)]">$</span> cat ./education.log
          </div>
          <div className="space-y-4">
            {about.education.map((edu, index) => (
              <div
                key={index}
                className="pl-4 border-l-2 border-[var(--terminal-border)]"
              >
                <h3 className="text-[var(--terminal-green)]">{edu.degree}</h3>
                <p className="text-sm text-[var(--terminal-cyan)]">{edu.institution}</p>
                <p className="text-xs text-[var(--terminal-gray)]">{edu.year}</p>
                {edu.description && (
                  <p className="text-sm text-[var(--terminal-gray)] mt-1">
                    {edu.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Interests */}
      {about.interests.length > 0 && (
        <section className="border border-[var(--terminal-border)] bg-[var(--terminal-surface)] p-6 mb-6">
          <div className="text-xs text-[var(--terminal-gray)] mb-3">
            <span className="text-[var(--terminal-green)]">$</span> echo $INTERESTS
          </div>
          <div className="flex flex-wrap gap-2">
            {about.interests.map((interest) => (
              <span
                key={interest}
                className="text-sm text-[var(--terminal-purple)]"
              >
                #{interest.toLowerCase().replace(/\s+/g, "-")}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Social Links */}
      <section className="border border-[var(--terminal-border)] bg-[var(--terminal-surface)] p-6">
        <div className="text-xs text-[var(--terminal-gray)] mb-3">
          <span className="text-[var(--terminal-green)]">$</span> cat ./social.json
        </div>
        <div className="flex flex-wrap gap-4 text-sm">
          {about.social.github && (
            <Link
              href={about.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--terminal-gray)] hover:text-[var(--terminal-green)] transition-colors"
            >
              [github]
            </Link>
          )}
          {about.social.instagram && (
            <Link
              href={about.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--terminal-gray)] hover:text-[var(--terminal-cyan)] transition-colors"
            >
              [instagram]
            </Link>
          )}
          {about.social.linkedin && (
            <Link
              href={about.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--terminal-gray)] hover:text-[var(--terminal-cyan)] transition-colors"
            >
              [linkedin]
            </Link>
          )}
          {about.social.website && (
            <Link
              href={about.social.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--terminal-gray)] hover:text-[var(--terminal-yellow)] transition-colors"
            >
              [website]
            </Link>
          )}
        </div>
      </section>

      <div className="mt-6 text-sm text-[var(--terminal-gray)]">
        <span className="text-[var(--terminal-green)]">&gt;</span> EOF
      </div>
    </div>
  );
}
