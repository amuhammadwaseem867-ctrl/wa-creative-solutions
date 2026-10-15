import type { ReactNode } from "react";

type Props = {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  children?: ReactNode;
};

/** Shared top-of-page header for interior routes. */
export function PageHeader({ eyebrow, title, intro, children }: Props) {
  return (
    <section className="relative overflow-hidden border-b border-line pt-[calc(var(--header-h)+clamp(3.5rem,9vw,8rem))] pb-[clamp(3.5rem,7vw,6.5rem)]">
      <div className="grid-lines pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent)]" aria-hidden />
      <div
        className="pointer-events-none absolute -top-40 right-[-10%] h-[520px] w-[520px] rounded-full bg-red/15 blur-[140px]"
        aria-hidden
      />
      <div className="container-site relative">
        <p className="label-mono fade-up mb-8 flex items-center gap-3 text-mute">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-red" aria-hidden />
          {eyebrow}
        </p>
        <h1 className="text-mega rise max-w-[14ch] overflow-hidden pb-[0.06em]">
          <span>{title}</span>
        </h1>
        {intro && (
          <div className="text-lead fade-up mt-10 max-w-2xl text-mute" style={{ "--d": "250ms" } as React.CSSProperties}>
            {intro}
          </div>
        )}
        {children && (
          <div className="fade-up mt-10" style={{ "--d": "380ms" } as React.CSSProperties}>
            {children}
          </div>
        )}
      </div>
    </section>
  );
}
