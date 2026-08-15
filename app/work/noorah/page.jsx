"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import "./Noorah.css";

const base = "/portfolio/project-07";

const ease = [0.22, 1, 0.36, 1];

/* =========================================
   OPENING INTRO
========================================= */

function NoorahIntro() {
  return (
    <motion.div
      className="noorah-intro-loader"
      initial={{ opacity: 1 }}
      animate={{
        opacity: 0,
        pointerEvents: "none",
      }}
      transition={{
        duration: 0.7,
        delay: 2.25,
        ease: [0.76, 0, 0.24, 1],
      }}
    >
      <motion.div
        className="noorah-intro-inner"
        initial={{ opacity: 1 }}
        animate={{
          opacity: 0,
          y: -20,
        }}
        transition={{
          duration: 0.45,
          delay: 1.95,
          ease: "easeOut",
        }}
      >
        <motion.span
          className="noorah-intro-number"
          initial={{
            opacity: 0,
            y: 15,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.5,
            delay: 0.15,
            ease,
          }}
        >
          07 / SELECTED WORK
        </motion.span>

        <motion.h2
          initial={{
            opacity: 0,
            y: 40,
            scale: 0.96,
            letterSpacing: "0.08em",
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
            letterSpacing: "-0.065em",
          }}
          transition={{
            duration: 0.8,
            delay: 0.25,
            ease,
          }}
        >
          NOORAH
        </motion.h2>

        <motion.div
          className="noorah-intro-line"
          initial={{
            scaleX: 0,
            opacity: 0,
          }}
          animate={{
            scaleX: 1,
            opacity: 1,
          }}
          transition={{
            duration: 0.7,
            delay: 0.65,
            ease,
          }}
        />

        <motion.span
          className="noorah-intro-subtitle"
          initial={{
            opacity: 0,
            y: 12,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.5,
            delay: 0.85,
          }}
        >
          MASCOT / BRAND IDENTITY
        </motion.span>
      </motion.div>

      <motion.div
        className="noorah-intro-progress"
        initial={{
          scaleX: 0,
        }}
        animate={{
          scaleX: 1,
        }}
        transition={{
          duration: 1.9,
          delay: 0.15,
          ease: [0.65, 0, 0.35, 1],
        }}
      />

      <motion.div
        className="noorah-intro-orbit"
        initial={{
          opacity: 0,
          scale: 0.6,
        }}
        animate={{
          opacity: 1,
          scale: 1,
          rotate: 180,
        }}
        transition={{
          duration: 2,
          delay: 0.1,
          ease: "easeOut",
        }}
      />
    </motion.div>
  );
}

/* =========================================
   IMAGE COMPONENT
========================================= */

function NoorahImage({
  src,
  alt,
  className = "",
}) {
  return (
    <motion.figure
      className={`noorah-showcase ${className}`}
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
        amount: 0.08,
      }}
      transition={{
        duration: 0.8,
        ease,
      }}
    >
      <div className="noorah-image-frame">
        <img
          src={`${base}/${src}`}
          alt={alt}
        />
      </div>
    </motion.figure>
  );
}

/* =========================================
   CASE STUDY
========================================= */

export default function NoorahCaseStudy() {
  return (
    <main className="noorah-case">

      {/* =========================================
          INTRO
      ========================================= */}

      <NoorahIntro />

      {/* =========================================
          BACK
      ========================================= */}

      <Link
        href="/#work"
        className="noorah-back"
      >
        <span className="noorah-back-arrow">
          ←
        </span>

        <span>
          BACK TO SELECTED WORK
        </span>
      </Link>

      {/* =========================================
          HERO
      ========================================= */}

      <section className="noorah-hero">

        <div className="noorah-hero-content">

          <motion.div
            className="noorah-hero-meta"
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.7,
              delay: 2.35,
              ease,
            }}
          >
            <span>
              07 / SELECTED WORK
            </span>

            <span>
              MASCOT · BRAND IDENTITY · CHARACTER
            </span>
          </motion.div>

          <div className="noorah-hero-grid">

            {/* TEXT */}

            <motion.div
              className="noorah-hero-copy"
              initial={{
                opacity: 0,
                y: 45,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.9,
                delay: 2.45,
                ease,
              }}
            >
              <span className="noorah-eyebrow">
                NOORAH
              </span>

              <h1>
                A character
                <em>with a story.</em>
              </h1>

              <p>
                NOORAH is a playful mascot identity
                created to give a brand a recognizable
                personality, visual voice and emotional
                connection.
              </p>

              <div className="noorah-hero-details">

                <div>
                  <span>DISCIPLINE</span>
                  <strong>
                    BRAND IDENTITY
                  </strong>
                </div>

                <div>
                  <span>TYPE</span>
                  <strong>
                    MASCOT DESIGN
                  </strong>
                </div>

                <div>
                  <span>YEAR</span>
                  <strong>
                    2026
                  </strong>
                </div>

              </div>
            </motion.div>

            {/* PORTRAIT COVER */}

            <motion.div
              className="noorah-hero-cover"
              initial={{
                opacity: 0,
                y: 55,
                scale: 1.025,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              transition={{
                duration: 1.1,
                delay: 2.25,
                ease,
              }}
            >
              <img
                src={`${base}/cover.png`}
                alt="NOORAH mascot brand identity cover"
              />
            </motion.div>

          </div>

          <motion.div
            className="noorah-hero-bottom"
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              duration: 0.8,
              delay: 2.8,
            }}
          >
            <span>
              CASE STUDY / 2026
            </span>

            <span className="noorah-scroll">
              SCROLL TO EXPLORE
              <i />
            </span>
          </motion.div>

        </div>
      </section>

      {/* =========================================
          BRAND STORY
      ========================================= */}

      <section className="noorah-section noorah-story">

        <div className="noorah-section-label">
          <span>01</span>
          <span>BRAND STORY</span>
        </div>

        <div className="noorah-split-heading">

          <motion.h2
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
              amount: 0.2,
            }}
            transition={{
              duration: 0.8,
              ease,
            }}
          >
            More than
            <em>a mascot.</em>
          </motion.h2>

          <motion.div
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
              amount: 0.2,
            }}
            transition={{
              duration: 0.8,
              delay: 0.1,
              ease,
            }}
          >
            <p>
              NOORAH was developed as a character
              that could become the recognizable face
              of a brand.
            </p>

            <p>
              The identity combines expressive
              illustration, personality and a flexible
              visual system that can live across
              different brand touchpoints.
            </p>
          </motion.div>

        </div>

        <NoorahImage
          src="brand story.jpg"
          alt="NOORAH brand story"
          className="noorah-wide"
        />

      </section>

      {/* =========================================
          LOGO
      ========================================= */}

      <section className="noorah-section noorah-cream">

        <div className="noorah-section-label">
          <span>02</span>
          <span>LOGO SHOWCASE</span>
        </div>

        <div className="noorah-split-heading">

          <h2>
            A mark with
            <em>personality.</em>
          </h2>

          <p>
            The NOORAH mark extends the character's
            personality into a simple and memorable
            brand signature.
          </p>

        </div>

        <NoorahImage
          src="logoshowcase.jpg"
          alt="NOORAH logo showcase"
          className="noorah-wide"
        />

      </section>

      {/* =========================================
          MOODBOARD
      ========================================= */}

      <section className="noorah-section">

        <div className="noorah-section-label">
          <span>03</span>
          <span>DIRECTION</span>
        </div>

        <div className="noorah-split-heading">

          <h2>
            Finding the
            <em>right mood.</em>
          </h2>

          <p>
            A playful but refined visual direction
            shaped the character, typography,
            photography and overall brand atmosphere.
          </p>

        </div>

        <NoorahImage
          src="moodboard.jpg"
          alt="NOORAH moodboard"
          className="noorah-wide"
        />

      </section>

      {/* =========================================
          TYPOGRAPHY
      ========================================= */}

      <section className="noorah-section noorah-cream">

        <div className="noorah-section-label">
          <span>04</span>
          <span>TYPOGRAPHY</span>
        </div>

        <div className="noorah-heading">

          <h2>
            Type that feels
            <em>alive.</em>
          </h2>

        </div>

        <NoorahImage
          src="typography.jpg"
          alt="NOORAH typography system"
          className="noorah-wide"
        />

      </section>

      {/* =========================================
          BRAND PHOTOGRAPHY
      ========================================= */}

      <section className="noorah-section">

        <div className="noorah-section-label">
          <span>05</span>
          <span>BRAND PHOTOGRAPHY</span>
        </div>

        <div className="noorah-split-heading">

          <h2>
            Character meets
            <em>the real world.</em>
          </h2>

          <p>
            Photography gives NOORAH a physical
            presence and creates a visual world
            around the character.
          </p>

        </div>

        <NoorahImage
          src="brandphotography.jpg"
          alt="NOORAH brand photography"
          className="noorah-wide"
        />

      </section>

      {/* =========================================
          BRAND IN ACTION
      ========================================= */}

      <section className="noorah-section noorah-cream">

        <div className="noorah-section-label">
          <span>06</span>
          <span>BRAND IN ACTION</span>
        </div>

        <div className="noorah-heading">

          <h2>
            Designed to
            <em>move.</em>
          </h2>

        </div>

        <NoorahImage
          src="brandinaction.jpg"
          alt="NOORAH brand in action"
          className="noorah-wide"
        />

      </section>

      {/* =========================================
          CONTENT IDENTITY
      ========================================= */}

      <section className="noorah-section">

        <div className="noorah-section-label">
          <span>07</span>
          <span>CONTENT IDENTITY</span>
        </div>

        <div className="noorah-split-heading">

          <h2>
            One character.
            <em>Many stories.</em>
          </h2>

          <p>
            The identity is designed to remain
            recognizable while adapting naturally
            to different types of content.
          </p>

        </div>

        <NoorahImage
          src="contentidentity.jpg"
          alt="NOORAH content identity"
          className="noorah-wide"
        />

      </section>

      {/* =========================================
          SOCIAL MEDIA
      ========================================= */}

      <section className="noorah-section noorah-cream">

        <div className="noorah-section-label">
          <span>08</span>
          <span>SOCIAL MEDIA</span>
        </div>

        <div className="noorah-split-heading">

          <h2>
            Built for
            <em>attention.</em>
          </h2>

          <p>
            Social templates create a consistent
            visual rhythm while allowing the mascot
            to remain the central personality.
          </p>

        </div>

        <NoorahImage
          src="socialmediakit.jpg"
          alt="NOORAH social media kit"
          className="noorah-wide"
        />

      </section>

      {/* =========================================
          THUMBNAIL SYSTEM
      ========================================= */}

      <section className="noorah-section">

        <div className="noorah-section-label">
          <span>09</span>
          <span>THUMBNAIL SYSTEM</span>
        </div>

        <div className="noorah-heading">

          <h2>
            Recognizable
            <em>at a glance.</em>
          </h2>

        </div>

        <NoorahImage
          src="thumbnailsystem.jpg"
          alt="NOORAH thumbnail system"
          className="noorah-wide"
        />

      </section>

      {/* =========================================
          MERCHANDISE
      ========================================= */}

      <section className="noorah-section noorah-cream">

        <div className="noorah-section-label">
          <span>10</span>
          <span>MERCHANDISE</span>
        </div>

        <div className="noorah-split-heading">

          <h2>
            From screen
            <em>to object.</em>
          </h2>

          <p>
            The character becomes tangible through
            merchandise, creating another layer of
            brand recognition and emotional connection.
          </p>

        </div>

        <NoorahImage
          src="merchandisecollection.jpg"
          alt="NOORAH merchandise collection"
          className="noorah-wide"
        />

      </section>

      {/* =========================================
          CREATOR QUOTE
      ========================================= */}

      <section className="noorah-quote">

        <div className="noorah-quote-inner">

          <span>THE CHARACTER</span>

          <h2>
            “A memorable brand
            <em>should feel human.</em>”
          </h2>

          <p>
            NOORAH turns identity into personality —
            creating something people can recognize,
            remember and connect with.
          </p>

        </div>

      </section>

      {/* =========================================
          CREATOR / FINAL BRAND
      ========================================= */}

      <section className="noorah-section">

        <div className="noorah-section-label">
          <span>11</span>
          <span>CREATOR VOICE</span>
        </div>

        <NoorahImage
          src="creatorquote.jpg"
          alt="NOORAH creator quote"
          className="noorah-wide"
        />

      </section>

      {/* =========================================
          YOUTUBE BRANDING
      ========================================= */}

      <section className="noorah-section noorah-cream">

        <div className="noorah-section-label">
          <span>12</span>
          <span>YOUTUBE BRANDING</span>
        </div>

        <div className="noorah-split-heading">

          <h2>
            A complete
            <em>content world.</em>
          </h2>

          <p>
            NOORAH extends naturally into digital
            content, creating a recognizable ecosystem
            across every platform.
          </p>

        </div>

        <NoorahImage
          src="youtubebranding.jpg"
          alt="NOORAH YouTube branding"
          className="noorah-wide"
        />

      </section>

      {/* =========================================
          FINAL SHOWCASE
      ========================================= */}

      <section className="noorah-final">

        <div className="noorah-final-image">

          <img
            src={`${base}/cover.jpg`}
            alt="NOORAH final brand showcase"
          />

          <div className="noorah-final-overlay" />

          <div className="noorah-final-content">

            <span>
              NOORAH / MASCOT BRAND IDENTITY
            </span>

            <h2>
              Playful
              <em>by design.</em>
            </h2>

            <p>
              Mascot Design · Brand Identity ·
              Content Direction
            </p>

          </div>

        </div>

      </section>

      {/* =========================================
          PROJECT INFO
      ========================================= */}

      <section className="noorah-project-info">

        <div className="noorah-project-info-inner">

          <div>
            <span>PROJECT</span>
            <strong>NOORAH</strong>
          </div>

          <div>
            <span>DISCIPLINE</span>
            <strong>MASCOT / BRAND IDENTITY</strong>
          </div>

          <div>
            <span>YEAR</span>
            <strong>2026</strong>
          </div>

          <div>
            <span>TYPE</span>
            <strong>CHARACTER DESIGN</strong>
          </div>

        </div>

      </section>

      {/* =========================================
          FOOTER
      ========================================= */}

      <footer className="noorah-footer">

        <div>
          <span>
            WA CREATIVE SOLUTIONS
          </span>

          <span>
            SELECTED WORK / 2026
          </span>
        </div>

        <Link href="/#work">
          VIEW ALL WORK ↗
        </Link>

      </footer>

    </main>
  );
}