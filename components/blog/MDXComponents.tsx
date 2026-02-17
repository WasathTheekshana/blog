import type { MDXComponents } from "mdx/types";

export const mdxComponents: MDXComponents = {
  h1: ({ children }) => (
    <h1 className="text-2xl text-[var(--terminal-green)] mt-8 mb-4 font-normal">
      <span className="text-[var(--terminal-gray)]"># </span>
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="text-xl text-[var(--terminal-cyan)] mt-6 mb-3 font-normal">
      <span className="text-[var(--terminal-gray)]">## </span>
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="text-lg text-[var(--terminal-yellow)] mt-4 mb-2 font-normal">
      <span className="text-[var(--terminal-gray)]">### </span>
      {children}
    </h3>
  ),
  p: ({ children }) => (
    <p className="my-4 leading-7 text-[var(--foreground)]">{children}</p>
  ),
  ul: ({ children }) => (
    <ul className="my-4 space-y-2">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="my-4 space-y-2 counter-reset-item">{children}</ol>
  ),
  li: ({ children }) => (
    <li className="leading-7 text-[var(--foreground)] pl-4 before:content-['›'] before:text-[var(--terminal-green)] before:mr-2">
      {children}
    </li>
  ),
  a: ({ href, children }) => (
    <a
      href={href}
      className="text-[var(--terminal-cyan)] hover:text-[var(--terminal-green)] underline decoration-[var(--terminal-border)] underline-offset-2 transition-colors"
      target={href?.startsWith("http") ? "_blank" : undefined}
      rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
    >
      {children}
    </a>
  ),
  code: ({ children }) => (
    <code className="bg-[var(--terminal-surface)] border border-[var(--terminal-border)] px-1.5 py-0.5 text-sm text-[var(--terminal-yellow)]">
      {children}
    </code>
  ),
  pre: ({ children }) => (
    <pre className="bg-[var(--terminal-surface)] border border-[var(--terminal-border)] p-4 overflow-x-auto my-4 text-sm">
      <div className="flex items-center gap-2 text-xs text-[var(--terminal-gray)] mb-3 pb-2 border-b border-[var(--terminal-border)]">
        <span className="w-3 h-3 rounded-full bg-[var(--terminal-red)]"></span>
        <span className="w-3 h-3 rounded-full bg-[var(--terminal-yellow)]"></span>
        <span className="w-3 h-3 rounded-full bg-[var(--terminal-green)]"></span>
        <span className="ml-2">terminal</span>
      </div>
      {children}
    </pre>
  ),
  blockquote: ({ children }) => (
    <blockquote className="border-l-2 border-[var(--terminal-purple)] pl-4 my-4 text-[var(--terminal-gray)] italic">
      <span className="text-[var(--terminal-purple)]">&gt; </span>
      {children}
    </blockquote>
  ),
  hr: () => (
    <hr className="my-8 border-[var(--terminal-border)] border-dashed" />
  ),
  img: ({ src, alt }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt || ""}
      className="border border-[var(--terminal-border)] my-4 max-w-full"
    />
  ),
  strong: ({ children }) => (
    <strong className="text-[var(--terminal-green)] font-normal">{children}</strong>
  ),
  em: ({ children }) => (
    <em className="text-[var(--terminal-purple)] not-italic">{children}</em>
  ),
};
