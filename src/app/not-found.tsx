import Link from "next/link";

export default function NotFound() {
  return (
    <main className="bg-[#0a0a0f] text-[#e8e8ef] flex flex-col items-center justify-center min-h-screen px-6 text-center">
      <div className="p-8 md:p-12 glass rounded-2xl max-w-md border border-surface-border">
        <h2 className="text-3xl font-extrabold mb-4 font-[var(--font-outfit)] text-foreground">
          404 &mdash; Page Not Found
        </h2>
        <p className="text-sm text-foreground-muted mb-8 leading-relaxed">
          The digital experience you are looking for does not exist or has been relocated.
        </p>
        <Link
          href="/"
          className="inline-flex px-6 py-3 bg-gradient-to-r from-accent to-accent-violet hover:shadow-lg hover:shadow-accent/25 transition-all duration-300 text-sm font-semibold text-white rounded-full"
        >
          Return Home
        </Link>
      </div>
    </main>
  );
}
