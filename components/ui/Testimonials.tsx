import Link from "next/link";
import { BadgeCheck, FileText, RefreshCcw, ShieldCheck } from "lucide-react";
import { testimonials } from "@/lib/testimonials";

const trustSignals = [
  { icon: FileText, title: "Written scope", body: "Deliverables, milestones and exclusions agreed in writing before work starts." },
  { icon: RefreshCcw, title: "Defined revisions", body: "A fixed number of revision rounds per package — no ambiguity, no endless loops." },
  { icon: BadgeCheck, title: "Honest portfolio", body: "Concept projects are labelled as concepts. We never invent clients, quotes or results." },
  { icon: ShieldCheck, title: "You own the result", body: "Final approved deliverables and source files transfer to you on full payment." },
];

/**
 * Shows verified testimonials when they exist; otherwise presents transparent
 * process commitments as trust signals instead of fabricated reviews.
 */
export function Testimonials() {
  if (testimonials.length > 0) {
    return (
      <ul className="grid gap-4 md:grid-cols-2">
        {testimonials.map((t) => (
          <li key={t.name} className="card p-8">
            <figure>
              <blockquote className="text-lead text-paper">&ldquo;{t.quote}&rdquo;</blockquote>
              <figcaption className="mt-6 text-sm text-white/55">
                <strong className="text-paper">{t.name}</strong> — {t.role}, {t.company}
                {t.projectSlug && (
                  <Link href={`/work/${t.projectSlug}`} className="ml-3 text-red">
                    View project
                  </Link>
                )}
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    );
  }
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {trustSignals.map(({ icon: Icon, title, body }, i) => (
        <li key={title} className="card card-hover p-7" data-reveal style={{ "--reveal-delay": `${i * 60}ms` } as React.CSSProperties}>
          <span className="icon-tile">
            <Icon size={20} aria-hidden />
          </span>
          <h3 className="mt-6 text-lg">{title}</h3>
          <p className="mt-2 text-sm text-white/55">{body}</p>
        </li>
      ))}
    </ul>
  );
}
