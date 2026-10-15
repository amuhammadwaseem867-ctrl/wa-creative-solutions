import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/lib/projects";

type Props = {
  project: Project;
  index: number;
  aspect?: string;
  sizes?: string;
  priority?: boolean;
};

export function ProjectCard({ project, index, aspect = "aspect-[4/5]", sizes = "(min-width: 1024px) 45vw, 100vw", priority }: Props) {
  const contain = project.cover.width < 600; // logo-only covers
  return (
    <Link href={`/work/${project.slug}`} className="group block" aria-label={`${project.title} — ${project.discipline}`}>
      <div className={`relative overflow-hidden rounded-[14px] bg-ink-3 ${aspect}`}>
        <Image
          src={project.cover.src}
          alt={project.cover.alt}
          fill
          sizes={sizes}
          priority={priority}
          className={`transition-transform duration-[1.4s] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.045] ${contain ? "object-contain p-[18%]" : "object-cover"}`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent opacity-80" aria-hidden />
        <span className="label-mono absolute top-4 left-4 rounded-full border border-paper/25 bg-ink/50 px-3 py-1.5 text-paper/90 backdrop-blur-md">
          {project.concept ? "Concept project" : project.client}
        </span>
        <span className="absolute right-4 bottom-4 flex h-12 w-12 translate-y-3 items-center justify-center rounded-full bg-paper text-ink opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
          <ArrowUpRight size={20} aria-hidden />
        </span>
      </div>
      <div className="mt-5 flex items-baseline justify-between gap-4">
        <h3 className="font-display text-[clamp(1.5rem,2.4vw,2.1rem)] leading-none font-semibold tracking-[-0.035em]">
          {project.title}
        </h3>
        <span className="label-mono text-mute">{String(index + 1).padStart(2, "0")}</span>
      </div>
      <p className="label-mono mt-3 text-mute">{project.discipline}</p>
    </Link>
  );
}
