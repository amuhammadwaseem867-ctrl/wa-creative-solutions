import { SectionHeading } from "@/components/ui/SectionHeading";
import { Testimonials } from "@/components/ui/Testimonials";

export function WhyUs() {
  return (
    <section className="section-y" aria-labelledby="why-title">
      <div className="container-site">
        <SectionHeading
          eyebrow="Why work with us"
          title={<span id="why-title">Trust, made explicit</span>}
          intro="We'd rather show you exactly how we work than ask you to take our word for it."
        />
        <div className="mt-14">
          <Testimonials />
        </div>
      </div>
    </section>
  );
}
