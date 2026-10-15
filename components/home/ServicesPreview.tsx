import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { services } from "@/lib/services";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { ServiceVisual } from "@/components/services/ServiceVisual";

export function ServicesPreview() {
  return (
    <section className="section-y" aria-labelledby="services-title">
      <div className="container-site">
        <SectionHeading
          index="01"
          eyebrow="Capabilities"
          title={<span id="services-title">Six disciplines.<br /><span className="text-mute">One studio.</span></span>}
          intro="Strategy, design, engineering and 3D work in the same room — so the brand, the website and the campaign all speak the same language."
        />

        <ul className="mt-16 border-t border-line lg:mt-24">
          {services.map((s, i) => (
            <li key={s.id} data-reveal style={{ "--reveal-delay": `${i * 60}ms` } as React.CSSProperties}>
              <Link
                href={`/services#${s.id}`}
                className="group relative grid grid-cols-[auto_1fr_auto] items-center gap-x-5 gap-y-2 border-b border-line py-7 transition-colors duration-500 hover:bg-ink-2 md:grid-cols-[4rem_1fr_1fr_8rem_auto] md:gap-x-8 md:py-9"
              >
                <span className="label-mono text-red">{s.index}</span>
                <h3 className="font-display text-[clamp(1.4rem,2.8vw,2.4rem)] leading-none font-semibold tracking-[-0.035em] transition-transform duration-500 group-hover:translate-x-2">
                  {s.title}
                </h3>
                <p className="col-span-3 col-start-2 max-w-md text-[0.95rem] text-mute md:col-span-1 md:col-start-auto">{s.short}</p>
                <ServiceVisual
                  kind={s.visual}
                  className="hidden h-16 w-auto text-paper/80 opacity-50 transition-opacity duration-500 group-hover:opacity-100 md:block"
                />
                <span className="row-start-1 col-start-3 flex h-11 w-11 items-center justify-center rounded-full border border-line transition-all duration-500 group-hover:rotate-45 group-hover:border-red group-hover:bg-red-deep md:col-start-5">
                  <ArrowUpRight size={18} aria-hidden />
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-12 flex justify-end" data-reveal>
          <ButtonLink href="/services" variant="ghost">
            Full service catalogue
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
