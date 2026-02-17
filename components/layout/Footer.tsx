export function Footer() {
  return (
    <footer className="border-t border-[var(--terminal-border)] mt-auto">
      <div className="max-w-4xl mx-auto px-4 py-6 text-center text-[var(--terminal-gray)] text-sm">
        <p>
          <span className="text-[var(--terminal-green)]">&gt;</span> EOF{" "}
          <span className="text-[var(--terminal-gray)]">|</span>{" "}
          <span className="text-[var(--terminal-cyan)]">&copy; {new Date().getFullYear()}</span>{" "}
          <span className="text-[var(--terminal-gray)]">|</span>{" "}
          <span className="text-[var(--terminal-purple)]">built with next.js</span>
        </p>
      </div>
    </footer>
  );
}
