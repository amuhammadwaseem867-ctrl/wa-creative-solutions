"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import "./Noorah.css";

const images = {
  cover: "/portfolio/project-07/cover.png",
  brandStory: "/portfolio/project-07/brand%20story.jpg",
  brandInAction: "/portfolio/project-07/brandinaction.jpg",
  brandPhotography: "/portfolio/project-07/brandphotography.jpg",
  contentIdentity: "/portfolio/project-07/contentidentity.jpg",
  creatorQuote: "/portfolio/project-07/creatorquote.jpg",
  logoShowcase: "/portfolio/project-07/logoshowcase.jpg",
  merchandise: "/portfolio/project-07/merchandisecollection.jpg",
  moodboard: "/portfolio/project-07/moodboard.jpg",
  socialMedia: "/portfolio/project-07/socialmediakit.jpg",
  thumbnailSystem: "/portfolio/project-07/thumbnailsystem.jpg",
  typography: "/portfolio/project-07/typography.jpg",
  youtubeBranding: "/portfolio/project-07/youtubebranding.jpg",
};

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.75,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

function SectionLabel({ number, children }) {
  return (
    <div className="noorah-section-label">
      <span>{number}</span>
      <span>{children}</span>
    </div>
  );
}

function ProjectImage({
  src,
  alt,
  className = "",
}) {
  return (
    <motion.div
      className={`noorah-image ${className}`}
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
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <img src={src} alt={alt} />
    </motion.div>
  );
}

export default function NoorahPage() {
  return (
    <main className="noorah-page">

      {/* =========================================
          HERO
      ========================================= */}

      <section className="noorah-hero">

        <div className="noorah-hero__container">

          <motion.div
            className="noorah-hero__content"
            initial="hidden"
            animate="visible"
            variants={fadeUp}
          >

            <div className="noorah-hero__eyebrow">
              <span>07</span>
              <span>CREATOR BRAND IDENTITY</span>
            </div>

            <h1>NOORAH</h1>

            <p>
              A warm and expressive creator identity
              designed to connect personality,
              storytelling and visual culture.
            </p>

            <div className="noorah-hero__meta">

              <div>
                <span>PROJECT</span>
                <strong>NOORAH</strong>
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
            className="noorah-hero__visual"
            initial={{
              opacity: 0,
              y: 55,
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
              alt="NOORAH creator brand identity"
            />

          </motion.div>

        </div>


        <div className="noorah-scroll">
          <span>SCROLL TO EXPLORE</span>
          <span className="noorah-scroll__line" />
        </div>

      </section>


      {/* =========================================
          BRAND STORY
      ========================================= */}

      <section className="noorah-section">

        <div className="noorah-section__container">

          <SectionLabel number="01">
            BRAND STORY
          </SectionLabel>


          <div className="noorah-intro__grid">

            <motion.h2
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{
                once: true,
              }}
            >
              A brand built
              <span> around a story.</span>
            </motion.h2>


            <motion.div
              className="noorah-intro__copy"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{
                once: true,
              }}
            >

              <p>
                NOORAH is a creator-led identity built
                around personality, storytelling and
                authentic visual expression.
              </p>

              <p>
                The identity creates a recognizable
                presence across content, social platforms,
                video and physical brand experiences.
              </p>

            </motion.div>

          </div>


          <ProjectImage
            src={images.brandStory}
            alt="NOORAH brand story"
            className="noorah-image--wide"
          />

        </div>

      </section>


      {/* =========================================
          MOODBOARD
      ========================================= */}

      <section className="noorah-section noorah-beige-section">

        <div className="noorah-section__container">

          <SectionLabel number="02">
            CREATIVE DIRECTION
          </SectionLabel>


          <div className="noorah-heading">

            <motion.h2
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{
                once: true,
              }}
            >
              Soft visual language.
              <span> Strong personality.</span>
            </motion.h2>

          </div>


          <ProjectImage
            src={images.moodboard}
            alt="NOORAH moodboard"
            className="noorah-image--wide"
          />

        </div>

      </section>


      {/* =========================================
          LOGO
      ========================================= */}

      <section className="noorah-section">

        <div className="noorah-section__container">

          <SectionLabel number="03">
            LOGO SYSTEM
          </SectionLabel>


          <div className="noorah-split">

            <motion.div
              className="noorah-split__content"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{
                once: true,
              }}
            >

              <h2>
                A signature
                <span> made to connect.</span>
              </h2>

              <p>
                The NOORAH logo balances softness
                with confidence, creating a visual mark
                that feels personal and recognizable.
              </p>

            </motion.div>


            <ProjectImage
              src={images.logoShowcase}
              alt="NOORAH logo showcase"
            />

          </div>

        </div>

      </section>


      {/* =========================================
          TYPOGRAPHY
      ========================================= */}

      <section className="noorah-section">

        <div className="noorah-section__container">

          <SectionLabel number="04">
            TYPOGRAPHY
          </SectionLabel>


          <div className="noorah-typography">

            <motion.div
              className="noorah-typography__content"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{
                once: true,
              }}
            >

              <span>TYPE SYSTEM</span>

              <h2>
                Elegant
                <br />
                <em>expression.</em>
              </h2>

              <p>
                Typography gives NOORAH a distinctive
                voice while maintaining clarity across
                content and communication.
              </p>

            </motion.div>


            <ProjectImage
              src={images.typography}
              alt="NOORAH typography system"
            />

          </div>

        </div>

      </section>


      {/* =========================================
          BRAND IN ACTION
      ========================================= */}

      <section className="noorah-section noorah-beige-section">

        <div className="noorah-section__container">

          <SectionLabel number="05">
            BRAND IN ACTION
          </SectionLabel>


          <motion.div
            className="noorah-large-heading"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
            }}
          >

            <h2>
              Identity that
              <span> feels alive.</span>
            </h2>

          </motion.div>


          <ProjectImage
            src={images.brandInAction}
            alt="NOORAH brand in action"
            className="noorah-image--wide"
          />

        </div>

      </section>


      {/* =========================================
          BRAND PHOTOGRAPHY
      ========================================= */}

      <section className="noorah-section">

        <div className="noorah-section__container">

          <SectionLabel number="06">
            BRAND PHOTOGRAPHY
          </SectionLabel>


          <div className="noorah-photo-grid">

            <ProjectImage
              src={images.brandPhotography}
              alt="NOORAH brand photography"
              className="noorah-photo-main"
            />

            <motion.div
              className="noorah-photo-copy"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{
                once: true,
              }}
            >

              <span>VISUAL DIRECTION</span>

              <h2>
                Personal.
                <br />
                Natural.
                <br />
                <em>Expressive.</em>
              </h2>

              <p>
                Photography brings the identity
                into a more human and emotional space,
                allowing the creator personality
                to remain at the center.
              </p>

            </motion.div>

          </div>

        </div>

      </section>


      {/* =========================================
          CONTENT IDENTITY
      ========================================= */}

      <section className="noorah-section">

        <div className="noorah-section__container">

          <SectionLabel number="07">
            CONTENT IDENTITY
          </SectionLabel>


          <div className="noorah-content-intro">

            <motion.h2
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{
                once: true,
              }}
            >
              One visual language.
              <br />
              <span>Every piece of content.</span>
            </motion.h2>


            <motion.p
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{
                once: true,
              }}
            >
              A flexible content system keeps every
              communication recognizable while allowing
              each piece to retain its own personality.
            </motion.p>

          </div>


          <ProjectImage
            src={images.contentIdentity}
            alt="NOORAH content identity"
            className="noorah-image--wide"
          />

        </div>

      </section>


      {/* =========================================
          YOUTUBE
      ========================================= */}

      <section className="noorah-section noorah-pink-section">

        <div className="noorah-section__container">

          <SectionLabel number="08">
            YOUTUBE BRANDING
          </SectionLabel>


          <motion.div
            className="noorah-youtube-heading"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
            }}
          >

            <h2>
              Built for
              <span> the creator economy.</span>
            </h2>

            <p>
              The identity expands naturally into
              long-form video and YouTube content,
              creating a recognizable branded environment.
            </p>

          </motion.div>


          <ProjectImage
            src={images.youtubeBranding}
            alt="NOORAH YouTube branding"
            className="noorah-image--wide"
          />

        </div>

      </section>


      {/* =========================================
          THUMBNAILS
      ========================================= */}

      <section className="noorah-section">

        <div className="noorah-section__container">

          <SectionLabel number="09">
            THUMBNAIL SYSTEM
          </SectionLabel>


          <div className="noorah-heading">

            <motion.h2
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{
                once: true,
              }}
            >
              Designed to
              <span> get noticed.</span>
            </motion.h2>

          </div>


          <ProjectImage
            src={images.thumbnailSystem}
            alt="NOORAH YouTube thumbnail system"
            className="noorah-image--wide"
          />

        </div>

      </section>


      {/* =========================================
          SOCIAL MEDIA
      ========================================= */}

      <section className="noorah-section noorah-beige-section">

        <div className="noorah-section__container">

          <SectionLabel number="10">
            SOCIAL MEDIA KIT
          </SectionLabel>


          <div className="noorah-social-intro">

            <motion.h2
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{
                once: true,
              }}
            >
              Consistent
              <span> everywhere.</span>
            </motion.h2>

            <motion.p
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{
                once: true,
              }}
            >
              A cohesive social system designed
              to make the NOORAH identity instantly
              recognizable across platforms.
            </motion.p>

          </div>


          <ProjectImage
            src={images.socialMedia}
            alt="NOORAH social media kit"
            className="noorah-image--wide"
          />

        </div>

      </section>


      {/* =========================================
          CREATOR QUOTE
      ========================================= */}

      <section className="noorah-quote">

        <div className="noorah-quote__container">

          <motion.div
            className="noorah-quote__mark"
            initial={{
              opacity: 0,
              scale: 0.8,
            }}
            whileInView={{
              opacity: 1,
              scale: 1,
            }}
            viewport={{
              once: true,
            }}
          >
            “
          </motion.div>


          <motion.div
            className="noorah-quote__content"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
            }}
          >

            <ProjectImage
              src={images.creatorQuote}
              alt="NOORAH creator quote"
              className="noorah-quote__image"
            />

          </motion.div>

        </div>

      </section>


      {/* =========================================
          MERCHANDISE
      ========================================= */}

      <section className="noorah-section">

        <div className="noorah-section__container">

          <SectionLabel number="11">
            MERCHANDISE COLLECTION
          </SectionLabel>


          <motion.div
            className="noorah-merch-heading"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
            }}
          >

            <h2>
              A brand you can
              <span> take with you.</span>
            </h2>

            <p>
              The NOORAH identity extends into
              merchandise, transforming the visual
              language into physical objects.
            </p>

          </motion.div>


          <ProjectImage
            src={images.merchandise}
            alt="NOORAH merchandise collection"
            className="noorah-image--wide"
          />

        </div>

      </section>


      {/* =========================================
          FINAL SHOWCASE
      ========================================= */}

      <section className="noorah-final">

        <div className="noorah-final__container">

          <motion.div
            className="noorah-final__visual"
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
              alt="NOORAH final brand showcase"
            />

          </motion.div>


          <motion.div
            className="noorah-final__content"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
            }}
          >

            <span>NOORAH</span>

            <h2>
              A creator identity
              <br />
              with a human touch.
            </h2>

            <p>
              Strategy. Identity. Content.
              Digital Experience.
            </p>

          </motion.div>

        </div>

      </section>


      {/* =========================================
          NEXT PROJECT
      ========================================= */}

      <section className="noorah-next">

        <Link
          href="/work/nexus"
          className="noorah-next__link"
        >

          <span className="noorah-next__label">
            NEXT PROJECT
          </span>


          <div className="noorah-next__title">

            <span>05</span>

            NEXUS

            <strong>↗</strong>

          </div>


          <span className="noorah-next__category">
            AI AUTOMATION
          </span>

        </Link>

      </section>

    </main>
  );
}