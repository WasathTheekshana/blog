import type { MDXComponents } from "mdx/types";
import { CodeBlock } from "./CodeBlock";

/**
 * Most styling lives in `.prose-terminal` (globals.css). Components here only change markup
 * where plain HTML is not accessible enough on its own.
 */
export const mdxComponents: MDXComponents = {
  // The page already has an h1 (the post title), so any h1 inside the body drops to h2.
  h1: ({ children, id }) => <h2 id={id}>{children}</h2>,
  // list-style: none removes list semantics in Safari/VoiceOver unless the role is explicit.
  ul: ({ children }) => <ul role="list">{children}</ul>,
  pre: ({ children }) => <CodeBlock>{children}</CodeBlock>,
  a: ({ href, children }) => {
    const external = href?.startsWith("http");
    return (
      <a href={href} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined}>
        {children}
        {external ? <span className="sr-only"> (opens in a new tab)</span> : null}
      </a>
    );
  },
  // Wide tables scroll inside a focusable region instead of breaking the page width.
  table: ({ children }) => (
    <div className="table-wrap" tabIndex={0} role="region" aria-label="Table, scrollable">
      <table>{children}</table>
    </div>
  ),
  img: ({ src, alt }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt ?? ""} loading="lazy" decoding="async" />
  ),
};
