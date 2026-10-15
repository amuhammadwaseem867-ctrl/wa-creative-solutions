import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProcessSection } from "@/components/home/ProcessSection";
import { ContactCTA } from "@/components/home/ContactCTA";
import { BrandShowcase } from "@/components/brand/BrandShowcase";
import { Testimonials } from "@/components/ui/Testimonials";
import { ButtonLink } from "@/components/ui/Button";
import { Box, Code2, Gauge, Handshake, Palette, Sparkles, Target, Users } from "lucide-react";
import { principles } from "@/lib/process";
import { services } from "@/lib/services";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "WA Creative Solution is a creative technology partner combining brand strategy, design, Next.js engineering, 3D and AI to turn ideas into carefully engineered digital experiences.",
  alternates: { canonical: "/about" },
  openGraph: { url: "/about", title: `About — ${site.name}` },
};

const principleIcons = [Target, Gauge, Handshake, Users];

const capabilityGroups = [
  { icon: Palette, title: "Creative", items: ["Brand strategy", "Identity systems", "Art direction", "Editorial & campaign design"] },
  { icon: Code2, title: "Digital", items: ["UI/UX design", "Next.js & React", "E-commerce", "Performance & SEO foundations"] },
  { icon: Box, title: "Immersive", items: ["3D & CGI", "Motion design", "WebGL / Three.js", "Logo animation"] },
  { icon: Sparkles, title: "Intelligent", items: ["AI-assisted workflows", "Chat assistants", "Automation consulting", "Customer experience"] },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About us"
        title={<>Creativity, engineered for the future</>}
        intro={`${site.name} is a creative technology partner. We turn ambitious ideas into carefully engineered digital experiences — treating brand thinking, design craft and modern engineering as one discipline.`}
      >
        <ButtonLink href="/contact">Work with us</ButtonLink>
      </PageHeader>

      <section className="section-y pt-8!" aria-labelledby="philosophy-title">
        <div className="container-site grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div data-reveal>
            <p className="badge mb-5">
              <span className="h-1.5 w-1.5 rounded-full bg-red" aria-hidden /> Our philosophy
            </p>
            <h2 id="philosophy-title" className="text-display">
              We close the gaps where digital work usually fails
            </h2>
          </div>
          <div className="card p-8" data-reveal style={{ "--reveal-delay": "100ms" } as React.CSSProperties}>
            <p className="text-lead text-white/75">
              Most projects break down between the brand and the website, the design and the build, the idea and the launch. We own the
              whole chain.
            </p>
            <p className="mt-5 text-white/55">
              Strategy informs the identity. The identity shapes the interface. The interface is engineered for speed and accessibility. 3D,
              motion and AI are used where they make communication sharper — never as decoration for its own sake.
            </p>
          </div>
        </div>
      </section>

      <section className="section-y" aria-labelledby="capabilities-title">
        <div className="container-site">
          <SectionHeading
            eyebrow="Capabilities"
            title={<span id="capabilities-title">Creative and technical, in one team</span>}
            intro={`${services.length} service lines, four core competencies — one accountable partner from first sketch to launch.`}
          />
          <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {capabilityGroups.map(({ icon: Icon, title, items }, i) => (
              <li key={title} className="card card-hover p-7" data-reveal style={{ "--reveal-delay": `${i * 60}ms` } as React.CSSProperties}>
                <span className="icon-tile">
                  <Icon size={20} aria-hidden />
                </span>
                <h3 className="mt-6 text-lg">{title}</h3>
                <ul className="mt-4 space-y-2 text-sm text-white/55">
                  {items.map((it) => (
                    <li key={it}>{it}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section-y" aria-labelledby="principles-title">
        <div className="container-site">
          <SectionHeading
            eyebrow="Our principles"
            title={<span id="principles-title">Quality you can measure</span>}
            intro="Detail, performance and collaboration aren't values on a wall — they're the checklist every project ships against."
          />
          <ul className="mt-14 grid gap-4 md:grid-cols-2">
            {principles.map((p, i) => {
              const Icon = principleIcons[i];
              return (
                <li key={p.title} className="card card-hover flex gap-5 p-7" data-reveal style={{ "--reveal-delay": `${(i % 2) * 80}ms` } as React.CSSProperties}>
                  <span className="icon-tile shrink-0">
                    <Icon size={20} aria-hidden />
                  </span>
                  <div>
                    <h3 className="text-lg">{p.title}</h3>
                    <p className="mt-2 text-white/55">{p.body}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <ProcessSection />

      <section className="section-y" aria-labelledby="mark-title">
        <div className="container-site">
          <SectionHeading
            eyebrow="The mark"
            title={<span id="mark-title">A logo built like our work</span>}
            intro="Two blades frame a precision-cut A — the W and the A held in one geometric construction. It works at 16 pixels, in one colour, on any surface."
          />
          <div className="mt-14">
            <BrandShowcase />
          </div>
        </div>
      </section>

      <section className="section-y" aria-labelledby="trust-title">
        <div className="container-site">
          <SectionHeading
            eyebrow="Working together"
            title={<span id="trust-title">Trust, made explicit</span>}
            intro="We'd rather show you how we work than ask you to take our word for it."
          />
          <div className="mt-14">
            <Testimonials />
          </div>
        </div>
      </section>

      <ContactCTA />
    </>
  );
}
