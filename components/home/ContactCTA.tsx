import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Monogram } from "@/components/brand/Logo";
import { contact } from "@/lib/site";

/** Closing call-to-action: a white editorial panel for maximum contrast on the dark site. */
export function ContactCTA({ title = "Have something ambitious in mind?" }: { title?: string }) {
  return (
    <section className="py-[clamp(3rem,6vw,5rem)]" aria-labelledby="cta-title">
      <div className="container-site">
        <div className="surface-light relative isolate overflow-hidden rounded-[2rem] bg-paper! px-6 py-16 sm:px-14 lg:py-20" data-reveal>
          <Monogram tone="black" className="pointer-events-none absolute -right-10 -bottom-12 -z-10 h-[115%] w-auto opacity-[0.05]" />
          <div className="grid items-end gap-10 lg:grid-cols-[1.4fr_1fr]">
            <div>
              <p className="flex items-center gap-2.5 text-xs font-semibold tracking-[0.18em] text-mute-dark uppercase">
                <span className="pulse-dot inline-block h-1.5 w-1.5 rounded-full bg-red" aria-hidden /> Accepting new projects
              </p>
              <h2 id="cta-title" className="mt-5 font-display text-[clamp(2.2rem,5vw,4.4rem)] leading-[0.98] font-extrabold tracking-[-0.04em] text-ink">
                {title}
              </h2>
            </div>
            <div className="lg:pb-2">
              <p className="text-mute-dark">Tell us about your idea. We&apos;ll come back with honest feedback, next steps and a clear proposal.</p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Link href="/contact" className="btn btn-primary">
                  Start a project <ArrowUpRight size={16} aria-hidden />
                </Link>
                <a href={`mailto:${contact.email}`} className="btn btn-ghost">
                  Email us
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
