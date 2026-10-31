import type { ReactNode } from "react";

/** Opens in a new tab and says so to screen readers, which a bare target="_blank" does not. */
export function ExternalLink({
  href,
  children,
  className,
  me = false,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  me?: boolean;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel={me ? "noopener noreferrer me" : "noopener noreferrer"}
      className={className}
    >
      {children}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}
