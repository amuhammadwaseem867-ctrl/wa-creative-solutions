import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { formatPrice, packages } from "@/lib/pricing";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";

export function PricingPreview() {
  return (
    <section className="surface-light section-y" aria-labelledby="pricing-title">
      <div className="container-site">
        <SectionHeading
          index="04"
          eyebrow="Transparent pricing"
          title={<span id="pricing-title">Clear starting<br />points.</span>}
          intro="Every package has a written scope and a fixed number of revision rounds. Use the estimator for a preliminary figure in under a minute."
        />
        <ul className="mt-16 grid border-t border-l border-[#d6d6d6] sm:grid-cols-2 lg:mt-20 lg:grid-cols-4">
          {packages.map((p, i) => (
            <li key={p.id} className="border-r border-b border-[#d6d6d6]" data-reveal style={{ "--reveal-delay": `${i * 70}ms` } as React.CSSProperties}>
              <Link href={`/pricing#package-${p.id}`} className="group flex h-full flex-col p-7 transition-colors duration-500 hover:bg-paper lg:p-8">
                <span className="label-mono flex items-center justify-between text-mute-dark">
                  Package {p.code}
                  {p.featured && <span className="rounded-full bg-ink px-2.5 py-1 text-paper">Popular</span>}
                </span>
                <h3 className="mt-10 font-display text-2xl font-semibold tracking-[-0.03em]">{p.name}</h3>
                <p className="mt-2 flex items-baseline gap-2">
                  {p.startingAt !== null ? (
                    <>
                      <span className="label-mono text-mute-dark">From</span>
                      <span className="font-display text-5xl font-semibold tracking-[-0.05em]">{formatPrice(p.startingAt)}</span>
                    </>
                  ) : (
                    <span className="font-display text-5xl font-semibold tracking-[-0.05em]">Custom</span>
                  )}
                </p>
                <p className="mt-6 flex-1 text-[0.95rem] text-mute-dark">{p.audience}</p>
                <span className="label-mono mt-8 inline-flex items-center gap-2 text-red-deep">
                  Details <ArrowUpRight size={14} aria-hidden className="transition-transform group-hover:rotate-45" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-12 flex flex-wrap items-center justify-between gap-6" data-reveal>
          <p className="max-w-xl text-sm text-mute-dark">
            Illustrative starting prices in USD. Final pricing is confirmed in a written quote based on scope, complexity and deliverables.
          </p>
          <ButtonLink href="/pricing#estimator">Try the estimator</ButtonLink>
        </div>
      </div>
    </section>
  );
}
