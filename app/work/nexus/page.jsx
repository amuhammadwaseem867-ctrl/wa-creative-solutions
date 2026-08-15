"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import "./Nexus.css";

const base = "/portfolio/project-05";

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
    y: 30,
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
      className={`nexus-image ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={imageReveal}
    >
      <img
        src={`${base}/${src}`}
        alt={alt}
      />
    </motion.div>
  );
}

export default function Nexus() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1900);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* =====================================================
          INTRO LOADER
      ===================================================== */}

      <AnimatePresence>
        {loading && (
          <motion.div
            className="nexus-loader"
            initial={{ opacity: 1 }}
            exit={{
              opacity: 0,
              scale: 1.025,
              transition: {
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
              },
            }}
          >
            <motion.div
              className="nexus-loader-content"
              initial={{
                opacity: 0,
                y: 24,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.7,
                delay: 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <span>05</span>

              <h2>NEXUS</h2>

              <p>AI AUTOMATION / NEXUS</p>
            </motion.div>

            <motion.div
              className="nexus-loader-line"
              initial={{
                scaleX: 0,
              }}
              animate={{
                scaleX: 1,
              }}
              transition={{
                duration: 1.15,
                delay: 0.25,
                ease: [0.22, 1, 0.36, 1],
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>


      {/* =====================================================
          MAIN NEXUS PAGE
      ===================================================== */}

      <main className="nexus-page">

        {/* =====================================================
            HERO
        ===================================================== */}

        <section className="nexus-hero">
          <div className="nexus-container">

            <motion.div
              className="nexus-meta"
              initial="hidden"
              animate="visible"
              variants={fadeUp}
            >
              <span>PROJECT 05</span>
              <span>AI AUTOMATION / NEXUS</span>
            </motion.div>

            <div className="nexus-hero-grid">

              {/* LEFT */}

              <motion.div
                className="nexus-hero-content"
                initial="hidden"
                animate="visible"
                variants={fadeUp}
              >
                <span className="nexus-label">
                  INTELLIGENT AUTOMATION SYSTEM
                </span>

                <h1>NEXUS</h1>

                <p className="nexus-hero-lead">
                  Intelligent systems designed to
                  simplify complex workflows.
                </p>

                <p className="nexus-hero-description">
                  NEXUS is a fictional AI automation platform
                  that connects data, intelligence and
                  workflows into one unified digital system.
                </p>

                <div className="nexus-hero-details">

                  <div>
                    <span>DISCIPLINE</span>
                    <strong>AI Automation</strong>
                  </div>

                  <div>
                    <span>TYPE</span>
                    <strong>Digital Product</strong>
                  </div>

                  <div>
                    <span>YEAR</span>
                    <strong>2026</strong>
                  </div>

                </div>
              </motion.div>


              {/* RIGHT */}

              <motion.div
                className="nexus-hero-cover"
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
                  alt="NEXUS AI automation platform"
                />
              </motion.div>

            </div>
          </div>
        </section>


        {/* =====================================================
            INTRO
        ===================================================== */}

        <section className="nexus-section">
          <div className="nexus-container">

            <div className="nexus-section-head">
              <span>01 / INTELLIGENCE</span>
              <span>THE NEXUS SYSTEM</span>
            </div>

            <motion.div
              className="nexus-intro"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
            >
              <h2>
                TURNING
                <br />
                <span>COMPLEXITY</span>
                <br />
                INTO CLARITY.
              </h2>

              <p>
                NEXUS brings intelligent automation,
                analytics and recommendations together
                inside one connected ecosystem.
              </p>
            </motion.div>

            <ProjectImage
              src="intelligence.png"
              alt="NEXUS intelligence system"
              className="nexus-large-image"
            />

          </div>
        </section>


        {/* =====================================================
            AUTOMATION
        ===================================================== */}

        <section className="nexus-section nexus-surface">
          <div className="nexus-container">

            <div className="nexus-section-head">
              <span>02 / AUTOMATION</span>
              <span>WORKFLOW ENGINE</span>
            </div>

            <motion.div
              className="nexus-heading"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
            >
              <h2>
                WORK
                <br />
                <span>WITHOUT FRICTION.</span>
              </h2>
            </motion.div>

            <ProjectImage
              src="automation.png"
              alt="NEXUS automation"
              className="nexus-large-image"
            />

            <ProjectImage
              src="workflows.png"
              alt="NEXUS workflows"
              className="nexus-medium-image"
            />

          </div>
        </section>


        {/* =====================================================
            DATA FLOW
        ===================================================== */}

        <section className="nexus-section">
          <div className="nexus-container">

            <div className="nexus-section-head">
              <span>03 / DATA</span>
              <span>CONNECTED INTELLIGENCE</span>
            </div>

            <div className="nexus-two-grid">

              <ProjectImage
                src="data-flow.png"
                alt="NEXUS data flow"
              />

              <ProjectImage
                src="data-visualization.png"
                alt="NEXUS data visualization"
              />

            </div>

            <motion.div
              className="nexus-side-copy"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
            >
              <span className="nexus-label">
                CONNECTED DATA
              </span>

              <p>
                Every input becomes structured information,
                allowing the system to identify patterns,
                surface insights and support better decisions.
              </p>
            </motion.div>

          </div>
        </section>


        {/* =====================================================
            DASHBOARD
        ===================================================== */}

        <section className="nexus-section nexus-light">
          <div className="nexus-container">

            <div className="nexus-section-head">
              <span>04 / DASHBOARD</span>
              <span>COMMAND CENTER</span>
            </div>

            <motion.div
              className="nexus-heading"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
            >
              <h2>
                EVERYTHING
                <br />
                <span>AT A GLANCE.</span>
              </h2>
            </motion.div>

            <ProjectImage
              src="dashboard.png"
              alt="NEXUS dashboard"
              className="nexus-dashboard"
            />

            <div className="nexus-three-grid">

              <ProjectImage
                src="analytics.png"
                alt="NEXUS analytics"
              />

              <ProjectImage
                src="workspace.png"
                alt="NEXUS workspace"
              />

              <ProjectImage
                src="recommendations.png"
                alt="NEXUS recommendations"
              />

            </div>

          </div>
        </section>


        {/* =====================================================
            AI INTELLIGENCE
        ===================================================== */}

        <section className="nexus-section nexus-surface">
          <div className="nexus-container">

            <div className="nexus-section-head">
              <span>05 / AI</span>
              <span>DECISION INTELLIGENCE</span>
            </div>

            <motion.div
              className="nexus-ai-copy"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
            >
              <h2>
                DATA
                <br />
                <span>THAT THINKS.</span>
              </h2>

              <p>
                The intelligence layer transforms raw information
                into meaningful recommendations and actionable
                insights.
              </p>
            </motion.div>

            <ProjectImage
              src="data-visualization.png"
              alt="NEXUS AI data visualization"
              className="nexus-large-image"
            />

            <ProjectImage
              src="recommendations.png"
              alt="NEXUS AI recommendations"
              className="nexus-medium-image"
            />

          </div>
        </section>


        {/* =====================================================
            MOBILE
        ===================================================== */}

        <section className="nexus-section">
          <div className="nexus-container">

            <div className="nexus-section-head">
              <span>06 / MOBILE</span>
              <span>INTELLIGENCE ANYWHERE</span>
            </div>

            <motion.div
              className="nexus-heading"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
            >
              <h2>
                THE SYSTEM
                <br />
                <span>TRAVELS WITH YOU.</span>
              </h2>
            </motion.div>

            <ProjectImage
              src="mobile.png"
              alt="NEXUS mobile application"
              className="nexus-mobile-image"
            />

            <div className="nexus-two-grid">

              <ProjectImage
                src="mobile-intelligence.png"
                alt="NEXUS mobile intelligence"
              />

              <ProjectImage
                src="mobile-system.png"
                alt="NEXUS mobile system"
              />

            </div>

          </div>
        </section>


        {/* =====================================================
            INFRASTRUCTURE
        ===================================================== */}

        <section className="nexus-section nexus-surface">
          <div className="nexus-container">

            <div className="nexus-section-head">
              <span>07 / INFRASTRUCTURE</span>
              <span>BUILT TO SCALE</span>
            </div>

            <motion.div
              className="nexus-infrastructure"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
            >
              <h2>
                POWER
                <br />
                <span>UNDER THE SURFACE.</span>
              </h2>

              <p>
                A structured infrastructure connects automation,
                intelligence, security and data into a dependable
                digital ecosystem.
              </p>
            </motion.div>

            <ProjectImage
              src="infrastructure.png"
              alt="NEXUS infrastructure"
              className="nexus-large-image"
            />

            <div className="nexus-two-grid">

              <ProjectImage
                src="security.png"
                alt="NEXUS security"
              />

              <ProjectImage
                src="detail-01.png"
                alt="NEXUS system detail"
              />

            </div>

          </div>
        </section>


        {/* =====================================================
            VISUAL DETAILS
        ===================================================== */}

        <section className="nexus-section">
          <div className="nexus-container">

            <div className="nexus-section-head">
              <span>08 / DETAILS</span>
              <span>VISUAL LANGUAGE</span>
            </div>

            <div className="nexus-three-grid">

              <ProjectImage
                src="detail-01.png"
                alt="NEXUS detail one"
              />

              <ProjectImage
                src="detail-02.png"
                alt="NEXUS detail two"
              />

              <ProjectImage
                src="detail-03.png"
                alt="NEXUS detail three"
              />

            </div>

            <ProjectImage
              src="brand-guidelines.png"
              alt="NEXUS brand guidelines"
              className="nexus-medium-image"
            />

          </div>
        </section>


        {/* =====================================================
            PRESENTATION
        ===================================================== */}

        <section className="nexus-section nexus-light">
          <div className="nexus-container">

            <div className="nexus-section-head">
              <span>09 / PRESENTATION</span>
              <span>NEXUS SYSTEM</span>
            </div>

            <ProjectImage
              src="presentation.png"
              alt="NEXUS presentation"
              className="nexus-presentation"
            />

            <ProjectImage
              src="app-icon.png"
              alt="NEXUS app icon"
              className="nexus-icon"
            />

          </div>
        </section>


        {/* =====================================================
            FINAL STATEMENT
        ===================================================== */}

        <section className="nexus-final">

          <div className="nexus-container">

            <motion.div
              className="nexus-final-copy"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
            >
              <span>NEXUS</span>

              <h2>
                AUTOMATE.
                <br />
                INTELLIGENTLY.
              </h2>

              <p>
                An AI automation experience designed to turn
                complex systems into simple, actionable intelligence.
              </p>
            </motion.div>

          </div>

        </section>


        {/* =====================================================
            NEXT PROJECT
        ===================================================== */}

        <section className="nexus-next">

          <Link
            href="/work/project-06"
            className="nexus-next-link"
          >
            <span>NEXT PROJECT</span>

            <h2>
              VANTA
              <small>06</small>
              <b>↗</b>
            </h2>

            <p>DIGITAL EXPERIENCE</p>
          </Link>

        </section>

      </main>
    </>
  );
}