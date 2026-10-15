import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProcessSection } from "@/components/home/ProcessSection";
import { ContactCTA } from "@/components/home/ContactCTA";
import { BrandShowcase } from "@/components/brand/BrandShowcase";
import { Testimonials } from "@/components/ui/Testimonials";
import { ButtonLink } from "@/components/ui/Button";
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

const capabilityGroups = [
  { title: "Creative", items: ["Brand strategy", "Identity systems", "Art direction", "Editorial & campaign design"] },
  { title: "Digital", items: ["UI/UX design", "Next.js & React", "E-commerce", "Performance & SEO foundations"] },
  { title: "Immersive", items: ["3D & CGI", "Motion design", "WebGL / Three.js", "Logo animation"] },
  { title: "Intelligent", items: ["AI-assisted workflows", "Chat assistants", "Automation consulting", "Customer experience"] },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title={<>Creativity, engineered.</>}
        intro={`${site.name} is a creative technology partner. We turn ambitious ideas into carefully engineered digital experiences — where brand thinking, design craft and modern engineering are treated as one discipline.`}
      />

      <section className="section-y" aria-labelledby="philosophy-title">
        <div className="container-site grid gap-12 lg:grid-cols-12">
          <p className="label-mono text-mute lg:col-span-3" data-reveal>
            <span className="text-red">01</span> — Philosophy
          </p>
          <div className="lg:col-span-8">
            <h2 id="philosophy-title" className="text-[clamp(1.8rem,4vw,3.4rem)] leading-[1.08] font-medium tracking-[-0.035em]" data-reveal>
              Most digital work fails in the gaps — between the brand and the website, the design and the build, the idea and the
              launch. <span className="text-mute">We close those gaps by owning the whole chain.</span>
            </h2>
            <p className="text-lead mt-10 max-w-2xl text-mute" data-reveal>
              Strategy informs the identity. The identity shapes the interface. The interface is engineered for speed and
              accessibility. 3D, motion and AI are used where they make communication sharper — never as decoration for its own sake.
            </p>
          </div>
        </div>
      </section>

      <section className="surface-light section-y" aria-labelledby="capabilities-title">
        <div className="container-site">
          <SectionHeading
            index="02"
            eyebrow="Capabilities"
            title={<span id="capabilities-title">Creative and technical,<br />in one team.</span>}
            intro={`${services.length} service lines, four core competencies. One accountable partner from first sketch to launch.`}
          />
          <ul className="mt-16 grid border-t border-l border-[#d6d6d6] sm:grid-cols-2 lg:grid-cols-4">
            {capabilityGroups.map((g, i) => (
              <li key={g.title} className="border-r border-b border-[#d6d6d6] p-7 lg:p-8" data-reveal style={{ "--reveal-delay": `${i * 60}ms` } as React.CSSProperties}>
                <h3 className="font-display text-2xl font-semibold tracking-[-0.03em]">{g.title}</h3>
                <ul className="mt-6 space-y-2 text-mute-dark">
                  {g.items.map((it) => (
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
            index="03"
            eyebrow="Principles"
            title={<span id="principles-title">Quality you can<br />measure.</span>}
            intro="Detail, performance and collaboration aren't values on a wall — they're the checklist every project ships against."
          />
          <ul className="mt-16 grid gap-x-10 gap-y-12 md:grid-cols-2">
            {principles.map((p, i) => (
              <li key={p.title} className="border-t border-line pt-7" data-reveal style={{ "--reveal-delay": `${(i % 2) * 80}ms` } as React.CSSProperties}>
                <span className="label-mono text-red">0{i + 1}</span>
                <h3 className="mt-4 font-display text-[clamp(1.6rem,2.6vw,2.2rem)] font-semibold tracking-[-0.035em]">{p.title}</h3>
                <p className="mt-3 max-w-lg text-mute">{p.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <ProcessSection index="04" />

      <section className="section-y border-t border-line" aria-labelledby="mark-title">
        <div className="container-site">
          <SectionHeading
            index="05"
            eyebrow="The mark"
            title={<span id="mark-title">Built like<br />our work.</span>}
            intro="Two blades frame a precision-cut A — the W and the A held in one geometric construction. It works at 16 pixels, in one colour, on any surface."
          />
          <div className="mt-14">
            <BrandShowcase />
          </div>
        </div>
      </section>

      <section className="section-y border-t border-line" aria-labelledby="trust-title">
        <div className="container-site">
          <SectionHeading
            index="06"
            eyebrow="Working together"
            title={<span id="trust-title">Trust, made<br />explicit.</span>}
            intro="We'd rather show you how we work than ask you to take our word for it."
          />
          <div className="mt-14">
            <Testimonials />
          </div>
          <div className="mt-12" data-reveal>
            <ButtonLink href="/contact">Start a conversation</ButtonLink>
          </div>
        </div>
      </section>

      <ContactCTA />
    </>
  );
}
