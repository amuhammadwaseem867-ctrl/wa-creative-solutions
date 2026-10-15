import { ArrowDown } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { HeroVisual } from "@/components/three/HeroVisual";
import { site } from "@/lib/site";

const d = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;

export function Hero() {
  return (
    <section id="hero" className="relative isolate flex min-h-[100svh] flex-col overflow-hidden">
      {/* Atmosphere: soft white bloom and a faint grid */}
      <div className="absolute top-1/2 left-1/2 -z-20 h-[70vmin] w-[70vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.05] blur-[120px]" aria-hidden />
      <div className="grid-lines absolute inset-0 -z-20 opacity-60 [mask-image:radial-gradient(ellipse_60%_55%_at_50%_50%,black,transparent)]" aria-hidden />

      {/* Liquid-chrome centerpiece */}
      <div
        className="fade-up absolute top-[36%] left-1/2 -z-10 aspect-square w-[min(112vw,62svh)] -translate-x-1/2 -translate-y-1/2 sm:top-1/2 sm:w-[min(80vw,80svh)] sm:-translate-y-[52%]"
        style={d(250)}
      >
        <HeroVisual />
      </div>

      <div className="container-site flex flex-1 flex-col pt-[calc(76px+1.75rem)] pb-8 sm:pb-10 md:pb-[92px]">
        {/* Meta row */}
        <div className="fade-up flex items-center justify-between gap-4 text-xs font-medium tracking-[0.18em] text-white/50 uppercase" style={d(0)}>
          <span>Creative Technology Studio</span>
          <span className="hidden sm:inline">Brand — Web — 3D — AI</span>
        </div>

        {/* Headline — difference blend keeps it legible over the chrome */}
        <h1 className="my-auto py-10 font-display leading-[0.86] font-extrabold tracking-[-0.045em] text-paper uppercase mix-blend-difference">
          <span className="rise block overflow-hidden text-[clamp(3rem,9.2vw,9rem)]">
            <span style={d(120)}>We create</span>
          </span>
          <span className="rise block overflow-hidden text-[clamp(3rem,9.2vw,9rem)] sm:text-right">
            <span style={d(240)}>What comes</span>
          </span>
          <span className="rise block overflow-hidden text-[clamp(3rem,9.2vw,9rem)] sm:text-right">
            <span style={d(360)}>
              Next<span className="text-red">.</span>
            </span>
          </span>
        </h1>

        {/* Footer row */}
        <div className="grid items-end gap-8 border-t border-white/10 pt-7 md:grid-cols-[1fr_auto_1fr]">
          <div className="fade-up max-w-sm" style={d(520)}>
            <p className="flex items-center gap-2.5 text-xs font-medium tracking-[0.14em] text-white/70 uppercase">
              <span className="pulse-dot inline-block h-1.5 w-1.5 rounded-full bg-red" aria-hidden />
              {site.availability}
            </p>
            <p className="mt-3 text-[0.95rem] leading-relaxed text-white/55">{site.statement}</p>
          </div>
          <a
            href="#capabilities"
            className="fade-up hidden h-12 w-12 items-center justify-center justify-self-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-white/40 hover:text-paper md:flex"
            style={d(640)}
            aria-label="Scroll to content"
          >
            <ArrowDown size={16} aria-hidden />
          </a>
          <div className="fade-up flex flex-wrap gap-3 md:justify-end" style={d(600)}>
            <ButtonLink href="/services" magnetic>
              Explore services
            </ButtonLink>
            <ButtonLink href="/work" variant="ghost" magnetic>
              View our work
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
