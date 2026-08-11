import Link from "next/link";

export default function NovaPage() {
  return (
    <main className="nova-page">
      <section className="nova-hero">
        <div className="nova-top">
          <Link href="/work" className="nova-back">
            ← BACK TO WORK
          </Link>

          <span className="nova-number">02 / 06</span>
        </div>

        <div className="nova-content">
          <div className="nova-meta">
            <span>UI / UX DESIGN</span>
            <span>PRODUCT DESIGN</span>
          </div>

          <h1>NOVA</h1>

          <p className="nova-intro">
            A futuristic productivity platform focused on clean interfaces,
            intelligent workflows and seamless user experiences.
          </p>

          <div className="nova-image">
            <img
              src="/portfolio/project-02/cover1.png"
              alt="NOVA product design"
            />
          </div>
        </div>
      </section>

      <section className="nova-details">
        <div className="nova-detail-item">
          <span>PROJECT</span>
          <strong>NOVA</strong>
        </div>

        <div className="nova-detail-item">
          <span>SERVICE</span>
          <strong>UI / UX DESIGN</strong>
        </div>

        <div className="nova-detail-item">
          <span>YEAR</span>
          <strong>2026</strong>
        </div>

        <div className="nova-detail-item">
          <span>TOOLS</span>
          <strong>FIGMA / PRODUCT DESIGN</strong>
        </div>
      </section>

      <section className="nova-statement">
        <span>THE IDEA</span>

        <h2>
          Designed for
          <br />
          <em>clarity.</em>
        </h2>

        <p>
          NOVA brings productivity, analytics and intelligent recommendations
          together in one focused digital experience.
        </p>
      </section>
    </main>
  );
}