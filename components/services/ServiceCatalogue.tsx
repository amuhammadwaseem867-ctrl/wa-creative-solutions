"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Plus } from "lucide-react";
import { services } from "@/lib/services";
import { ButtonLink } from "@/components/ui/Button";
import { ServiceVisual } from "./ServiceVisual";

export function ServiceCatalogue() {
  const [open, setOpen] = useState<string | null>(services[0].id);
  const reduce = useReducedMotion();

  // Deep links like /services#ai open the matching service.
  useEffect(() => {
    const sync = () => {
      const id = window.location.hash.slice(1);
      if (services.some((s) => s.id === id)) setOpen(id);
    };
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  return (
    <ul className="border-t border-line">
      {services.map((s) => {
        const isOpen = open === s.id;
        return (
          <li key={s.id} id={s.id} className="scroll-mt-28 border-b border-line">
            <h2>
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={`${s.id}-panel`}
                onClick={() => setOpen(isOpen ? null : s.id)}
                className="group grid w-full grid-cols-[auto_1fr_auto] items-center gap-5 py-8 text-left md:grid-cols-[5rem_1fr_auto] md:py-10"
              >
                <span className="label-mono text-red">{s.index}</span>
                <span className="font-display text-[clamp(1.6rem,4vw,3.4rem)] leading-none font-semibold tracking-[-0.04em] transition-colors group-hover:text-paper aria-expanded:text-paper">
                  {s.title}
                </span>
                <span
                  className={`flex h-12 w-12 items-center justify-center rounded-full border transition-all duration-500 ${
                    isOpen ? "rotate-45 border-red bg-red-deep" : "border-line group-hover:border-paper/50"
                  }`}
                  aria-hidden
                >
                  <Plus size={18} />
                </span>
              </button>
            </h2>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`${s.id}-panel`}
                  role="region"
                  aria-label={s.title}
                  initial={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                  animate={reduce ? { opacity: 1 } : { height: "auto", opacity: 1 }}
                  exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <div className="grid gap-10 pb-14 md:grid-cols-12 md:pl-[5rem]">
                    <div className="group md:col-span-4">
                      <div className="flex aspect-[10/7] items-center justify-center rounded-[14px] border border-line bg-ink-2 text-paper">
                        <ServiceVisual kind={s.visual} className="h-auto w-4/5" />
                      </div>
                    </div>
                    <div className="md:col-span-4">
                      <p className="text-lead text-paper/85">{s.description}</p>
                      <h3 className="label-mono mt-8 mb-3 text-mute">You receive</h3>
                      <ul className="space-y-1.5 text-mute">
                        {s.outcomes.map((o) => (
                          <li key={o}>— {o}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="md:col-span-4">
                      <h3 className="label-mono mb-4 text-mute">Deliverables</h3>
                      <ul className="flex flex-wrap gap-2">
                        {s.deliverables.map((d) => (
                          <li key={d} className="rounded-full border border-line px-3.5 py-2 text-sm text-paper/85">
                            {d}
                          </li>
                        ))}
                      </ul>
                      <div className="mt-8 flex flex-wrap gap-3">
                        <ButtonLink href={`/contact?service=${s.inquiryValue}`}>Request a quote</ButtonLink>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        );
      })}
    </ul>
  );
}
