"use client";

import { motion } from "framer-motion";
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

export default function About() {
  return (
    <section className="about" id="about">

      {/* BACKGROUND */}
      <div className="about-grid"></div>

      <div className="about-orbit about-orbit-one"></div>
      <div className="about-orbit about-orbit-two"></div>


      <div className="about-container">

        {/* TOP HEADER */}
        <motion.div
          className="about-header"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="about-index">
            <span className="about-dot"></span>
            <span>01 / ABOUT</span>
          </div>

          <span className="about-header-right">
            WA CREATIVE SOLUTIONS
          </span>
        </motion.div>


        {/* MAIN AREA */}
        <div className="about-main">

          {/* LEFT CONTENT */}
          <motion.div
            className="about-content"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
            }}
          >

            <span className="about-kicker">
              WHO WE ARE
            </span>


            <h2 className="about-title">
              WE MAKE
              <br />

              <span className="about-stroke">
                IDEAS
              </span>

              <br />

              <span className="about-lime">
                MATTER.
              </span>
            </h2>


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


            <a
              href="#contact"
              className="about-link"
            >
              <span>LET'S BUILD SOMETHING</span>

              <span className="about-link-arrow">
                ↗
              </span>
            </a>

          </motion.div>


          {/* 3D VISUAL */}
          <motion.div
            className="about-visual"
            initial={{
              opacity: 0,
              scale: 0.9,
            }}
            whileInView={{
              opacity: 1,
              scale: 1,
            }}
            viewport={{ once: true }}
            transition={{
              duration: 1,
              ease: [0.22, 1, 0.36, 1],
            }}
          >

            <div className="about-visual-frame">

              <div className="about-visual-label">
                <span>CREATIVE ENGINE</span>
                <span>03D / 01</span>
              </div>


              {/* 3D OBJECT PLACEHOLDER */}
              <div className="about-3d">

                <div className="about-3d-ring ring-one"></div>
                <div className="about-3d-ring ring-two"></div>
                <div className="about-3d-ring ring-three"></div>

                <div className="about-3d-core">
                  WA
                </div>

                <div className="about-3d-cross cross-one">
                  +
                </div>

                <div className="about-3d-cross cross-two">
                  +
                </div>

              </div>


              <div className="about-visual-bottom">

                <span>
                  DESIGN / MOTION / CODE
                </span>

                <span>
                  2026
                </span>

              </div>

            </div>

          </motion.div>

        </div>


        {/* STATS */}
        <motion.div
          className="about-stats"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.7,
            delay: 0.15,
          }}
        >

          {stats.map((stat, index) => (

            <div
              className="about-stat"
              key={stat.label}
            >

              <span className="about-stat-index">
                {String(index + 1).padStart(2, "0")}
              </span>

              <strong>
                {stat.number}
              </strong>

              <span>
                {stat.label}
              </span>

            </div>

          ))}


          <div className="about-stat about-location">

            <span className="about-stat-index">
              04
            </span>

            <strong>
              GLOBAL
            </strong>

            <span>
              WORKING WORLDWIDE
            </span>

          </div>

        </motion.div>

      </div>

    </section>
  );
}