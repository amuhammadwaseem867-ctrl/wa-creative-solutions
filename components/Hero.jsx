"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import "./Hero.css";

const services = [
  "BRANDING & IDENTITY",
  "LOGO DESIGN",
  "GRAPHIC DESIGN",
  "UI / UX DESIGN",
  "WEBSITE DESIGN",
  "WEBSITE DEVELOPMENT",
  "NEXT.JS DEVELOPMENT",
  "RESPONSIVE WEBSITES",
  "VIDEO EDITING",
  "DIGITAL EXPERIENCES",
];

const easing = [0.22, 1, 0.36, 1];

export default function Hero() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, {
    stiffness: 55,
    damping: 22,
    mass: 0.7,
  });

  const springY = useSpring(mouseY, {
    stiffness: 55,
    damping: 22,
    mass: 0.7,
  });

  /* ---------------------------------------------
     PARALLAX
  --------------------------------------------- */

  const frameX = useTransform(
    springX,
    [-0.5, 0.5],
    [-15, 15]
  );

  const frameY = useTransform(
    springY,
    [-0.5, 0.5],
    [-11, 11]
  );

  const frameRotateX = useTransform(
    springY,
    [-0.5, 0.5],
    [4, -4]
  );

  const frameRotateY = useTransform(
    springX,
    [-0.5, 0.5],
    [-5, 5]
  );

  const frameMediumX = useTransform(
    frameX,
    (value) => value * 1.3
  );

  const frameMediumY = useTransform(
    frameY,
    (value) => value * 1.2
  );

  const frameSmallX = useTransform(
    frameX,
    (value) => value * 1.7
  );

  const frameSmallY = useTransform(
    frameY,
    (value) => value * 1.55
  );

  const handleMouseMove = (event) => {
    const x =
      event.clientX / window.innerWidth - 0.5;

    const y =
      event.clientY / window.innerHeight - 0.5;

    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section
      className="hero"
      id="hero"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >

      {/* =================================================
          ATMOSPHERE
      ================================================= */}

      <div
        className="hero-glow hero-glow-main"
        aria-hidden="true"
      />

      <div
        className="hero-glow hero-glow-secondary"
        aria-hidden="true"
      />

      <div
        className="hero-noise"
        aria-hidden="true"
      />

      <div
        className="hero-grid"
        aria-hidden="true"
      />


      {/* =================================================
          ARCHITECTURAL VISUAL SYSTEM
      ================================================= */}

      <motion.div
        className="hero-frame hero-frame-large"
        aria-hidden="true"
        style={{
          x: frameX,
          y: frameY,
          rotateX: frameRotateX,
          rotateY: frameRotateY,
        }}
      />

      <motion.div
        className="hero-frame hero-frame-medium"
        aria-hidden="true"
        style={{
          x: frameMediumX,
          y: frameMediumY,
        }}
      />

      <motion.div
        className="hero-frame hero-frame-small"
        aria-hidden="true"
        style={{
          x: frameSmallX,
          y: frameSmallY,
        }}
      />

      <span
        className="hero-line hero-line-one"
        aria-hidden="true"
      />

      <span
        className="hero-line hero-line-two"
        aria-hidden="true"
      />

      <span
        className="hero-line hero-line-three"
        aria-hidden="true"
      />


      {/* =================================================
          MAIN CONTAINER
      ================================================= */}

      <div className="hero-container">


        {/* =================================================
            TOP BAR
        ================================================= */}

        <motion.header
          className="hero-topline"
          initial={{
            opacity: 0,
            y: -14,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.75,
            ease: easing,
          }}
        >

          <div className="hero-brand">
            <span
              className="hero-live-dot"
              aria-hidden="true"
            />

            <span>
              WA CREATIVE SOLUTIONS
            </span>
          </div>


          <div className="hero-top-meta">

            <span>
              CREATIVE TECHNOLOGY STUDIO
            </span>

            <i aria-hidden="true" />

            <span>
              2026
            </span>

          </div>

        </motion.header>


        {/* =================================================
            HERO CONTENT
        ================================================= */}

        <div className="hero-content">


          {/* LABEL */}

          <motion.div
            className="hero-label"
            initial={{
              opacity: 0,
              y: 15,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.7,
              delay: 0.12,
              ease: easing,
            }}
          >

            <span
              className="hero-label-bar"
              aria-hidden="true"
            />

            <span>
              BRAND / DIGITAL / EXPERIENCE
            </span>

          </motion.div>


          {/* =================================================
              MAIN MESSAGE
          ================================================= */}

          <motion.h1
            className="hero-title"
            initial="hidden"
            animate="show"
          >

            <motion.span
              className="
                hero-title-line
                hero-title-solid
              "
              variants={{
                hidden: {
                  opacity: 0,
                  y: 70,
                },

                show: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.85,
                    ease: easing,
                  },
                },
              }}
            >
              DESIGNING
            </motion.span>


            <motion.span
              className="
                hero-title-line
                hero-title-outline
              "
              variants={{
                hidden: {
                  opacity: 0,
                  y: 75,
                },

                show: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.9,
                    delay: 0.07,
                    ease: easing,
                  },
                },
              }}
            >
              BRANDS.
            </motion.span>


            <motion.span
              className="
                hero-title-line
                hero-title-solid
              "
              variants={{
                hidden: {
                  opacity: 0,
                  y: 80,
                },

                show: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.95,
                    delay: 0.14,
                    ease: easing,
                  },
                },
              }}
            >
              BUILDING
            </motion.span>


            <motion.span
              className="
                hero-title-line
                hero-title-lime
              "
              variants={{
                hidden: {
                  opacity: 0,
                  y: 85,
                },

                show: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 1,
                    delay: 0.21,
                    ease: easing,
                  },
                },
              }}
            >
              EXPERIENCES.
            </motion.span>

          </motion.h1>


          {/* =================================================
              TITLE ACCENT
          ================================================= */}

          <motion.div
            className="hero-title-accent"
            initial={{
              opacity: 0,
              scaleX: 0,
            }}
            animate={{
              opacity: 1,
              scaleX: 1,
            }}
            transition={{
              duration: 0.8,
              delay: 0.68,
              ease: easing,
            }}
          >
            <span className="hero-title-accent-long" />
            <span />
            <span />
            <span />
          </motion.div>


          {/* =================================================
              LOWER INFORMATION
          ================================================= */}

          <motion.div
            className="hero-bottom"
            initial={{
              opacity: 0,
              y: 24,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.8,
              delay: 0.57,
              ease: easing,
            }}
          >

            <div className="hero-description-block">

              <span className="hero-description-index">
                01 — INTRODUCTION
              </span>

              <p>
                WE CREATE DISTINCTIVE IDENTITIES,
                DIGITAL EXPERIENCES AND TECHNOLOGY
                THAT MOVE BUSINESSES FORWARD.
              </p>

            </div>


            <a
              href="#work"
              className="hero-work-link"
            >
              <span>
                VIEW OUR WORK
              </span>

              <span
                className="hero-work-line"
                aria-hidden="true"
              />
            </a>

          </motion.div>

        </div>


        {/* =================================================
            SIDE INDEX
        ================================================= */}

        <div
          className="hero-index"
          aria-hidden="true"
        >
          <span>00</span>

          <b />

          <span>01</span>
        </div>


        {/* =================================================
            SCROLL INDICATOR
        ================================================= */}

        <motion.div
          className="hero-scroll"
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            duration: 0.7,
            delay: 1.15,
          }}
        >

          <span>
            SCROLL TO EXPLORE
          </span>

          <div
            className="hero-scroll-track"
            aria-hidden="true"
          >
            <span />
          </div>

        </motion.div>

      </div>


      {/* =================================================
          SERVICES RAIL
      ================================================= */}

      <div className="hero-marquee">

        <div className="marquee-label">

          <span
            className="marquee-label-dot"
            aria-hidden="true"
          />

          <span>
            SERVICES
          </span>

        </div>


        <div className="marquee-window">

          <div className="marquee-track">

            {[0, 1].map((group) => (
              <div
                className="marquee-group"
                key={group}
                aria-hidden={group === 1}
              >

                {services.map(
                  (service, index) => (
                    <div
                      className="marquee-item"
                      key={`${group}-${index}`}
                    >

                      <span className="marquee-number">
                        {String(
                          index + 1
                        ).padStart(2, "0")}
                      </span>

                      <span className="marquee-service">
                        {service}
                      </span>

                      <span
                        className="marquee-plus"
                        aria-hidden="true"
                      >
                        +
                      </span>

                    </div>
                  )
                )}

              </div>
            ))}

          </div>

        </div>


        <div className="marquee-end">

          <span>
            WA
          </span>

          <i aria-hidden="true" />

        </div>

      </div>

    </section>
  );
}