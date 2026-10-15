import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { contact, legalNav, mainNav, site, socials } from "@/lib/site";
import { services } from "@/lib/services";

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative overflow-hidden border-t border-line bg-ink">
      <div className="container-site py-20 lg:py-28">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Logo className="text-[1.9rem]" />
            <p className="mt-8 max-w-sm text-mute">{site.statement}</p>
            <Link href="/contact" className="group mt-10 inline-flex items-center gap-4 font-display text-[clamp(1.8rem,3.4vw,2.8rem)] font-semibold tracking-[-0.04em]">
              <span className="link-underline">Start a project</span>
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-red-deep text-paper transition-transform duration-500 group-hover:rotate-45">
                <ArrowUpRight aria-hidden size={20} />
              </span>
            </Link>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:col-span-7">
            <div>
              <h2 className="label-mono mb-5 text-mute">Navigate</h2>
              <ul className="space-y-3">
                {mainNav.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="link-underline text-paper/90 hover:text-paper">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="label-mono mb-5 text-mute">Services</h2>
              <ul className="space-y-3">
                {services.map((s) => (
                  <li key={s.id}>
                    <Link href={`/services#${s.id}`} className="link-underline text-paper/90 hover:text-paper">
                      {s.title.split(" & ")[0]}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <h2 className="label-mono mb-5 text-mute">Contact</h2>
              <ul className="space-y-3">
                <li>
                  <a href={`mailto:${contact.email}`} className="link-underline break-all text-paper/90 hover:text-paper">
                    {contact.email}
                  </a>
                </li>
                {contact.phones.map((p) => (
                  <li key={p.href}>
                    <a href={p.href} className="link-underline text-paper/90 hover:text-paper">
                      {p.display}
                    </a>
                  </li>
                ))}
                <li className="text-mute">{contact.location}</li>
              </ul>
              <ul className="mt-8 flex flex-wrap gap-x-5 gap-y-3">
                {socials.map((s) => (
                  <li key={s.href}>
                    <a href={s.href} target="_blank" rel="noopener noreferrer" className="label-mono text-mute hover:text-paper">
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        </div>
      </div>

      <div aria-hidden className="pointer-events-none select-none overflow-hidden">
        <p className="container-site translate-y-[18%] whitespace-nowrap font-display text-[clamp(3rem,15vw,15rem)] leading-[0.8] font-bold tracking-[-0.07em] text-ink-3">
          WHAT&apos;S NEXT
        </p>
      </div>

      <div className="border-t border-line">
        <div className="container-site flex flex-col gap-4 py-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="label-mono text-mute">
            © {year} {site.name}
          </p>
          <ul className="flex gap-6">
            {legalNav.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="label-mono text-mute hover:text-paper">
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
