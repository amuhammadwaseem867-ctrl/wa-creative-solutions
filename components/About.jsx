"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { useRef } from "react";
import "./About.css";

const stats = [
  {
    number: "04+",
    label: "YEARS EXPERIENCE",
  },
  {
    number: "40+",
    label: "PROJECTS DELIVERED",
  },
  {
    number: "12+",
    label: "BRANDS BUILT",
  },
];

const ease = [0.22, 1, 0.36, 1];

export default function About() {
  const visualRef = useRef(null);

  /* -----------------------------------------
     MOUSE SYSTEM
  ----------------------------------------- */

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, {
    stiffness: 70,
    damping: 20,
    mass: 0.7,
  });

  const smoothY = useSpring(mouseY, {
    stiffness: 70,
    damping: 20,
    mass: 0.7,
  });

  const rotateX = useTransform(
    smoothY,
    [-0.5, 0.5],
    [6, -6]
  );

  const rotateY = useTransform(
    smoothX,
    [-0.5, 0.5],
    [-6, 6]
  );

  const orbX = useTransform(
    smoothX,
    [-0.5, 0.5],
    [-10, 10]
  );

  const orbY = useTransform(
    smoothY,
    [-0.5, 0.5],
    [-10, 10]
  );

  const handleMouseMove = (event) => {
    if (!visualRef.current) return;

    const rect =
      visualRef.current.getBoundingClientRect();

    mouseX.set(
      (event.clientX - rect.left) /
        rect.width -
        0.5
    );

    mouseY.set(
      (event.clientY - rect.top) /
        rect.height -
        0.5
    );
  };

  const resetMouse = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section
      className="about"
      id="about"
    >

      {/* =========================================
          ATMOSPHERE
      ========================================= */}

      <div className="about-grid" />
      <div className="about-noise" />

      <div className="about-glow about-glow-one" />
      <div className="about-glow about-glow-two" />

      <div className="about-orbit about-orbit-one" />
      <div className="about-orbit about-orbit-two" />
      <div className="about-orbit about-orbit-three" />


      {/* =========================================
          CONTAINER
      ========================================= */}

      <div className="about-container">


        {/* =======================================
            HEADER
        ======================================= */}

        <motion.header
          className="about-header"
          initial={{
            opacity: 0,
            y: 20,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.4,
          }}
          transition={{
            duration: 0.75,
            ease,
          }}
        >

          <div className="about-index">
            <span className="about-dot" />
            <span>01 / ABOUT</span>
          </div>

          <div className="about-meta">
            <span>
              WA CREATIVE SOLUTIONS
            </span>

            <i />

            <span>EST. 2022</span>
          </div>

        </motion.header>


        {/* =======================================
            MAIN
        ======================================= */}

        <div className="about-main">


          {/* =====================================
              CONTENT
          ===================================== */}

          <motion.div
            className="about-content"
            initial={{
              opacity: 0,
              x: -40,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
              amount: 0.22,
            }}
            transition={{
              duration: 0.9,
              ease,
            }}
          >

            <span className="about-kicker">
              WHO WE ARE
            </span>


            <h2 className="about-title">

              <span className="title-solid">
                WE MAKE
              </span>

              <span className="title-outline">
                IDEAS
              </span>

              <span className="title-lime">
                MATTER.
              </span>

            </h2>


            <div
              className="about-title-accent"
              aria-hidden="true"
            >
              <span />
              <span />
              <span />
            </div>


            <div className="about-copy">

              <p>
                WA CREATIVE SOLUTIONS IS A CREATIVE
                TECHNOLOGY STUDIO BUILDING DISTINCTIVE
                BRANDS, DIGITAL PRODUCTS AND EXPERIENCES
                FOR BUSINESSES READY TO MOVE FORWARD.
              </p>

              <p>
                WE BRING STRATEGY, DESIGN AND TECHNOLOGY
                TOGETHER TO TURN COMPLEX IDEAS INTO
                SIMPLE, MEMORABLE EXPERIENCES.
              </p>

            </div>


            {/* CTA — NO ARROW */}

            <a
              href="#contact"
              className="about-link"
            >
              <span>
                LET&apos;S BUILD SOMETHING
              </span>

              <span className="about-link-line" />
            </a>

          </motion.div>


          {/* =====================================
              VISUAL
          ===================================== */}

          <motion.div
            ref={visualRef}
            className="about-visual"
            onMouseMove={handleMouseMove}
            onMouseLeave={resetMouse}
            initial={{
              opacity: 0,
              scale: 0.92,
              y: 25,
            }}
            whileInView={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.2,
            }}
            transition={{
              duration: 1,
              ease,
            }}
          >

            <motion.div
              className="about-visual-frame"
              style={{
                rotateX,
                rotateY,
              }}
            >

              {/* CORNERS */}

              <span className="corner corner-tl" />
              <span className="corner corner-tr" />
              <span className="corner corner-bl" />
              <span className="corner corner-br" />


              {/* TOP LABEL */}

              <div className="about-visual-label">

                <span className="visual-label-left">
                  <i className="live-dot" />
                  CREATIVE ENGINE
                </span>

                <span>
                  03D / 01
                </span>

              </div>


              {/* =================================
                  3D SYSTEM
              ================================= */}

              <div className="about-3d">

                <div className="orb-glow" />


                <motion.div
                  className="about-ring ring-one"
                  style={{
                    x: orbX,
                    y: orbY,
                  }}
                />

                <motion.div
                  className="about-ring ring-two"
                  style={{
                    x: orbX,
                    y: orbY,
                  }}
                />

                <motion.div
                  className="about-ring ring-three"
                  style={{
                    x: orbX,
                    y: orbY,
                  }}
                />


                {/* PARTICLES */}

                <div
                  className="orb-particles"
                  aria-hidden="true"
                >
                  <span />
                  <span />
                  <span />
                  <span />
                  <span />
                  <span />
                </div>


                {/* CORE */}

                <motion.div
                  className="about-core"
                  style={{
                    x: orbX,
                    y: orbY,
                  }}
                >
                  <div className="core-glow" />

                  <div className="core-shape">
                    <span>WA</span>
                  </div>
                </motion.div>


                {/* PLUS MARKS */}

                <span className="about-cross cross-one">
                  +
                </span>

                <span className="about-cross cross-two">
                  +
                </span>

                <span className="about-cross cross-three">
                  +
                </span>

              </div>


              {/* SIDE LABELS */}

              <div className="visual-side-label side-left">
                <span>01</span>
                <span>DESIGN</span>
              </div>

              <div className="visual-side-label side-right">
                <span>02</span>
                <span>MOTION</span>
              </div>


              {/* BOTTOM LABEL */}

              <div className="about-visual-bottom">

                <span>
                  DESIGN / MOTION / CODE
                </span>

                <span>
                  2026
                </span>

              </div>

            </motion.div>

          </motion.div>

        </div>


        {/* =======================================
            STATS
        ======================================= */}

        <motion.div
          className="about-stats"
          initial={{
            opacity: 0,
            y: 25,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.18,
          }}
          transition={{
            duration: 0.8,
            delay: 0.08,
            ease,
          }}
        >

          {stats.map(
            (stat, index) => (
              <div
                className="about-stat"
                key={stat.label}
              >

                <span className="about-stat-index">
                  {String(index + 1).padStart(
                    2,
                    "0"
                  )}
                </span>

                <strong>
                  {stat.number}
                </strong>

                <span>
                  {stat.label}
                </span>

                <span
                  className="stat-line"
                  aria-hidden="true"
                />

              </div>
            )
          )}


          {/* GLOBAL */}

          <div className="about-stat">

            <span className="about-stat-index">
              04
            </span>

            <strong>
              GLOBAL
            </strong>

            <span>
              WORKING WORLDWIDE
            </span>

            <span
              className="global-pulse"
              aria-hidden="true"
            />

            <span
              className="stat-line"
              aria-hidden="true"
            />

          </div>

        </motion.div>

      </div>

    </section>
  );
}