import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { services } from "@/lib/services";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Spotlight } from "@/components/ui/Spotlight";
import { ServiceVisual } from "@/components/services/ServiceVisual";
import { serviceIcons } from "@/components/services/serviceIcons";

/** Bento layout: spans per card across a 3-column grid. */
const spans = ["lg:col-span-2", "", "", "", "", "lg:col-span-3"];

export function ServicesPreview() {
  return (
    <section className="section-y" aria-labelledby="services-title">
      <div className="container-site">
        <SectionHeading
          eyebrow="What we do"
          title={<span id="services-title">Everything your brand needs, <span className="text-chrome">under one roof</span></span>}
          intro="Strategy, design, engineering, 3D and AI working as one team — so your brand, website and campaigns all speak the same language."
        />

        <ul className="mt-14 grid gap-4 md:grid-cols-2 lg:mt-16 lg:grid-cols-3">
          {services.map((s, i) => {
            const Icon = serviceIcons[s.id];
            const wide = i === 0 || i === 5;
            return (
              <li key={s.id} className={spans[i]} data-reveal style={{ "--reveal-delay": `${(i % 3) * 70}ms` } as React.CSSProperties}>
                <Spotlight className="card card-hover h-full overflow-hidden">
                  <Link
                    href={`/services#${s.id}`}
                    className={`group relative flex h-full p-7 ${wide ? "flex-col gap-8 sm:flex-row sm:items-center" : "flex-col"}`}
                  >
                  <div className="relative flex flex-1 flex-col">
                    <span className="icon-tile">{Icon && <Icon size={20} aria-hidden />}</span>
                    <h3 className="mt-6 text-xl">{s.title}</h3>
                    <p className="mt-2.5 text-[0.95rem] text-white/55">{s.short}</p>
                    <ul className="mt-5 flex flex-wrap gap-2">
                      {s.deliverables.slice(0, 3).map((d) => (
                        <li key={d} className="border border-white/[0.08] bg-white/[0.03] px-3 py-1 text-xs text-white/60">
                          {d}
                        </li>
                      ))}
                    </ul>
                    <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-medium text-paper">
                      Learn more <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" aria-hidden />
                    </span>
                  </div>
                  {wide && (
                    <div className="relative hidden flex-1 items-center justify-center self-stretch border border-white/[0.06] bg-ink/60 p-6 text-white/80 sm:flex">
                      <div className="dot-grid absolute inset-0 opacity-60" aria-hidden />
                      <ServiceVisual kind={s.visual} className="relative h-auto w-full max-w-[260px]" />
                    </div>
                  )}
                  </Link>
                </Spotlight>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
