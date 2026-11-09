import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { ContactCTA } from "@/components/home/ContactCTA";
import { regions } from "@/lib/regions";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Web Design Agency for Clients Worldwide",
  description:
    "WA Creative Solution designs and builds websites, brands and web apps for businesses in the USA, UK, Europe, Saudi Arabia, the UAE and Australia, remotely from Pakistan.",
  alternates: { canonical: "/web-design-agency" },
  openGraph: { url: "/web-design-agency", title: `Where we work — ${site.name}` },
};

export default function RegionsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Where we work"
        title={
          <>
            One studio, <span className="text-chrome">clients worldwide</span>
          </>
        }
        intro="We are a remote studio based in Rawalpindi, Pakistan. These pages explain how we work with businesses in each market: time zones, local rules and the work most relevant to you."
      />
      <section className="section-y pt-6!" aria-label="Regions">
        <div className="container-site">
          <ul className="grid border-t border-l border-white/10 sm:grid-cols-2 lg:grid-cols-3">
            {regions.map((r) => (
              <li key={r.slug} className="border-r border-b border-white/10">
                <Link href={`/web-design-agency/${r.slug}`} className="group flex h-full flex-col p-7 transition-colors hover:bg-white/[0.03]">
                  <span className="label-caps text-white/45">{r.name}</span>
                  <span className="mt-3 font-display text-xl font-semibold text-paper">{r.title}</span>
                  <span className="mt-3 flex-1 text-sm text-white/55">{r.overlap.label}</span>
                  <ArrowUpRight size={18} className="mt-6 text-white/45 transition-transform group-hover:rotate-45" aria-hidden />
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
