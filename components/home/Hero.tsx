import { ArrowDown } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { HeroVisual } from "@/components/three/HeroVisual";
import { LogoReveal } from "@/components/brand/LogoReveal";
import { site } from "@/lib/site";

const d = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;

export function Hero() {
  return (
    <section id="hero" className="relative isolate flex min-h-[100svh] flex-col overflow-hidden">
      {/* Layered depth: grid, red bloom, vignette */}
      <div className="grid-lines absolute inset-0 -z-20 [mask-image:radial-gradient(ellipse_at_60%_40%,black_20%,transparent_75%)]" aria-hidden />
      <div className="absolute top-[18%] right-[-8%] -z-20 h-[60vmin] w-[60vmin] rounded-full bg-red/20 blur-[140px]" aria-hidden />

      {/* 3D centerpiece — sits behind text on mobile, to the right on desktop */}
      <div className="absolute inset-x-0 top-[var(--header-h)] bottom-[45%] -z-10 opacity-35 sm:opacity-50 lg:top-[var(--header-h)] lg:bottom-0 lg:left-[45%] lg:right-0 lg:opacity-100">
        <HeroVisual />
      </div>
      {/* Keeps copy legible where the sculpture sits behind it on small screens */}
      <div className="absolute inset-x-0 bottom-0 -z-10 h-[70%] bg-gradient-to-t from-ink via-ink/85 to-transparent lg:hidden" aria-hidden />

      <div className="container-site flex flex-1 flex-col justify-end pt-[calc(var(--header-h)+3rem)] pb-10 lg:justify-center lg:pb-20">
        <div className="max-w-[min(100%,58rem)]">
          <p className="label-mono fade-up mb-8 flex items-center gap-3 text-mute" style={d(1300)}>
            <LogoReveal className="h-4 w-auto" delay={0} />
            <span className="h-px w-8 bg-mute/40" aria-hidden />
            Creative Technology Agency
          </p>

          <h1 className="text-mega font-bold">
            <span className="rise block overflow-hidden pb-[0.04em]">
              <span style={d(150)}>We Create</span>
            </span>
            <span className="rise block overflow-hidden pb-[0.04em]">
              <span style={d(280)}>What Comes</span>
            </span>
            <span className="rise block overflow-hidden pb-[0.08em]">
              <span style={d(410)} className="relative">
                <span className="text-red">Next</span>
                <span className="text-paper">.</span>
                <span
                  aria-hidden
                  className="absolute -bottom-[0.02em] left-0 h-[0.07em] w-[calc(100%-0.35em)] origin-left bg-red-deep [animation:bar-in_1s_cubic-bezier(.16,1,.3,1)_1.1s_both]"
                />
              </span>
            </span>
          </h1>

          <p className="text-lead fade-up mt-8 max-w-xl text-paper/75" style={d(650)}>
            {site.statement} Brand identity, Next.js engineering, 3D, motion and AI — designed and built under one roof.
          </p>

          <div className="fade-up mt-10 flex flex-wrap gap-3" style={d(800)}>
            <ButtonLink href="/services" magnetic>
              Explore Our Services
            </ButtonLink>
            <ButtonLink href="/work" variant="ghost" magnetic>
              View Our Work
            </ButtonLink>
          </div>
        </div>

        <div className="fade-up mt-14 flex items-end justify-between gap-6 border-t border-line pt-6" style={d(950)}>
          <p className="label-mono flex items-center gap-3 text-paper/80">
            <span className="pulse-dot inline-block h-2 w-2 rounded-full bg-red" aria-hidden />
            {site.availability}
          </p>
          <a href="#capabilities" className="label-mono hidden items-center gap-2 text-mute hover:text-paper sm:flex">
            Scroll <ArrowDown size={14} aria-hidden />
          </a>
        </div>
      </div>
    </section>
  );
}
