"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import "./EmberOak.css";

const images = {
  cover: "/portfolio/project-01/cover.png",

  brandIdentity: "/portfolio/project-01/brand identity.png",
  logoVariation: "/portfolio/project-01/logo variation.png",
  colorPalette: "/portfolio/project-01/color pallete.png",
  typography: "/portfolio/project-01/typography.png",
  brandApplication: "/portfolio/project-01/brand application.png",

  brazil: "/portfolio/project-01/brazil.png",
  colombia: "/portfolio/project-01/colombia.png",
  ethiopia: "/portfolio/project-01/ethiopia.png",

  cafe: "/portfolio/project-01/cafe experience 1.PNG",

  hero: "/portfolio/project-01/01-navbar-hero.PNG",
  story: "/portfolio/project-01/02-navbar-story.PNG",
  packaging: "/portfolio/project-01/03-navbar-packaging.PNG",
  craft: "/portfolio/project-01/04-navbar-craft.png",
  signature: "/portfolio/project-01/05-navbar-signature.PNG",
  newsletter: "/portfolio/project-01/07-navbar-newsletter-footer.png",

  final: "/portfolio/project-01/ember and oak-01.png",
};

/* =========================================
   OPENING INTRO
========================================= */

function EmberIntro() {
  return (
    <motion.div
      className="ember-intro-loader"
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
        className="ember-intro-inner"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0, y: -20 }}
        transition={{
          duration: 0.45,
          delay: 1.95,
          ease: "easeOut",
        }}
      >
        <motion.span
          className="ember-intro-number"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: 0.15,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          01 / SELECTED WORK
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
          EMBER
          <br />
          & OAK
        </motion.h2>

        <motion.div
          className="ember-intro-line"
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
          className="ember-intro-subtitle"
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
          BRAND IDENTITY / DIGITAL EXPERIENCE
        </motion.span>
      </motion.div>

      <motion.div
        className="ember-intro-progress"
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
        className="ember-intro-orbit"
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
   IMAGE SHOWCASE COMPONENT
========================================= */

function EmberShowcase({
  image,
  alt,
  number,
  label,
  className = "",
}) {
  return (
    <motion.figure
      className={`ember-showcase ${className}`}
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
        amount: 0.08,
      }}
      transition={{
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <div className="ember-showcase-image">
        <img src={image} alt={alt} />
      </div>

      <figcaption>
        <span>{number}</span>
        <span>{label}</span>
      </figcaption>
    </motion.figure>
  );
}

/* =========================================
   CASE STUDY
========================================= */

export default function EmberOakCaseStudy() {
  return (
    <main className="ember-case">

      {/* =========================================
          INTRO LOADER
      ========================================= */}

      <EmberIntro />

      {/* =========================================
          BACK TO WORK
      ========================================= */}

      <Link href="/#work" className="ember-back">
        <span className="ember-back-arrow">←</span>
        <span>BACK TO SELECTED WORK</span>
      </Link>

      {/* =========================================
          HERO
      ========================================= */}

      <section className="ember-hero">

        <div className="ember-hero-glow" />

        <motion.div
          className="ember-hero-image"
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
            src={images.cover}
            alt="Ember & Oak brand cover"
          />

          <div className="ember-hero-overlay" />
        </motion.div>

        <div className="ember-hero-content">

          <motion.div
            className="ember-hero-meta"
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.7,
              delay: 2.35,
            }}
          >
            <span>01 / SELECTED WORK</span>
            <span>BRANDING · PACKAGING · DIGITAL</span>
          </motion.div>

          <motion.div
            className="ember-hero-title"
            initial={{
              opacity: 0,
              y: 45,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.9,
              delay: 2.45,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <p>EMBER & OAK</p>

            <h1>
              Crafted
              <em>slowly.</em>
            </h1>
          </motion.div>

          <motion.div
            className="ember-hero-bottom"
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              duration: 0.8,
              delay: 2.8,
            }}
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
          INTRO
      ========================================= */}

      <section className="ember-intro ember-section">

        <div className="ember-section-label">
          <span>01</span>
          <span>PROJECT / CONCEPT</span>
        </div>

        <div className="ember-intro-grid">

          <motion.div
            className="ember-intro-heading"
            initial={{
              opacity: 0,
              y: 35,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.2,
            }}
            transition={{
              duration: 0.8,
            }}
          >
            <h2>
              Coffee
              <em>worth remembering.</em>
            </h2>
          </motion.div>

          <motion.div
            className="ember-intro-copy"
            initial={{
              opacity: 0,
              y: 35,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.2,
            }}
            transition={{
              duration: 0.8,
              delay: 0.1,
            }}
          >
            <p>
              Ember & Oak is a premium coffee brand concept built
              around the beauty of slow craft, carefully sourced beans
              and the rituals that make coffee memorable.
            </p>

            <p>
              The identity combines warm natural tones, refined
              typography and an editorial visual language to create
              a brand that feels timeless, tactile and quietly premium.
            </p>

            <div className="ember-intro-details">

              <div>
                <span>PROJECT</span>
                <strong>EMBER & OAK</strong>
              </div>

              <div>
                <span>DISCIPLINE</span>
                <strong>BRAND IDENTITY</strong>
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
          BRAND IDENTITY
      ========================================= */}

      <section className="ember-identity ember-section">

        <div className="ember-section-label">
          <span>02</span>
          <span>BRAND IDENTITY</span>
        </div>

        <div className="ember-split-heading">

          <h2>
            A mark with
            <em>character.</em>
          </h2>

          <p>
            The visual identity was developed to balance heritage
            and contemporary refinement, giving Ember & Oak a
            distinctive presence across every touchpoint.
          </p>

        </div>

        <EmberShowcase
          image={images.brandIdentity}
          alt="Ember & Oak brand identity"
          number="01 / 10"
          label="BRAND IDENTITY"
          className="ember-showcase-brand"
        />

      </section>

      {/* =========================================
          LOGO SYSTEM
      ========================================= */}

      <section className="ember-logo ember-section">

        <div className="ember-section-label">
          <span>03</span>
          <span>LOGO SYSTEM</span>
        </div>

        <div className="ember-split-heading">

          <h2>
            Simple form.
            <em>Strong memory.</em>
          </h2>

          <p>
            The logo system establishes a flexible signature that
            remains recognizable across packaging, digital interfaces
            and physical brand applications.
          </p>

        </div>

        <EmberShowcase
          image={images.logoVariation}
          alt="Ember & Oak logo variations"
          number="02 / 10"
          label="LOGO VARIATIONS"
          className="ember-showcase-identity"
        />

      </section>

      {/* =========================================
          VISUAL SYSTEM
      ========================================= */}

      <section className="ember-visual ember-section">

        <div className="ember-section-label">
          <span>04</span>
          <span>VISUAL LANGUAGE</span>
        </div>

        <div className="ember-visual-grid">

          <EmberShowcase
            image={images.colorPalette}
            alt="Ember & Oak color palette"
            number="03 / 10"
            label="COLOR PALETTE"
            className="ember-small-showcase"
          />

          <EmberShowcase
            image={images.typography}
            alt="Ember & Oak typography"
            number="04 / 10"
            label="TYPOGRAPHY"
            className="ember-small-showcase"
          />

        </div>

      </section>

      {/* =========================================
          BRAND APPLICATION
      ========================================= */}

      <section className="ember-application ember-section">

        <div className="ember-section-label">
          <span>05</span>
          <span>BRAND APPLICATION</span>
        </div>

        <div className="ember-split-heading">

          <h2>
            Identity
            <em>in the real world.</em>
          </h2>

          <p>
            The identity extends beyond the logo into tangible brand
            moments, creating a cohesive experience wherever the
            customer encounters Ember & Oak.
          </p>

        </div>

        <EmberShowcase
          image={images.brandApplication}
          alt="Ember & Oak brand applications"
          number="05 / 10"
          label="BRAND APPLICATION"
          className="ember-showcase-application"
        />

      </section>

      {/* =========================================
          COFFEE ORIGINS
      ========================================= */}

      <section className="ember-origins ember-section">

        <div className="ember-section-label">
          <span>06</span>
          <span>COFFEE / ORIGIN</span>
        </div>

        <div className="ember-origins-heading">

          <h2>
            From
            <em>where it begins.</em>
          </h2>

          <p>
            Ember & Oak celebrates the journey behind every cup.
            Origin becomes part of the story, giving each coffee
            its own character and sense of place.
          </p>

        </div>

        <div className="ember-origin-grid">

          <EmberShowcase
            image={images.brazil}
            alt="Ember & Oak Brazil coffee origin"
            number="06A"
            label="BRAZIL"
          />

          <EmberShowcase
            image={images.colombia}
            alt="Ember & Oak Colombia coffee origin"
            number="06B"
            label="COLOMBIA"
          />

          <EmberShowcase
            image={images.ethiopia}
            alt="Ember & Oak Ethiopia coffee origin"
            number="06C"
            label="ETHIOPIA"
          />

        </div>

      </section>

      {/* =========================================
          CAFE EXPERIENCE
      ========================================= */}

      <section className="ember-cafe ember-section">

        <div className="ember-section-label">
          <span>07</span>
          <span>CAFE EXPERIENCE</span>
        </div>

        <div className="ember-split-heading">

          <h2>
            A place to
            <em>slow down.</em>
          </h2>

          <p>
            The physical experience follows the same visual philosophy:
            warm, considered and inviting, turning coffee into a
            complete sensory experience.
          </p>

        </div>

        <EmberShowcase
          image={images.cafe}
          alt="Ember & Oak cafe experience"
          number="07 / 10"
          label="CAFE EXPERIENCE"
          className="ember-showcase-cafe"
        />

      </section>

      {/* =========================================
          DIGITAL EXPERIENCE
      ========================================= */}

      <section className="ember-digital ember-section">

        <div className="ember-section-label">
          <span>08</span>
          <span>DIGITAL EXPERIENCE</span>
        </div>

        <div className="ember-digital-intro">

          <h2>
            The brand
            <em>comes alive.</em>
          </h2>

          <p>
            The digital experience translates the physical identity
            into an immersive editorial website designed around
            storytelling, product discovery and brand atmosphere.
          </p>

        </div>

        {/* HERO */}

        <motion.figure
          className="ember-screen"
          initial={{
            opacity: 0,
            y: 55,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.08,
          }}
          transition={{
            duration: 0.85,
          }}
        >
          <div className="ember-screen-image">
            <img
              src={images.hero}
              alt="Ember & Oak website hero"
            />
          </div>

          <figcaption>
            <div>
              <span>08A</span>
              <strong>WEBSITE HERO</strong>
            </div>

            <p>
              A cinematic opening experience introduces the brand
              through atmosphere, typography and product storytelling.
            </p>
          </figcaption>
        </motion.figure>

        {/* STORY */}

        <motion.figure
          className="ember-screen"
          initial={{
            opacity: 0,
            y: 55,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.08,
          }}
          transition={{
            duration: 0.85,
          }}
        >
          <div className="ember-screen-image">
            <img
              src={images.story}
              alt="Ember & Oak website story section"
            />
          </div>

          <figcaption>
            <div>
              <span>08B</span>
              <strong>BRAND STORY</strong>
            </div>

            <p>
              The story section turns the origin and philosophy of
              Ember & Oak into an editorial digital narrative.
            </p>
          </figcaption>
        </motion.figure>

        {/* PACKAGING */}

        <motion.figure
          className="ember-screen"
          initial={{
            opacity: 0,
            y: 55,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.08,
          }}
          transition={{
            duration: 0.85,
          }}
        >
          <div className="ember-screen-image">
            <img
              src={images.packaging}
              alt="Ember & Oak packaging website section"
            />
          </div>

          <figcaption>
            <div>
              <span>08C</span>
              <strong>PACKAGING</strong>
            </div>

            <p>
              Packaging becomes part of the digital story, connecting
              product, identity and craftsmanship.
            </p>
          </figcaption>
        </motion.figure>

        {/* CRAFT */}

        <motion.figure
          className="ember-screen"
          initial={{
            opacity: 0,
            y: 55,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.08,
          }}
          transition={{
            duration: 0.85,
          }}
        >
          <div className="ember-screen-image">
            <img
              src={images.craft}
              alt="Ember & Oak craft website section"
            />
          </div>

          <figcaption>
            <div>
              <span>08D</span>
              <strong>THE CRAFT</strong>
            </div>

            <p>
              Craftsmanship is presented as a core part of the brand,
              reinforcing the slow and intentional character of the
              coffee experience.
            </p>
          </figcaption>
        </motion.figure>

        {/* SIGNATURE */}

        <motion.figure
          className="ember-screen"
          initial={{
            opacity: 0,
            y: 55,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.08,
          }}
          transition={{
            duration: 0.85,
          }}
        >
          <div className="ember-screen-image">
            <img
              src={images.signature}
              alt="Ember & Oak signature website section"
            />
          </div>

          <figcaption>
            <div>
              <span>08E</span>
              <strong>SIGNATURE EXPERIENCE</strong>
            </div>

            <p>
              A refined product moment reinforces the premium character
              of the Ember & Oak experience.
            </p>
          </figcaption>
        </motion.figure>

        {/* NEWSLETTER / FOOTER */}

        <motion.figure
          className="ember-screen"
          initial={{
            opacity: 0,
            y: 55,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.08,
          }}
          transition={{
            duration: 0.85,
          }}
        >
          <div className="ember-screen-image">
            <img
              src={images.newsletter}
              alt="Ember & Oak newsletter and footer"
            />
          </div>

          <figcaption>
            <div>
              <span>08F</span>
              <strong>NEWSLETTER / FOOTER</strong>
            </div>

            <p>
              The final interaction keeps the brand experience
              consistent through a restrained editorial footer.
            </p>
          </figcaption>
        </motion.figure>

      </section>

      {/* =========================================
          FINAL SHOWCASE
      ========================================= */}

      <section className="ember-final">

        <div className="ember-final-image">

          <img
            src={images.final}
            alt="Ember & Oak final brand showcase"
          />

          <div className="ember-final-overlay" />

          <div className="ember-final-content">

            <span>EMBER & OAK / BRAND EXPERIENCE</span>

            <h2>
              Crafted slowly.
              <em>Remembered always.</em>
            </h2>

            <p>
              Brand Identity · Packaging · Digital Experience
            </p>

          </div>

        </div>
      </section>

      {/* =========================================
          PROJECT INFO
      ========================================= */}

      <section className="ember-project-info">

        <div className="ember-project-info-inner">

          <div>
            <span>PROJECT</span>
            <strong>EMBER & OAK</strong>
          </div>

          <div>
            <span>DISCIPLINE</span>
            <strong>BRAND IDENTITY</strong>
          </div>

          <div>
            <span>YEAR</span>
            <strong>2026</strong>
          </div>

          <div>
            <span>TOOLS</span>
            <strong>ILLUSTRATOR · PHOTOSHOP · FIGMA</strong>
          </div>

        </div>
      </section>

      {/* =========================================
          FOOTER
      ========================================= */}

      <footer className="ember-footer">

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