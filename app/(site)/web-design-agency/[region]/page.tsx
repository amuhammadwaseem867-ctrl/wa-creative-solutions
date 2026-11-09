import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, Check, Clock } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { ButtonLink } from "@/components/ui/Button";
import { ContactCTA } from "@/components/home/ContactCTA";
import { ProjectCard } from "@/components/work/ProjectCard";
import { getRegion, regions } from "@/lib/regions";
import { projects, type Project } from "@/lib/projects";
import { services } from "@/lib/services";
import { articles } from "@/lib/insights";
import { absoluteUrl, site } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return regions.map((r) => ({ region: r.slug }));
}

export async function generateMetadata({ params }: PageProps<"/web-design-agency/[region]">): Promise<Metadata> {
  const { region: slug } = await params;
  const region = getRegion(slug);
  if (!region) return {};
  const path = `/web-design-agency/${region.slug}`;
  return {
    title: region.title,
    description: region.description,
    alternates: {
      canonical: path,
      // The Arabic page serves Saudi Arabia and the UAE; pair it with their English pages.
      ...(region.slug === "saudi-arabia" || region.slug === "uae"
        ? { languages: { [region.slug === "uae" ? "en-AE" : "en-SA"]: path, ar: "/ar" } }
        : {}),
    },
    openGraph: { url: path, title: `${region.title} | ${site.name}`, description: region.description },
  };
}

export default async function RegionPage({ params }: PageProps<"/web-design-agency/[region]">) {
  const { region: slug } = await params;
  const region = getRegion(slug);
  if (!region) notFound();

  const work = region.work.map((s) => projects.find((p) => p.slug === s)).filter((p): p is Project => p !== undefined);
  const others = regions.filter((r) => r.slug !== region.slug);
  const guides = articles.filter((a) => a.regions.includes(region.slug));
  const url = absoluteUrl(`/web-design-agency/${region.slug}`);

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: region.title,
      description: region.description,
      url,
      serviceType: services.map((s) => s.title),
      areaServed: { "@type": region.slug === "europe" ? "Place" : "Country", name: region.name },
      provider: { "@type": "ProfessionalService", name: site.name, url: site.url },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: region.faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
        { "@type": "ListItem", position: 2, name: "Where we work", item: absoluteUrl("/web-design-agency") },
        { "@type": "ListItem", position: 3, name: region.name, item: url },
      ],
    },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <PageHeader eyebrow={`Web design · ${region.name}`} title={region.h1} intro={region.intro}>
        <div className="flex flex-wrap gap-3">
          <ButtonLink href="/contact">Start a project</ButtonLink>
          <ButtonLink href="/pricing" variant="ghost">
            See pricing
          </ButtonLink>
          {(region.slug === "saudi-arabia" || region.slug === "uae") && (
            <Link href="/ar" hrefLang="ar" lang="ar" className="link-underline self-center text-sm font-medium text-white/75 hover:text-paper">
              العربية
            </Link>
          )}
        </div>
      </PageHeader>

      <section className="section-y pt-6!" aria-labelledby="overlap-title">
        <div className="container-site grid gap-6 lg:grid-cols-12">
          <div className="card relative overflow-hidden p-7 sm:p-9 lg:col-span-5" data-reveal>
            <Clock size={22} className="text-red" aria-hidden />
            <p className="label-caps mt-6 text-white/45">Working across time zones</p>
            <h2 id="overlap-title" className="mt-3 font-display text-2xl font-semibold text-paper">
              {region.overlap.label}
            </h2>
            <p className="mt-4 text-white/65">{region.overlap.body}</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:col-span-7">
            {region.needs.map((n, i) => (
              <div key={n.title} className="card p-7" data-reveal style={{ "--reveal-delay": `${(i % 2) * 80}ms` } as React.CSSProperties}>
                <Check size={18} className="text-red" aria-hidden />
                <h3 className="mt-4 font-display text-lg font-semibold text-paper">{n.title}</h3>
                <p className="mt-2 text-[0.95rem] text-white/60">{n.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-y" aria-labelledby="services-title">
        <div className="container-site">
          <p className="label-bracket mb-5">What we do for {region.audience}</p>
          <h2 id="services-title" className="text-title max-w-3xl">
            Six services, one team
          </h2>
          <ul className="mt-10 grid border-t border-l border-white/10 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <li key={s.id} className="border-r border-b border-white/10">
                <Link href={`/services#${s.id}`} className="group flex h-full gap-4 p-6 transition-colors hover:bg-white/[0.03]">
                  <span className="font-display text-sm text-white/35 tabular-nums">{s.index}</span>
                  <span className="flex-1">
                    <span className="block font-display font-semibold text-paper">{s.title}</span>
                    <span className="mt-1 block text-sm text-white/55">{s.short}</span>
                  </span>
                  <ArrowUpRight size={16} className="text-white/35 transition-transform group-hover:rotate-45" aria-hidden />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {work.length > 0 && (
        <section className="section-y" aria-labelledby="work-title">
          <div className="container-site">
            <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
              <div>
                <p className="label-bracket mb-5">Relevant work</p>
                <h2 id="work-title" className="text-title max-w-3xl">
                  Built by us, live today
                </h2>
              </div>
              <ButtonLink href="/work" variant="ghost">
                All work
              </ButtonLink>
            </div>
            <ul className="mt-14 grid gap-x-10 gap-y-20 md:grid-cols-2 xl:grid-cols-3">
              {work.map((p) => (
                <li key={p.slug} data-reveal>
                  <ProjectCard project={p} sizes="(min-width: 1280px) 30vw, (min-width: 768px) 45vw, 100vw" />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {guides.length > 0 && (
        <section className="section-y pb-0!" aria-labelledby="guides-title">
          <div className="container-site">
            <p className="label-bracket mb-5">Guides</p>
            <h2 id="guides-title" className="text-title max-w-3xl">
              Worth reading first
            </h2>
            <ul className="mt-10 grid gap-4 md:grid-cols-3">
              {guides.map((g) => (
                <li key={g.slug}>
                  <Link href={`/insights/${g.slug}`} className="card card-hover group flex h-full flex-col p-6">
                    <span className="label-caps text-white/45">{g.tag}</span>
                    <span className="mt-3 flex-1 font-display font-semibold text-paper">{g.title}</span>
                    <ArrowUpRight size={16} className="mt-5 text-white/45 transition-transform group-hover:rotate-45" aria-hidden />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section className="section-y" aria-labelledby="faq-title">
        <div className="container-site grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="label-bracket mb-5">FAQ</p>
            <h2 id="faq-title" className="text-title">
              Questions from {region.audience}
            </h2>
          </div>
          <div className="space-y-3 lg:col-span-7 lg:col-start-6">
            {region.faq.map((f) => (
              <details key={f.q} className="card group px-6">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 font-display text-base font-semibold text-paper sm:text-lg [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center border border-white/10 text-lg transition-transform duration-300 group-open:rotate-45" aria-hidden>
                    +
                  </span>
                </summary>
                <p className="max-w-2xl pb-6 text-white/60">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <nav aria-label="Other regions" className="container-site pb-8">
        <p className="label-caps mb-4 text-white/45">We also work with</p>
        <ul className="flex flex-wrap gap-2">
          {others.map((r) => (
            <li key={r.slug}>
              <Link href={`/web-design-agency/${r.slug}`} className="chip">
                {r.audience}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <ContactCTA title={`Building something for ${region.audience}?`} />
    </>
  );
}
