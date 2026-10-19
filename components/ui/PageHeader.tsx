import type { ReactNode } from "react";
import { EmberLight, StarField } from "./Atmosphere";
import { asset } from "@/lib/hosting";

type Props = {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  children?: ReactNode;
};

/** Interior-page header — the home hero's atmosphere: ember light, star-field and a still of the particle sphere. */
export function PageHeader({ eyebrow, title, intro, children }: Props) {
  return (
    <section className="relative isolate overflow-hidden pt-[calc(var(--header-h)+1.25rem)] pb-[clamp(3rem,6vw,5rem)]">
      <EmberLight x="76%" soft className="h-[95%]" />
      <StarField />
      {/* eslint-disable-next-line @next/next/no-img-element -- decorative still; next/image adds nothing here */}
      <img
        src={asset("/hero/particle-sphere-sm.webp")}
        alt=""
        aria-hidden
        width={760}
        height={760}
        fetchPriority="low"
        decoding="async"
        className="fade-up pointer-events-none absolute top-[-4%] right-[-30%] -z-10 w-[min(92vw,420px)] opacity-70 sm:right-[-6%] lg:right-[6%] lg:w-[400px] lg:opacity-90"
        style={{ "--d": "300ms" } as React.CSSProperties}
      />
      <div className="container-site">
        <div className="fade-up flex items-center justify-between gap-4 text-white/50">
          <p className="label-bracket">{eyebrow}</p>
          <p className="label-bracket hidden sm:block">Brand — Web — 3D — AI</p>
        </div>
        <div className="mt-[clamp(5rem,14vw,11rem)] grid gap-10 lg:grid-cols-12 lg:items-end">
          <h1
            className="fade-up font-display text-[clamp(2.3rem,5.4vw,5.2rem)] leading-[1.04] font-semibold text-paper uppercase lg:col-span-8"
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
