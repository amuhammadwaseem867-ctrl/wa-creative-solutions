"use client";

import { useEffect } from "react";
import Link from "next/link";
import { contact } from "@/lib/site";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="flex min-h-[80svh] items-center pt-[var(--header-h)]">
      <div className="container-site py-24">
        <p className="label-caps mb-6 text-red">Something went wrong</p>
        <h1 className="text-display max-w-[16ch]">We hit an unexpected error.</h1>
        <p className="text-lead mt-6 max-w-lg text-mute">
          Try again, or reach us directly at{" "}
          <a href={`mailto:${contact.email}`} className="underline underline-offset-4">
            {contact.email}
          </a>
          .
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <button type="button" onClick={reset} className="btn btn-primary">
            Try again
          </button>
          <Link href="/" className="btn btn-ghost">
            Go home
          </Link>
        </div>
      </div>
    </section>
  );
}
