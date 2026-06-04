"use client";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="bg-[#0a0a0f] text-[#e8e8ef] flex flex-col items-center justify-center min-h-screen font-sans">
        <div className="text-center p-8 glass max-w-md rounded-2xl border border-surface-border">
          <h2 className="text-2xl font-bold mb-4 font-[var(--font-outfit)] text-foreground">
            Something went wrong!
          </h2>
          <p className="text-sm text-foreground-muted mb-8">
            An unexpected error occurred. You can attempt to reset the application state.
          </p>
          <button
            onClick={() => reset()}
            className="px-6 py-3 bg-gradient-to-r from-accent to-accent-violet hover:shadow-lg hover:shadow-accent/25 transition-all duration-300 text-sm font-semibold text-white rounded-full"
          >
            Try Again
          </button>
        </div>
      </body>
    </html>
  );
}
