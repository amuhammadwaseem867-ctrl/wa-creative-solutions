"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import "./ember-and-oak.css";

const websiteScreens = [
  {
    number: "01",
    title: "Hero / First Impression",
    image: "/portfolio/project-01/01-navbar-hero.PNG",
  },
  {
    number: "02",
    title: "Brand Story",
    image: "/portfolio/project-01/02-navbar-story.PNG",
  },
  {
    number: "03",
    title: "Packaging Experience",
    image: "/portfolio/project-01/03-navbar-packaging.PNG",
  },
  {
    number: "04",
    title: "The Craft",
    image: "/portfolio/project-01/04-navbar-craft.png",
  },
  {
    number: "05",
    title: "Signature Coffee",
    image: "/portfolio/project-01/05-navbar-signature.PNG",
  },
  {
    number: "06",
    title: "Newsletter / Footer",
    image: "/portfolio/project-01/07-navbar-newsletter-footer.png",
  },
];

const packaging = [
  {
    number: "01",
    origin: "ETHIOPIA",
    image: "/portfolio/project-01/ethiopia.png",
  },
  {
    number: "02",
    origin: "COLOMBIA",
    image: "/portfolio/project-01/colombia.png",
  },
  {
    number: "03",
    origin: "BRAZIL",
    image: "/portfolio/project-01/brazil.png",
  },
];

export default function EmberAndOak() {
  return (
    <main className="ember-case-study">

      {/* =========================================
          BACK TO WORK
      ========================================= */}

      <Link href="/#work" className="ember-back">
        <span>←</span>
        <span>BACK TO SELECTED WORK</span>
      </Link>

      {/* =========================================
          COVER
      ========================================= */}

      <section className="ember-cover">

        <motion.div
          className="ember-cover-image"
          initial={{ opacity: 0, scale: 1.03 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1 }}
        >
          <img
            src="/portfolio/project-01/cover.png"
            alt="EMBER & OAK luxury coffee brand"
          />

          <div className="ember-cover-overlay" />
        </motion.div>

        <div className="ember-cover-content">

          <motion.div
            className="ember-cover-meta"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <span>01 / SELECTED WORK</span>
            <span>BRAND IDENTITY · PACKAGING · DIGITAL</span>
          </motion.div>

          <motion.div
            className="ember-cover-title"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3 }}
          >
            <p>EMBER & OAK</p>

            <h1>
              Crafted
              <em>slowly.</em>
            </h1>
          </motion.div>

          <motion.div
            className="ember-cover-bottom"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <span>CASE STUDY / 2026</span>

            <span className="ember-scroll">
              SCROLL TO EXPLORE
              <i />
            </span>
          </motion.div>

        </div>
      </section>

      {/* =========================================
          BRAND STORY / CONCEPT
      ========================================= */}

      <section className="ember-intro">

        <div className="ember-section-label">
          <span>01</span>
          <span>BRAND STORY / CONCEPT</span>
        </div>

        <div className="ember-intro-grid">

          <motion.h2
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            A coffee brand
            <em>rooted in patience.</em>
          </motion.h2>

          <motion.div
            className="ember-intro-copy"
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <p>
              EMBER & OAK was created as a premium coffee experience
              built around craft, origin and the quiet ritual of
              exceptional coffee.
            </p>

            <p>
              The visual direction combines warm natural tones,
              refined typography and editorial composition to create
              an identity that feels timeless rather than trendy.
            </p>

            <div className="ember-intro-details">

              <div>
                <span>CLIENT</span>
                <strong>EMBER & OAK</strong>
              </div>

              <div>
                <span>DISCIPLINE</span>
                <strong>BRAND / DIGITAL</strong>
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
          VISUAL IDENTITY
      ========================================= */}

      <section className="ember-identity">

        <div className="ember-section-label">
          <span>02</span>
          <span>VISUAL IDENTITY</span>
        </div>

        <div className="ember-identity-heading">
          <h2>
            Built around
            <em>character.</em>
          </h2>
        </div>

        <motion.div
          className="ember-full-image"
          initial={{ opacity: 0, y: 45 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.8 }}
        >
          <img
            src="/portfolio/project-01/brand identity.png"
            alt="EMBER & OAK brand identity"
          />
        </motion.div>

      </section>

      {/* =========================================
          LOGO SYSTEM
      ========================================= */}

      <section className="ember-logo-section">

        <div className="ember-section-label">
          <span>03</span>
          <span>LOGO SYSTEM</span>
        </div>

        <div className="ember-split-heading">

          <div>
            <h2>
              One mark.
              <em>Many expressions.</em>
            </h2>
          </div>

          <p>
            A refined logo system designed to remain distinctive
            across packaging, digital interfaces and physical
            brand applications.
          </p>

        </div>

        <motion.div
          className="ember-full-image ember-logo-image"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <img
            src="/portfolio/project-01/logo variation.png"
            alt="EMBER & OAK logo variations"
          />
        </motion.div>

      </section>

      {/* =========================================
          COLOR PALETTE
      ========================================= */}

      <section className="ember-palette-section">

        <div className="ember-section-label">
          <span>04</span>
          <span>COLOR PALETTE</span>
        </div>

        <div className="ember-section-heading">

          <h2>
            Warm tones.
            <em>Quiet confidence.</em>
          </h2>

        </div>

        <motion.div
          className="ember-full-image"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <img
            src="/portfolio/project-01/color pallete.png"
            alt="EMBER & OAK color palette"
          />
        </motion.div>

      </section>

      {/* =========================================
          TYPOGRAPHY
      ========================================= */}

      <section className="ember-type-section">

        <div className="ember-section-label">
          <span>05</span>
          <span>TYPOGRAPHY</span>
        </div>

        <div className="ember-type-grid">

          <div>
            <h2>
              Type with
              <em>presence.</em>
            </h2>
          </div>

          <div>
            <p>
              Editorial serif forms create the premium character,
              while restrained supporting typography keeps the
              experience contemporary and highly readable.
            </p>
          </div>

        </div>

        <motion.div
          className="ember-full-image"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <img
            src="/portfolio/project-01/typography.png"
            alt="EMBER & OAK typography system"
          />
        </motion.div>

      </section>

      {/* =========================================
          BRAND APPLICATION
      ========================================= */}

      <section className="ember-application-section">

        <div className="ember-section-label">
          <span>06</span>
          <span>BRAND APPLICATION</span>
        </div>

        <div className="ember-split-heading">

          <h2>
            Identity
            <em>in context.</em>
          </h2>

          <p>
            The identity extends beyond the logo into a complete
            visual language designed to feel consistent across
            every customer touchpoint.
          </p>

        </div>

        <motion.div
          className="ember-full-image"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <img
            src="/portfolio/project-01/brand application.png"
            alt="EMBER & OAK brand applications"
          />
        </motion.div>

      </section>

      {/* =========================================
          CAFE EXPERIENCE
      ========================================= */}

      <section className="ember-cafe-section">

        <div className="ember-section-label">
          <span>07</span>
          <span>CAFÉ EXPERIENCE</span>
        </div>

        <div className="ember-cafe-grid">

          <div>
            <h2>
              From the
              <em>cup to the space.</em>
            </h2>
          </div>

          <div>
            <p>
              EMBER & OAK was envisioned as more than a coffee
              product. The identity creates a complete atmosphere
              where packaging, environment and experience belong
              to the same world.
            </p>
          </div>

        </div>

        <motion.div
          className="ember-full-image"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <img
            src="/portfolio/project-01/cafe experience 1.PNG"
            alt="EMBER & OAK café experience"
          />
        </motion.div>

      </section>

      {/* =========================================
          PACKAGING / COFFEE ORIGINS
      ========================================= */}

      <section className="ember-packaging-section">

        <div className="ember-section-label">
          <span>08</span>
          <span>PACKAGING / COFFEE ORIGINS</span>
        </div>

        <div className="ember-packaging-heading">

          <h2>
            Every origin
            <em>has a story.</em>
          </h2>

          <p>
            Three distinct coffee origins are presented through a
            unified packaging system while retaining their own
            individual character.
          </p>

        </div>

        <div className="ember-packaging-grid">

          {packaging.map((coffee, index) => (
            <motion.article
              className="ember-packaging-card"
              key={coffee.origin}
              initial={{
                opacity: 0,
                y: 45,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
                amount: 0.15,
              }}
              transition={{
                duration: 0.75,
                delay: index * 0.1,
              }}
            >

              <div className="ember-packaging-image">

                <img
                  src={coffee.image}
                  alt={`${coffee.origin} EMBER & OAK coffee packaging`}
                />

                <span>
                  {coffee.number}
                </span>

              </div>

              <div className="ember-packaging-info">

                <span>COFFEE ORIGIN</span>

                <h3>
                  {coffee.origin}
                </h3>

              </div>

            </motion.article>
          ))}

        </div>

      </section>

      {/* =========================================
          DIGITAL EXPERIENCE
          ALL 6 WEBSITE SCREENSHOTS
      ========================================= */}

      <section className="ember-digital-section">

        <div className="ember-section-label">
          <span>09</span>
          <span>DIGITAL EXPERIENCE</span>
        </div>

        <div className="ember-digital-heading">

          <h2>
            The brand
            <em>comes alive.</em>
          </h2>

          <p>
            The EMBER & OAK identity was translated into an
            editorial e-commerce experience designed to make
            discovery feel as considered as the coffee itself.
          </p>

        </div>

        <div className="ember-website-stack">

          {websiteScreens.map((screen, index) => (
            <motion.figure
              className="ember-website-screen"
              key={screen.number}
              initial={{
                opacity: 0,
                y: 45,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
                amount: 0.12,
              }}
              transition={{
                duration: 0.8,
                delay: index * 0.05,
              }}
            >

              <div className="ember-screen-image">

                <img
                  src={screen.image}
                  alt={`EMBER & OAK ${screen.title}`}
                />

              </div>

              <figcaption>
                <span>{screen.number}</span>
                <span>{screen.title}</span>
              </figcaption>

            </motion.figure>
          ))}

        </div>

      </section>

      {/* =========================================
          MOBILE EXPERIENCE
      ========================================= */}

      <section className="ember-mobile-section">

        <div className="ember-section-label">
          <span>10</span>
          <span>MOBILE EXPERIENCE</span>
        </div>

        <div className="ember-mobile-heading">

          <h2>
            Designed for
            <em>every screen.</em>
          </h2>

          <p>
            A responsive mobile experience keeps the same editorial
            character, product hierarchy and refined visual rhythm
            across smaller screens.
          </p>

        </div>

        <div className="ember-mobile-placeholder">

          <div>
            <span>MOBILE EXPERIENCE</span>
            <strong>COMING TO CASE STUDY</strong>
          </div>

        </div>

      </section>

      {/* =========================================
          FINAL SHOWCASE
      ========================================= */}

      <section className="ember-final-section">

        <div className="ember-final-image">

          <img
            src="/portfolio/project-01/cover.png"
            alt="EMBER & OAK final brand showcase"
          />

          <div className="ember-final-overlay" />

          <div className="ember-final-content">

            <span>EMBER & OAK</span>

            <h2>
              Crafted Slowly.
              <em>Remembered Always.</em>
            </h2>

            <p>
              Brand identity · Packaging · Digital experience
            </p>

          </div>

        </div>

      </section>

      {/* =========================================
          FOOTER
      ========================================= */}

      <footer className="ember-case-footer">

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