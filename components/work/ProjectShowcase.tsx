import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { workCategories, type Project } from "@/lib/projects";
import { EmberLight } from "@/components/ui/Atmosphere";
import { BrowserFrame, PhoneFrame } from "./Devices";

const pad = (n: number) => String(n).padStart(2, "0");
const hostOf = (url: string) => url.replace(/^https?:\/\//, "").replace(/\/$/, "");

/**
 * The project on a lit stage: live sites as a browser window (which scrolls through the
 * home page on hover) with the phone view in front; concepts as their cover board.
 */
export function ProjectStage({ project, sizes, priority }: { project: Project; sizes: string; priority?: boolean }) {
  const device = project.kind === "live";
  return (
    <div className="corners relative">
      <div className={`relative isolate overflow-hidden border border-white/10 bg-[#060606] ${device ? "px-[7%] pt-[7%]" : ""}`}>
        {device ? (
          <>
            <EmberLight soft className="h-[120%]" />
            <div className="cross-grid absolute inset-0 -z-30 opacity-60" aria-hidden />
            <BrowserFrame
              image={project.cover}
              scroll={project.scroll}
              url={project.liveUrl}
              sizes={sizes}
              priority={priority}
              className="-mb-px rounded-b-none"
            />
          </>
        ) : (
          <div className="relative aspect-[16/10]">
            <Image
              src={project.cover.src}
              alt={project.cover.alt}
              fill
              sizes={sizes}
              priority={priority}
              className="object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.03]"
            />
          </div>
        )}
      </div>
      {device && project.mobile && (
        <PhoneFrame
          image={project.mobile}
          sizes="(min-width: 1024px) 12vw, 22vw"
          className="absolute right-[3%] -bottom-[7%] w-[19%] transition-transform duration-700 ease-[cubic-bezier(.16,1,.3,1)] group-hover:-translate-y-[4%]"
        />
      )}
    </div>
  );
}

/** One project as a full showcase row: stage on one side, story and links on the other. */
export function ProjectShowcase({
  project,
  index,
  total,
  flip = false,
  priority,
}: {
  project: Project;
  index: number;
  total: number;
  flip?: boolean;
  priority?: boolean;
}) {
  const live = project.kind === "live";
  const fields = workCategories.filter((c) => project.categories.includes(c.id)).map((c) => c.label);
  const tags = (project.tech ?? project.services).slice(0, 5);
  return (
    <article id={project.slug} className="grid scroll-mt-28 items-center gap-x-14 gap-y-12 lg:grid-cols-12">
      <Link
        href={`/work/${project.slug}`}
        className={`group block lg:col-span-8 ${flip ? "lg:order-2" : ""}`}
        aria-label={`${project.title} case study`}
        data-reveal
      >
        <ProjectStage project={project} sizes="(min-width: 1024px) 60vw, 100vw" priority={priority} />
      </Link>

      <div className={`lg:col-span-4 ${flip ? "lg:order-1" : ""}`} data-reveal style={{ "--reveal-delay": "120ms" } as React.CSSProperties}>
        <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-4">
          <span className="label-bracket flex items-center gap-2 text-white/60">
            <span className={`h-1.5 w-1.5 rounded-full ${live ? "bg-[#3ddc84]" : "bg-white/60"}`} aria-hidden />
            {live ? "Live project" : "Concept project"}
          </span>
          <span className="font-display text-sm font-medium text-white/40 tabular-nums">
            {pad(index + 1)} / {pad(total)}
          </span>
        </div>
        <p className="mt-6 text-xs font-medium tracking-[0.14em] text-white/45 uppercase">{project.discipline}</p>
        <h2 className="font-display text-paper mt-3 text-[clamp(2.1rem,2.9vw,3.3rem)] leading-[1.02] font-semibold tracking-[-0.02em]">
          <Link href={`/work/${project.slug}`} className="transition-colors hover:text-white/75">
            {project.title}
          </Link>
        </h2>
        <p className="mt-5 text-white/60">{project.summary}</p>
        <ul className="mt-6 flex flex-wrap gap-1.5" aria-label={project.tech ? "Built with" : "Services"}>
          {tags.map((t) => (
            <li key={t} className="border border-white/10 px-2.5 py-1 text-xs text-white/65">
              {t}
            </li>
          ))}
        </ul>
        <p className="mt-6 text-xs text-white/40">{fields.join(" · ")}</p>
        <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-4">
          <Link href={`/work/${project.slug}`} className="btn btn-primary">
            View case study <ArrowUpRight size={16} aria-hidden />
          </Link>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline hover:text-paper text-sm font-medium text-white/75"
              aria-label={`Visit the live ${project.title} site at ${hostOf(project.liveUrl)} (opens in a new tab)`}
            >
              Visit live site ↗
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
