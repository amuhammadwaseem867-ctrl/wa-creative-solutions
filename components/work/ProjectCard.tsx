import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Globe } from "lucide-react";
import { workCategories, type Project } from "@/lib/projects";

type Props = {
  project: Project;
  index?: number;
  aspect?: string;
  sizes?: string;
  priority?: boolean;
};

const hostOf = (url: string) => url.replace(/^https?:\/\//, "").replace(/\/$/, "");

export function ProjectCard({ project, aspect = "aspect-[16/10]", sizes = "(min-width: 1024px) 50vw, 100vw", priority }: Props) {
  const contain = project.cover.width < 600; // logo-only covers
  const tags = workCategories.filter((c) => project.categories.includes(c.id)).map((c) => c.label);
  const live = project.kind === "live";
  return (
    <article className="card card-hover group relative flex h-full flex-col overflow-hidden p-2.5">
      <Link href={`/work/${project.slug}`} className="flex flex-1 flex-col" aria-label={`${project.title} — ${project.discipline}`}>
        <div className={`relative overflow-hidden rounded-[0.9rem] bg-ink-3 ${aspect}`}>
          <Image
            src={project.cover.src}
            alt={project.cover.alt}
            fill
            sizes={sizes}
            priority={priority}
            className={`transition-transform duration-700 ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.035] ${
              contain ? "object-contain p-[18%]" : "object-cover object-top"
            }`}
          />
          <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-ink/75 px-3 py-1 text-xs font-medium text-paper backdrop-blur-md">
            {live ? (
              <>
                <span className="h-1.5 w-1.5 rounded-full bg-[#3ddc84]" aria-hidden /> Live project
              </>
            ) : (
              "Concept project"
            )}
          </span>
        </div>
        <div className="flex flex-1 flex-col px-3.5 pt-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-xl">{project.title}</h3>
              <p className="mt-1 text-sm text-white/50">{project.discipline}</p>
            </div>
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 text-paper transition-all duration-300 group-hover:border-paper group-hover:bg-paper group-hover:text-ink">
              <ArrowUpRight size={17} aria-hidden />
            </span>
          </div>
          <p className="mt-3 line-clamp-2 text-[0.925rem] text-white/55">{project.summary}</p>
        </div>
      </Link>
      <div className="mt-auto flex flex-wrap items-center justify-between gap-3 px-3.5 pt-5 pb-3.5">
        <ul className="flex flex-wrap gap-2">
          {tags.map((t) => (
            <li key={t} className="rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1 text-xs text-white/60">
              {t}
            </li>
          ))}
        </ul>
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="relative z-10 inline-flex items-center gap-1.5 text-xs font-medium text-white/70 transition-colors hover:text-paper"
            aria-label={`Visit the live ${project.title} site (opens in a new tab)`}
          >
            <Globe size={13} aria-hidden /> {hostOf(project.liveUrl)}
          </a>
        )}
      </div>
    </article>
  );
}
