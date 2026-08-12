"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import "./Footer.css";

const footerLinks = [
  { number: "01", label: "ABOUT", href: "#about" },
  { number: "02", label: "SERVICES", href: "#services" },
  { number: "03", label: "TECHNOLOGY", href: "#technology" },
  { number: "04", label: "PRICING", href: "#pricing" },
  { number: "05", label: "WORK", href: "#work" },
  { number: "06", label: "PROCESS", href: "#process" },
  { number: "07", label: "TESTIMONIALS", href: "#testimonials" },
  { number: "08", label: "CONTACT", href: "#contact" },
];

const socialLinks = [
  { label: "BEHANCE", href: "#" },
  { label: "INSTAGRAM", href: "#" },
  { label: "LINKEDIN", href: "#" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer__container">

        {/* =========================================
            CTA
        ========================================= */}

        <motion.div
          className="footer__cta"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <div className="footer__cta-label">
            <span className="footer__dot" />
            <span>HAVE A PROJECT IN MIND?</span>
          </div>

          <Link href="#contact" className="footer__cta-link">
            <span>LET&apos;S CREATE</span>

            <span className="footer__cta-arrow">
              ↗
            </span>
          </Link>
        </motion.div>

        {/* =========================================
            MAIN FOOTER
        ========================================= */}

        <div className="footer__main">

          {/* BRAND */}

          <motion.div
            className="footer__brand"
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Link href="/" className="footer__logo">
              <span className="footer__logo-wa">
                WA
              </span>

              <span className="footer__logo-name">
                CREATIVE SOLUTIONS
              </span>
            </Link>

            <p>
              We build brands, digital experiences and
              creative solutions designed to make an impact.
            </p>
          </motion.div>

          {/* NAVIGATION */}

          <motion.div
            className="footer__column footer__navigation"
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.6,
              delay: 0.08,
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

                  <span className="footer__link-arrow">
                    ↗
                  </span>
                </Link>
              ))}
            </nav>
          </motion.div>

          {/* SOCIAL */}

          <motion.div
            className="footer__column"
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.6,
              delay: 0.16,
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
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>
                    {link.label}
                  </span>

                  <span>
                    ↗
                  </span>
                </a>
              ))}
            </div>
          </motion.div>

          {/* CONTACT */}

          <motion.div
            className="footer__column footer__contact"
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.6,
              delay: 0.24,
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

            <span className="footer__location">
              RAWALPINDI, PAKISTAN
            </span>
          </motion.div>

        </div>

        {/* =========================================
            GIANT WORDMARK
        ========================================= */}

        <motion.div
          className="footer__wordmark"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <span>WA</span>
        </motion.div>

        {/* =========================================
            BOTTOM BAR
        ========================================= */}

        <motion.div
          className="footer__bottom"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span>
            © {year} WA CREATIVE SOLUTIONS
          </span>

          <span className="footer__status">
            <i />
            AVAILABLE FOR PROJECTS
          </span>

          <span>
            DESIGNED &amp; BUILT WITH INTENT
          </span>
        </motion.div>

      </div>
    </footer>
  );
}