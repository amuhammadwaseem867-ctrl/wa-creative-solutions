import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/lib/projects";
import { ProjectStage } from "./ProjectShowcase";

/** Compact project card: the lit stage, then title, discipline and type. */
export function ProjectCard({ project, sizes = "(min-width: 768px) 45vw, 100vw" }: { project: Project; sizes?: string }) {
  const live = project.kind === "live";
  return (
    <article className="h-full">
      <Link href={`/work/${project.slug}`} className="group flex h-full flex-col" aria-label={`${project.title} — ${project.discipline}`}>
        <ProjectStage project={project} sizes={sizes} />
        <div className="mt-12 flex items-start justify-between gap-6 border-t border-white/10 pt-5">
          <div className="min-w-0">
            <p className="flex items-center gap-2 text-[0.68rem] font-medium tracking-[0.14em] text-white/45 uppercase">
              <span className={`h-1.5 w-1.5 rounded-full ${live ? "bg-[#3ddc84]" : "bg-white/60"}`} aria-hidden />
              {live ? "Live" : "Concept"} · {project.discipline}
            </p>
            <h3 className="font-display text-paper mt-2 text-[1.6rem] leading-tight font-semibold tracking-[-0.02em]">{project.title}</h3>
            <p className="mt-1.5 line-clamp-2 max-w-md text-[0.95rem] text-white/55">{project.summary}</p>
          </div>
          <span className="text-paper group-hover:border-paper group-hover:bg-paper group-hover:text-ink flex h-11 w-11 shrink-0 items-center justify-center border border-white/15 transition-all duration-500 group-hover:rotate-45">
            <ArrowUpRight size={18} aria-hidden />
          </span>
        </div>
      </Link>
    </article>
  );
}
