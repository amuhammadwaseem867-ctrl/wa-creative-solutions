import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { workCategories, type Project } from "@/lib/projects";

/** Full-width lead project. */
export function FeaturedProject({ project, priority = true }: { project: Project; priority?: boolean }) {
  const fields = workCategories.filter((c) => project.categories.includes(c.id)).map((c) => c.label);
  return (
    <article className="group relative">
      <Link href={`/work/${project.slug}`} className="block" aria-label={`${project.title} — ${project.discipline}`}>
        <div className="relative aspect-[16/10] overflow-hidden rounded-[1.25rem] bg-ink-3">
          <Image
            src={project.cover.src}
            alt={project.cover.alt}
            fill
            priority={priority}
            sizes="(min-width: 1280px) 1200px, 100vw"
            className="object-cover object-top transition-transform duration-[1.2s] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.03]"
          />
        </div>
        <div className="mt-7 grid gap-6 border-t border-white/[0.1] pt-7 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="flex flex-wrap items-center gap-3 text-xs font-medium tracking-[0.14em] text-white/50 uppercase">
              <KindBadge kind={project.kind} />
              {fields.join(" · ")}
            </p>
            <h2 className="mt-3 font-display text-[clamp(2.4rem,5.6vw,5rem)] leading-[0.92] font-extrabold tracking-[-0.045em] text-paper">
              {project.title}
            </h2>
          </div>
          <div className="flex items-end justify-between gap-6 lg:col-span-5">
            <p className="max-w-md text-white/60">{project.summary}</p>
            <span className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-paper text-ink transition-transform duration-500 group-hover:rotate-45">
              <ArrowUpRight size={22} aria-hidden />
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}

export function KindBadge({ kind }: { kind: Project["kind"] }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-ink/50 px-2.5 py-1 text-[0.68rem] font-semibold tracking-[0.12em] text-paper uppercase backdrop-blur-md">
      <span className={`h-1.5 w-1.5 rounded-full ${kind === "live" ? "bg-[#3ddc84]" : "bg-white/60"}`} aria-hidden />
      {kind === "live" ? "Live" : "Concept"}
    </span>
  );
}
