"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Check, ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { services } from "@/lib/services";
import { projectsForField, type WorkCategory } from "@/lib/projects";
import { ButtonLink } from "@/components/ui/Button";
import { ServiceVisual } from "./ServiceVisual";
import { serviceIcons } from "./serviceIcons";

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
    <ul className="space-y-3">
      {services.map((s) => {
        const isOpen = open === s.id;
        const Icon = serviceIcons[s.id];
        return (
          <li key={s.id} id={s.id} className={`card scroll-mt-28 overflow-hidden ${isOpen ? "border-white/[0.16]" : "card-hover"}`}>
            <h2>
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={`${s.id}-panel`}
                onClick={() => setOpen(isOpen ? null : s.id)}
                className="flex w-full items-center gap-5 p-5 text-left sm:p-7"
              >
                <span className="icon-tile shrink-0">{Icon && <Icon size={20} aria-hidden />}</span>
                <span className="flex-1">
                  <span className="block font-display text-lg font-bold text-paper sm:text-xl">{s.title}</span>
                  <span className="mt-1 hidden text-sm font-normal text-white/50 sm:block">{s.short}</span>
                </span>
                <span
                  className={`flex h-10 w-10 shrink-0 items-center justify-center border border-white/10 transition-transform duration-300 ${isOpen ? "rotate-180 bg-white/10" : ""}`}
                  aria-hidden
                >
                  <ChevronDown size={18} />
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
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <div className="grid gap-8 border-t border-white/[0.08] p-5 sm:p-7 lg:grid-cols-12">
                    <div className="lg:col-span-5">
                      <p className="text-white/70">{s.description}</p>
                      <h3 className="label-caps mt-7 mb-3 text-white/50">What you receive</h3>
                      <ul className="space-y-2.5 text-sm">
                        {s.outcomes.map((o) => (
                          <li key={o} className="flex gap-2.5 text-white/75">
                            <Check size={16} className="mt-0.5 shrink-0 text-white/50" aria-hidden /> {o}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="lg:col-span-4">
                      <h3 className="label-caps mb-3 text-white/50">Deliverables</h3>
                      <ul className="flex flex-wrap gap-2">
                        {s.deliverables.map((d) => (
                          <li key={d} className="border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 text-sm text-white/75">
                            {d}
                          </li>
                        ))}
                      </ul>
                      <ButtonLink href={`/contact?service=${s.inquiryValue}`} className="mt-7">
                        Request a quote
                      </ButtonLink>
                    </div>
                    <div className="relative hidden items-center justify-center border border-white/[0.06] bg-ink/60 p-6 text-white/80 lg:col-span-3 lg:flex">
                      <div className="dot-grid absolute inset-0 opacity-60" aria-hidden />
                      <ServiceVisual kind={s.visual} className="relative h-auto w-full" />
                    </div>
                  </div>
                  <RelatedWork field={s.id as WorkCategory} />
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        );
      })}
    </ul>
  );
}

/** Up to three projects from this field, with a link to the filtered Work page. */
function RelatedWork({ field }: { field: WorkCategory }) {
  const related = projectsForField(field);
  if (!related.length) return null;
  return (
    <div className="border-t border-white/[0.08] p-5 sm:p-7">
      <div className="mb-5 flex items-center justify-between gap-4">
        <h3 className="label-caps text-white/50">Related work</h3>
        <Link href={`/work?field=${field}`} className="inline-flex items-center gap-1.5 text-sm font-medium text-paper hover:text-white/70">
          All {related.length} projects <ArrowUpRight size={15} aria-hidden />
        </Link>
      </div>
      <ul className="grid gap-4 sm:grid-cols-3">
        {related.slice(0, 3).map((p) => (
          <li key={p.slug}>
            <Link href={`/work/${p.slug}`} className="group block">
              <span className="relative block aspect-[16/10] overflow-hidden bg-ink-3">
                <Image src={p.cover.src} alt={p.cover.alt} fill sizes="(min-width: 640px) 30vw, 100vw" className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]" />
              </span>
              <span className="mt-3 flex items-center justify-between gap-3">
                <span className="font-display text-base font-bold text-paper">{p.title}</span>
                <span className="text-[0.65rem] font-semibold tracking-[0.12em] text-white/45 uppercase">{p.kind === "live" ? "Live" : "Concept"}</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
