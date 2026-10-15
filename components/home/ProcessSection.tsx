"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { processSteps } from "@/lib/process";
import { SectionHeading } from "@/components/ui/SectionHeading";

/**
 * Visual timeline with a scroll-linked progress rail. All content is plain
 * markup, so it reads perfectly with motion disabled.
 */
export function ProcessSection({ index = "03" }: { index?: string }) {
  const ref = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 60%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });

  return (
    <section id="process" className="section-y relative border-t border-line" aria-labelledby="process-title">
      <div className="container-site">
        <SectionHeading
          index={index}
          eyebrow="Process"
          title={<span id="process-title">From idea<br />to execution.</span>}
          intro="Five clear stages with an agreed output at each one. You always know what's happening, what's next and what we need from you."
        />

        <ol ref={ref} className="relative mt-16 lg:mt-24">
          {/* Rail */}
          <div className="absolute top-2 bottom-2 left-[11px] w-px bg-line md:left-[calc(25%+11px)]" aria-hidden>
            <motion.div
              className="absolute inset-x-0 top-0 h-full origin-top bg-red"
              style={reduce ? { scaleY: 1 } : { scaleY: progress }}
            />
          </div>

          {processSteps.map((step, i) => (
            <li key={step.index} className="relative grid gap-4 pb-14 pl-12 last:pb-0 md:grid-cols-4 md:gap-10 md:pl-0" data-reveal style={{ "--reveal-delay": `${i * 40}ms` } as React.CSSProperties}>
              <span className="label-mono hidden pt-1 text-right text-mute md:block md:pr-14">Stage {step.index}</span>
              <span
                className="absolute top-1 left-0 flex h-[23px] w-[23px] items-center justify-center rounded-full border border-red bg-ink md:left-[25%]"
                aria-hidden
              >
                <span className="h-2 w-2 rounded-full bg-red" />
              </span>
              <div className="md:col-span-2 md:pl-14">
                <h3 className="flex items-baseline gap-4 font-display text-[clamp(2rem,4.2vw,3.6rem)] leading-none font-semibold tracking-[-0.045em]">
                  <span className="label-mono text-red md:hidden">{step.index}</span>
                  {step.title}
                </h3>
                <p className="mt-4 max-w-lg text-mute">{step.body}</p>
              </div>
              <p className="label-mono self-start text-paper/70 md:pt-3">
                <span className="text-mute">Output — </span>
                {step.output}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
