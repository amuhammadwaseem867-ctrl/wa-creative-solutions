"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import "./Footer.css";

const footerLinks = [
  {
    number: "01",
    label: "ABOUT",
    href: "#about",
  },
  {
    number: "02",
    label: "SERVICES",
    href: "#services",
  },
  {
    number: "03",
    label: "TECHNOLOGY",
    href: "#technology",
  },
  {
    number: "04",
    label: "WORK",
    href: "#work",
  },
  {
    number: "05",
    label: "CONTACT",
    href: "#contact",
  },
];

const socialLinks = [
  {
    label: "Behance",
    href: "https://www.behance.net/",
  },
  {
    label: "Dribbble",
    href: "#",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/wacreativesstudio/",
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/people/WA-Creative-Solutions/61593247537659/",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/muhammad-waseem-akram-996015425/",
  },
];

const ease = [0.22, 1, 0.36, 1];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      {/* BACKGROUND */}
      <div className="footer__grid" />

      <div className="footer__glow footer__glow-one" />
      <div className="footer__glow footer__glow-two" />

      <div className="footer__container">

        {/* =================================================
            CTA
        ================================================= */}

        <motion.div
          className="footer__cta"
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
            amount: 0.25,
          }}
          transition={{
            duration: 0.8,
            ease,
          }}
        >
          <div className="footer__cta-label">
            <span className="footer__dot" />

            <span>
              HAVE A PROJECT IN MIND?
            </span>
          </div>

          <Link
            href="#contact"
            className="footer__cta-link"
          >
            <span>
              LET&apos;S CREATE
            </span>

            <span
              className="footer__cta-line"
              aria-hidden="true"
            />
          </Link>
        </motion.div>


        {/* =================================================
            MAIN FOOTER
        ================================================= */}

        <div className="footer__main">

          {/* BRAND */}

          <motion.div
            className="footer__brand"
            initial={{
              opacity: 0,
              y: 22,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.15,
            }}
            transition={{
              duration: 0.65,
              ease,
            }}
          >
            <Link
              href="/"
              className="footer__logo"
            >
              <span className="footer__logo-wa">
                WA
              </span>

              <span className="footer__logo-name">
                CREATIVE SOLUTIONS
              </span>
            </Link>

            <p>
              WE BUILD BRANDS, DIGITAL EXPERIENCES
              AND CREATIVE SOLUTIONS DESIGNED TO
              MAKE AN IMPACT.
            </p>
          </motion.div>


          {/* EXPLORE */}

          <motion.div
            className="footer__column"
            initial={{
              opacity: 0,
              y: 22,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.15,
            }}
            transition={{
              duration: 0.65,
              delay: 0.06,
              ease,
            }}
          >
            <span className="footer__column-title">
              EXPLORE
            </span>

            <nav className="footer__links">
              {footerLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                >
                  <span className="footer__link-number">
                    {link.number}
                  </span>

                  <span className="footer__link-label">
                    {link.label}
                  </span>

                  <span
                    className="footer__link-dot"
                    aria-hidden="true"
                  />
                </Link>
              ))}
            </nav>
          </motion.div>


          {/* CONNECT */}

          <motion.div
            className="footer__column"
            initial={{
              opacity: 0,
              y: 22,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.15,
            }}
            transition={{
              duration: 0.65,
              delay: 0.12,
              ease,
            }}
          >
            <span className="footer__column-title">
              CONNECT
            </span>

            <div className="footer__links footer__social">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={
                    link.href !== "#"
                      ? "_blank"
                      : undefined
                  }
                  rel={
                    link.href !== "#"
                      ? "noopener noreferrer"
                      : undefined
                  }
                  aria-label={`Visit ${link.label}`}
                >
                  <span className="footer__social-label">
                    {link.label}
                  </span>

                  <span
                    className="footer__social-dot"
                    aria-hidden="true"
                  />
                </a>
              ))}
            </div>
          </motion.div>


          {/* CONTACT */}

          <motion.div
            className="footer__column footer__contact"
            initial={{
              opacity: 0,
              y: 22,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.15,
            }}
            transition={{
              duration: 0.65,
              delay: 0.18,
              ease,
            }}
          >
            <span className="footer__column-title">
              START A PROJECT
            </span>

            <a
              href="mailto:wacreativestudio@gmail.com"
              className="footer__email"
            >
              wacreativestudio@gmail.com
            </a>

            <a
              href="tel:+923115962551"
              className="footer__email"
            >
              +92 311 5962551
            </a>

            <span className="footer__location">
              RAWALPINDI, PAKISTAN
            </span>

            <span className="footer__availability">
              <i />
              AVAILABLE FOR PROJECTS
            </span>
          </motion.div>

        </div>


        {/* =================================================
            GIANT WORDMARK
        ================================================= */}

        <motion.div
          className="footer__wordmark"
          initial={{
            opacity: 0,
            y: 35,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.15,
          }}
          transition={{
            duration: 0.9,
            ease,
          }}
        >
          <span>WA</span>
        </motion.div>


        {/* =================================================
            BOTTOM
        ================================================= */}

        <motion.div
          className="footer__bottom"
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
            duration: 0.6,
          }}
        >
          <span>
            © {year} WA CREATIVE SOLUTIONS
          </span>

          <span>
            DESIGN / DIGITAL / TECHNOLOGY
          </span>

          <span className="footer__bottom-accent">
            DESIGNED &amp; BUILT WITH INTENT
          </span>
        </motion.div>

      </div>
    </footer>
  );
}