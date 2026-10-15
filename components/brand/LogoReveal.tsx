import { MONOGRAM_BAR_PATH, MONOGRAM_SHAPES, MONOGRAM_VIEWBOX, toPath } from "@/lib/brand";

/**
 * Cinematic logo reveal — pure CSS/SVG so it costs nothing in JS.
 * Each facet's outline draws in, then fills; the red crossbar cuts across last.
 * Under prefers-reduced-motion the global rule collapses it to the end state.
 */
export function LogoReveal({ className = "", delay = 0 }: { className?: string; delay?: number }) {
  const shapes = Object.values(MONOGRAM_SHAPES);
  return (
    <svg
      viewBox={`-2 -2 ${MONOGRAM_VIEWBOX.width + 4} ${MONOGRAM_VIEWBOX.height + 4}`}
      className={className}
      aria-hidden
    >
      {shapes.map((poly, i) => (
        <path
          key={i}
          d={toPath(poly)}
          fill="#fff"
          stroke="#fff"
          strokeWidth={0.6}
          pathLength={400}
          style={{
            strokeDasharray: 400,
            animation: `draw 1.4s cubic-bezier(.65,0,.35,1) ${delay + i * 110}ms both`,
          }}
        />
      ))}
      <path
        d={MONOGRAM_BAR_PATH}
        fill="#FF202D"
        style={{
          transformBox: "fill-box",
          transformOrigin: "left center",
          animation: `bar-in 0.7s cubic-bezier(.16,1,.3,1) ${delay + 1150}ms both`,
        }}
      />
    </svg>
  );
}
