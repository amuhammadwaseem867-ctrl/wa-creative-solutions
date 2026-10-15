import type { ServiceVisual as Kind } from "@/lib/services";

/**
 * Custom line-art "visual concepts" — one constructed diagram per discipline,
 * drawn in the brand palette rather than stock icons. Hover states are driven
 * by the parent `.group`.
 */
export function ServiceVisual({ kind, className = "" }: { kind: Kind; className?: string }) {
  const stroke = "currentColor";
  const common = { fill: "none", stroke, strokeWidth: 1, vectorEffect: "non-scaling-stroke" as const };
  return (
    <svg viewBox="0 0 200 140" className={className} aria-hidden>
      {kind === "identity" && (
        <g>
          <circle cx="100" cy="70" r="52" {...common} opacity=".35" />
          <circle cx="100" cy="70" r="32" {...common} opacity=".35" />
          <path d="M48 70h104M100 18v104M63 33l74 74M137 33l-74 74" {...common} opacity=".2" />
          <path d="M72 100 92 40h16l20 60" {...common} strokeWidth={2} className="transition-[stroke-dashoffset] duration-1000 [stroke-dasharray:220] [stroke-dashoffset:0] group-hover:[stroke-dashoffset:440]" />
          <rect x="84" y="76" width="32" height="7" fill="#ff202d" />
        </g>
      )}
      {kind === "web" && (
        <g>
          <rect x="22" y="18" width="156" height="104" rx="6" {...common} opacity=".5" />
          <path d="M22 34h156" {...common} opacity=".5" />
          <circle cx="32" cy="26" r="2.5" fill="#ff202d" />
          <rect x="36" y="48" width="70" height="10" fill="currentColor" opacity=".9" className="origin-left transition-transform duration-700 group-hover:scale-x-110" />
          <rect x="36" y="64" width="48" height="5" fill="currentColor" opacity=".35" />
          <rect x="36" y="88" width="34" height="14" rx="7" fill="#ff202d" />
          <path d="M120 48h44v56h-44z M120 48l44 56M164 48l-44 56" {...common} opacity=".3" />
        </g>
      )}
      {kind === "ai" && (
        <g>
          {[
            [40, 40], [40, 100], [100, 26], [100, 70], [100, 114], [160, 48], [160, 92],
          ].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r={i === 3 ? 9 : 4} fill={i === 3 ? "#ff202d" : "currentColor"} opacity={i === 3 ? 1 : 0.8} />
          ))}
          <path d="M40 40 100 26M40 40l60 30M40 100l60-30M40 100l60 14M100 26l60 22M100 70l60-22M100 70l60 22M100 114l60-22M100 26v88" {...common} opacity=".35" />
          <circle cx="100" cy="70" r="20" {...common} className="origin-center transition-transform duration-1000 [transform-box:fill-box] group-hover:scale-150 group-hover:opacity-0" />
        </g>
      )}
      {kind === "cgi" && (
        <g className="origin-center transition-transform duration-1000 [transform-box:view-box] group-hover:rotate-[8deg]">
          <path d="M100 20 150 48v56l-50 28-50-28V48z" {...common} opacity=".7" />
          <path d="M100 20v0M50 48l50 28 50-28M100 76v56" {...common} opacity=".7" />
          <path d="M100 76 150 48v56l-50 28z" fill="#ff202d" opacity=".9" />
          <path d="M75 34l50 28M75 118V62l50-28" {...common} opacity=".2" />
        </g>
      )}
      {kind === "campaign" && (
        <g>
          {[0, 1, 2].map((i) => (
            <rect
              key={i}
              x={46 + i * 22}
              y={22 + i * 12}
              width="72"
              height="90"
              rx="4"
              fill={i === 2 ? "#ff202d" : "none"}
              stroke="currentColor"
              opacity={i === 2 ? 0.95 : 0.5}
              className={`transition-transform duration-700 ${["group-hover:-translate-x-3", "", "group-hover:translate-x-3"][i]}`}
            />
          ))}
          <path d="M100 70h28M100 80h20" stroke="#080808" strokeWidth="3" className="transition-transform duration-700 group-hover:translate-x-3" />
        </g>
      )}
      {kind === "editorial" && (
        <g>
          <rect x="30" y="20" width="140" height="100" {...common} opacity=".45" />
          <path d="M100 20v100" {...common} opacity=".25" />
          <rect x="40" y="32" width="50" height="22" fill="currentColor" />
          {[64, 72, 80, 88, 96, 104].map((y) => (
            <rect key={y} x="40" y={y} width={y % 16 ? 46 : 50} height="2.5" fill="currentColor" opacity=".45" />
          ))}
          <rect x="110" y="32" width="50" height="60" fill="#ff202d" opacity=".9" />
          {[100, 108].map((y) => (
            <rect key={y} x="110" y={y} width="50" height="2.5" fill="currentColor" opacity=".45" />
          ))}
        </g>
      )}
    </svg>
  );
}
