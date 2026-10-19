import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { InquiryForm } from "@/components/forms/InquiryForm";
import { contact, site, socials } from "@/lib/site";
import { packages, formatPrice } from "@/lib/pricing";
import { serviceOptions } from "@/lib/services";
import { STATIC_SITE } from "@/lib/hosting";

export const metadata: Metadata = {
  title: "Contact — Start a Project",
  description: "Send a project brief to WA Creative Solution: services, budget, timeline and goals. Or email us directly.",
  alternates: { canonical: "/contact" },
  openGraph: { url: "/contact", title: `Start a project — ${site.name}` },
};

const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v);

export default async function ContactPage({ searchParams }: PageProps<"/contact">) {
  // A static export cannot read the query string at build time, so package pre-fill is server-only.
  const sp: Awaited<typeof searchParams> = STATIC_SITE ? {} : await searchParams;
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
        title={<>Let&apos;s build <span className="text-chrome">what&apos;s next</span></>}
        intro="Tell us about the project. The more context you share, the more useful our first reply will be."
      />
      <section className="section-y pt-4!" aria-label="Project inquiry">
        <div className="container-site grid gap-6 lg:grid-cols-12">
          <aside className="space-y-4 lg:col-span-4">
            <div className="card p-6">
              <h2 className="label-bracket mb-5">Direct contact</h2>
              <ul className="space-y-4">
                <li>
                  <a href={`mailto:${contact.email}`} className="group flex items-start gap-3 text-sm [overflow-wrap:anywhere]">
                    <Mail size={18} className="mt-1 shrink-0 text-white/40" aria-hidden />
                    <span className="link-underline">{contact.email}</span>
                  </a>
                </li>
                {contact.phones.map((p) => (
                  <li key={p.href}>
                    <a href={p.href} className="flex items-start gap-3">
                      <Phone size={18} className="mt-1 shrink-0 text-white/40" aria-hidden />
                      <span className="link-underline">{p.display}</span>
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
                  <MapPin size={18} className="mt-1 shrink-0 text-white/40" aria-hidden />
                  {contact.location}
                </li>
              </ul>
            </div>
            <div className="card p-6">
              <h2 className="label-bracket mb-5">What happens next</h2>
              <ol className="space-y-4 text-mute">
                <li><span className="font-display font-bold text-white/35">01 </span>We review your brief and reply {contact.responseTime} where possible.</li>
                <li><span className="font-display font-bold text-white/35">02 </span>A short call to clarify goals, scope and constraints.</li>
                <li><span className="font-display font-bold text-white/35">03 </span>A written proposal with deliverables, timeline and price.</li>
              </ol>
            </div>
            <div className="card p-6">
              <h2 className="label-bracket mb-5">Follow</h2>
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
          <div className="card p-6 sm:p-8 lg:col-span-8">
            <InquiryForm prefill={prefill} />
          </div>
        </div>
      </section>
    </>
  );
}
