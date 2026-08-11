"use client";

import { motion } from "framer-motion";
import "./Services.css";

const services = [
  {
    number: "01",
    title: "BRAND IDENTITY",
    description:
      "STRATEGY, POSITIONING, VISUAL SYSTEMS AND DISTINCTIVE IDENTITIES THAT MAKE BRANDS RECOGNIZABLE.",
    tag: "IDENTITY",
  },
  {
    number: "02",
    title: "WEB DESIGN",
    description:
      "PREMIUM DIGITAL INTERFACES BUILT AROUND CLARITY, CONVERSION AND STRONG VISUAL DIRECTION.",
    tag: "DIGITAL",
  },
  {
    number: "03",
    title: "WEB DEVELOPMENT",
    description:
      "FAST, RESPONSIVE AND SCALABLE DIGITAL EXPERIENCES BUILT WITH MODERN TECHNOLOGY.",
    tag: "TECHNOLOGY",
  },
  {
    number: "04",
    title: "UI / UX DESIGN",
    description:
      "INTUITIVE PRODUCT EXPERIENCES THAT CONNECT BUSINESS GOALS WITH HUMAN BEHAVIOR.",
    tag: "EXPERIENCE",
  },
  {
    number: "05",
    title: "MOTION DESIGN",
    description:
      "MOTION SYSTEMS, MICRO-INTERACTIONS AND ANIMATIONS THAT GIVE DIGITAL EXPERIENCES ENERGY.",
    tag: "MOTION",
  },
  {
    number: "06",
    title: "CREATIVE DIRECTION",
    description:
      "A CLEAR CREATIVE VISION THAT BRINGS BRAND, DESIGN, CONTENT AND DIGITAL TOGETHER.",
    tag: "DIRECTION",
  },
  {
    number: "07",
    title: "DIGITAL EXPERIENCES",
    description:
      "IMMERSIVE DIGITAL WORLDS DESIGNED TO CREATE MEMORABLE CONNECTIONS BETWEEN PEOPLE AND BRANDS.",
    tag: "EXPERIENCE",
  },
];

export default function Services() {
  return (
    <section
      className="services"
      id="services"
    >

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
              07 SERVICES
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
            FROM BRAND STRATEGY TO DIGITAL
            EXPERIENCES, WE CONNECT DESIGN,
            TECHNOLOGY AND MOTION TO CREATE
            WORK THAT PEOPLE REMEMBER.
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
            STRATEGY / DESIGN / TECHNOLOGY
          </span>

          <span>
            LET'S CREATE SOMETHING DIFFERENT
          </span>

          <a href="#contact">
            START A PROJECT ↗
          </a>

        </motion.div>

      </div>

    </section>
  );
}