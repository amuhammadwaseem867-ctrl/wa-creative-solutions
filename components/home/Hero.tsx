import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { HeroVisual } from "@/components/three/HeroVisual";
import { Monogram } from "@/components/brand/Logo";
import { projects, workCategories } from "@/lib/projects";
import { site } from "@/lib/site";
import { EmberLight, Spark } from "@/components/ui/Atmosphere";

const d = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;
const pad = (n: number) => String(n).padStart(2, "0");

/** Live builds named in the bottom strip — short display names, linked to their case studies. */
const SHIPPED = [
  { slug: "restaurant-os", name: "RestaurantOS" },
  { slug: "zama-zama", name: "Zama Zama" },
  { slug: "af7", name: "AF7" },
  { slug: "spirit", name: "Spirit" },
  { slug: "nexframe-systems", name: "Nexframe" },
  { slug: "alhaytham-school", name: "Al-Haytham" },
].filter((s) => projects.some((p) => p.slug === s.slug));

/**
 * Cycles through its items with CSS alone. Instances with the same item count stay in sync,
 * so the field label and its counter change together. Decorative: hidden from assistive tech.
 */
function Cycle({ items }: { items: string[] }) {
  return (
    <span className="cycle" aria-hidden>
      {items.map((t, i) => (
        <span key={t} style={{ "--i": i } as React.CSSProperties}>
          {t}
        </span>
      ))}
    </span>
  );
}

const fields = workCategories.map((c) => c.label);

export function Hero() {
  return (
    <section id="hero" className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-black">
      {/* Light from above and star-field crosses */}
      <EmberLight className="h-[92svh]" />
      <div className="cross-grid absolute inset-0 -z-30" aria-hidden />
      <div className="absolute inset-0 -z-30" aria-hidden>
        {[
          [12, 24, 0],
          [22, 41, 1.8],
          [33, 30, 0.9],
          [67, 34, 2.6],
          [80, 22, 1.2],
          [90, 37, 3.1],
          [6, 44, 2.2],
          [94, 27, 0.4],
        ].map(([x, y, delay]) => (
          // Lower crosses would land on the stacked text on small screens.
          <span key={`${x}-${y}`} className={`twinkle ${y > 32 ? "max-md:hidden" : ""}`} style={{ left: `${x}%`, top: `${y}%`, animationDelay: `${delay}s` }} />
        ))}
      </div>
      <div className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-b from-transparent to-ink" aria-hidden />

      {/* Particle sphere */}
      <div className="absolute top-[31%] left-1/2 -z-20 aspect-square w-[min(108vw,50svh)] -translate-x-1/2 -translate-y-1/2 md:top-[40%] md:w-[min(70vw,66svh)]">
        <HeroVisual />
      </div>

      <div className="container-site flex flex-1 flex-col pt-[calc(76px+1.25rem)] pb-7 md:pb-9">
        {/* Top labels */}
        <div className="fade-up flex items-center justify-between gap-4 text-[0.7rem] font-medium tracking-[0.16em] text-white/45 uppercase" style={d(0)}>
          <span className="flex items-center gap-2.5">
            <span className="pulse-dot inline-block h-1.5 w-1.5 rounded-full bg-red" aria-hidden />
            [ {site.availability} ]
          </span>
          <span className="hidden sm:inline">[ Brand — Web — 3D — AI ]</span>
        </div>

        <div className="min-h-[min(46svh,22rem)] flex-1 md:min-h-[30svh]" />

        {/* Headline + intro */}
        <div className="grid items-end gap-x-12 gap-y-10 lg:grid-cols-[minmax(0,1fr)_22rem]">
          <div>
            <p className="fade-up mb-5 flex items-center gap-2 text-[0.7rem] font-medium tracking-[0.16em] text-white/50 uppercase" style={d(80)}>
              <Cycle items={fields.map((f) => `[ ${f} ]`)} />
              <span className="sr-only">{fields.join(", ")}</span>
            </p>
            <h1 className="font-display text-[clamp(1.9rem,4.7vw,5rem)] leading-[1.1] font-semibold tracking-[0.005em] text-paper uppercase">
              <span className="rise block overflow-hidden pb-[0.04em]">
                <span className="fade-tail" style={d(140)}>
                  Where ideas
                </span>
              </span>
              <span className="rise block overflow-hidden pb-[0.04em]">
                <span style={d(240)}>
                  <Spark className="spark mr-[0.2em] -ml-[0.18em] inline-block h-[1.08em] w-[1.08em] -translate-y-[0.06em] align-middle" />
                  become brands
                </span>
              </span>
              <span className="rise block overflow-hidden pb-[0.04em]">
                <span className="fade-tail" style={d(340)}>
                  people remember
                </span>
              </span>
            </h1>
          </div>

          <div className="fade-up lg:pb-2" style={d(520)}>
            <div className="flex items-center justify-between border-b border-white/10 pb-4 text-white/55">
              <span className="flex items-center gap-2 font-display text-lg font-medium">
                ( <Monogram tone="white" className="h-[0.8em] w-auto" /> )
              </span>
              <span className="flex items-center gap-1.5 text-[0.7rem] font-medium tracking-[0.16em] tabular-nums">
                <Cycle items={fields.map((_, i) => `[ ${pad(i + 1)} / ${pad(fields.length)} ]`)} />
              </span>
            </div>
            <p className="mt-5 text-[0.95rem] leading-relaxed text-white/60">{site.statement}</p>
            <div className="mt-7 flex flex-wrap items-center gap-x-7 gap-y-4">
              <Link href="/contact" className="btn btn-primary">
                Start a project <ArrowUpRight size={16} aria-hidden />
              </Link>
              <Link href="/work" className="link-underline text-sm font-medium text-white/75 hover:text-paper">
                View our work
              </Link>
            </div>
          </div>
        </div>

        {/* Shipped strip — real, live projects only */}
        {SHIPPED.length > 0 && (
          <nav aria-label="Recently shipped projects" className="fade-up mt-14 md:mt-16" style={d(700)}>
            <p className="text-center text-xs text-white/55">Recently shipped — live projects</p>
            <ul className="mt-4 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 md:gap-x-14">
              {SHIPPED.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/work/${s.slug}`}
                    className="font-display text-base font-bold tracking-[-0.01em] whitespace-nowrap text-white/50 transition-colors duration-300 hover:text-paper md:text-[1.1rem]"
                  >
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
    </section>
  );
}
