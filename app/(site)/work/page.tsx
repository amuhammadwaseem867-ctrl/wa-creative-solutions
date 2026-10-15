import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { WorkGrid } from "@/components/work/WorkGrid";
import { ContactCTA } from "@/components/home/ContactCTA";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Work",
  description: "Selected concept projects across branding, web design, 3D & CGI and digital experiences by WA Creative Solution.",
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
            Branding, product, web and CGI explorations. Every project here is a clearly labelled <strong className="font-semibold text-paper">concept project</strong> —
            self-initiated work that demonstrates our process and craft. Client case studies will be published with permission.
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
