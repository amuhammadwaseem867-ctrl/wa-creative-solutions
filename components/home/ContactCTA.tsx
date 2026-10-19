import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { contact } from "@/lib/site";
import { EmberLight, Spark, StarField } from "@/components/ui/Atmosphere";

/** Closing call-to-action: a framed slice of the hero — ember light, star-field, spark and bracketed CTA. */
export function ContactCTA({ title = "Have something ambitious in mind?" }: { title?: string }) {
  return (
    <section className="py-[clamp(3rem,6vw,5rem)]" aria-labelledby="cta-title">
      <div className="container-site">
        <div className="corners relative" data-reveal>
          <div className="relative isolate overflow-hidden border border-white/10 bg-black px-6 py-20 text-center sm:px-14 lg:py-28">
            <EmberLight className="h-[115%]" />
            <StarField
              stars={[
                [10, 30, 0],
                [24, 72, 1.6],
                [78, 26, 0.8],
                [90, 64, 2.4],
              ]}
            />
            <p className="label-bracket flex items-center justify-center gap-2.5">
              <span className="pulse-dot inline-block h-1.5 w-1.5 rounded-full bg-red" aria-hidden /> Accepting new projects
            </p>
            <h2
              id="cta-title"
              className="mx-auto mt-7 max-w-4xl font-display text-[clamp(2rem,5vw,4.4rem)] leading-[1.04] font-semibold text-paper uppercase"
            >
              <Spark className="spark mr-[0.25em] inline-block h-[0.95em] w-[0.95em] -translate-y-[0.08em] align-middle" />
              {title}
            </h2>
            <p className="mx-auto mt-6 max-w-lg text-white/65">
              Tell us about your idea. We&apos;ll come back with honest feedback, next steps and a clear proposal.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-x-8 gap-y-5 sm:flex-row">
              <Link href="/contact" className="btn btn-primary">
                Start a project <ArrowUpRight size={16} aria-hidden />
              </Link>
              <a href={`mailto:${contact.email}`} className="link-underline text-sm font-medium text-white/75 hover:text-paper">
                Email us
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
