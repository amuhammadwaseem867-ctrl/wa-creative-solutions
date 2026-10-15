import { Compass, Hammer, PenTool, Rocket, Search } from "lucide-react";
import { processSteps } from "@/lib/process";
import { SectionHeading } from "@/components/ui/SectionHeading";

const icons = [Search, Compass, PenTool, Hammer, Rocket];

/** Five-stage timeline. Plain markup — fully readable without animation. */
export function ProcessSection() {
  return (
    <section id="process" className="section-y relative" aria-labelledby="process-title">
      <div className="container-site">
        <SectionHeading
          eyebrow="How we work"
          title={<span id="process-title">From idea to execution</span>}
          intro="A clear five-stage process with an agreed output at every step — you always know what's happening and what comes next."
        />

        <ol className="relative mt-14 grid gap-4 lg:mt-16 lg:grid-cols-5">
          {/* Connector line (desktop) */}
          <div className="absolute top-[2.35rem] right-[10%] left-[10%] hidden h-px bg-gradient-to-r from-red/0 via-red/50 to-red/0 lg:block" aria-hidden />
          {processSteps.map((step, i) => {
            const Icon = icons[i];
            return (
              <li
                key={step.index}
                className="card card-hover relative flex gap-5 p-6 lg:flex-col lg:gap-0 lg:text-center"
                data-reveal
                style={{ "--reveal-delay": `${i * 70}ms` } as React.CSSProperties}
              >
                <div className="relative mx-auto flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-red/40 bg-ink text-red shadow-[0_0_0_6px_var(--color-ink)]">
                  <Icon size={18} aria-hidden />
                </div>
                <div>
                  <p className="label-caps text-red lg:mt-5">Step {step.index}</p>
                  <h3 className="mt-1.5 text-lg">{step.title}</h3>
                  <p className="mt-2 text-sm text-white/55">{step.body}</p>
                  <p className="mt-4 inline-flex rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1 text-xs text-white/60">
                    {step.output}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
