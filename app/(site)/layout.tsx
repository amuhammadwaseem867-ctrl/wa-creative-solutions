import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { RevealObserver } from "@/components/ui/RevealObserver";
import { CustomCursor } from "@/components/ui/CustomCursor";
import AIChat from "@/components/layout/AIChat";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteHeader />
      <main id="main" tabIndex={-1} className="outline-none">
        {children}
      </main>
      <SiteFooter />
      <AIChat />
      <CustomCursor />
      <RevealObserver />
      <div className="grain" aria-hidden />
    </>
  );
}
