import { ArrowRight, Mail } from "lucide-react";
import Link from "next/link";
import { Monogram } from "@/components/brand/Logo";
import { contact } from "@/lib/site";

export function ContactCTA({ title = "Let's build something remarkable together" }: { title?: string }) {
  return (
    <section className="py-[clamp(3rem,6vw,5rem)]" aria-labelledby="cta-title">
      <div className="container-site">
        <div
          className="relative isolate overflow-hidden rounded-[1.75rem] bg-gradient-to-br from-[#e01422] via-red-deep to-[#7a0a14] px-6 py-16 text-center sm:px-12 lg:py-20"
          data-reveal
        >
          <div className="dot-grid absolute inset-0 -z-10 opacity-40 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" aria-hidden />
          <Monogram tone="white" className="pointer-events-none absolute -right-16 -bottom-16 -z-10 h-[120%] w-auto opacity-[0.07]" />
          <p className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-sm font-medium text-paper backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-paper" aria-hidden /> Accepting new projects
          </p>
          <h2 id="cta-title" className="text-display mx-auto mt-6 max-w-3xl text-paper">
            {title}
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-white/85">
            Tell us about your idea and we&apos;ll come back with honest feedback, next steps and a clear proposal.
          </p>
          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/contact" className="btn btn-white">
              Start a Project <ArrowRight size={16} aria-hidden />
            </Link>
            <a href={`mailto:${contact.email}`} className="btn border border-white/40 text-paper hover:bg-white/10">
              <Mail size={16} aria-hidden /> Email us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
