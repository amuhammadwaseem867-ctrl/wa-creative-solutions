"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import "./Nova.css";

const screens = [
  {
    number: "01",
    label: "COVER / FIRST IMPRESSION",
    title: "The beginning of NOVA.",
    image: "/portfolio/project-02/01-nova-cover.png",
    type: "hero",
  },
  {
    number: "02",
    label: "LOGO SYSTEM",
    title: "A mark built for the future.",
    image: "/portfolio/project-02/02-nova-logo-system.png",
    type: "identity",
  },
  {
    number: "03",
    label: "VISUAL IDENTITY",
    title: "A visual language with intent.",
    image: "/portfolio/project-02/03-nova-visual-identity.png",
    type: "identity",
  },
  {
    number: "04",
    label: "DASHBOARD",
    title: "The command center.",
    image: "/portfolio/project-02/04-nova-dashboard.png",
    type: "interface",
  },
  {
    number: "05",
    label: "PROJECTS",
    title: "Everything in one place.",
    image: "/portfolio/project-02/05-nova-projects.png",
    type: "interface",
  },
  {
    number: "06",
    label: "TASK MANAGEMENT",
    title: "Work without the friction.",
    image: "/portfolio/project-02/06-nova-tasks.png",
    type: "interface",
  },
  {
    number: "07",
    label: "ANALYTICS",
    title: "Turn progress into clarity.",
    image: "/portfolio/project-02/07-nova-analytics.png",
    type: "interface",
  },
  {
    number: "08",
    label: "PROJECT DETAIL",
    title: "Every detail, connected.",
    image: "/portfolio/project-02/08-nova-project-detail.png",
    type: "interface",
  },
  {
    number: "09",
    label: "MOBILE EXPERIENCE",
    title: "NOVA, wherever work happens.",
    image: "/portfolio/project-02/09-nova-mobile-experience.png",
    type: "mobile",
  },
];

/* =========================================
   OPENING INTRO
========================================= */

function NovaIntro() {
  return (
    <motion.div
      className="nova-intro-loader"
      initial={{ opacity: 1 }}
      animate={{
        opacity: 0,
        pointerEvents: "none",
      }}
      transition={{
        duration: 0.7,
        delay: 2.25,
        ease: [0.76, 0, 0.24, 1],
      }}
    >
      <motion.div
        className="nova-intro-inner"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0, y: -20 }}
        transition={{
          duration: 0.45,
          delay: 1.95,
          ease: "easeOut",
        }}
      >
        <motion.span
          className="nova-intro-number"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: 0.15,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          02 / SELECTED WORK
        </motion.span>

        <motion.h2
          initial={{
            opacity: 0,
            y: 40,
            scale: 0.96,
            letterSpacing: "0.08em",
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
            letterSpacing: "-0.065em",
          }}
          transition={{
            duration: 0.8,
            delay: 0.25,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          NOVA
        </motion.h2>

        <motion.div
          className="nova-intro-line"
          initial={{
            scaleX: 0,
            opacity: 0,
          }}
          animate={{
            scaleX: 1,
            opacity: 1,
          }}
          transition={{
            duration: 0.7,
            delay: 0.65,
            ease: [0.22, 1, 0.36, 1],
          }}
        />

        <motion.span
          className="nova-intro-subtitle"
          initial={{
            opacity: 0,
            y: 12,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.5,
            delay: 0.85,
          }}
        >
          PRODUCT DESIGN / DIGITAL EXPERIENCE
        </motion.span>
      </motion.div>

      <motion.div
        className="nova-intro-progress"
        initial={{
          scaleX: 0,
        }}
        animate={{
          scaleX: 1,
        }}
        transition={{
          duration: 1.9,
          delay: 0.15,
          ease: [0.65, 0, 0.35, 1],
        }}
      />

      <motion.div
        className="nova-intro-orbit"
        initial={{
          opacity: 0,
          scale: 0.6,
        }}
        animate={{
          opacity: 1,
          scale: 1,
          rotate: 180,
        }}
        transition={{
          duration: 2,
          delay: 0.1,
          ease: "easeOut",
        }}
      />
    </motion.div>
  );
}

/* =========================================
   CASE STUDY
========================================= */

export default function NovaCaseStudy() {
  return (
    <main className="nova-case">

      {/* =========================================
          OPENING INTRO
      ========================================= */}

      <NovaIntro />

      {/* =========================================
          BACK TO WORK
      ========================================= */}

      <Link href="/#work" className="nova-back">
        <span className="nova-back-arrow">←</span>
        <span>BACK TO SELECTED WORK</span>
      </Link>

      {/* =========================================
          COVER
      ========================================= */}

      <section className="nova-hero">

        <div className="nova-hero-glow" />

        <motion.div
          className="nova-hero-image"
          initial={{
            opacity: 0,
            scale: 1.04,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          transition={{
            duration: 1.2,
            delay: 2.15,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <img
            src="/portfolio/project-02/01-nova-cover.png"
            alt="NOVA digital product cover"
          />

          <div className="nova-hero-overlay" />
        </motion.div>

        <div className="nova-hero-content">

          <motion.div
            className="nova-hero-meta"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.7,
              delay: 2.35,
            }}
          >
            <span>02 / SELECTED WORK</span>
            <span>UI/UX · PRODUCT DESIGN · DIGITAL</span>
          </motion.div>

          <motion.div
            className="nova-hero-title"
            initial={{ opacity: 0, y: 45 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.9,
              delay: 2.45,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <p>NOVA</p>

            <h1>
              Work
              <em>in orbit.</em>
            </h1>
          </motion.div>

          <motion.div
            className="nova-hero-bottom"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.8,
              delay: 2.8,
            }}
          >
            <span>CASE STUDY / 2026</span>

            <span className="nova-scroll">
              SCROLL TO EXPLORE
              <i />
            </span>
          </motion.div>

        </div>
      </section>

      {/* =========================================
          INTRO
      ========================================= */}

      <section className="nova-intro nova-section">

        <div className="nova-section-label">
          <span>01</span>
          <span>PROJECT / CONCEPT</span>
        </div>

        <div className="nova-intro-grid">

          <motion.div
            className="nova-intro-heading"
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8 }}
          >
            <h2>
              A workspace
              <em>built for momentum.</em>
            </h2>
          </motion.div>

          <motion.div
            className="nova-intro-copy"
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <p>
              NOVA is a modern productivity platform concept designed
              to bring projects, tasks, teams and performance into one
              focused digital environment.
            </p>

            <p>
              The interface combines a precise visual system with
              intelligent information hierarchy, creating an experience
              that feels advanced without becoming complicated.
            </p>

            <div className="nova-intro-details">

              <div>
                <span>PROJECT</span>
                <strong>NOVA</strong>
              </div>

              <div>
                <span>DISCIPLINE</span>
                <strong>UI / UX DESIGN</strong>
              </div>

              <div>
                <span>YEAR</span>
                <strong>2026</strong>
              </div>

            </div>
          </motion.div>

        </div>
      </section>

      {/* =========================================
          LOGO SYSTEM
      ========================================= */}

      <section className="nova-identity nova-section">

        <div className="nova-section-label">
          <span>02</span>
          <span>LOGO SYSTEM</span>
        </div>

        <div className="nova-split-heading">

          <h2>
            One symbol.
            <em>Infinite direction.</em>
          </h2>

          <p>
            The NOVA identity is built around a distinctive mark that
            communicates movement, precision and forward thinking.
          </p>

        </div>

        <motion.figure
          className="nova-showcase nova-showcase-identity"
          initial={{ opacity: 0, y: 45 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.12 }}
          transition={{ duration: 0.8 }}
        >
          <img
            src="/portfolio/project-02/02-nova-logo-system.png"
            alt="NOVA logo system"
          />

          <figcaption>
            <span>02 / 09</span>
            <span>NOVA LOGO SYSTEM</span>
          </figcaption>
        </motion.figure>

      </section>

      {/* =========================================
          VISUAL IDENTITY
      ========================================= */}

      <section className="nova-visual nova-section">

        <div className="nova-section-label">
          <span>03</span>
          <span>VISUAL IDENTITY</span>
        </div>

        <div className="nova-split-heading">

          <h2>
            Designed with
            <em>precision.</em>
          </h2>

          <p>
            Typography, color, spacing and interface elements work
            together to create a consistent visual language across
            the entire NOVA product.
          </p>

        </div>

        <motion.figure
          className="nova-showcase nova-showcase-identity"
          initial={{ opacity: 0, y: 45 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.12 }}
          transition={{ duration: 0.8 }}
        >
          <img
            src="/portfolio/project-02/03-nova-visual-identity.png"
            alt="NOVA visual identity"
          />

          <figcaption>
            <span>03 / 09</span>
            <span>VISUAL IDENTITY</span>
          </figcaption>
        </motion.figure>

      </section>

      {/* =========================================
          PRODUCT INTERFACE
      ========================================= */}

      <section className="nova-product nova-section">

        <div className="nova-section-label">
          <span>04</span>
          <span>PRODUCT EXPERIENCE</span>
        </div>

        <div className="nova-product-intro">

          <h2>
            The interface
            <em>in motion.</em>
          </h2>

          <p>
            Every screen was designed around a simple principle:
            surface the right information at the right moment while
            keeping the experience visually calm.
          </p>

        </div>

        {/* Dashboard */}

        <motion.figure
          className="nova-screen nova-screen-large"
          initial={{ opacity: 0, y: 55 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.08 }}
          transition={{ duration: 0.85 }}
        >
          <div className="nova-screen-image">
            <img
              src="/portfolio/project-02/04-nova-dashboard.png"
              alt="NOVA dashboard interface"
            />
          </div>

          <figcaption>
            <div>
              <span>04</span>
              <strong>DASHBOARD</strong>
            </div>

            <p>
              A focused command center giving users an immediate view
              of their projects, tasks and current progress.
            </p>
          </figcaption>
        </motion.figure>

        {/* Projects */}

        <motion.figure
          className="nova-screen nova-screen-large"
          initial={{ opacity: 0, y: 55 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.08 }}
          transition={{ duration: 0.85 }}
        >
          <div className="nova-screen-image">
            <img
              src="/portfolio/project-02/05-nova-projects.png"
              alt="NOVA projects interface"
            />
          </div>

          <figcaption>
            <div>
              <span>05</span>
              <strong>PROJECTS</strong>
            </div>

            <p>
              Projects are organized into a clear visual hierarchy,
              making active work easy to scan and manage.
            </p>
          </figcaption>
        </motion.figure>

        {/* Tasks */}

        <motion.figure
          className="nova-screen nova-screen-large"
          initial={{ opacity: 0, y: 55 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.08 }}
          transition={{ duration: 0.85 }}
        >
          <div className="nova-screen-image">
            <img
              src="/portfolio/project-02/06-nova-tasks.png"
              alt="NOVA task management interface"
            />
          </div>

          <figcaption>
            <div>
              <span>06</span>
              <strong>TASK MANAGEMENT</strong>
            </div>

            <p>
              A structured task environment keeps priorities visible
              without overwhelming the user.
            </p>
          </figcaption>
        </motion.figure>

      </section>

      {/* =========================================
          ANALYTICS
      ========================================= */}

      <section className="nova-analytics nova-section">

        <div className="nova-section-label">
          <span>05</span>
          <span>DATA / ANALYTICS</span>
        </div>

        <div className="nova-split-heading">

          <h2>
            Progress
            <em>made visible.</em>
          </h2>

          <p>
            NOVA transforms activity into useful visual feedback,
            helping users understand performance and make better
            decisions.
          </p>

        </div>

        <motion.figure
          className="nova-showcase nova-showcase-interface"
          initial={{ opacity: 0, y: 45 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.08 }}
          transition={{ duration: 0.8 }}
        >
          <img
            src="/portfolio/project-02/07-nova-analytics.png"
            alt="NOVA analytics dashboard"
          />

          <figcaption>
            <span>07 / 09</span>
            <span>ANALYTICS EXPERIENCE</span>
          </figcaption>
        </motion.figure>

      </section>

      {/* =========================================
          PROJECT DETAIL
      ========================================= */}

      <section className="nova-detail nova-section">

        <div className="nova-section-label">
          <span>06</span>
          <span>PROJECT DETAIL</span>
        </div>

        <div className="nova-detail-grid">

          <div>
            <h2>
              Deep work
              <em>without distraction.</em>
            </h2>
          </div>

          <div>
            <p>
              The project detail experience brings tasks, milestones,
              progress and supporting information together inside one
              structured workspace.
            </p>
          </div>

        </div>

        <motion.figure
          className="nova-showcase nova-showcase-interface"
          initial={{ opacity: 0, y: 45 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.08 }}
          transition={{ duration: 0.8 }}
        >
          <img
            src="/portfolio/project-02/08-nova-project-detail.png"
            alt="NOVA project detail interface"
          />

          <figcaption>
            <span>08 / 09</span>
            <span>PROJECT DETAIL</span>
          </figcaption>
        </motion.figure>

      </section>

      {/* =========================================
          MOBILE
      ========================================= */}

      <section className="nova-mobile nova-section">

        <div className="nova-section-label">
          <span>07</span>
          <span>MOBILE EXPERIENCE</span>
        </div>

        <div className="nova-mobile-heading">

          <h2>
            The workspace
            <em>travels with you.</em>
          </h2>

          <p>
            NOVA maintains its visual hierarchy and interaction logic
            across smaller screens, ensuring the product remains useful
            wherever work happens.
          </p>

        </div>

        <motion.figure
          className="nova-mobile-showcase"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.85 }}
        >
          <div className="nova-mobile-image">
            <img
              src="/portfolio/project-02/09-nova-mobile-experience.png"
              alt="NOVA mobile experience"
            />
          </div>

          <figcaption>
            <span>09 / 09</span>
            <span>NOVA MOBILE EXPERIENCE</span>
          </figcaption>
        </motion.figure>

      </section>

      {/* =========================================
          FINAL SHOWCASE
      ========================================= */}

      <section className="nova-final">

        <div className="nova-final-image">

          <img
            src="/portfolio/project-02/10-nova-final-showcase.png"
            alt="NOVA final showcase"
          />

          <div className="nova-final-overlay" />

          <div className="nova-final-content">

            <span>NOVA / PRODUCT DESIGN</span>

            <h2>
              Built for
              <em>what comes next.</em>
            </h2>

            <p>
              UI/UX Design · Product Design · Digital Experience
            </p>

          </div>

        </div>
      </section>

      {/* =========================================
          PROJECT INFO
      ========================================= */}

      <section className="nova-project-info">

        <div className="nova-project-info-inner">

          <div>
            <span>PROJECT</span>
            <strong>NOVA</strong>
          </div>

          <div>
            <span>DISCIPLINE</span>
            <strong>UI / UX DESIGN</strong>
          </div>

          <div>
            <span>YEAR</span>
            <strong>2026</strong>
          </div>

          <div>
            <span>TOOLS</span>
            <strong>FIGMA · PROTOTYPING</strong>
          </div>

        </div>
      </section>

      {/* =========================================
          FOOTER
      ========================================= */}

      <footer className="nova-footer">

        <div>
          <span>WA CREATIVE SOLUTIONS</span>
          <span>SELECTED WORK / 2026</span>
        </div>

        <Link href="/#work">
          VIEW ALL WORK ↗
        </Link>

      </footer>

    </main>
  );
}