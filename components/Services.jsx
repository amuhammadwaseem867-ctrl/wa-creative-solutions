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

export default function Services() {
  return (
    <section className="services" id="services">

      {/* BACKGROUND */}
      <div className="services-grid"></div>

      <div className="services-container">

        {/* HEADER */}
        <motion.div
          className="services-header"
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
          }}
          transition={{
            duration: 0.7,
          }}
        >
          <div className="services-index">
            <span className="services-dot"></span>

            <span>
              02 / SERVICES
            </span>
          </div>

          <div className="services-header-info">
            <span>
              WHAT WE DO
            </span>

            <span>
              10 SERVICES
            </span>
          </div>
        </motion.div>

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
          }}
          transition={{
            duration: 0.8,
          }}
        >
          <h2>
            WE BUILD
            <span>WHAT</span>
            <span className="services-outline">
              MATTERS.
            </span>
          </h2>

          <p>
            FROM BRANDING AND VISUAL DESIGN TO
            HIGH-PERFORMANCE WEBSITES AND DIGITAL
            EXPERIENCES, WE CONNECT CREATIVITY,
            TECHNOLOGY AND STRATEGY TO BUILD WORK
            THAT MATTERS.
          </p>
        </motion.div>

        {/* SERVICES LIST */}
        <div className="services-list">

          {services.map((service, index) => (
            <motion.a
              href="#contact"
              className="service-item"
              key={service.number}
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
              }}
              transition={{
                duration: 0.6,
                delay: index * 0.06,
              }}
            >

              {/* NUMBER */}
              <div className="service-number">
                {service.number}
              </div>

              {/* MAIN TITLE */}
              <div className="service-main">

                <h3>
                  {service.title}
                </h3>

                <p>
                  {service.description}
                </p>

              </div>

              {/* TAG */}
              <div className="service-tag">
                {service.tag}
              </div>

              {/* ARROW */}
              <div className="service-arrow">
                ↗
              </div>

              {/* HOVER LINE */}
              <div className="service-hover-line"></div>

            </motion.a>
          ))}

        </div>

        {/* FOOTER */}
        <motion.div
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
          }}
        >
          <span>
            BRANDING / DESIGN / DEVELOPMENT
          </span>

          <span>
            LET&apos;S CREATE SOMETHING DIFFERENT
          </span>

          <a href="#contact">
            START A PROJECT ↗
          </a>
        </motion.div>

      </div>
    </section>
  );
}