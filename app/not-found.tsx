import Link from "next/link";

export const metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <p className="prompt mb-3" aria-hidden="true"><b>$</b> cd missing-page</p>
      <h1 className="text-3xl font-semibold">Page not found</h1>
      <p className="reading mt-3 text-lg text-muted">
        That address doesn&apos;t exist. It may have been moved, or the link has a typo.
      </p>
      <ul className="mt-6 flex flex-wrap gap-x-6" role="list">
        <li><Link href="/blog" className="text-link underline underline-offset-4 inline-flex items-center min-h-11">Browse all posts</Link></li>
        <li><Link href="/" className="text-link underline underline-offset-4 inline-flex items-center min-h-11">Go home</Link></li>
      </ul>
    </div>
  );
}
