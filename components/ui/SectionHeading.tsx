import type { ReactNode } from "react";

type Props = {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: "center" | "left";
  className?: string;
  as?: "h1" | "h2";
  /** Kept for API compatibility; numbering is no longer displayed. */
  index?: string;
};

/** Section header: pill badge, Montserrat heading, supporting paragraph. */
export function SectionHeading({ eyebrow, title, intro, align = "center", className = "", as: Tag = "h2" }: Props) {
  const center = align === "center";
  return (
    <header className={`${center ? "mx-auto max-w-3xl text-center" : "max-w-2xl"} ${className}`}>
      <p className="badge mb-5" data-reveal>
        <span className="h-1.5 w-1.5 rounded-full bg-red" aria-hidden />
        {eyebrow}
      </p>
      <Tag className="text-display" data-reveal style={{ "--reveal-delay": "60ms" } as React.CSSProperties}>
        {title}
      </Tag>
      {intro && (
        <div
          className={`text-lead mt-5 text-white/60 in-[.surface-light]:text-mute-dark ${center ? "mx-auto max-w-2xl" : ""}`}
          data-reveal
          style={{ "--reveal-delay": "120ms" } as React.CSSProperties}
        >
          {intro}
        </div>
      )}
    </header>
  );
}
