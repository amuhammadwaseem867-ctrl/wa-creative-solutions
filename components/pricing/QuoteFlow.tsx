"use client";

import { useRef, useState } from "react";
import { Estimator, type EstimateHandoff } from "./Estimator";
import { InquiryForm, type InquiryPrefill } from "@/components/forms/InquiryForm";
import { SectionHeading } from "@/components/ui/SectionHeading";

/** Connects the estimator to the quote form on the same page. */
export function QuoteFlow() {
  const [prefill, setPrefill] = useState<InquiryPrefill>({ nonce: 0 });
  const formRef = useRef<HTMLDivElement>(null);

  const handoff = (h: EstimateHandoff) => {
    setPrefill((p) => ({ service: h.service, context: h.context, nonce: (p.nonce ?? 0) + 1 }));
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    formRef.current?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    window.setTimeout(() => formRef.current?.querySelector<HTMLInputElement>("input[name=name]")?.focus({ preventScroll: true }), reduce ? 0 : 600);
  };

  return (
    <>
      <section id="estimator" className="section-y scroll-mt-16" aria-labelledby="estimator-title">
        <div className="container-site">
          <SectionHeading
            index="02"
            eyebrow="Project estimator"
            title={<span id="estimator-title">Estimate your project in a minute</span>}
            intro="Pick a project type and adjust the scope. Every line of the calculation is shown, so you can see exactly where the number comes from."
          />
          <div className="mt-14 lg:mt-20">
            <Estimator onRequestQuote={handoff} />
          </div>
        </div>
      </section>

      <section id="quote" ref={formRef} className="section-y scroll-mt-16" aria-labelledby="quote-title">
        <div className="container-site grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="badge mb-5">
              <span className="h-1.5 w-1.5 rounded-full bg-red" aria-hidden /> Custom quote
            </p>
            <h2 id="quote-title" className="text-title">
              Request a formal quote
            </h2>
            <p className="mt-6 text-mute">
              Share your details, budget range, scope and timeline. We&apos;ll reply with questions or a written quote that lists deliverables,
              milestones, revision rounds and exclusions.
            </p>
          </div>
          <div className="card p-6 sm:p-8 lg:col-span-7 lg:col-start-6">
            <InquiryForm prefill={prefill} submitLabel="Request quote" />
          </div>
        </div>
      </section>
    </>
  );
}
