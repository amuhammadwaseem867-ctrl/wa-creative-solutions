"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Monogram } from "@/components/brand/Logo";
import { contact, mainNav, site } from "@/lib/site";

const ease = [0.16, 1, 0.3, 1] as const;

export function SiteHeader() {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
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
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : !href.includes("#") && pathname.startsWith(href));

  return (
    <>
      <a href="#main" className="fixed top-3 left-3 z-[80] -translate-y-24 rounded-full bg-paper px-4 py-2.5 text-sm font-medium text-ink focus:translate-y-0">
        Skip to content
      </a>

      <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-4 sm:pt-4">
        <div
          className={`mx-auto flex h-16 max-w-[1240px] items-center justify-between gap-4 rounded-full border pr-2 pl-5 transition-all duration-500 ${
            scrolled || open
              ? "border-white/10 bg-ink/75 shadow-[0_10px_40px_-12px_rgba(0,0,0,0.8)] backdrop-blur-xl"
              : "border-transparent bg-transparent"
          }`}
        >
          <Link href="/" className="flex items-center gap-2.5" aria-label={`${site.name} — home`}>
            <Monogram className="h-6 w-auto" />
            <span className="font-display text-[0.95rem] font-bold tracking-tight text-paper">
              WA <span className="font-semibold text-white/60">Creative</span>
            </span>
          </Link>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-0.5 rounded-full border border-white/[0.07] bg-white/[0.03] p-1">
              {mainNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className="block rounded-full px-4 py-2 text-[0.875rem] font-medium text-white/65 transition-colors hover:text-paper aria-[current=page]:bg-white/10 aria-[current=page]:text-paper"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <Link href="/contact" className="btn btn-primary hidden min-h-11 px-5 text-sm sm:inline-flex">
              Start a Project <ArrowRight size={15} aria-hidden />
            </Link>
            <button
              ref={toggleRef}
              type="button"
              className="relative flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 lg:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((o) => !o)}
            >
              <span className={`absolute h-[1.5px] w-4.5 rounded bg-paper transition-transform duration-300 ${open ? "rotate-45" : "-translate-y-[3.5px]"}`} />
              <span className={`absolute h-[1.5px] w-4.5 rounded bg-paper transition-transform duration-300 ${open ? "-rotate-45" : "translate-y-[3.5px]"}`} />
            </button>
          </div>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              id="mobile-menu"
              className="mx-auto mt-2 max-w-[1240px] overflow-hidden rounded-3xl border border-white/10 bg-ink/95 p-3 shadow-2xl backdrop-blur-xl lg:hidden"
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: reduce ? 0.12 : 0.35, ease }}
            >
              <nav aria-label="Mobile">
                <ul>
                  {mainNav.map((item, i) => (
                    <motion.li
                      key={item.href}
                      initial={reduce ? false : { opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: reduce ? 0 : 0.04 * i, duration: 0.3 }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setOpen(false)}
                        aria-current={isActive(item.href) ? "page" : undefined}
                        className="flex items-center justify-between rounded-2xl px-4 py-3.5 font-display text-lg font-semibold text-paper transition-colors hover:bg-white/5 aria-[current=page]:bg-white/[0.06] aria-[current=page]:text-red"
                      >
                        {item.label}
                        <ArrowRight size={16} className="text-white/40" aria-hidden />
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </nav>
              <div className="mt-2 grid gap-2 border-t border-white/10 p-2 pt-4">
                <Link href="/contact" onClick={() => setOpen(false)} className="btn btn-primary w-full">
                  Start a Project <ArrowRight size={15} aria-hidden />
                </Link>
                <a href={`mailto:${contact.email}`} className="py-2 text-center text-sm text-white/60 hover:text-paper">
                  {contact.email}
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
