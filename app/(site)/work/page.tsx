import type { Metadata } from "next";
import { Suspense } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { WorkExplorer } from "@/components/work/WorkExplorer";
import { ContactCTA } from "@/components/home/ContactCTA";
import { projects } from "@/lib/projects";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Live websites, e-commerce stores, SaaS platforms and brand identity work by WA Creative Solution, with screenshots of every deployed build.",
  alternates: { canonical: "/work" },
  openGraph: { url: "/work", title: `Work — ${site.name}` },
};

export default function WorkPage() {
  const live = projects.filter((p) => p.kind === "live").length;
  return (
    <>
      <PageHeader
        eyebrow="Selected work"
        title={
          <>
            Work that&apos;s <span className="text-chrome">live right now</span>
          </>
        }
        intro={
          <>
            {live} deployed builds, from storefronts and corporate sites to a restaurant SaaS and an ERP. Every screen is captured from the live
            site, and every project links to it. Concept work is labelled as such.
          </>
        }
      />
      <section className="section-y pt-6!" aria-label="Projects">
        <div className="container-site">
          <Suspense fallback={<div className="h-[60vh]" aria-hidden />}>
            <WorkExplorer />
          </Suspense>
        </div>
      </section>
      <ContactCTA title="Your project could be next." />
    </>
  );
}
