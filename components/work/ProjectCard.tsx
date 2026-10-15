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

/** Editorial project card: image, fine rule, title + fields, type and live link. */
export function ProjectCard({ project, aspect = "aspect-[16/10]", sizes = "(min-width: 1024px) 50vw, 100vw", priority }: Props) {
  const contain = project.cover.width < 600; // logo-only covers
  const fields = workCategories.filter((c) => project.categories.includes(c.id)).map((c) => c.label);
  const live = project.kind === "live";
  return (
    <article className="group relative flex h-full flex-col">
      <Link href={`/work/${project.slug}`} className="flex flex-1 flex-col" aria-label={`${project.title} — ${project.discipline}`}>
        <div className={`relative overflow-hidden rounded-[1rem] bg-ink-3 ${aspect}`}>
          <Image
            src={project.cover.src}
            alt={project.cover.alt}
            fill
            sizes={sizes}
            priority={priority}
            className={`transition-transform duration-[1.1s] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.04] ${
              contain ? "object-contain p-[18%]" : "object-cover object-top"
            }`}
          />
          <span className="absolute right-4 bottom-4 flex h-12 w-12 translate-y-2 items-center justify-center rounded-full bg-paper text-ink opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
            <ArrowUpRight size={20} aria-hidden />
          </span>
        </div>
        <div className="mt-5 flex items-start justify-between gap-6 border-t border-white/[0.1] pt-5">
          <div className="min-w-0">
            <h3 className="text-[1.45rem] leading-tight tracking-[-0.025em]">{project.title}</h3>
            <p className="mt-1.5 line-clamp-2 max-w-md text-[0.95rem] text-white/55">{project.summary}</p>
            <p className="mt-2 flex items-center gap-1.5 text-xs font-semibold tracking-[0.1em] text-white/60 uppercase sm:hidden">
              <span className={`h-1.5 w-1.5 rounded-full ${live ? "bg-[#3ddc84]" : "bg-white/50"}`} aria-hidden />
              {live ? "Live project" : "Concept project"}
            </p>
          </div>
          <p className="hidden shrink-0 text-right text-xs leading-relaxed font-medium tracking-[0.08em] text-white/45 uppercase sm:block">
            <span className="mb-1 flex items-center justify-end gap-1.5 font-semibold text-white/70">
              <span className={`h-1.5 w-1.5 rounded-full ${live ? "bg-[#3ddc84]" : "bg-white/50"}`} aria-hidden />
              {live ? "Live" : "Concept"}
            </span>
            {fields.map((f) => (
              <span key={f} className="block">
                {f}
              </span>
            ))}
          </p>
        </div>
      </Link>
      {project.liveUrl && (
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-flex w-fit items-center gap-1.5 text-xs font-medium text-white/60 transition-colors hover:text-paper"
          aria-label={`Visit the live ${project.title} site (opens in a new tab)`}
        >
          <Globe size={13} aria-hidden /> {hostOf(project.liveUrl)}
        </a>
      )}
    </article>
  );
}
