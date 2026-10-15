import type { ReactNode } from "react";

type Props = {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  children?: ReactNode;
};

/** Centered interior-page hero with grid backdrop and red glow. */
export function PageHeader({ eyebrow, title, intro, children }: Props) {
  return (
    <section className="relative isolate overflow-hidden pt-[calc(var(--header-h)+clamp(3.5rem,8vw,6rem))] pb-[clamp(3.5rem,7vw,5.5rem)]">
      <div className="grid-lines absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_60%_70%_at_50%_0%,black,transparent)]" aria-hidden />
      <div className="absolute top-[-220px] left-1/2 -z-10 h-[460px] w-[760px] -translate-x-1/2 rounded-full bg-red/25 blur-[130px]" aria-hidden />
      <div className="container-site text-center">
        <p className="badge fade-up mb-6">
          <span className="h-1.5 w-1.5 rounded-full bg-red" aria-hidden />
          {eyebrow}
        </p>
        <h1 className="text-mega text-gradient-white fade-up mx-auto max-w-4xl pb-1" style={{ "--d": "80ms" } as React.CSSProperties}>
          {title}
        </h1>
        {intro && (
          <div className="text-lead fade-up mx-auto mt-6 max-w-2xl text-white/60" style={{ "--d": "180ms" } as React.CSSProperties}>
            {intro}
          </div>
        )}
        {children && (
          <div className="fade-up mt-9 flex justify-center" style={{ "--d": "280ms" } as React.CSSProperties}>
            {children}
          </div>
        )}
      </div>
    </section>
  );
}
