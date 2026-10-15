"use client";

import { useMemo, useState } from "react";
import { projects, workCategories, type WorkCategory } from "@/lib/projects";
import { ProjectCard } from "./ProjectCard";
import { ButtonLink } from "@/components/ui/Button";

type Filter = WorkCategory | "all";

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

      {list.length > 0 ? (
        <ul className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {list.map((p, i) => (
            <li key={p.slug}>
              <ProjectCard project={p} sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw" priority={i < 3} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="card mt-10 border-dashed p-12 text-center">
          <p className="text-lead">No projects in this category yet.</p>
          <p className="mt-2 text-mute">New case studies are added as they&apos;re completed.</p>
          <div className="mt-6">
            <ButtonLink href="/contact" variant="ghost">
              Discuss a project like this
            </ButtonLink>
          </div>
        </div>
      )}
    </>
  );
}
