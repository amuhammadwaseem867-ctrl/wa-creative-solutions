import type { Metadata } from "next";
import { Check, X } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PackageCards } from "@/components/pricing/PackageCards";
import { ComparisonTable } from "@/components/pricing/ComparisonTable";
import { QuoteFlow } from "@/components/pricing/QuoteFlow";
import { ButtonLink } from "@/components/ui/Button";
import { pricingPolicies } from "@/lib/pricing";
import { pricingFaq } from "@/lib/faq";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Pricing & Project Estimator",
  description:
    "Transparent starting prices for websites, branding, 3D and AI projects, plus an interactive estimator with an itemised breakdown and a custom quote request.",
  alternates: { canonical: "/pricing" },
  openGraph: { url: "/pricing", title: `Pricing — ${site.name}` },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: pricingFaq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};

export default function PricingPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <PageHeader
        eyebrow="Pricing"
        title={<>Transparent by design.</>}
        intro="Clear starting points, written scopes and defined revision rounds. Prices are illustrative starting prices in USD and are confirmed in a written quote."
      >
        <div className="flex flex-wrap gap-3">
          <ButtonLink href="#estimator">Open the estimator</ButtonLink>
          <ButtonLink href="#quote" variant="ghost">
            Request a quote
          </ButtonLink>
        </div>
      </PageHeader>

      <section className="section-y" aria-labelledby="packages-title">
        <div className="container-site">
          <SectionHeading
            index="01"
            eyebrow="Packages"
            title={<span id="packages-title">Choose a<br />starting point.</span>}
            intro="Each package is a starting price for a clearly defined scope. Anything beyond it is quoted before work begins — never billed by surprise."
          />
          <div className="mt-14 lg:mt-20">
            <PackageCards />
          </div>
        </div>
      </section>

      <section className="surface-light section-y" aria-labelledby="compare-title">
        <div className="container-site">
          <h2 id="compare-title" className="text-title" data-reveal>
            Compare packages
          </h2>
          <div className="mt-10" data-reveal>
            <ComparisonTable />
          </div>

          <div className="mt-20 grid gap-12 lg:grid-cols-3">
            <div data-reveal>
              <h3 className="label-mono mb-5 text-mute-dark">Not included unless quoted</h3>
              <ul className="space-y-3">
                {pricingPolicies.excluded.map((e) => (
                  <li key={e} className="flex gap-3">
                    <X size={16} className="mt-1 shrink-0 text-red-deep" aria-hidden />
                    {e}
                  </li>
                ))}
              </ul>
            </div>
            <div data-reveal>
              <h3 className="label-mono mb-5 text-mute-dark">Revisions</h3>
              <p>{pricingPolicies.revisions}</p>
              <h3 className="label-mono mt-8 mb-5 text-mute-dark">Change requests</h3>
              <p>{pricingPolicies.changeRequests}</p>
            </div>
            <div data-reveal>
              <h3 className="label-mono mb-5 text-mute-dark">Good to know</h3>
              <ul className="space-y-3">
                {pricingPolicies.notes.map((n) => (
                  <li key={n} className="flex gap-3">
                    <Check size={16} className="mt-1 shrink-0 text-red-deep" aria-hidden />
                    {n}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <QuoteFlow />

      <section className="section-y border-t border-line" aria-labelledby="faq-title">
        <div className="container-site grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="label-mono mb-6 text-mute">
              <span className="text-red">06</span> — FAQ
            </p>
            <h2 id="faq-title" className="text-title">
              Pricing questions, answered.
            </h2>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            {pricingFaq.map((f) => (
              <details key={f.q} className="group border-b border-line first:border-t">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 font-display text-xl font-medium tracking-[-0.02em] [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line text-lg transition-transform duration-300 group-open:rotate-45" aria-hidden>
                    +
                  </span>
                </summary>
                <p className="max-w-2xl pb-7 text-mute">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
