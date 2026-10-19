/**
 * Shared atmosphere from the home hero: ember light, star-field crosses and the spark ornament.
 * All decorative — hidden from assistive tech.
 */

type EmberProps = {
  /** Horizontal position of the light source, e.g. "50%" or "78%". */
  x?: string;
  /** Dimmer version for interior sections. */
  soft?: boolean;
  /** Light rises from the bottom edge instead of falling from the top. */
  rise?: boolean;
  className?: string;
};

export function EmberLight({ x = "50%", soft = false, rise = false, className = "h-[80vh]" }: EmberProps) {
  return (
    <div
      aria-hidden
      className={`ember-light -z-20 ${soft ? "ember-soft" : ""} ${rise ? "ember-rise" : ""} ${className}`}
      style={{ "--ember-x": x } as React.CSSProperties}
    />
  );
}

/** [x%, y%, delay s] — default positions keep clear of typical text columns. */
const DEFAULT_STARS: [number, number, number][] = [
  [8, 22, 0],
  [21, 58, 1.8],
  [36, 14, 0.9],
  [64, 30, 2.6],
  [83, 18, 1.2],
  [93, 52, 3.1],
];

export function StarField({ stars = DEFAULT_STARS, className = "" }: { stars?: [number, number, number][]; className?: string }) {
  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 -z-20 ${className}`}>
      <div className="cross-grid absolute inset-0" />
      {stars.map(([x, y, delay]) => (
        <span key={`${x}-${y}`} className="twinkle" style={{ left: `${x}%`, top: `${y}%`, animationDelay: `${delay}s` }} />
      ))}
    </div>
  );
}

/** Four-point spark — the headline ornament. */
export function Spark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="-10 -10 60 60"
      className={className}
      style={{ background: "radial-gradient(circle closest-side, rgb(255 122 69 / 0.32), transparent)" }}
      aria-hidden
    >
      <path d="M20 0Q22 18 40 20Q22 22 20 40Q18 22 0 20Q18 18 20 0Z" fill="currentColor" />
    </svg>
  );
}
