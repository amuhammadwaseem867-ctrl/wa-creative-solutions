import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import { projectsForField, type WorkCategory } from "@/lib/projects";
import type { Service } from "@/lib/services";
import { exampleFor, ServiceStage } from "./ServiceStage";
import { serviceIcons } from "./serviceIcons";

/** One service as a full showcase row: its proof on one side, scope and quote link on the other. */
export function ServiceShowcase({ service, total, flip = false, priority }: { service: Service; total: number; flip?: boolean; priority?: boolean }) {
  const Icon = serviceIcons[service.id];
  const ex = exampleFor(service);
  const related = projectsForField(service.id as WorkCategory);
  const shown = ex.type === "sites" ? ex.projects : ex.type === "board" ? [ex.project] : [];
  const href = shown[0] ? `/work/${shown[0].slug}` : `/contact?service=${service.inquiryValue}`;

  return (
    <article id={service.id} className="grid scroll-mt-28 items-center gap-x-14 gap-y-14 lg:grid-cols-12">
      <figure className={`lg:col-span-7 ${flip ? "lg:order-2" : ""}`} data-reveal>
        <Link href={href} className="group block" aria-label={shown[0] ? `${shown[0].title} — example of ${service.title}` : `Request a quote for ${service.title}`}>
          <ServiceStage service={service} sizes="(min-width: 1024px) 55vw, 100vw" priority={priority} />
        </Link>
        <figcaption className={`${ex.type === "sites" ? "mt-12" : "mt-5"} flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-white/45`}>
          {shown.length > 0 ? (
            <>
              <span className="label-caps text-white/35">Shown</span>
              {shown.map((p, i) => (
                <span key={p.slug}>
                  <Link href={`/work/${p.slug}`} className="link-underline text-white/70 hover:text-paper">
                    {p.title}
                  </Link>
                  {i < shown.length - 1 && <span aria-hidden>,</span>}
                </span>
              ))}
              <span>· {shown[0].kind === "live" ? "live builds" : "concept project"}</span>
            </>
          ) : (
            <span>No published project in this field yet. Yours could be the first.</span>
          )}
        </figcaption>
      </figure>

      <div className={`lg:col-span-5 ${flip ? "lg:order-1" : ""}`} data-reveal style={{ "--reveal-delay": "120ms" } as React.CSSProperties}>
        <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-4">
          <span className="label-bracket flex items-center gap-2 text-white/60">
            {Icon && <Icon size={14} aria-hidden />} Service
          </span>
          <span className="font-display text-sm font-medium text-white/40 tabular-nums">
            {service.index} / {String(total).padStart(2, "0")}
          </span>
        </div>
        <h2 className="mt-7 font-display text-[clamp(2rem,3.2vw,3.2rem)] leading-[1.04] font-semibold tracking-[-0.02em] text-paper uppercase">{service.title}</h2>
        <p className="mt-5 text-lg text-white/75">{service.short}</p>
        <p className="mt-4 text-white/55">{service.description}</p>

        <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
          <div>
            <h3 className="label-caps mb-3 text-white/45">What you receive</h3>
            <ul className="space-y-2 text-sm">
              {service.outcomes.map((o) => (
                <li key={o} className="flex gap-2.5 text-white/80">
                  <Check size={15} className="mt-0.5 shrink-0 text-red" aria-hidden /> {o}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="label-caps mb-3 text-white/45">Deliverables</h3>
            <ul className="flex flex-wrap gap-1.5">
              {service.deliverables.map((d) => (
                <li key={d} className="border border-white/10 px-2.5 py-1 text-xs text-white/65">
                  {d}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-4">
          <Link href={`/contact?service=${service.inquiryValue}`} className="btn btn-primary">
            Request a quote <ArrowUpRight size={16} aria-hidden />
          </Link>
          {related.length > 0 && (
            <Link href={`/work?field=${service.id}`} className="link-underline text-sm font-medium text-white/75 hover:text-paper">
              See {related.length} {related.length === 1 ? "project" : "projects"}
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}

/** Numbered jump links to each service on the page. */
export function ServiceIndex({ services }: { services: Service[] }) {
  return (
    <nav aria-label="Services on this page">
      <ol className="grid border-t border-l border-white/10 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s) => {
          const Icon = serviceIcons[s.id];
          return (
            <li key={s.id} className="border-r border-b border-white/10">
              <a href={`#${s.id}`} className="group relative flex h-full items-start gap-4 p-5 transition-colors hover:bg-white/[0.03] sm:p-6">
                <span className="font-display text-sm font-medium text-white/35 tabular-nums">{s.index}</span>
                <span className="flex-1">
                  <span className="block font-display text-[1.05rem] font-semibold text-paper">{s.title}</span>
                  <span className="mt-1 block text-sm text-white/50">{s.short}</span>
                </span>
                {Icon && <Icon size={18} className="mt-0.5 shrink-0 text-white/35 transition-colors group-hover:text-red" aria-hidden />}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
