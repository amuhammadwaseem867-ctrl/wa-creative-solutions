"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { projects, workCategories, type WorkCategory } from "@/lib/projects";
import { ProjectShowcase } from "./ProjectShowcase";
import { ButtonLink } from "@/components/ui/Button";

const isField = (v: string | null): v is WorkCategory => !!v && workCategories.some((c) => c.id === v);

/**
 * Portfolio explorer. The field filter lives in the URL (?field=web) so every view is
 * shareable and the service pages can deep-link here. Projects run as alternating showcases.
 */
export function WorkExplorer() {
  const router = useRouter();
  const params = useSearchParams();
  const field: WorkCategory | "all" = isField(params.get("field")) ? (params.get("field") as WorkCategory) : "all";

  const setField = (value: WorkCategory | "all") =>
    router.replace(value === "all" ? "/work" : `/work?field=${value}`, {
      scroll: false,
    });

  const list = useMemo(() => projects.filter((p) => field === "all" || p.categories.includes(field)), [field]);
  const countFor = (f: WorkCategory | "all") => projects.filter((p) => f === "all" || p.categories.includes(f)).length;

  return (
    <div>
      <div className="flex flex-col gap-5 border-b border-white/[0.08] pb-8 md:flex-row md:items-center md:justify-between">
        <div
          role="group"
          aria-label="Filter by field"
          className="-mx-[var(--gutter)] flex [scrollbar-width:none] gap-2 overflow-x-auto px-[var(--gutter)] pb-1 md:mx-0 md:flex-wrap md:overflow-visible md:px-0"
        >
          {[{ id: "all" as const, label: "All work" }, ...workCategories].map((f) => {
            const n = countFor(f.id);
            if (n === 0) return null;
            return (
              <button key={f.id} type="button" className="chip shrink-0" aria-pressed={field === f.id} onClick={() => setField(f.id)}>
                {f.label}
                <span className="opacity-55">{n}</span>
              </button>
            );
          })}
        </div>
        <p className="shrink-0 text-sm text-white/45" aria-live="polite">
          {list.length} {list.length === 1 ? "project" : "projects"}
        </p>
      </div>

      {list.length === 0 ? (
        <div className="py-24 text-center">
          <p className="font-display text-paper text-2xl font-bold">Nothing here yet.</p>
          <p className="mt-2 text-white/55">No projects in this field yet. Yours could be the first.</p>
          <div className="mt-8">
            <ButtonLink href="/contact" variant="ghost">
              Start a project in this field
            </ButtonLink>
          </div>
        </div>
      ) : (
        <ol className="mt-16 space-y-[clamp(6rem,12vw,10rem)] md:mt-20">
          {list.map((p, i) => (
            <li key={p.slug}>
              <ProjectShowcase project={p} index={i} total={list.length} flip={i % 2 === 1} priority={i === 0} />
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
