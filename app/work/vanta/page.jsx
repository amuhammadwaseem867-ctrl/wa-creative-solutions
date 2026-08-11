"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import "./Vanta.css";

const base = "/portfolio/project-06";

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 28,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.75,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const imageReveal = {
  hidden: {
    opacity: 0,
    y: 35,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

function ProjectImage({ src, alt, className = "" }) {
  return (
    <motion.div
      className={`vanta-image ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={imageReveal}
    >
      <img src={`${base}/${src}`} alt={alt} />
    </motion.div>
  );
}

export default function Vanta() {
  return (
    <main className="vanta-page">

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="vanta-hero">
        <div className="vanta-container">

          <motion.div
            className="vanta-meta"
            initial="hidden"
            animate="visible"
            variants={fadeUp}
          >
            <span>PROJECT 06</span>
            <span>DIGITAL EXPERIENCE / VANTA</span>
          </motion.div>

          <div className="vanta-hero-grid">

            {/* LEFT */}
            <motion.div
              className="vanta-hero-content"
              initial="hidden"
              animate="visible"
              variants={fadeUp}
            >
              <span className="vanta-label">
                LUXURY DIGITAL EXPERIENCE
              </span>

              <h1>VANTA</h1>

              <p className="vanta-hero-lead">
                A dark luxury experience designed to make
                minimalism feel powerful.
              </p>

              <p className="vanta-hero-description">
                VANTA is a fictional high-end fashion and
                lifestyle brand built around restraint,
                atmosphere and timeless visual language.
              </p>

              <div className="vanta-hero-details">
                <div>
                  <span>DISCIPLINE</span>
                  <strong>Digital Experience</strong>
                </div>

                <div>
                  <span>STYLE</span>
                  <strong>Dark Luxury</strong>
                </div>

                <div>
                  <span>YEAR</span>
                  <strong>2026</strong>
                </div>
              </div>
            </motion.div>


            {/* RIGHT */}
            <motion.div
              className="vanta-hero-cover"
              initial={{
                opacity: 0,
                y: 30,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.9,
                delay: 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <img
                src={`${base}/cover.png`}
                alt="VANTA luxury fashion brand"
              />
            </motion.div>

          </div>

        </div>
      </section>


      {/* =====================================================
          PHILOSOPHY
      ===================================================== */}

      <section className="vanta-section">
        <div className="vanta-container">

          <div className="vanta-section-head">
            <span>01 / PHILOSOPHY</span>
            <span>QUIET LUXURY</span>
          </div>

          <motion.div
            className="vanta-philosophy"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <h2>
              MINIMALISM
              <br />
              <em>WITH PRESENCE.</em>
            </h2>

            <p>
              VANTA communicates quality without excess.
              Typography, spacing, photography and subtle
              details create a sophisticated visual world.
            </p>
          </motion.div>

          <ProjectImage
            src="architecture.png"
            alt="VANTA architecture"
            className="vanta-medium-image"
          />

        </div>
      </section>


      {/* =====================================================
          IDENTITY
      ===================================================== */}

      <section className="vanta-section vanta-surface">
        <div className="vanta-container">

          <div className="vanta-section-head">
            <span>02 / IDENTITY</span>
            <span>VISUAL SYSTEM</span>
          </div>

          <motion.div
            className="vanta-heading"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <h2>
              A SYSTEM
              <br />
              <span>BUILT FOR RESTRAINT.</span>
            </h2>
          </motion.div>

          <div className="vanta-two-grid">

            <ProjectImage
              src="monogram.png"
              alt="VANTA monogram"
            />

            <ProjectImage
              src="brand-guidelines.png"
              alt="VANTA brand guidelines"
            />

          </div>

          <ProjectImage
            src="materials.png"
            alt="VANTA materials"
            className="vanta-medium-image"
          />

        </div>
      </section>


      {/* =====================================================
          CRAFT
      ===================================================== */}

      <section className="vanta-section">
        <div className="vanta-container">

          <div className="vanta-section-head">
            <span>03 / CRAFT</span>
            <span>MATERIAL & DETAIL</span>
          </div>

          <div className="vanta-three-grid">

            <ProjectImage
              src="detail-01.png"
              alt="VANTA detail one"
            />

            <ProjectImage
              src="detail-02.png"
              alt="VANTA detail two"
            />

            <ProjectImage
              src="detail-03.png"
              alt="VANTA detail three"
            />

          </div>

          <motion.div
            className="vanta-side-copy"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <span className="vanta-label">
              CRAFTED DETAILS
            </span>

            <p>
              Every visual element follows the same principle:
              controlled, intentional and quietly luxurious.
            </p>
          </motion.div>

        </div>
      </section>


      {/* =====================================================
          CAMPAIGN
      ===================================================== */}

      <section className="vanta-section vanta-light">
        <div className="vanta-container">

          <div className="vanta-section-head">
            <span>04 / CAMPAIGN</span>
            <span>VISUAL IMPACT</span>
          </div>

          <motion.div
            className="vanta-heading"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <h2>
              DARKNESS
              <br />
              <span>MADE ICONIC.</span>
            </h2>
          </motion.div>

          <ProjectImage
            src="campaign-01.png"
            alt="VANTA campaign one"
            className="vanta-campaign-main"
          />

          <ProjectImage
            src="campaign-02.png"
            alt="VANTA campaign two"
            className="vanta-campaign-secondary"
          />

        </div>
      </section>


      {/* =====================================================
          EXPERIENCE
      ===================================================== */}

      <section className="vanta-section vanta-surface">
        <div className="vanta-container">

          <div className="vanta-section-head">
            <span>05 / EXPERIENCE</span>
            <span>THE VANTA WORLD</span>
          </div>

          <motion.div
            className="vanta-experience-copy"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <h2>
              BEYOND
              <br />
              <span>THE BRAND.</span>
            </h2>

            <p>
              The identity extends into physical spaces,
              membership systems and digital experiences.
            </p>
          </motion.div>

          <ProjectImage
            src="experience-system.png"
            alt="VANTA experience system"
            className="vanta-medium-image"
          />

          <div className="vanta-three-grid">

            <ProjectImage
              src="dining.png"
              alt="VANTA dining"
            />

            <ProjectImage
              src="lounge.png"
              alt="VANTA lounge"
            />

            <ProjectImage
              src="studio.png"
              alt="VANTA studio"
            />

          </div>

        </div>
      </section>


      {/* =====================================================
          MEMBERSHIP
      ===================================================== */}

      <section className="vanta-section">
        <div className="vanta-container">

          <div className="vanta-section-head">
            <span>06 / MEMBERSHIP</span>
            <span>EXCLUSIVITY</span>
          </div>

          <motion.div
            className="vanta-membership-copy"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <h2>
              ACCESS
              <br />
              <span>DEFINED.</span>
            </h2>

            <p>
              A refined membership ecosystem created to make
              exclusivity feel effortless across physical and
              digital touchpoints.
            </p>
          </motion.div>

          <ProjectImage
            src="membership.png"
            alt="VANTA membership"
            className="vanta-medium-image"
          />

          <div className="vanta-two-grid">

            <ProjectImage
              src="membership-card.png"
              alt="VANTA membership card"
            />

            <ProjectImage
              src="mobile-membership.png"
              alt="VANTA mobile membership"
            />

          </div>

        </div>
      </section>


      {/* =====================================================
          DIGITAL
      ===================================================== */}

      <section className="vanta-section vanta-surface">
        <div className="vanta-container">

          <div className="vanta-section-head">
            <span>07 / DIGITAL</span>
            <span>USER EXPERIENCE</span>
          </div>

          <motion.div
            className="vanta-heading"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <h2>
              THE WORLD
              <br />
              <span>IN YOUR HANDS.</span>
            </h2>
          </motion.div>

          <ProjectImage
            src="mobile.png"
            alt="VANTA mobile experience"
            className="vanta-mobile-image"
          />

          <div className="vanta-two-grid">

            <ProjectImage
              src="mobile-reservation.png"
              alt="VANTA mobile reservation"
            />

            <ProjectImage
              src="reservation.png"
              alt="VANTA reservation"
            />

          </div>

        </div>
      </section>


      {/* =====================================================
          WEBSITE
      ===================================================== */}

      <section className="vanta-section vanta-light">
        <div className="vanta-container">

          <div className="vanta-section-head">
            <span>08 / WEBSITE</span>
            <span>DIGITAL PRESENCE</span>
          </div>

          <motion.div
            className="vanta-web-copy"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <h2>
              EDITORIAL
              <br />
              <span>BY DESIGN.</span>
            </h2>

            <p>
              The website turns VANTA into a cinematic digital
              environment where typography, content and imagery
              work together.
            </p>
          </motion.div>

          <ProjectImage
            src="website-01.png"
            alt="VANTA website"
            className="vanta-website-main"
          />

          <div className="vanta-two-grid">

            <ProjectImage
              src="website-002.png"
              alt="VANTA website page two"
            />

            <ProjectImage
              src="website-003.png"
              alt="VANTA website page three"
            />

          </div>

        </div>
      </section>


      {/* =====================================================
          CONTENT
      ===================================================== */}

      <section className="vanta-section">
        <div className="vanta-container">

          <div className="vanta-section-head">
            <span>09 / CONTENT</span>
            <span>EDITORIAL WORLD</span>
          </div>

          <motion.div
            className="vanta-heading"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <h2>
              STORIES
              <br />
              <span>WITH WEIGHT.</span>
            </h2>
          </motion.div>

          <ProjectImage
            src="journal.png"
            alt="VANTA journal"
            className="vanta-medium-image"
          />

          <ProjectImage
            src="presentation.png"
            alt="VANTA presentation"
            className="vanta-small-image"
          />

        </div>
      </section>


      {/* =====================================================
          FINAL
      ===================================================== */}

      <section className="vanta-final">
        <div className="vanta-container">

          <motion.div
            className="vanta-final-copy"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <span>VANTA</span>

            <h2>
              DARK.
              <br />
              TIMELESS.
              <br />
              DISTINCT.
            </h2>

            <p>
              A luxury digital identity built around restraint,
              atmosphere and quiet confidence.
            </p>
          </motion.div>

        </div>
      </section>


      {/* =====================================================
          NEXT PROJECT
      ===================================================== */}

      <section className="vanta-next">

        <Link
          href="/work/project-07"
          className="vanta-next-link"
        >
          <span>NEXT PROJECT</span>

          <h2>
            NOORAH
            <small>07</small>
            <b>↗</b>
          </h2>

          <p>BRAND IDENTITY</p>
        </Link>

      </section>

    </main>
  );
}