import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { InquiryForm } from "@/components/forms/InquiryForm";
import { contact, site, socials } from "@/lib/site";
import { packages, formatPrice } from "@/lib/pricing";
import { serviceOptions } from "@/lib/services";

export const metadata: Metadata = {
  title: "Contact — Start a Project",
  description: "Send a project brief to WA Creative Solution: services, budget, timeline and goals. Or email us directly.",
  alternates: { canonical: "/contact" },
  openGraph: { url: "/contact", title: `Start a project — ${site.name}` },
};

const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v);

export default async function ContactPage({ searchParams }: PageProps<"/contact">) {
  const sp = await searchParams;
  const pkg = packages.find((p) => p.id === one(sp.package));
  const service = one(sp.service);
  const prefill = {
    service: serviceOptions.some((o) => o.value === service) ? service : pkg ? (pkg.id === "enterprise" ? "multiple" : "web") : undefined,
    context: pkg
      ? `Interested in Package ${pkg.code} — ${pkg.name}${pkg.startingAt !== null ? ` (from ${formatPrice(pkg.startingAt)})` : " (custom quote)"}`
      : undefined,
  };

  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title={<>Let&apos;s build what&apos;s next.</>}
        intro="Tell us about the project. The more context you share, the more useful our first reply will be."
      />
      <section className="section-y pt-16!" aria-label="Project inquiry">
        <div className="container-site grid gap-16 lg:grid-cols-12">
          <aside className="space-y-12 lg:col-span-4">
            <div>
              <h2 className="label-mono mb-5 text-mute">Direct contact</h2>
              <ul className="space-y-4">
                <li>
                  <a href={`mailto:${contact.email}`} className="group flex items-start gap-3 break-all">
                    <Mail size={18} className="mt-1 shrink-0 text-red" aria-hidden />
                    <span className="link-underline text-lg">{contact.email}</span>
                  </a>
                </li>
                {contact.phones.map((p) => (
                  <li key={p.href}>
                    <a href={p.href} className="flex items-start gap-3">
                      <Phone size={18} className="mt-1 shrink-0 text-red" aria-hidden />
                      <span className="link-underline text-lg">{p.display}</span>
                    </a>
                  </li>
                ))}
                {contact.whatsapp && (
                  <li>
                    <a href={contact.whatsapp} target="_blank" rel="noopener noreferrer" className="link-underline text-lg">
                      WhatsApp
                    </a>
                  </li>
                )}
                <li className="flex items-start gap-3 text-mute">
                  <MapPin size={18} className="mt-1 shrink-0 text-red" aria-hidden />
                  {contact.location}
                </li>
              </ul>
            </div>
            <div>
              <h2 className="label-mono mb-5 text-mute">What happens next</h2>
              <ol className="space-y-4 text-mute">
                <li><span className="font-mono text-red">01 </span>We review your brief and reply {contact.responseTime} where possible.</li>
                <li><span className="font-mono text-red">02 </span>A short call to clarify goals, scope and constraints.</li>
                <li><span className="font-mono text-red">03 </span>A written proposal with deliverables, timeline and price.</li>
              </ol>
            </div>
            <div>
              <h2 className="label-mono mb-5 text-mute">Follow</h2>
              <ul className="flex flex-wrap gap-x-6 gap-y-3">
                {socials.map((s) => (
                  <li key={s.href}>
                    <a href={s.href} target="_blank" rel="noopener noreferrer" className="link-underline">
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
          <div className="lg:col-span-7 lg:col-start-6">
            <InquiryForm prefill={prefill} />
          </div>
        </div>
      </section>
    </>
  );
}
