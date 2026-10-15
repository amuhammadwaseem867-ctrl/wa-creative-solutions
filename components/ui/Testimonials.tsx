import Link from "next/link";
import { testimonials } from "@/lib/testimonials";

const trustSignals = [
  { title: "Written scope", body: "Deliverables, milestones and exclusions agreed in writing before work starts." },
  { title: "Defined revisions", body: "A fixed number of revision rounds per package — no ambiguity, no endless loops." },
  { title: "Honest portfolio", body: "Concept projects are labelled as concepts. We never invent clients, quotes or results." },
  { title: "You own the result", body: "Final approved deliverables transfer to you on full payment, with source files handed over." },
];

/**
 * Shows verified testimonials when they exist; otherwise presents transparent
 * process commitments as trust signals instead of fabricated reviews.
 */
export function Testimonials() {
  if (testimonials.length > 0) {
    return (
      <ul className="grid gap-6 md:grid-cols-2">
        {testimonials.map((t) => (
          <li key={t.name} className="rounded-[18px] border border-line bg-ink-2 p-8">
            <figure>
              <blockquote className="text-lead text-paper">&ldquo;{t.quote}&rdquo;</blockquote>
              <figcaption className="label-mono mt-6 text-mute">
                {t.name} — {t.role}, {t.company}
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
    <ul className="grid gap-px overflow-hidden rounded-[18px] border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
      {trustSignals.map((s, i) => (
        <li key={s.title} className="bg-ink p-7" data-reveal style={{ "--reveal-delay": `${i * 60}ms` } as React.CSSProperties}>
          <span className="label-mono text-red">0{i + 1}</span>
          <h3 className="mt-6 font-display text-xl font-semibold tracking-[-0.02em]">{s.title}</h3>
          <p className="mt-3 text-sm text-mute">{s.body}</p>
        </li>
      ))}
    </ul>
  );
}
