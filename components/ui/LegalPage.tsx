import type { ReactNode } from "react";

/** Shared layout for policy templates — white editorial surface for readability. */
export function LegalPage({ title, updated, children }: { title: string; updated: string; children: ReactNode }) {
  return (
    <>
      <section className="border-b border-line pt-[calc(var(--header-h)+5rem)] pb-14">
        <div className="container-site">
          <p className="label-caps mb-6 text-mute">Legal · Template</p>
          <h1 className="text-display">{title}</h1>
          <p className="label-caps mt-6 text-mute">Last updated: {updated}</p>
        </div>
      </section>
      <section className="surface-light py-16 md:py-24">
        <div className="container-site">
          <div className="mb-12 max-w-3xl rounded-[12px] border border-[#e3b4b8] bg-[#fff1f2] p-5 text-sm text-[#5c0f16]" role="note">
            <strong>Template notice:</strong> This document is a starting template. It must be reviewed — ideally by a qualified legal
            professional — and adapted to the business&apos;s actual practices and applicable law before being relied upon.
          </div>
          <div className="prose-legal">{children}</div>
        </div>
      </section>
    </>
  );
}
