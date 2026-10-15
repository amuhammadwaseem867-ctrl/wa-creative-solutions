import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { PackageCards } from "@/components/pricing/PackageCards";

export function PricingPreview() {
  return (
    <section className="section-y relative overflow-hidden" aria-labelledby="pricing-title">
      <div className="absolute top-1/3 left-1/2 -z-10 h-[400px] w-[900px] -translate-x-1/2 rounded-full bg-white/[0.03] blur-[140px]" aria-hidden />
      <div className="container-site">
        <SectionHeading
          eyebrow="Transparent pricing"
          title={<span id="pricing-title">Simple packages, clear scope</span>}
          intro="Every package comes with a written scope and a fixed number of revision rounds. Prices are illustrative starting prices in USD."
        />
        <div className="mt-14 lg:mt-16">
          <PackageCards compact />
        </div>
        <div className="mt-10 flex flex-col items-center gap-4 text-center" data-reveal>
          <ButtonLink href="/pricing#estimator">Estimate your project</ButtonLink>
          <p className="max-w-lg text-sm text-white/45">Final pricing is confirmed in a written quote based on scope, complexity and deliverables.</p>
        </div>
      </div>
    </section>
  );
}
