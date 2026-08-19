"use client";

import { motion } from "framer-motion";
import "./Services.css";

const services = [
  {
    number: "01",
    title: "BRANDING & IDENTITY",
    description:
      "STRATEGIC BRAND SYSTEMS, VISUAL IDENTITIES AND CREATIVE DIRECTIONS THAT MAKE BUSINESSES RECOGNIZABLE.",
    tag: "BRANDING",
  },
  {
    number: "02",
    title: "LOGO DESIGN",
    description:
      "DISTINCTIVE AND MEMORABLE LOGOS DESIGNED TO GIVE YOUR BRAND A STRONG AND PROFESSIONAL VISUAL PRESENCE.",
    tag: "IDENTITY",
  },
  {
    number: "03",
    title: "GRAPHIC DESIGN",
    description:
      "CREATIVE VISUALS, MARKETING MATERIALS AND DIGITAL ASSETS DESIGNED TO COMMUNICATE YOUR BRAND CLEARLY.",
    tag: "DESIGN",
  },
  {
    number: "04",
    title: "UI/UX DESIGN",
    description:
      "INTUITIVE AND MODERN INTERFACES DESIGNED AROUND USER NEEDS, BUSINESS GOALS AND SEAMLESS EXPERIENCES.",
    tag: "EXPERIENCE",
  },
  {
    number: "05",
    title: "WEBSITE DESIGN",
    description:
      "PREMIUM WEBSITE INTERFACES THAT COMBINE STRONG VISUAL DIRECTION, CLARITY, USABILITY AND CONVERSION.",
    tag: "WEB DESIGN",
  },
  {
    number: "06",
    title: "WEBSITE DEVELOPMENT",
    description:
      "FAST, RESPONSIVE AND SCALABLE WEBSITES BUILT WITH MODERN TECHNOLOGY FOR RELIABLE DIGITAL EXPERIENCES.",
    tag: "DEVELOPMENT",
  },
  {
    number: "07",
    title: "NEXT.JS DEVELOPMENT",
    description:
      "HIGH-PERFORMANCE NEXT.JS WEBSITES BUILT FOR SPEED, SCALABILITY, SEO AND MODERN DIGITAL PRODUCTS.",
    tag: "NEXT.JS",
  },
  {
    number: "08",
    title: "RESPONSIVE WEBSITES",
    description:
      "WEBSITES THAT ADAPT BEAUTIFULLY ACROSS DESKTOP, TABLET AND MOBILE DEVICES FOR A CONSISTENT USER EXPERIENCE.",
    tag: "RESPONSIVE",
  },
  {
    number: "09",
    title: "VIDEO EDITING",
    description:
      "ENGAGING VIDEO CONTENT EDITED WITH STRONG PACING, VISUAL STORYTELLING, MOTION AND PROFESSIONAL FINISHING.",
    tag: "VIDEO",
  },
  {
    number: "10",
    title: "DIGITAL EXPERIENCES",
    description:
      "IMMERSIVE DIGITAL EXPERIENCES THAT CONNECT DESIGN, TECHNOLOGY AND INTERACTION TO CREATE MEMORABLE BRANDS.",
    tag: "DIGITAL",
  },
];

const ease = [0.22, 1, 0.36, 1];

export default function Services() {
  return (
    <section className="services" id="services">
      {/* BACKGROUND */}
      <div className="services-grid" />

      <div className="services-glow services-glow-one" />
      <div className="services-glow services-glow-two" />

      <div className="services-orbit" />

      <div className="services-container">
        {/* HEADER */}
        <motion.header
          className="services-header"
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
            amount: 0.35,
          }}
          transition={{
            duration: 0.75,
            ease,
          }}
        >
          <div className="services-index">
            <span className="services-dot" />
            <span>02 / SERVICES</span>
          </div>

          <div className="services-header-info">
            <span>WHAT WE DO</span>
            <i />
            <span>10 SERVICES</span>
          </div>
        </motion.header>

        {/* INTRO */}
        <motion.div
          className="services-intro"
          initial={{
            opacity: 0,
            y: 30,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.25,
          }}
          transition={{
            duration: 0.9,
            ease,
          }}
        >
          <div className="services-title-wrap">
            <span className="services-kicker">
              OUR CAPABILITIES
            </span>

            <h2 className="services-title">
              <span>WE BUILD</span>

              <span>WHAT</span>

              <span className="services-outline">
                MATTERS.
              </span>
            </h2>

            <div
              className="services-title-accent"
              aria-hidden="true"
            >
              <span />
              <span />
              <span />
            </div>
          </div>

          <p className="services-intro-copy">
            FROM BRANDING AND VISUAL DESIGN TO
            HIGH-PERFORMANCE WEBSITES AND DIGITAL
            EXPERIENCES, WE CONNECT CREATIVITY,
            TECHNOLOGY AND STRATEGY TO BUILD WORK
            THAT MATTERS.
          </p>
        </motion.div>

        {/* SERVICES */}
        <div className="services-list">
          {services.map((service, index) => (
            <motion.a
              href="#contact"
              className="service-item"
              key={service.number}
              initial={{
                opacity: 0,
                y: 24,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
                amount: 0.1,
              }}
              transition={{
                duration: 0.55,
                delay: Math.min(index * 0.045, 0.4),
                ease,
              }}
            >
              {/* NUMBER */}
              <div className="service-number">
                {service.number}
              </div>

              {/* MAIN */}
              <div className="service-main">
                <div className="service-title-row">
                  <h3>{service.title}</h3>

                  <span
                    className="service-mobile-mark"
                    aria-hidden="true"
                  >
                    +
                  </span>
                </div>

                <p>{service.description}</p>
              </div>

              {/* TAG */}
              <div className="service-tag">
                {service.tag}
              </div>

              {/* STATUS */}
              <div
                className="service-status"
                aria-hidden="true"
              >
                <span />
              </div>

              {/* HOVER LINE */}
              <span
                className="service-hover-line"
                aria-hidden="true"
              />
            </motion.a>
          ))}
        </div>

        {/* FOOTER */}
        <motion.footer
          className="services-footer"
          initial={{
            opacity: 0,
          }}
          whileInView={{
            opacity: 1,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.7,
            delay: 0.1,
          }}
        >
          <span>
            BRANDING / DESIGN / DEVELOPMENT
          </span>

          <span>
            LET&apos;S CREATE SOMETHING DIFFERENT
          </span>

          <a href="#contact">
            START A PROJECT
            <span className="services-footer-line" />
          </a>
        </motion.footer>
      </div>
    </section>
  );
}