import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { workCategories, type Project } from "@/lib/projects";

type Props = {
  project: Project;
  index?: number;
  aspect?: string;
  sizes?: string;
  priority?: boolean;
};

export function ProjectCard({ project, aspect = "aspect-[4/3]", sizes = "(min-width: 1024px) 50vw, 100vw", priority }: Props) {
  const contain = project.cover.width < 600; // logo-only covers
  const tags = workCategories.filter((c) => project.categories.includes(c.id)).map((c) => c.label);
  return (
    <Link
      href={`/work/${project.slug}`}
      className="card card-hover group flex h-full flex-col overflow-hidden p-2.5"
      aria-label={`${project.title} — ${project.discipline}`}
    >
      <div className={`relative overflow-hidden rounded-[0.9rem] bg-ink-3 ${aspect}`}>
        <Image
          src={project.cover.src}
          alt={project.cover.alt}
          fill
          sizes={sizes}
          priority={priority}
          className={`transition-transform duration-700 ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.04] ${contain ? "object-contain p-[18%]" : "object-cover"}`}
        />
        {project.concept && (
          <span className="absolute top-3 left-3 rounded-full bg-ink/70 px-3 py-1 text-xs font-medium text-paper backdrop-blur-md">
            Concept project
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col px-3.5 pt-5 pb-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-xl">{project.title}</h3>
            <p className="mt-1 text-sm text-white/50">{project.discipline}</p>
          </div>
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 text-paper transition-all duration-300 group-hover:border-red group-hover:bg-red-deep">
            <ArrowUpRight size={17} aria-hidden />
          </span>
        </div>
        <p className="mt-3 line-clamp-2 text-[0.925rem] text-white/55">{project.summary}</p>
        <ul className="mt-auto flex flex-wrap gap-2 pt-5">
          {tags.map((t) => (
            <li key={t} className="rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1 text-xs text-white/60">
              {t}
            </li>
          ))}
        </ul>
      </div>
    </Link>
  );
}
