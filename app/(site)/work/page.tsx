import type { Metadata } from "next";
import { Suspense } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { WorkExplorer } from "@/components/work/WorkExplorer";
import { ContactCTA } from "@/components/home/ContactCTA";
import { projects, workCategories } from "@/lib/projects";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Selected work across brand identity, web design & development, AI, 3D/CGI & motion, marketing and graphic design — live builds and labelled concept projects.",
  alternates: { canonical: "/work" },
  openGraph: { url: "/work", title: `Work — ${site.name}` },
};

export default function WorkPage() {
  const live = projects.filter((p) => p.kind === "live").length;
  const concepts = projects.length - live;
  return (
    <>
      <PageHeader
        eyebrow="Selected work"
        title={
          <>
            Work across <span className="text-chrome">every field</span>
          </>
        }
        intro={
          <>
            {live} live builds and {concepts} concept projects spanning {workCategories.length} disciplines. Live projects link to the deployed
            site; concept projects are self-initiated explorations and are always labelled as such.
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
