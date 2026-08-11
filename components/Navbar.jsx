"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./Navbar.css";

const navLinks = [
  { name: "ABOUT", href: "#about" },
  { name: "SERVICES", href: "#services" },
  { name: "WORK", href: "#work" },
  { name: "PROCESS", href: "#process" },
  { name: "TESTIMONIALS", href: "#testimonials" },
  { name: "CONTACT", href: "#contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className="navbar">

      {/* BRAND */}
      <a
        href="#hero"
        className="navbar-brand"
        onClick={closeMenu}
      >
        <span className="navbar-brand-wa">WA</span>

        <span className="navbar-brand-name">
          CREATIVE SOLUTIONS
        </span>
      </a>


      {/* DESKTOP NAV */}
      <nav className="navbar-links">

        {navLinks.map((link, index) => (
          <a
            href={link.href}
            className="navbar-link"
            key={link.name}
          >
            <span className="navbar-link-number">
              {String(index + 1).padStart(2, "0")}
            </span>

            <span className="navbar-link-text">
              {link.name}
            </span>
          </a>
        ))}

      </nav>


      {/* DESKTOP CTA */}
      <a
        href="#contact"
        className="navbar-cta"
      >
        <span>START A PROJECT</span>

        <span className="navbar-cta-arrow">
          ↗
        </span>
      </a>


      {/* MOBILE MENU BUTTON */}
      <button
        className={`navbar-menu ${
          menuOpen ? "active" : ""
        }`}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle navigation"
        aria-expanded={menuOpen}
      >
        <span></span>
        <span></span>
      </button>


      {/* MOBILE MENU */}
      <AnimatePresence>

        {menuOpen && (

          <motion.div
            className="mobile-menu"
            initial={{
              opacity: 0,
              clipPath: "inset(0 0 100% 0)",
            }}
            animate={{
              opacity: 1,
              clipPath: "inset(0 0 0% 0)",
            }}
            exit={{
              opacity: 0,
              clipPath: "inset(0 0 100% 0)",
            }}
            transition={{
              duration: 0.45,
              ease: [0.22, 1, 0.36, 1],
            }}
          >

            <div className="mobile-menu-top">
              <span>WA CREATIVE SOLUTIONS</span>

              <span>MENU / 00</span>
            </div>


            <nav className="mobile-nav">

              {navLinks.map((link, index) => (

                <motion.a
                  href={link.href}
                  className="mobile-nav-link"
                  key={link.name}
                  onClick={closeMenu}
                  initial={{
                    opacity: 0,
                    x: -30,
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                  }}
                  transition={{
                    delay: 0.08 + index * 0.05,
                  }}
                >

                  <span className="mobile-nav-number">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <span>
                    {link.name}
                  </span>

                  <span className="mobile-nav-arrow">
                    ↗
                  </span>

                </motion.a>

              ))}

            </nav>


            <div className="mobile-menu-bottom">

              <span>
                BRAND / DIGITAL / EXPERIENCE
              </span>

              <a
                href="#contact"
                onClick={closeMenu}
              >
                START A PROJECT ↗
              </a>

            </div>

          </motion.div>

        )}

      </AnimatePresence>

    </header>
  );
}