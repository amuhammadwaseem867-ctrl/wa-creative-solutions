import { MONOGRAM_ACCENT_PATH, MONOGRAM_BODY_PATH, MONOGRAM_VIEWBOX } from "@/lib/brand";

export type LogoTone = "white" | "black" | "red" | "accent" | "accent-dark";

/**
 * tone:
 *  - "accent": red hexagon + white letters (primary, dark backgrounds)
 *  - "accent-dark": red hexagon + black letters (primary, light backgrounds)
 *  - "white" / "black" / "red": single-colour versions
 */
const toneColors: Record<LogoTone, { body: string; accent: string; text: string }> = {
  accent: { body: "#FFFFFF", accent: "#FF202D", text: "text-paper" },
  "accent-dark": { body: "#080808", accent: "#FF202D", text: "text-ink" },
  white: { body: "#FFFFFF", accent: "#FFFFFF", text: "text-paper" },
  black: { body: "#080808", accent: "#080808", text: "text-ink" },
  red: { body: "#FF202D", accent: "#FF202D", text: "text-red" },
};

type MonogramProps = { tone?: LogoTone; className?: string; title?: string };

export function Monogram({ tone = "accent", className, title }: MonogramProps) {
  const c = toneColors[tone];
  return (
    <svg
      viewBox={`0 0 ${MONOGRAM_VIEWBOX.width} ${MONOGRAM_VIEWBOX.height}`}
      className={className}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      <path d={MONOGRAM_BODY_PATH} fill={c.body} />
      <path d={MONOGRAM_ACCENT_PATH} fill={c.accent} />
    </svg>
  );
}

type LogoProps = { tone?: LogoTone; className?: string; compact?: boolean };

/** Primary horizontal lock-up: hexagon monogram + two-line wordmark. */
export function Logo({ tone = "accent", className = "", compact = false }: LogoProps) {
  const c = toneColors[tone];
  return (
    <span className={`inline-flex items-center gap-[0.55em] ${c.text} ${className}`}>
      <Monogram tone={tone} className="h-[1.9em] w-auto shrink-0" />
      <span className="flex flex-col leading-none">
        <span className="font-display text-[0.82em] font-bold tracking-[0.14em]">WA CREATIVE</span>
        {!compact && <span className="mt-[0.3em] font-sans text-[0.5em] font-medium tracking-[0.5em] opacity-60">SOLUTION</span>}
      </span>
      <span className="sr-only">WA Creative Solution</span>
    </span>
  );
}
