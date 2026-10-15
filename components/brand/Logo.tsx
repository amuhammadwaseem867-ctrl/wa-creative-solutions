import { MONOGRAM_BAR_PATH, MONOGRAM_BODY_PATH, MONOGRAM_VIEWBOX } from "@/lib/brand";

export type LogoTone = "white" | "black" | "red" | "accent";

/**
 * tone:
 *  - "accent": white body + red crossbar (primary, for dark backgrounds)
 *  - "white" / "black": single-colour versions
 *  - "red": full red mark
 */
const toneColors: Record<LogoTone, { body: string; bar: string }> = {
  accent: { body: "#FFFFFF", bar: "#FF202D" },
  white: { body: "#FFFFFF", bar: "#FFFFFF" },
  black: { body: "#080808", bar: "#080808" },
  red: { body: "#FF202D", bar: "#FF202D" },
};

type MonogramProps = {
  tone?: LogoTone;
  className?: string;
  title?: string;
};

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
      <path d={MONOGRAM_BAR_PATH} fill={c.bar} />
    </svg>
  );
}

type LogoProps = {
  tone?: LogoTone;
  className?: string;
  /** Hide the descriptor line ("CREATIVE SOLUTION") at small sizes. */
  compact?: boolean;
};

/** Primary horizontal lock-up: monogram + wordmark. */
export function Logo({ tone = "accent", className = "", compact = false }: LogoProps) {
  const text = tone === "black" ? "text-ink" : tone === "red" ? "text-red" : "text-paper";
  return (
    <span className={`inline-flex items-center gap-3 ${text} ${className}`}>
      <Monogram tone={tone} className="h-[1.35em] w-auto shrink-0" />
      <span className="flex flex-col leading-none">
        <span className="font-display text-[1em] font-bold tracking-[-0.02em]">WA</span>
        {!compact && (
          <span className="mt-[0.28em] font-mono text-[0.42em] font-medium tracking-[0.32em] opacity-80">
            CREATIVE SOLUTION
          </span>
        )}
      </span>
      <span className="sr-only">WA Creative Solution</span>
    </span>
  );
}
