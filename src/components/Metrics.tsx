export function Metrics() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="bg-surface-container rounded-2xl p-8 flex flex-col items-center justify-center text-center gap-2 border border-outline-variant/20">
        <span className="font-display text-6xl font-bold text-secondary">
          15+
        </span>
        <span className="text-on-surface-variant text-sm font-semibold uppercase tracking-wider">
          Years of Impact
        </span>
      </div>
      <div className="bg-surface-container rounded-2xl p-8 flex flex-col items-center justify-center text-center gap-2 border border-outline-variant/20">
        <span className="font-display text-6xl font-bold text-secondary">
          10k+
        </span>
        <span className="text-on-surface-variant text-sm font-semibold uppercase tracking-wider">
          Families Supported
        </span>
      </div>
      <div className="bg-surface-container rounded-2xl p-8 flex flex-col items-center justify-center text-center gap-2 border border-outline-variant/20">
        <span className="font-display text-6xl font-bold text-secondary">
          20+
        </span>
        <span className="text-on-surface-variant text-sm font-semibold uppercase tracking-wider">
          Districts Reached
        </span>
      </div>
    </section>
  );
}
