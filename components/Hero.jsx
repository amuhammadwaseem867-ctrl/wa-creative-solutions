"use client";

import { motion } from "framer-motion";
import "./Hero.css";

const services = [
  "BRAND IDENTITY",
  "WEB DESIGN",
  "WEB DEVELOPMENT",
  "UI / UX DESIGN",
  "CREATIVE DIRECTION",
  "MOTION DESIGN",
  "DIGITAL EXPERIENCES",
];

export default function Hero() {
  return (
    <section className="hero" id="hero">

      {/* BACKGROUND GRID */}
      <div className="hero-grid"></div>

      {/* ANIMATED FRAME LINES */}
      <div className="hero-frame hero-frame-one"></div>
      <div className="hero-frame hero-frame-two"></div>
      <div className="hero-frame hero-frame-three"></div>

      <div className="hero-line hero-line-one"></div>
      <div className="hero-line hero-line-two"></div>


      {/* HERO CONTAINER */}
      <div className="hero-container">

        {/* TOP LINE */}
        <motion.div
          className="hero-topline"
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <span>WA CREATIVE SOLUTIONS</span>

          <span>
            CREATIVE TECHNOLOGY STUDIO
          </span>
        </motion.div>


        {/* HERO CONTENT */}
        <motion.div
          className="hero-content"
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.9,
            ease: [0.22, 1, 0.36, 1],
          }}
        >

          <div className="hero-label">

            <span className="hero-dot"></span>

            <span>
              BRAND / DIGITAL / EXPERIENCE
            </span>

          </div>


          {/* MAIN STATEMENT */}
          <h1 className="hero-title">

            <span>DESIGNING</span>

            <span className="hero-stroke-word">
              BRANDS.
            </span>

            <span>BUILDING</span>

            <span className="hero-stroke-word">
              EXPERIENCES.
            </span>

          </h1>


          {/* BOTTOM CONTENT */}
          <div className="hero-bottom">

            <p className="hero-description">
              WE CREATE DISTINCTIVE IDENTITIES,
              DIGITAL EXPERIENCES AND TECHNOLOGY
              THAT MOVE BUSINESSES FORWARD.
            </p>


            <div className="hero-actions">

              <a
                href="#work"
                className="hero-primary"
              >
                <span>VIEW OUR WORK</span>

                <span className="hero-arrow">
                  ↗
                </span>
              </a>

              <a
                href="#contact"
                className="hero-secondary"
              >
                START A PROJECT
              </a>

            </div>

          </div>

        </motion.div>


        {/* SCROLL */}
        <div className="hero-scroll">

          <span className="hero-scroll-line"></span>

          <span>
            SCROLL TO EXPLORE
          </span>

        </div>

      </div>


      {/* SERVICES COLUMN RAIL */}
      <div className="hero-marquee">

        <div className="marquee-label">

          <span className="marquee-label-dot"></span>

          <span>SERVICES</span>

        </div>


        <div className="marquee-window">

          <div className="marquee-track">

            {/* FIRST SET */}
            <div className="marquee-group">

              {services.map((service, index) => (
                <div
                  className="marquee-column"
                  key={`first-${index}`}
                >

                  <span className="marquee-number">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <span className="marquee-service">
                    {service}
                  </span>

                  <span className="marquee-cross">
                    +
                  </span>

                </div>
              ))}

            </div>


            {/* DUPLICATE SET */}
            <div
              className="marquee-group"
              aria-hidden="true"
            >

              {services.map((service, index) => (
                <div
                  className="marquee-column"
                  key={`second-${index}`}
                >

                  <span className="marquee-number">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <span className="marquee-service">
                    {service}
                  </span>

                  <span className="marquee-cross">
                    +
                  </span>

                </div>
              ))}

            </div>

          </div>

        </div>


        {/* RIGHT END */}
        <div className="marquee-end">

          <span>WA</span>

          <span>↗</span>

        </div>

      </div>

    </section>
  );
}