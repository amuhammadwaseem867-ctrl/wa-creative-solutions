import type { ReactNode } from "react";
import { EmberLight, StarField } from "./Atmosphere";

/** Shared layout for policy templates — the site atmosphere up top, a calm reading column below. */
export function LegalPage({ title, updated, children }: { title: string; updated: string; children: ReactNode }) {
  return (
    <>
      <section className="relative isolate overflow-hidden border-b border-white/10 pt-[calc(var(--header-h)+5rem)] pb-14">
        <EmberLight x="70%" soft className="h-full" />
        <StarField />
        <div className="container-site">
          <p className="label-bracket mb-6">Legal — Template</p>
          <h1 className="text-display">{title}</h1>
          <p className="label-bracket mt-6">Last updated: {updated}</p>
        </div>
      </section>
      <section className="py-16 md:py-24">
        <div className="container-site">
          <div className="mb-12 max-w-3xl border border-[#ff6b74]/30 bg-[#ff202d]/[0.07] p-5 text-sm text-white/80" role="note">
            <strong>Template notice:</strong> This document is a starting template. It must be reviewed — ideally by a qualified legal
            professional — and adapted to the business&apos;s actual practices and applicable law before being relied upon.
          </div>
          <div className="prose-legal">{children}</div>
        </div>
      </section>
    </>
  );
}
