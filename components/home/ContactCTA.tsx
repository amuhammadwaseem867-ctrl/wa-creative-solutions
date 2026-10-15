import { ButtonLink } from "@/components/ui/Button";
import { Monogram } from "@/components/brand/Logo";
import { contact } from "@/lib/site";

export function ContactCTA({ title = "Have something ambitious in mind?" }: { title?: string }) {
  return (
    <section className="relative isolate overflow-hidden border-t border-line" aria-labelledby="cta-title">
      <Monogram
        tone="white"
        className="pointer-events-none absolute top-1/2 right-[-12%] -z-10 h-[130%] w-auto -translate-y-1/2 opacity-[0.03]"
      />
      <div className="absolute bottom-[-30%] left-[-10%] -z-10 h-[70%] w-[50%] rounded-full bg-red/20 blur-[140px]" aria-hidden />
      <div className="container-site section-y">
        <p className="label-mono mb-8 flex items-center gap-3 text-mute" data-reveal>
          <span className="pulse-dot inline-block h-2 w-2 rounded-full bg-red" aria-hidden />
          Accepting a limited number of projects
        </p>
        <h2 id="cta-title" className="text-mega max-w-[13ch] font-bold" data-reveal>
          {title}
        </h2>
        <div className="mt-12 flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between" data-reveal>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href="/contact" magnetic>
              Start a Project
            </ButtonLink>
            <ButtonLink href={`mailto:${contact.email}`} variant="ghost" icon={false}>
              Email us directly
            </ButtonLink>
          </div>
          <p className="max-w-xs text-sm text-mute">We aim to reply to every brief {contact.responseTime}, with next steps and honest feedback on fit.</p>
        </div>
      </div>
    </section>
  );
}
