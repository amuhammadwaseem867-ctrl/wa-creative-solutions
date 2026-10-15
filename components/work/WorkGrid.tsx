"use client";

import { useMemo, useState } from "react";
import { projects, workCategories, type Project, type WorkCategory } from "@/lib/projects";
import { ProjectCard } from "./ProjectCard";
import { ButtonLink } from "@/components/ui/Button";

type Filter = WorkCategory | "all";

const groups: { kind: Project["kind"]; title: string; intro: string }[] = [
  { kind: "live", title: "Live projects", intro: "Real, deployed builds — open any project or visit the live site." },
  { kind: "concept", title: "Concept explorations", intro: "Self-initiated design work exploring branding, product and CGI." },
];

export function WorkGrid() {
  const [filter, setFilter] = useState<Filter>("all");
  const list = useMemo(() => (filter === "all" ? projects : projects.filter((p) => p.categories.includes(filter))), [filter]);
  const filters: { id: Filter; label: string }[] = [{ id: "all", label: "All work" }, ...workCategories];

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-6">
        <div role="group" aria-label="Filter projects by category" className="flex flex-wrap gap-2">
          {filters.map((f) => {
            const count = f.id === "all" ? projects.length : projects.filter((p) => p.categories.includes(f.id as WorkCategory)).length;
            if (count === 0) return null;
            return (
              <button key={f.id} type="button" className="chip" aria-pressed={filter === f.id} onClick={() => setFilter(f.id)}>
                {f.label}
                <span className="opacity-60">{count}</span>
              </button>
            );
          })}
        </div>
        <p className="text-sm text-white/50" aria-live="polite">
          Showing {list.length} {list.length === 1 ? "project" : "projects"}
        </p>
      </div>

      {list.length === 0 && (
        <div className="card mt-10 border-dashed p-12 text-center">
          <p className="text-lead text-paper">No projects in this category yet.</p>
          <div className="mt-6">
            <ButtonLink href="/contact" variant="ghost">
              Discuss a project like this
            </ButtonLink>
          </div>
        </div>
      )}

      {groups.map((g) => {
        const items = list.filter((p) => p.kind === g.kind);
        if (!items.length) return null;
        return (
          <section key={g.kind} className="mt-14 first-of-type:mt-10" aria-labelledby={`group-${g.kind}`}>
            <div className="mb-6 flex flex-wrap items-baseline justify-between gap-3 border-b border-white/[0.08] pb-4">
              <h2 id={`group-${g.kind}`} className="text-2xl">
                {g.title} <span className="ml-1 text-base font-medium text-white/40">{items.length}</span>
              </h2>
              <p className="text-sm text-white/50">{g.intro}</p>
            </div>
            <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {items.map((p, i) => (
                <li key={p.slug}>
                  <ProjectCard project={p} sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw" priority={g.kind === "live" && i < 3} />
                </li>
              ))}
            </ul>
          </section>
        );
      })}
    </>
  );
}
