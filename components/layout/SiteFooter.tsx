import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { SocialIcon } from "@/components/ui/SocialIcon";
import { contact, legalNav, mainNav, site, socials } from "@/lib/site";
import { services } from "@/lib/services";

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative overflow-hidden border-t border-white/[0.08] bg-ink">
      <div className="absolute bottom-[-200px] left-1/2 h-[320px] w-[800px] -translate-x-1/2 rounded-full bg-white/[0.035] blur-[120px]" aria-hidden />
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
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-white/70 transition-colors hover:border-white/40 hover:text-paper"
                  >
                    <SocialIcon label={s.label} />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:col-span-8">
            <div>
              <h2 className="mb-5 font-display text-sm font-semibold text-paper">Company</h2>
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
              <h2 className="mb-5 font-display text-sm font-semibold text-paper">Services</h2>
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
              <h2 className="mb-5 font-display text-sm font-semibold text-paper">Get in touch</h2>
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

        <p aria-hidden className="pointer-events-none mt-16 font-display text-[clamp(2.6rem,10.2vw,9.2rem)] leading-[0.8] font-extrabold tracking-[-0.06em] whitespace-nowrap text-white/[0.07] select-none">
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
