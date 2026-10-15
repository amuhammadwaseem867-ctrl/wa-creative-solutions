import { Box, Code2, Palette, Sparkles } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { HeroVisual } from "@/components/three/HeroVisual";
import { site } from "@/lib/site";

const d = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;

const pillars = [
  { icon: Palette, label: "Brand Identity" },
  { icon: Code2, label: "Web Development" },
  { icon: Box, label: "3D & Motion" },
  { icon: Sparkles, label: "AI Solutions" },
];

export function Hero() {
  return (
    <section id="hero" className="relative isolate overflow-hidden pt-[calc(var(--header-h)+2.5rem)] pb-16 lg:min-h-[100svh] lg:pb-20">
      {/* Backdrop: masked grid + red bloom */}
      <div className="grid-lines absolute inset-0 -z-20 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_30%,black,transparent)]" aria-hidden />
      <div className="absolute top-[-15%] right-[-10%] -z-20 h-[640px] w-[640px] rounded-full bg-red/20 blur-[150px]" aria-hidden />
      <div className="absolute bottom-0 left-[-15%] -z-20 h-[420px] w-[520px] rounded-full bg-red-deep/10 blur-[140px]" aria-hidden />

      <div className="container-site grid items-center gap-6 lg:min-h-[calc(100svh-var(--header-h)-4.5rem)] lg:grid-cols-[1.05fr_1fr] lg:gap-4">
        <div className="relative z-10 text-center lg:text-left">
          <p className="badge fade-up" style={d(0)}>
            <span className="pulse-dot inline-block h-2 w-2 rounded-full bg-red" aria-hidden />
            {site.availability}
          </p>

          <h1 className="text-mega fade-up mt-7" style={d(80)}>
            We Create <br className="hidden sm:block" />
            What Comes <span className="text-gradient-red">Next.</span>
          </h1>

          <p className="text-lead fade-up mx-auto mt-6 max-w-xl text-white/60 lg:mx-0" style={d(180)}>
            {site.statement}
          </p>

          <div className="fade-up mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row lg:justify-start" style={d(280)}>
            <ButtonLink href="/services" magnetic>
              Explore Our Services
            </ButtonLink>
            <ButtonLink href="/work" variant="ghost" magnetic>
              View Our Work
            </ButtonLink>
          </div>

          <ul className="fade-up mt-12 flex flex-wrap justify-center gap-x-7 gap-y-3 border-t border-white/[0.08] pt-8 lg:justify-start" style={d(380)}>
            {pillars.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-2 text-sm font-medium whitespace-nowrap text-white/70">
                <Icon size={16} className="shrink-0 text-red" aria-hidden />
                {label}
              </li>
            ))}
          </ul>
        </div>

        {/* 3D centerpiece */}
        <div className="fade-up relative mx-auto aspect-square w-full max-w-[560px] lg:max-w-none" style={d(200)}>
          <div className="absolute inset-[18%] rounded-full bg-red/10 blur-[80px]" aria-hidden />
          <div className="absolute inset-[6%] rounded-full border border-white/[0.06]" aria-hidden />
          <div className="absolute inset-[18%] rounded-full border border-dashed border-white/[0.06]" aria-hidden />
          <HeroVisual />
        </div>
      </div>
    </section>
  );
}
