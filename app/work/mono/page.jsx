"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import "./Mono.css";

const images = {
  cover: "/portfolio/project-03/cover.png",
  logoPrimary: "/portfolio/project-03/logo-primary.png",
  logoSecondary: "/portfolio/project-03/logo-secondary.png",
  logoMark: "/portfolio/project-03/logo-mark.png",
  logoGrid: "/portfolio/project-03/logo-grid.png",
  brandGuidelines: "/portfolio/project-03/brand-guidelines.png",
  colorPalette: "/portfolio/project-03/color-palette.png",
  typography: "/portfolio/project-03/typography.png",
  brandMockup: "/portfolio/project-03/brand-mockup.png",
  businessCard: "/portfolio/project-03/business-card.png",
  letterhead: "/portfolio/project-03/letterhead.png",
  envelope: "/portfolio/project-03/envelope.png",
  stationery: "/portfolio/project-03/stationery.png",
  packaging: "/portfolio/project-03/packaging.png",
  presentation: "/portfolio/project-03/presentation.png",
  billboard: "/portfolio/project-03/billboard.png",
  storefront: "/portfolio/project-03/storefront.png",
  socialMedia: "/portfolio/project-03/social-media.png",
  instagramPosts: "/portfolio/project-03/instagram-posts.png",
};


/* =========================================
   INTRO ANIMATION
========================================= */

const monoIntroText = {
  initial: {
    opacity: 0,
    y: 25,
    letterSpacing: "0.35em",
  },

  animate: {
    opacity: 1,
    y: 0,
    letterSpacing: "-0.06em",
    transition: {
      duration: 1,
      ease: [0.22, 1, 0.36, 1],
    },
  },

  exit: {
    opacity: 0,
    y: -30,
    letterSpacing: "0.05em",
    transition: {
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};


/* =========================================
   GENERAL FADE UP
========================================= */

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 40,
  },

  visible: {
    opacity: 1,
    y: 0,

    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};


/* =========================================
   SECTION LABEL
========================================= */

function SectionLabel({ number, children }) {
  return (
    <div className="mono-section-label">
      <span>{number}</span>
      <span>{children}</span>
    </div>
  );
}


/* =========================================
   PROJECT IMAGE
========================================= */

function ProjectImage({ src, alt, className = "" }) {
  return (
    <motion.div
      className={`mono-image ${className}`}
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
        duration: 0.7,
      }}
    >
      <img src={src} alt={alt} />
    </motion.div>
  );
}


/* =========================================
   MONO PAGE
========================================= */

export default function MonoPage() {
  const [intro, setIntro] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIntro(false);
    }, 2200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* =========================================
          INTRO LOADER
      ========================================= */}

      <AnimatePresence>
        {intro && (
          <motion.div
            className="mono-intro-loader"
            initial={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            transition={{
              duration: 0.75,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <motion.div
              className="mono-intro-loader__content"
              variants={monoIntroText}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              MONO
            </motion.div>

            <motion.div
              className="mono-intro-loader__line"
              initial={{
                scaleX: 0,
              }}
              animate={{
                scaleX: 1,
              }}
              transition={{
                duration: 1,
                delay: 0.35,
                ease: [0.22, 1, 0.36, 1],
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>


      {/* =========================================
          MAIN PAGE
      ========================================= */}

      <main className="mono-page">

        {/* HERO */}

        <section className="mono-hero">
          <div className="mono-hero__container">

            <motion.div
              className="mono-hero__content"
              initial="hidden"
              animate="visible"
              variants={fadeUp}
            >
              <div className="mono-hero__eyebrow">
                <span>03</span>
                <span>BRAND IDENTITY</span>
              </div>

              <h1>MONO</h1>

              <p>
                A complete visual identity designed around
                clarity, contrast and character.
              </p>

              <div className="mono-hero__meta">

                <div>
                  <span>PROJECT</span>
                  <strong>MONO</strong>
                </div>

                <div>
                  <span>DISCIPLINE</span>
                  <strong>BRAND IDENTITY</strong>
                </div>

                <div>
                  <span>YEAR</span>
                  <strong>2026</strong>
                </div>

              </div>
            </motion.div>


            <motion.div
              className="mono-hero__visual"
              initial={{
                opacity: 0,
                y: 50,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.9,
                delay: 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <img
                src={images.cover}
                alt="MONO brand identity cover"
              />
            </motion.div>

          </div>


          <div className="mono-scroll">
            <span>SCROLL TO EXPLORE</span>
            <span className="mono-scroll__line" />
          </div>
        </section>


        {/* PROJECT */}

        <section className="mono-section">
          <div className="mono-section__container">

            <SectionLabel number="01">
              THE PROJECT
            </SectionLabel>

            <div className="mono-intro__grid">

              <motion.h2
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                A visual identity
                <span> built to stand out.</span>
              </motion.h2>


              <motion.div
                className="mono-intro__copy"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <p>
                  MONO is a contemporary brand identity created
                  with a strong focus on simplicity, structure
                  and visual recognition.
                </p>

                <p>
                  The system was designed to remain consistent
                  across digital platforms, printed materials,
                  physical environments and social communication.
                </p>
              </motion.div>

            </div>


            <ProjectImage
              src={images.brandMockup}
              alt="MONO brand mockup"
              className="mono-image--large"
            />

          </div>
        </section>


        {/* IDENTITY */}

        <section className="mono-section">
          <div className="mono-section__container">

            <SectionLabel number="02">
              THE IDENTITY
            </SectionLabel>


            <motion.div
              className="mono-heading"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <h2>
                One identity.
                <br />
                <span>Multiple expressions.</span>
              </h2>
            </motion.div>


            <div className="mono-logo-grid">

              <ProjectImage
                src={images.logoPrimary}
                alt="MONO primary logo"
              />

              <ProjectImage
                src={images.logoSecondary}
                alt="MONO secondary logo"
              />

              <ProjectImage
                src={images.logoMark}
                alt="MONO logo mark"
              />

            </div>

          </div>
        </section>


        {/* LOGO CONSTRUCTION */}

        <section className="mono-section">
          <div className="mono-section__container">

            <SectionLabel number="03">
              LOGO CONSTRUCTION
            </SectionLabel>


            <div className="mono-split">

              <motion.div
                className="mono-split__content"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <h2>
                  Precision
                  <span> by design.</span>
                </h2>

                <p>
                  The MONO mark is built through a precise
                  geometric structure, giving the identity
                  a distinctive and scalable visual signature.
                </p>
              </motion.div>


              <ProjectImage
                src={images.logoGrid}
                alt="MONO logo construction grid"
              />

            </div>

          </div>
        </section>


        {/* VISUAL LANGUAGE */}

        <section className="mono-section">
          <div className="mono-section__container">

            <SectionLabel number="04">
              VISUAL LANGUAGE
            </SectionLabel>


            <div className="mono-language__grid">

              <div className="mono-language__item">

                <div className="mono-language__text">

                  <span>COLOR</span>

                  <h2>
                    Controlled
                    <br />
                    <em>contrast.</em>
                  </h2>

                  <p>
                    A restrained color system creates a
                    recognizable and consistent brand presence.
                  </p>

                </div>


                <ProjectImage
                  src={images.colorPalette}
                  alt="MONO color palette"
                />

              </div>


              <div className="mono-language__item">

                <ProjectImage
                  src={images.typography}
                  alt="MONO typography"
                />


                <div className="mono-language__text">

                  <span>TYPOGRAPHY</span>

                  <h2>
                    Clear
                    <br />
                    <em>expression.</em>
                  </h2>

                  <p>
                    Typography balances personality with
                    clarity across every communication touchpoint.
                  </p>

                </div>

              </div>

            </div>

          </div>
        </section>


        {/* BRAND GUIDELINES */}

        <section className="mono-section">
          <div className="mono-section__container">

            <SectionLabel number="05">
              BRAND GUIDELINES
            </SectionLabel>


            <motion.div
              className="mono-guidelines__intro"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >

              <h2>
                Consistency creates
                <span> recognition.</span>
              </h2>

              <p>
                Every element of the MONO identity follows
                a defined visual system to maintain consistency
                across every application.
              </p>

            </motion.div>


            <ProjectImage
              src={images.brandGuidelines}
              alt="MONO brand guidelines"
              className="mono-image--wide"
            />

          </div>
        </section>


        {/* STATIONERY */}

        <section className="mono-section">
          <div className="mono-section__container">

            <SectionLabel number="06">
              STATIONERY SYSTEM
            </SectionLabel>


            <div className="mono-stationery__grid">

              <ProjectImage
                src={images.businessCard}
                alt="MONO business card"
              />

              <ProjectImage
                src={images.letterhead}
                alt="MONO letterhead"
              />

              <ProjectImage
                src={images.envelope}
                alt="MONO envelope"
              />

              <ProjectImage
                src={images.stationery}
                alt="MONO stationery"
                className="mono-image--full"
              />

            </div>

          </div>
        </section>


        {/* PACKAGING */}

        <section className="mono-section">
          <div className="mono-section__container">

            <SectionLabel number="07">
              PACKAGING
            </SectionLabel>


            <motion.div
              className="mono-heading"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <h2>
                Identity that
                <span> lives beyond the screen.</span>
              </h2>
            </motion.div>


            <ProjectImage
              src={images.packaging}
              alt="MONO packaging design"
              className="mono-image--wide"
            />

          </div>
        </section>


        {/* REAL WORLD */}

        <section className="mono-section">
          <div className="mono-section__container">

            <SectionLabel number="08">
              BRAND IN THE REAL WORLD
            </SectionLabel>


            <ProjectImage
              src={images.billboard}
              alt="MONO billboard"
              className="mono-image--wide"
            />


            <ProjectImage
              src={images.storefront}
              alt="MONO storefront"
              className="mono-image--wide"
            />

          </div>
        </section>


        {/* DIGITAL */}

        <section className="mono-section">
          <div className="mono-section__container">

            <SectionLabel number="09">
              DIGITAL PRESENCE
            </SectionLabel>


            <div className="mono-digital__intro">

              <motion.h2
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                One system.
                <br />
                <span>Every platform.</span>
              </motion.h2>


              <motion.p
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                The visual language extends naturally into
                social media, creating a consistent digital presence.
              </motion.p>

            </div>


            <ProjectImage
              src={images.socialMedia}
              alt="MONO social media"
              className="mono-image--wide"
            />


            <ProjectImage
              src={images.instagramPosts}
              alt="MONO Instagram posts"
              className="mono-image--wide"
            />

          </div>
        </section>


        {/* PRESENTATION */}

        <section className="mono-section">
          <div className="mono-section__container">

            <SectionLabel number="10">
              COMPLETE BRAND SYSTEM
            </SectionLabel>


            <motion.div
              className="mono-heading"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >

              <h2>
                From identity
                <span> to experience.</span>
              </h2>

              <p>
                A complete identity system designed to
                perform consistently across every touchpoint.
              </p>

            </motion.div>


            <ProjectImage
              src={images.presentation}
              alt="MONO brand presentation"
              className="mono-image--wide"
            />

          </div>
        </section>


        {/* FINAL */}

        <section className="mono-final">

          <div className="mono-final__container">

            <motion.div
              className="mono-final__visual"
              initial={{
                opacity: 0,
                scale: 0.97,
              }}
              whileInView={{
                opacity: 1,
                scale: 1,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.8,
              }}
            >

              <img
                src={images.cover}
                alt="MONO final showcase"
              />

            </motion.div>


            <motion.div
              className="mono-final__content"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >

              <span>MONO</span>

              <h2>
                A complete
                <br />
                visual identity.
              </h2>

              <p>
                Strategy. Identity. Art Direction.
                Visual System.
              </p>

            </motion.div>

          </div>

        </section>


        {/* NEXT PROJECT */}

        <section className="mono-next">

          <Link
            href="/work/frame"
            className="mono-next__link"
          >

            <span className="mono-next__label">
              NEXT PROJECT
            </span>


            <div className="mono-next__title">

              <span>04</span>

              FRAME

              <strong>↗</strong>

            </div>


            <span className="mono-next__category">
              VIDEO EDITING
            </span>

          </Link>

        </section>

      </main>
    </>
  );
}