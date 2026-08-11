import Link from "next/link";

export default function LuxoraPage() {
  return (
    <main>
      <section
        style={{
          minHeight: "100vh",
          padding: "120px 6vw",
          background: "#080908",
          color: "#f4f6ef",
        }}
      >
        <Link
          href="/work"
          style={{
            color: "#c8ff3d",
            textDecoration: "none",
            fontSize: "12px",
            letterSpacing: "0.12em",
          }}
        >
          ← BACK TO WORK
        </Link>

        <div style={{ marginTop: "80px" }}>
          <p
            style={{
              color: "#c8ff3d",
              fontSize: "11px",
              letterSpacing: "0.16em",
            }}
          >
            WEB DEVELOPMENT
          </p>

          <h1
            style={{
              margin: "20px 0",
              fontSize: "clamp(60px, 10vw, 150px)",
              lineHeight: 0.85,
              fontWeight: 500,
              letterSpacing: "-0.06em",
            }}
          >
            LUXORA
          </h1>

          <p
            style={{
              maxWidth: "600px",
              color: "#aeb5ac",
              fontSize: "16px",
              lineHeight: 1.7,
            }}
          >
            A premium digital experience designed and developed
            for a modern luxury brand.
          </p>
        </div>
      </section>
    </main>
  );
}