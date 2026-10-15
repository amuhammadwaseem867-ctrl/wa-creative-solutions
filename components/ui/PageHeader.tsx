import type { ReactNode } from "react";

type Props = {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  children?: ReactNode;
};

/** Editorial interior-page header — mirrors the home hero's left-aligned composition. */
export function PageHeader({ eyebrow, title, intro, children }: Props) {
  return (
    <section className="relative isolate overflow-hidden pt-[calc(var(--header-h)+clamp(3rem,7vw,5.5rem))] pb-[clamp(3rem,6vw,5rem)]">
      <div className="grid-lines absolute inset-0 -z-10 opacity-70 [mask-image:radial-gradient(ellipse_70%_80%_at_20%_0%,black,transparent)]" aria-hidden />
      <div className="absolute top-[-260px] left-[10%] -z-10 h-[480px] w-[640px] rounded-full bg-white/[0.05] blur-[130px]" aria-hidden />
      <div className="container-site">
        <p className="fade-up mb-8 flex items-center gap-3 text-xs font-medium tracking-[0.18em] text-white/50 uppercase">
          <span className="h-px w-8 bg-white/30" aria-hidden />
          {eyebrow}
        </p>
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <h1
            className="fade-up font-display text-[clamp(2.6rem,6.4vw,6rem)] leading-[0.95] font-extrabold tracking-[-0.045em] text-paper lg:col-span-8"
            style={{ "--d": "80ms" } as React.CSSProperties}
          >
            {title}
          </h1>
          {(intro || children) && (
            <div className="fade-up lg:col-span-4 lg:pb-2" style={{ "--d": "200ms" } as React.CSSProperties}>
              {intro && <div className="text-white/60">{intro}</div>}
              {children && <div className="mt-7 [&>div]:justify-start">{children}</div>}
            </div>
          )}
        </div>
        <div className="mt-14 h-px bg-gradient-to-r from-white/20 via-white/10 to-transparent" aria-hidden />
      </div>
    </section>
  );
}
