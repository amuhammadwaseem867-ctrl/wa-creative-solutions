import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { RevealObserver } from "@/components/ui/RevealObserver";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { Preloader } from "@/components/layout/Preloader";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Preloader />
      <SiteHeader />
      <main id="main" tabIndex={-1} className="outline-none">
        {children}
      </main>
      <SiteFooter />
      <CustomCursor />
      <RevealObserver />
      <div className="grain" aria-hidden />
    </>
  );
}
