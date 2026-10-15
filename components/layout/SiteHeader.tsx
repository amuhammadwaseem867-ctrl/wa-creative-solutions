"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { SocialIcon } from "@/components/ui/SocialIcon";
import { contact, mainNav, site, socials } from "@/lib/site";

const ease = [0.16, 1, 0.3, 1] as const;

export function SiteHeader() {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the menu on navigation.
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : !href.includes("#") && pathname.startsWith(href));

  return (
    <>
      <a href="#main" className="fixed top-3 left-3 z-[80] -translate-y-24 rounded-full bg-paper px-4 py-2.5 text-sm font-medium text-ink focus:translate-y-0">
        Skip to content
      </a>

      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500 ${
          scrolled && !open ? "border-b border-white/[0.07] bg-ink/70 backdrop-blur-xl" : "border-b border-transparent"
        }`}
      >
        <div className="container-site flex h-[76px] items-center justify-between gap-6">
          <Link href="/" className="relative z-10" aria-label={`${site.name} — home`}>
            <Logo className="text-[1.05rem]" />
          </Link>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-8">
              {mainNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className="group relative py-2 text-[0.875rem] font-medium text-white/60 transition-colors hover:text-paper aria-[current=page]:text-paper"
                  >
                    {item.label}
                    <span
                      className={`absolute -bottom-0.5 left-0 h-px bg-paper transition-all duration-300 ${
                        isActive(item.href) ? "w-full" : "w-0 group-hover:w-full"
                      }`}
                      aria-hidden
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="relative z-10 flex items-center gap-3">
            <Link href="/contact" className="btn btn-primary hidden min-h-10 px-5 text-sm sm:inline-flex">
              Let&apos;s talk <ArrowUpRight size={15} aria-hidden />
            </Link>
            <button
              ref={toggleRef}
              type="button"
              className="flex h-10 items-center gap-3 rounded-full border border-white/15 px-4 text-sm font-medium text-paper lg:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((o) => !o)}
            >
              <span>{open ? "Close" : "Menu"}</span>
              <span className="relative h-2.5 w-4" aria-hidden>
                <span className={`absolute left-0 h-px w-4 bg-paper transition-transform duration-300 ${open ? "top-1/2 rotate-45" : "top-0"}`} />
                <span className={`absolute left-0 h-px w-4 bg-paper transition-transform duration-300 ${open ? "top-1/2 -rotate-45" : "bottom-0"}`} />
              </span>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            className="fixed inset-0 z-40 flex flex-col overflow-y-auto bg-ink pt-[76px] lg:hidden"
            initial={reduce ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)" }}
            animate={reduce ? { opacity: 1 } : { clipPath: "inset(0 0 0% 0)" }}
            exit={reduce ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: reduce ? 0.15 : 0.6, ease }}
          >
            <nav aria-label="Mobile" className="container-site flex-1 py-8">
              <ul>
                {mainNav.map((item, i) => (
                  <motion.li
                    key={item.href}
                    className="overflow-hidden"
                    initial={reduce ? false : { opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: reduce ? 0 : 0.12 + i * 0.045, duration: 0.55, ease }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      aria-current={isActive(item.href) ? "page" : undefined}
                      className="flex items-baseline gap-4 py-2 font-display text-[clamp(2.2rem,10vw,3.4rem)] leading-tight font-bold tracking-tight text-paper/90 aria-[current=page]:text-paper"
                    >
                      <span className="w-6 text-xs font-medium text-white/35">0{i + 1}</span>
                      {item.label}
                      {isActive(item.href) && <span className="h-2 w-2 self-center rounded-full bg-red" aria-hidden />}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </nav>
            <div className="container-site flex flex-col gap-5 border-t border-white/10 py-8">
              <Link href="/contact" onClick={() => setOpen(false)} className="btn btn-primary w-full">
                Let&apos;s talk <ArrowUpRight size={15} aria-hidden />
              </Link>
              <div className="flex items-center justify-between gap-4">
                <a href={`mailto:${contact.email}`} className="truncate text-sm text-white/60">
                  {contact.email}
                </a>
                <ul className="flex gap-2">
                  {socials.map((s) => (
                    <li key={s.href}>
                      <a
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={s.label}
                        className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/70"
                      >
                        <SocialIcon label={s.label} size={15} />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
