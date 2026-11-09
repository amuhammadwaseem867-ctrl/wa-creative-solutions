import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { EmberLight, StarField } from "@/components/ui/Atmosphere";
import { ContactCTA } from "@/components/home/ContactCTA";
import { articles, getArticle, type Block } from "@/lib/insights";
import { regions } from "@/lib/regions";
import { absoluteUrl, site } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: PageProps<"/insights/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) return {};
  return {
    title: a.title,
    description: a.description,
    alternates: { canonical: `/insights/${a.slug}` },
    openGraph: { type: "article", url: `/insights/${a.slug}`, title: a.title, description: a.description, publishedTime: a.published },
  };
}

const formatDate = (iso: string) => new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });

function Content({ block }: { block: Block }) {
  if (typeof block === "string") return <p>{block}</p>;
  if ("list" in block)
    return (
      <ul>
        {block.list.map((li) => (
          <li key={li}>{li}</li>
        ))}
      </ul>
    );
  return (
    <ol>
      {block.steps.map((li) => (
        <li key={li}>{li}</li>
      ))}
    </ol>
  );
}

export default async function ArticlePage({ params }: PageProps<"/insights/[slug]">) {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) notFound();

  const url = absoluteUrl(`/insights/${a.slug}`);
  const related = regions.filter((r) => a.regions.includes(r.slug));
  const more = articles.filter((x) => x.slug !== a.slug).slice(0, 3);
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: a.title,
      description: a.description,
      datePublished: a.published,
      dateModified: a.published,
      mainEntityOfPage: url,
      url,
      inLanguage: "en",
      author: { "@type": "Organization", name: site.name, url: site.url },
      publisher: { "@type": "Organization", name: site.name, logo: { "@type": "ImageObject", url: absoluteUrl("/brand/wa-icon-square.svg") } },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
        { "@type": "ListItem", position: 2, name: "Insights", item: absoluteUrl("/insights") },
        { "@type": "ListItem", position: 3, name: a.title, item: url },
      ],
    },
  ];

  return (
    <article>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <header className="relative isolate overflow-hidden pt-[calc(var(--header-h)+3rem)] pb-14">
        <EmberLight x="72%" soft className="h-[90%]" />
        <StarField />
        <div className="container-site max-w-4xl!">
          <Link href="/insights" className="label-bracket inline-flex items-center gap-2 hover:text-paper">
            <ArrowLeft size={14} aria-hidden /> All insights
          </Link>
          <p className="label-caps mt-10 flex flex-wrap items-center gap-3 text-white/50">
            <span className="border border-white/20 px-3 py-1 text-paper">{a.tag}</span>
            <time dateTime={a.published}>{formatDate(a.published)}</time>
            <span>· {a.readMinutes} min read</span>
          </p>
          <h1 className="mt-6 font-display text-[clamp(2rem,4.4vw,3.6rem)] leading-[1.08] font-semibold tracking-[-0.015em] text-paper">{a.title}</h1>
          <p className="text-lead mt-7 text-white/70">{a.intro}</p>
        </div>
      </header>

      <div className="container-site max-w-4xl! pb-[clamp(4rem,8vw,7rem)]">
        <div className="prose-legal border-t border-white/10 pt-4">
          {a.sections.map((s) => (
            <section key={s.h}>
              <h2>{s.h}</h2>
              {s.body.map((b, i) => (
                <Content key={i} block={b} />
              ))}
            </section>
          ))}
          {a.sources && a.sources.length > 0 && (
            <section>
              <h2>Sources</h2>
              <p>Price ranges are rough: most published guides are written by businesses that sell websites.</p>
              <ul>
                {a.sources.map((src) => (
                  <li key={src.url}>
                    <a href={src.url} target="_blank" rel="noopener noreferrer nofollow">
                      {src.label}
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>

        {related.length > 0 && (
          <nav aria-label="Related markets" className="mt-14 border-t border-white/10 pt-8">
            <p className="label-caps mb-4 text-white/45">How we work with</p>
            <ul className="flex flex-wrap gap-2">
              {related.map((r) => (
                <li key={r.slug}>
                  <Link href={`/web-design-agency/${r.slug}`} className="chip">
                    {r.audience}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}

        <nav aria-label="More insights" className="mt-14">
          <p className="label-caps mb-5 text-white/45">Read next</p>
          <ul className="grid gap-4 md:grid-cols-3">
            {more.map((m) => (
              <li key={m.slug}>
                <Link href={`/insights/${m.slug}`} className="card card-hover group flex h-full flex-col p-6">
                  <span className="label-caps text-white/45">{m.tag}</span>
                  <span className="mt-3 flex-1 font-display font-semibold text-paper">{m.title}</span>
                  <ArrowUpRight size={16} className="mt-5 text-white/45 transition-transform group-hover:rotate-45" aria-hidden />
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <ContactCTA title="Have a project in mind?" />
    </article>
  );
}
