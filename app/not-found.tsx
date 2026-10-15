import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { ButtonLink } from "@/components/ui/Button";
import { Monogram } from "@/components/brand/Logo";

export const metadata: Metadata = { title: "Page not found", robots: { index: false } };

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main id="main" className="relative flex min-h-[100svh] items-center overflow-hidden pt-[var(--header-h)]">
        <div className="grid-lines absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" aria-hidden />
        <Monogram tone="white" className="pointer-events-none absolute top-1/2 left-1/2 h-[70%] w-auto -translate-x-1/2 -translate-y-1/2 opacity-[0.04]" />
        <div className="container-site relative py-24">
          <p className="label-caps mb-6 text-red">Error 404</p>
          <h1 className="text-mega max-w-[12ch] font-bold">This page isn&apos;t next.</h1>
          <p className="text-lead mt-8 max-w-lg text-mute">
            The page you were looking for doesn&apos;t exist or has moved. Here are some useful places to continue.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <ButtonLink href="/">Back to home</ButtonLink>
            <ButtonLink href="/work" variant="ghost">View work</ButtonLink>
            <ButtonLink href="/contact" variant="ghost">Contact us</ButtonLink>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
