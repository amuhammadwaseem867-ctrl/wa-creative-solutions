import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { ServiceCatalogue } from "@/components/services/ServiceCatalogue";
import { ProcessSection } from "@/components/home/ProcessSection";
import { ContactCTA } from "@/components/home/ContactCTA";
import { ButtonLink } from "@/components/ui/Button";
import { services } from "@/lib/services";
import { absoluteUrl, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Brand identity, website design and Next.js development, AI creative solutions, 3D/CGI and motion, digital marketing content and graphic design.",
  alternates: { canonical: "/services" },
  openGraph: { url: "/services", title: `Services — ${site.name}` },
};

const servicesJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  itemListElement: services.map((s, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "Service",
      name: s.title,
      description: s.description,
      provider: { "@type": "Organization", name: site.name, url: site.url },
      url: absoluteUrl(`/services#${s.id}`),
    },
  })),
};

export default function ServicesPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesJsonLd) }} />
      <PageHeader
        eyebrow="Services"
        title={<>Complete creative capability.</>}
        intro="Six disciplines that work as one system. Open any service for its scope, deliverables and a direct path to a quote."
      >
        <div className="flex flex-wrap gap-3">
          <ButtonLink href="/pricing">See pricing</ButtonLink>
          <ButtonLink href="/contact" variant="ghost">
            Describe your project
          </ButtonLink>
        </div>
      </PageHeader>
      <section className="section-y" aria-label="Service catalogue">
        <div className="container-site">
          <ServiceCatalogue />
        </div>
      </section>
      <ProcessSection index="02" />
      <ContactCTA title="Not sure which service fits?" />
    </>
  );
}
