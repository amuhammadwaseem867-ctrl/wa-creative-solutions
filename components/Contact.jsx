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

export default function Contact() {
  return (
    <section className="contact" id="contact">
      <div className="contact__grid-bg" />

      <div className="contact__container">

        {/* EYEBROW */}
        <motion.div
          className="contact__eyebrow"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="contact__eyebrow-line" />
          <span>GET IN TOUCH</span>
        </motion.div>

        {/* HERO */}
        <div className="contact__hero">

          <motion.h2
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            LET&apos;S CREATE
            <br />
            SOMETHING
            <br />
            <span>REMARKABLE.</span>
          </motion.h2>

          <motion.div
            className="contact__hero-side"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.7,
              delay: 0.15,
            }}
          >
            <span>01 / CONTACT</span>

            <p>
              Have a project, idea or opportunity in mind?
              Tell us what you&apos;re building and let&apos;s
              turn it into something people remember.
            </p>

            <div className="contact__hero-line" />
          </motion.div>

        </div>

        {/* DIVIDER */}
        <motion.div
          className="contact__divider"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.9,
            ease: "easeOut",
          }}
        />

        {/* MAIN CONTENT */}
        <div className="contact__grid">

          {/* LEFT */}
          <motion.div
            className="contact__info"
            initial={{ opacity: 0, x: -35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.7,
              ease: "easeOut",
            }}
          >

            <div>
              <span className="contact__info-label">
                CONTACT DETAILS
              </span>

              <p className="contact__info-description">
                Let&apos;s start a conversation about your next
                digital experience, brand or creative project.
              </p>
            </div>

            <div className="contact__details">
              {contactDetails.map((item, index) => (
                <motion.a
                  key={`${item.label}-${index}`}
                  href={item.href}
                  className="contact__detail"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.08,
                  }}
                >
                  <span className="contact__detail-label">
                    {item.label}
                  </span>

                  <span className="contact__detail-value">
                    {item.value}
                  </span>

                  <span className="contact__detail-arrow">
                    ↗
                  </span>
                </motion.a>
              ))}
            </div>

          </motion.div>


          {/* RIGHT CTA */}
          <motion.div
            className="contact__cta"
            initial={{ opacity: 0, x: 35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.7,
              delay: 0.1,
              ease: "easeOut",
            }}
          >

            <div className="contact__cta-top">
              <span>START A PROJECT</span>

              <span className="contact__cta-number">
                02
              </span>
            </div>

            <h3>
              HAVE AN
              <br />
              <span>IDEA?</span>
            </h3>

            <p>
              From identity and websites to digital experiences,
              we build work that gives brands a reason to be remembered.
            </p>

            {/* SERVICES */}
            <div className="contact__services">

              <span className="contact__services-label">
                WHAT DO YOU NEED?
              </span>

              <div className="contact__services-list">
                {services.map((service) => (
                  <span key={service}>
                    {service}
                  </span>
                ))}
              </div>

            </div>

            {/* BUTTON */}
            <a
              href="mailto:wacreativestudio@gmail.com"
              className="contact__button"
            >
              <span>SEND AN EMAIL</span>

              <span className="contact__button-arrow">
                ↗
              </span>
            </a>

          </motion.div>

        </div>

        {/* BOTTOM */}
        <motion.div
          className="contact__bottom"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span>WA CREATIVE SOLUTIONS</span>

          <span>RAWALPINDI, PAKISTAN</span>

          <span className="contact__accent">
            AVAILABLE FOR PROJECTS
          </span>
        </motion.div>

      </div>
    </section>
  );
}