import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { RevealObserver } from "@/components/ui/RevealObserver";
import { CustomCursor } from "@/components/ui/CustomCursor";
import AIChat from "@/components/layout/AIChat";
import { STATIC_SITE } from "@/lib/hosting";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteHeader />
      <main id="main" tabIndex={-1} className="outline-none">
        {children}
      </main>
      <SiteFooter />
      {/* The AI chat needs a server; it is left out of the static (GitHub Pages) build. */}
      {!STATIC_SITE && <AIChat />}
      <CustomCursor />
      <RevealObserver />
      <div className="grain" aria-hidden />
    </>
  );
}
