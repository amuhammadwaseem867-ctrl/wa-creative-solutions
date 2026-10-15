import { MONOGRAM_ACCENT_PATH, MONOGRAM_SHAPES, MONOGRAM_VIEWBOX, toPath } from "@/lib/brand";

/**
 * Cinematic logo reveal — pure CSS/SVG. Each facet's outline draws in and
 * fills, then the red apex rises into place. Reduced motion shows the end state.
 */
export function LogoReveal({ className = "", delay = 0 }: { className?: string; delay?: number }) {
  const shapes = Object.values(MONOGRAM_SHAPES);
  return (
    <svg viewBox={`-2 -2 ${MONOGRAM_VIEWBOX.width + 4} ${MONOGRAM_VIEWBOX.height + 4}`} className={className} aria-hidden>
      {shapes.map((poly, i) => (
        <path
          key={i}
          d={toPath(poly)}
          fill="#fff"
          stroke="#fff"
          strokeWidth={0.6}
          pathLength={400}
          style={{ strokeDasharray: 400, animation: `draw 1.4s cubic-bezier(.65,0,.35,1) ${delay + i * 120}ms both` }}
        />
      ))}
      <path
        d={MONOGRAM_ACCENT_PATH}
        fill="#FF202D"
        style={{ animation: `apex-in 0.8s cubic-bezier(.16,1,.3,1) ${delay + 1150}ms both` }}
      />
    </svg>
  );
}
