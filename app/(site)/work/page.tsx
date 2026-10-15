import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { WorkGrid } from "@/components/work/WorkGrid";
import { ContactCTA } from "@/components/home/ContactCTA";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Work",
  description: "Live websites, e-commerce stores and web applications built by WA Creative Solution, plus concept explorations in branding and CGI.",
  alternates: { canonical: "/work" },
  openGraph: { url: "/work", title: `Work — ${site.name}` },
};

export default function WorkPage() {
  return (
    <>
      <PageHeader
        eyebrow="Selected work"
        title={<>Work that shows <span className="text-chrome">the thinking</span></>}
        intro={
          <>
            Live websites, e-commerce, and full web applications — POS, ERP and school-management systems — alongside
            clearly labelled concept explorations. Every live project links to the deployed site.
          </>
        }
      />
      <section className="section-y pt-4!" aria-label="Projects">
        <div className="container-site">
          <WorkGrid />
        </div>
      </section>
      <ContactCTA title="Your project could be next." />
    </>
  );
}
