"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { LayoutGrid, Rows3 } from "lucide-react";
import { projects, workCategories, type Project, type WorkCategory } from "@/lib/projects";
import { ProjectCard } from "./ProjectCard";
import { ProjectIndex } from "./ProjectIndex";
import { FeaturedProject } from "./FeaturedProject";
import { ButtonLink } from "@/components/ui/Button";

type Kind = "all" | Project["kind"];
type View = "grid" | "index";

const isField = (v: string | null): v is WorkCategory => !!v && workCategories.some((c) => c.id === v);

/**
 * Portfolio explorer. Filters live in the URL (?field=web&type=live&view=index)
 * so every combination is shareable and the service pages can deep-link here.
 */
export function WorkExplorer() {
  const router = useRouter();
  const params = useSearchParams();
  const field: WorkCategory | "all" = isField(params.get("field")) ? (params.get("field") as WorkCategory) : "all";
  const kind: Kind = params.get("type") === "live" || params.get("type") === "concept" ? (params.get("type") as Kind) : "all";
  const view: View = params.get("view") === "index" ? "index" : "grid";

  const set = (key: string, value: string | null) => {
    const next = new URLSearchParams(params.toString());
    if (value === null || value === "all" || (key === "view" && value === "grid")) next.delete(key);
    else next.set(key, value);
    const qs = next.toString();
    router.replace(qs ? `/work?${qs}` : "/work", { scroll: false });
  };

  const list = useMemo(
    () =>
      projects.filter((p) => (field === "all" || p.categories.includes(field)) && (kind === "all" || p.kind === kind)),
    [field, kind],
  );
  const countFor = (f: WorkCategory | "all") =>
    projects.filter((p) => (f === "all" || p.categories.includes(f)) && (kind === "all" || p.kind === kind)).length;

  const [featured, ...rest] = list;

  return (
    <div>
      {/* Controls */}
      <div className="flex flex-col gap-6 border-b border-white/[0.08] pb-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div role="group" aria-label="Filter by type" className="inline-flex rounded-full border border-white/10 p-1">
            {(["all", "live", "concept"] as Kind[]).map((k) => (
              <button
                key={k}
                type="button"
                aria-pressed={kind === k}
                onClick={() => set("type", k)}
                className="rounded-full px-4 py-2 text-sm font-medium text-white/60 transition-colors hover:text-paper aria-pressed:bg-paper aria-pressed:text-ink"
              >
                {k === "all" ? "All work" : k === "live" ? "Live projects" : "Concepts"}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-4">
            <p className="text-sm text-white/45" aria-live="polite">
              {list.length} {list.length === 1 ? "project" : "projects"}
            </p>
            <div role="group" aria-label="Layout" className="inline-flex rounded-full border border-white/10 p-1">
              <button type="button" aria-pressed={view === "grid"} aria-label="Grid view" onClick={() => set("view", "grid")} className="flex h-9 w-9 items-center justify-center rounded-full text-white/60 hover:text-paper aria-pressed:bg-white/10 aria-pressed:text-paper">
                <LayoutGrid size={16} aria-hidden />
              </button>
              <button type="button" aria-pressed={view === "index"} aria-label="Index view" onClick={() => set("view", "index")} className="flex h-9 w-9 items-center justify-center rounded-full text-white/60 hover:text-paper aria-pressed:bg-white/10 aria-pressed:text-paper">
                <Rows3 size={16} aria-hidden />
              </button>
            </div>
          </div>
        </div>
        <div role="group" aria-label="Filter by field" className="-mx-[var(--gutter)] flex gap-2 overflow-x-auto px-[var(--gutter)] pb-1 [scrollbar-width:none] md:mx-0 md:flex-wrap md:overflow-visible md:px-0">
          {[{ id: "all" as const, label: "All fields" }, ...workCategories].map((f) => {
            const n = countFor(f.id);
            return (
              <button
                key={f.id}
                type="button"
                className="chip shrink-0 disabled:opacity-35"
                aria-pressed={field === f.id}
                disabled={n === 0 && field !== f.id}
                onClick={() => set("field", f.id)}
              >
                {f.label}
                <span className="opacity-55">{n}</span>
              </button>
            );
          })}
        </div>
      </div>

      {list.length === 0 && (
        <div className="py-24 text-center">
          <p className="font-display text-2xl font-bold text-paper">Nothing here yet.</p>
          <p className="mt-2 text-white/55">No projects match this combination — try another field.</p>
          <div className="mt-8">
            <ButtonLink href="/contact" variant="ghost">
              Start a project in this field
            </ButtonLink>
          </div>
        </div>
      )}

      {list.length > 0 && view === "index" && <ProjectIndex projects={list} />}

      {list.length > 0 && view === "grid" && (
        <div className="mt-10">
          {featured && <FeaturedProject project={featured} />}
          {rest.length > 0 && (
            <ul className="mt-16 grid gap-x-8 gap-y-16 md:grid-cols-2">
              {rest.map((p, i) => (
                <li key={p.slug} data-reveal style={{ "--reveal-delay": `${(i % 2) * 90}ms` } as React.CSSProperties}>
                  <ProjectCard project={p} sizes="(min-width: 768px) 50vw, 100vw" />
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
