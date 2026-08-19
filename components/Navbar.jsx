"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./Navbar.css";

const navLinks = [
  {
    number: "01",
    name: "ABOUT",
    href: "#about",
  },
  {
    number: "02",
    name: "SERVICES",
    href: "#services",
  },
  {
    number: "03",
    name: "TECHNOLOGY",
    href: "#technology",
  },
  {
    number: "04",
    name: "WORK",
    href: "#work",
  },
  {
    number: "05",
    name: "CONTACT",
    href: "#contact",
  },
];

const ease = [0.22, 1, 0.36, 1];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const toggleMenu = () => {
    setMenuOpen((current) => !current);
  };

  return (
    <header
      className={`navbar ${
        menuOpen ? "navbar-open" : ""
      }`}
    >
      {/* =================================================
          BRAND — ORIGINAL LOGO
      ================================================= */}

      <a
        href="#hero"
        className="navbar-brand"
        onClick={closeMenu}
      >
        <span className="navbar-brand-wa">
          WA
        </span>

        <span className="navbar-brand-name">
          CREATIVE SOLUTIONS
        </span>
      </a>


      {/* =================================================
          DESKTOP NAVIGATION
      ================================================= */}

      <nav
        className="navbar-links"
        aria-label="Primary navigation"
      >
        {navLinks.map((link) => (
          <a
            href={link.href}
            className="navbar-link"
            key={link.name}
          >
            <span className="navbar-link-number">
              {link.number}
            </span>

            <span className="navbar-link-text">
              {link.name}
            </span>

            <span
              className="navbar-link-dot"
              aria-hidden="true"
            />
          </a>
        ))}
      </nav>


      {/* =================================================
          DESKTOP CTA
      ================================================= */}

      <a
        href="#contact"
        className="navbar-cta"
      >
        <span className="navbar-cta-text">
          START A PROJECT
        </span>

        <span
          className="navbar-cta-line"
          aria-hidden="true"
        />
      </a>


      {/* =================================================
          MOBILE MENU BUTTON
      ================================================= */}

      <button
        type="button"
        className={`navbar-menu ${
          menuOpen ? "active" : ""
        }`}
        onClick={toggleMenu}
        aria-label={
          menuOpen
            ? "Close navigation"
            : "Open navigation"
        }
        aria-expanded={menuOpen}
      >
        <span />
        <span />
      </button>


      {/* =================================================
          MOBILE MENU
      ================================================= */}

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="mobile-menu"
            initial={{
              opacity: 0,
              clipPath:
                "inset(0 0 100% 0)",
            }}
            animate={{
              opacity: 1,
              clipPath:
                "inset(0 0 0% 0)",
            }}
            exit={{
              opacity: 0,
              clipPath:
                "inset(0 0 100% 0)",
            }}
            transition={{
              duration: 0.45,
              ease,
            }}
          >
            {/* MENU HEADER */}

            <div className="mobile-menu-top">
              <span>
                WA CREATIVE SOLUTIONS
              </span>

              <span>
                MENU / 00
              </span>
            </div>


            {/* MOBILE LINKS */}

            <nav
              className="mobile-nav"
              aria-label="Mobile navigation"
            >
              {navLinks.map(
                (link, index) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    className="mobile-nav-link"
                    onClick={closeMenu}
                    initial={{
                      opacity: 0,
                      x: -25,
                    }}
                    animate={{
                      opacity: 1,
                      x: 0,
                    }}
                    transition={{
                      duration: 0.45,
                      delay:
                        0.06 +
                        index * 0.05,
                      ease,
                    }}
                  >
                    <span className="mobile-nav-number">
                      {link.number}
                    </span>

                    <span className="mobile-nav-text">
                      {link.name}
                    </span>

                    <span
                      className="mobile-nav-dot"
                      aria-hidden="true"
                    />
                  </motion.a>
                )
              )}
            </nav>


            {/* MOBILE FOOTER */}

            <div className="mobile-menu-bottom">
              <span>
                BRAND / DIGITAL / EXPERIENCE
              </span>

              <a
                href="#contact"
                onClick={closeMenu}
              >
                START A PROJECT
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}