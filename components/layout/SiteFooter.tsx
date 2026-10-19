import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { SocialIcon } from "@/components/ui/SocialIcon";
import { contact, legalNav, mainNav, site, socials } from "@/lib/site";
import { services } from "@/lib/services";
import { EmberLight, StarField } from "@/components/ui/Atmosphere";

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative isolate overflow-hidden border-t border-white/[0.08] bg-black">
      <EmberLight rise soft className="h-[70%]" />
      <StarField
        stars={[
          [6, 70, 0],
          [30, 86, 1.4],
          [71, 78, 2.2],
          [94, 66, 0.7],
        ]}
      />
      <div className="container-site relative py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo className="text-[1.6rem]" />
            <p className="mt-6 max-w-sm text-[0.95rem] text-white/55">{site.statement}</p>
            <ul className="mt-7 flex gap-2.5">
              {socials.map((s) => (
                <li key={s.href}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="flex h-10 w-10 items-center justify-center border border-white/10 bg-white/[0.03] text-white/70 transition-colors hover:border-white/40 hover:text-paper"
                  >
                    <SocialIcon label={s.label} />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:col-span-8">
            <div>
              <h2 className="label-bracket mb-5">Company</h2>
              <ul className="space-y-3 text-[0.925rem]">
                {mainNav.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-white/55 transition-colors hover:text-paper">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="label-bracket mb-5">Services</h2>
              <ul className="space-y-3 text-[0.925rem]">
                {services.map((s) => (
                  <li key={s.id}>
                    <Link href={`/services#${s.id}`} className="text-white/55 transition-colors hover:text-paper">
                      {s.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <h2 className="label-bracket mb-5">Get in touch</h2>
              <ul className="space-y-4 text-[0.925rem]">
                <li>
                  <a href={`mailto:${contact.email}`} className="flex items-start gap-3 text-white/55 transition-colors hover:text-paper">
                    <Mail size={16} className="mt-1 shrink-0 text-white/35" aria-hidden />
                    <span className="break-all">{contact.email}</span>
                  </a>
                </li>
                {contact.phones.map((p) => (
                  <li key={p.href}>
                    <a href={p.href} className="flex items-start gap-3 text-white/55 transition-colors hover:text-paper">
                      <Phone size={16} className="mt-1 shrink-0 text-white/35" aria-hidden />
                      {p.display}
                    </a>
                  </li>
                ))}
                <li className="flex items-start gap-3 text-white/55">
                  <MapPin size={16} className="mt-1 shrink-0 text-white/35" aria-hidden />
                  {contact.location}
                </li>
              </ul>
            </div>
          </nav>
        </div>

        <p aria-hidden className="pointer-events-none mt-16 bg-gradient-to-t from-[rgb(255_150_100/0.55)] via-white/[0.14] to-white/[0.05] bg-clip-text pb-[0.06em] font-display text-[clamp(2.4rem,9.6vw,8.8rem)] leading-[0.9] font-semibold whitespace-nowrap text-transparent select-none">
          WA CREATIVE
        </p>

        <div className="mt-10 flex flex-col gap-4 border-t border-white/[0.08] pt-7 text-sm text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.name}. All rights reserved.
          </p>
          <ul className="flex gap-6">
            {legalNav.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="transition-colors hover:text-paper">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
