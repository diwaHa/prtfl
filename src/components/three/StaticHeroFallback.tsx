export default function StaticHeroFallback() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-background to-accent-violet/10" />
      <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-accent/20 blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-accent-violet/15 blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border border-accent/30 rounded-2xl rotate-45 opacity-40" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border border-accent-cyan/20 rounded-full opacity-50" />
    </div>
  );
}
