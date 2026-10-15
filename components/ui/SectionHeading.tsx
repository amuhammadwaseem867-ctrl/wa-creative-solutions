import type { ReactNode } from "react";

type Props = {
  index?: string;
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: "split" | "stack";
  className?: string;
  as?: "h1" | "h2";
};

/** Editorial section header: mono eyebrow, oversized title, optional intro. */
export function SectionHeading({ index, eyebrow, title, intro, align = "split", className = "", as: Tag = "h2" }: Props) {
  return (
    <header className={`grid gap-8 ${align === "split" ? "lg:grid-cols-12 lg:items-end" : ""} ${className}`}>
      <div className={align === "split" ? "lg:col-span-7" : ""}>
        <p className="label-mono mb-6 flex items-center gap-3 text-mute in-[.surface-light]:text-mute-dark" data-reveal>
          {index && <span className="text-red in-[.surface-light]:text-red-deep">{index}</span>}
          <span className="h-px w-8 bg-current opacity-40" aria-hidden />
          <span>{eyebrow}</span>
        </p>
        <Tag className="text-display" data-reveal style={{ "--reveal-delay": "80ms" } as React.CSSProperties}>
          {title}
        </Tag>
      </div>
      {intro && (
        <div
          className={`text-lead text-mute in-[.surface-light]:text-mute-dark ${align === "split" ? "lg:col-span-4 lg:col-start-9" : "max-w-2xl"}`}
          data-reveal
          style={{ "--reveal-delay": "160ms" } as React.CSSProperties}
        >
          {intro}
        </div>
      )}
    </header>
  );
}
