import { Hero } from "@/components/home/Hero";
import { CapabilityMarquee } from "@/components/home/CapabilityMarquee";
import { Statement } from "@/components/home/Statement";
import { ServicesPreview } from "@/components/home/ServicesPreview";
import { WorkPreview } from "@/components/home/WorkPreview";
import { ProcessSection } from "@/components/home/ProcessSection";
import { WhyUs } from "@/components/home/WhyUs";
import { PricingPreview } from "@/components/home/PricingPreview";
import { ContactCTA } from "@/components/home/ContactCTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <CapabilityMarquee />
      <Statement />
      <ServicesPreview />
      <WorkPreview />
      <ProcessSection />
      <WhyUs />
      <PricingPreview />
      <ContactCTA />
    </>
  );
}
