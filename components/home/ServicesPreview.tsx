import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { services } from "@/lib/services";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceVisual } from "@/components/services/ServiceVisual";
import { exampleFor } from "@/components/services/ServiceStage";
import { serviceIcons } from "@/components/services/serviceIcons";

/** Editorial service list: number, name, scope and a thumbnail of real work from that field. */
export function ServicesPreview() {
  return (
    <section className="section-y" aria-labelledby="services-title">
      <div className="container-site">
        <SectionHeading
          eyebrow="What we do"
          title={
            <span id="services-title">
              Everything your brand needs, <span className="text-chrome">under one roof</span>
            </span>
          }
          intro="Strategy, design, engineering, 3D and AI working as one team — so your brand, website and campaigns all speak the same language."
        />

        <ol className="mt-14 border-t border-white/10 lg:mt-16">
          {services.map((s, i) => {
            const Icon = serviceIcons[s.id];
            const ex = exampleFor(s);
            const thumb = ex.type === "sites" ? ex.projects[0].cover : ex.type === "board" ? ex.image : null;
            return (
              <li key={s.id} className="border-b border-white/10" data-reveal style={{ "--reveal-delay": `${(i % 3) * 60}ms` } as React.CSSProperties}>
                <Link
                  href={`/services#${s.id}`}
                  className="group relative grid items-center gap-x-8 gap-y-5 py-7 transition-colors md:grid-cols-[3.5rem_minmax(0,1fr)_15rem] md:py-8 lg:grid-cols-[4rem_minmax(0,1.1fr)_minmax(0,1fr)_17rem]"
                >
                  <span className="pointer-events-none absolute inset-y-0 -inset-x-[var(--gutter)] -z-10 bg-gradient-to-r from-transparent via-white/[0.035] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" aria-hidden />
                  <span className="hidden font-display text-sm font-medium text-white/35 tabular-nums md:block">{s.index}</span>
                  <span>
                    <span className="flex items-center gap-3 text-white/40 md:hidden">
                      <span className="font-display text-sm tabular-nums">{s.index}</span>
                      {Icon && <Icon size={15} aria-hidden />}
                    </span>
                    <span className="mt-2 block font-display text-[clamp(1.45rem,2.4vw,2.2rem)] leading-[1.08] font-semibold tracking-[-0.01em] text-paper uppercase transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] group-hover:translate-x-2 md:mt-0">
                      {s.title}
                    </span>
                    <span className="mt-2 block max-w-md text-[0.95rem] text-white/55">{s.short}</span>
                  </span>
                  <ul className="hidden flex-wrap gap-1.5 lg:flex">
                    {s.deliverables.slice(0, 4).map((d) => (
                      <li key={d} className="border border-white/10 px-2.5 py-1 text-xs text-white/55">
                        {d}
                      </li>
                    ))}
                  </ul>
                  <span className="relative block aspect-[16/10] overflow-hidden border border-white/10 bg-[#060606]">
                    {thumb ? (
                      <Image
                        src={thumb.src}
                        alt=""
                        fill
                        sizes="(min-width: 768px) 272px, 100vw"
                        className="object-cover object-top opacity-80 transition-all duration-700 ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.06] group-hover:opacity-100"
                      />
                    ) : (
                      <span className="flex h-full items-center justify-center text-white/75">
                        <ServiceVisual kind={s.visual} className="h-auto w-[62%]" />
                      </span>
                    )}
                    <span className="absolute right-2.5 bottom-2.5 flex h-9 w-9 items-center justify-center bg-paper text-ink opacity-0 transition-all duration-500 group-hover:opacity-100">
                      <ArrowUpRight size={16} aria-hidden />
                    </span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
