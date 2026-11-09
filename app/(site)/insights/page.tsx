import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { ContactCTA } from "@/components/home/ContactCTA";
import { articles } from "@/lib/insights";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Insights: Web Design Costs, Accessibility & Bilingual Websites",
  description:
    "Practical guides on website costs in the USA, UK, Australia and Saudi Arabia, the European Accessibility Act, bilingual Arabic-English sites and choosing a web design agency.",
  alternates: { canonical: "/insights" },
  openGraph: { url: "/insights", title: `Insights | ${site.name}` },
};

const formatDate = (iso: string) => new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });

export default function InsightsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Insights"
        title={
          <>
            Straight answers about <span className="text-chrome">websites</span>
          </>
        }
        intro="What a website costs, what the law asks of it, and how to hire well. Written for business owners, with sources."
      />
      <section className="section-y pt-6!" aria-label="Articles">
        <div className="container-site">
          <ul className="grid gap-5 md:grid-cols-2">
            {articles.map((a, i) => (
              <li key={a.slug} className={i === 0 ? "md:col-span-2" : ""} data-reveal>
                <Link href={`/insights/${a.slug}`} className="card card-hover group flex h-full flex-col p-7 sm:p-9">
                  <span className="label-caps flex flex-wrap items-center gap-3 text-white/45">
                    <span className="border border-white/15 px-2.5 py-1 text-white/75">{a.tag}</span>
                    <time dateTime={a.published}>{formatDate(a.published)}</time>
                    <span>· {a.readMinutes} min</span>
                  </span>
                  <span className={`mt-5 font-display font-semibold text-paper ${i === 0 ? "text-[clamp(1.5rem,2.6vw,2.2rem)] leading-tight" : "text-xl"}`}>{a.title}</span>
                  <span className="mt-3 flex-1 text-white/55">{a.description}</span>
                  <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-paper">
                    Read the guide <ArrowUpRight size={15} className="transition-transform group-hover:rotate-45" aria-hidden />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <ContactCTA />
    </>
  );
}
