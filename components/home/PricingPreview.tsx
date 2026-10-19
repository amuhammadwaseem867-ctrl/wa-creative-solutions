import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { PackageCards } from "@/components/pricing/PackageCards";
import { EmberLight, StarField } from "@/components/ui/Atmosphere";

export function PricingPreview() {
  return (
    <section className="section-y relative isolate overflow-hidden" aria-labelledby="pricing-title">
      <EmberLight soft className="h-[70%]" />
      <StarField />
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
