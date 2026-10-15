"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Monogram } from "@/components/brand/Logo";
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

  // Close on navigation.
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
  }

  // Lock scroll and support Escape while the menu is open.
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

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : !href.includes("#") && pathname.startsWith(href);

  return (
    <>
      <a
        href="#main"
        className="label-mono fixed top-3 left-3 z-[80] -translate-y-20 rounded-full bg-paper px-4 py-3 text-ink focus:translate-y-0"
      >
        Skip to content
      </a>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500 ${
          scrolled || open
            ? "border-b border-line bg-ink/85 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="container-site flex h-[var(--header-h)] items-center justify-between gap-6">
          <Link href="/" className="group flex items-center gap-3" aria-label={`${site.name} — home`}>
            <Monogram className="h-6 w-auto transition-transform duration-500 group-hover:scale-105" />
            <span className="hidden font-mono text-[0.7rem] tracking-[0.28em] text-paper/80 sm:inline">
              WA CREATIVE SOLUTION
            </span>
          </Link>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {mainNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className="label-mono relative rounded-full px-3.5 py-2.5 text-mute transition-colors hover:text-paper aria-[current=page]:text-paper"
                  >
                    {isActive(item.href) && (
                      <span className="absolute top-1/2 left-1 h-1 w-1 -translate-y-1/2 rounded-full bg-red" aria-hidden />
                    )}
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <Link href="/contact" className="btn btn-primary hidden min-h-11 px-5 sm:inline-flex">
              <span>Start a Project</span>
              <ArrowUpRight aria-hidden size={15} />
            </Link>
            <button
              ref={toggleRef}
              type="button"
              className="relative flex h-11 w-11 items-center justify-center rounded-full border border-line lg:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((o) => !o)}
            >
              <span
                className={`absolute h-px w-5 bg-paper transition-transform duration-500 ${open ? "rotate-45" : "-translate-y-[4px]"}`}
              />
              <span
                className={`absolute h-px w-5 bg-paper transition-transform duration-500 ${open ? "-rotate-45" : "translate-y-[4px]"}`}
              />
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
            className="fixed inset-0 z-40 flex flex-col overflow-y-auto bg-ink pt-[var(--header-h)] lg:hidden"
            initial={reduce ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)" }}
            animate={reduce ? { opacity: 1 } : { clipPath: "inset(0 0 0% 0)" }}
            exit={reduce ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: reduce ? 0.15 : 0.7, ease }}
          >
            <div className="grid-lines pointer-events-none absolute inset-0 opacity-60" aria-hidden />
            <nav aria-label="Mobile" className="container-site relative flex-1 py-8">
              <ul className="border-t border-line">
                {mainNav.map((item, i) => (
                  <motion.li
                    key={item.href}
                    className="border-b border-line"
                    initial={reduce ? false : { opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: reduce ? 0 : 0.15 + i * 0.05, duration: 0.6, ease }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      aria-current={isActive(item.href) ? "page" : undefined}
                      className="flex items-baseline justify-between py-4 font-display text-[clamp(2rem,9vw,3.2rem)] leading-none font-semibold tracking-[-0.04em] aria-[current=page]:text-red"
                    >
                      {item.label}
                      <span className="label-mono text-mute">0{i + 1}</span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </nav>
            <div className="container-site relative grid gap-6 border-t border-line py-8 sm:grid-cols-2">
              <Link href="/contact" onClick={() => setOpen(false)} className="btn btn-primary w-full sm:hidden">
                <span>Start a Project</span>
                <ArrowUpRight aria-hidden size={15} />
              </Link>
              <a href={`mailto:${contact.email}`} className="label-mono break-all text-mute hover:text-paper">
                {contact.email}
              </a>
              <ul className="flex flex-wrap gap-4 sm:justify-end">
                {socials.map((s) => (
                  <li key={s.href}>
                    <a href={s.href} target="_blank" rel="noopener noreferrer" className="label-mono text-mute hover:text-paper">
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
