"use client";

import { useRef, useState, type ReactNode } from "react";

/**
 * Code block with a decorative terminal header and a copy button.
 * The <pre> is focusable so keyboard users can scroll long lines horizontally.
 */
export function CodeBlock({ children }: { children: ReactNode }) {
  const pre = useRef<HTMLPreElement>(null);
  const [state, setState] = useState<"idle" | "copied" | "failed">("idle");

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(pre.current?.innerText ?? "");
      setState("copied");
    } catch {
      setState("failed");
    }
    setTimeout(() => setState("idle"), 2000);
  };

  return (
    <figure className="codeblock not-prose">
      <div className="chrome">
        <span className="dots" aria-hidden="true">
          <i style={{ background: "var(--pink)" }} />
          <i style={{ background: "var(--accent)" }} />
          <i style={{ background: "var(--ok)" }} />
          <span className="ml-2">terminal</span>
        </span>
        <button type="button" className="btn !min-h-9 !text-xs" onClick={copy}>
          {state === "copied" ? "Copied" : state === "failed" ? "Copy failed" : "Copy"}
          <span className="sr-only"> code</span>
        </button>
      </div>
      <pre ref={pre} tabIndex={0} aria-label="Code">
        {children}
      </pre>
      <span role="status" aria-live="polite" className="sr-only">
        {state === "copied" ? "Code copied to clipboard" : state === "failed" ? "Could not copy" : ""}
      </span>
    </figure>
  );
}
