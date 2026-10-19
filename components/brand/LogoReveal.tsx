import { MONOGRAM_PARTS, MONOGRAM_VIEWBOX } from "@/lib/brand";

/**
 * Cinematic logo reveal — pure CSS/SVG. The red hexagon frame draws in and fills,
 * then the WA letters follow. Reduced motion shows the end state.
 */
export function LogoReveal({ className = "", delay = 0 }: { className?: string; delay?: number }) {
  return (
    <svg viewBox={`-2 -2 ${MONOGRAM_VIEWBOX.width + 4} ${MONOGRAM_VIEWBOX.height + 4}`} className={className} aria-hidden>
      {MONOGRAM_PARTS.map((part, i) => {
        const color = part.accent ? "#FF202D" : "#fff";
        return (
          <path
            key={i}
            d={part.d}
            fill={color}
            stroke={color}
            strokeWidth={0.6}
            pathLength={400}
            style={{ strokeDasharray: 400, animation: `draw 1.4s cubic-bezier(.65,0,.35,1) ${delay + i * 260}ms both` }}
          />
        );
      })}
    </svg>
  );
}
