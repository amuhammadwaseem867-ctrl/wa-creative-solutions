"use client";

import { motion } from "framer-motion";
import "./Contact.css";

const contactDetails = [
  {
    label: "PHONE",
    value: "0311 5962551",
    href: "tel:+923115962551",
  },
  {
    label: "PHONE",
    value: "0346 5187384",
    href: "tel:+923465187384",
  },
  {
    label: "EMAIL",
    value: "wacreativestudio@gmail.com",
    href: "mailto:wacreativestudio@gmail.com",
  },
  {
    label: "LOCATION",
    value: "Rawalpindi, Pakistan",
    href: "#",
  },
];

const services = [
  "BRAND IDENTITY",
  "WEB DESIGN",
  "WEB DEVELOPMENT",
  "UI / UX",
  "MOTION DESIGN",
  "DIGITAL MARKETING",
];

const ease = [0.22, 1, 0.36, 1];

export default function Contact() {
  return (
    <section className="contact" id="contact">

      {/* BACKGROUND */}
      <div className="contact__grid-bg" />
      <div className="contact__glow contact__glow-one" />
      <div className="contact__glow contact__glow-two" />
      <div className="contact__orbit" />

      <div className="contact__container">

        {/* =================================================
            HEADER
        ================================================= */}

        <motion.header
          className="contact__header"
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
          <div className="contact__eyebrow">
            <span className="contact__eyebrow-dot" />
            <span>05 / CONTACT</span>
          </div>

          <div className="contact__header-meta">
            <span>LET&apos;S TALK</span>
            <i />
            <span>2026</span>
          </div>
        </motion.header>


        {/* =================================================
            HERO
        ================================================= */}

        <div className="contact__hero">

          <motion.div
            className="contact__hero-main"
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
              amount: 0.2,
            }}
            transition={{
              duration: 0.95,
              ease,
            }}
          >
            <span className="contact__kicker">
              GET IN TOUCH
            </span>

            <h2>
              LET&apos;S CREATE
              <span>SOMETHING</span>
              <span className="contact__outline">
                REMARKABLE.
              </span>
            </h2>

            <div
              className="contact__title-accent"
              aria-hidden="true"
            >
              <span />
              <span />
              <span />
            </div>
          </motion.div>


          <motion.div
            className="contact__hero-side"
            initial={{
              opacity: 0,
              x: 30,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
              amount: 0.25,
            }}
            transition={{
              duration: 0.8,
              delay: 0.12,
              ease,
            }}
          >
            <span className="contact__hero-side-index">
              01 / CONTACT
            </span>

            <p>
              HAVE A PROJECT, IDEA OR OPPORTUNITY IN MIND?
              TELL US WHAT YOU&apos;RE BUILDING AND LET&apos;S
              TURN IT INTO SOMETHING PEOPLE REMEMBER.
            </p>

            <span className="contact__hero-side-line" />
          </motion.div>

        </div>


        {/* DIVIDER */}

        <motion.div
          className="contact__divider"
          initial={{
            scaleX: 0,
          }}
          whileInView={{
            scaleX: 1,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.9,
            ease,
          }}
        />


        {/* =================================================
            MAIN CONTENT
        ================================================= */}

        <div className="contact__grid">

          {/* LEFT */}

          <motion.div
            className="contact__info"
            initial={{
              opacity: 0,
              x: -30,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
              amount: 0.2,
            }}
            transition={{
              duration: 0.8,
              ease,
            }}
          >

            <div className="contact__info-intro">

              <span className="contact__info-label">
                CONTACT DETAILS
              </span>

              <p>
                LET&apos;S START A CONVERSATION ABOUT
                YOUR NEXT DIGITAL EXPERIENCE, BRAND
                OR CREATIVE PROJECT.
              </p>

            </div>


            <div className="contact__details">

              {contactDetails.map(
                (item, index) => (
                  <motion.a
                    key={`${item.label}-${index}`}
                    href={item.href}
                    className="contact__detail"
                    initial={{
                      opacity: 0,
                      y: 16,
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
                      duration: 0.45,
                      delay: index * 0.06,
                      ease,
                    }}
                  >

                    <span className="contact__detail-label">
                      {item.label}
                    </span>

                    <span className="contact__detail-value">
                      {item.value}
                    </span>

                    {/* NO ARROW */}
                    <span
                      className="contact__detail-status"
                      aria-hidden="true"
                    >
                      <span />
                    </span>

                    <span
                      className="contact__detail-line"
                      aria-hidden="true"
                    />

                  </motion.a>
                )
              )}

            </div>

          </motion.div>


          {/* RIGHT */}

          <motion.div
            className="contact__cta"
            initial={{
              opacity: 0,
              x: 30,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
              amount: 0.2,
            }}
            transition={{
              duration: 0.8,
              delay: 0.1,
              ease,
            }}
          >

            <div className="contact__cta-top">

              <span>
                START A PROJECT
              </span>

              <span className="contact__cta-number">
                02
              </span>

            </div>


            <h3>
              HAVE AN
              <span>IDEA?</span>
            </h3>


            <p>
              FROM IDENTITY AND WEBSITES TO DIGITAL
              EXPERIENCES, WE BUILD WORK THAT GIVES
              BRANDS A REASON TO BE REMEMBERED.
            </p>


            {/* SERVICES */}

            <div className="contact__services">

              <span className="contact__services-label">
                WHAT DO YOU NEED?
              </span>

              <div className="contact__services-list">

                {services.map(
                  (service, index) => (
                    <span key={service}>
                      <small>
                        {String(index + 1).padStart(
                          2,
                          "0"
                        )}
                      </small>

                      {service}
                    </span>
                  )
                )}

              </div>

            </div>


            {/* CTA */}

            <a
              href="mailto:wacreativestudio@gmail.com"
              className="contact__button"
            >
              <span>
                SEND AN EMAIL
              </span>

              <span
                className="contact__button-line"
                aria-hidden="true"
              />
            </a>

          </motion.div>

        </div>


        {/* =================================================
            BOTTOM
        ================================================= */}

        <motion.footer
          className="contact__bottom"
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
            WA CREATIVE SOLUTIONS
          </span>

          <span>
            RAWALPINDI, PAKISTAN
          </span>

          <span className="contact__accent">
            AVAILABLE FOR PROJECTS
          </span>

        </motion.footer>

      </div>
    </section>
  );
}