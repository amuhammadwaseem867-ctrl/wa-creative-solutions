"use client";

import { motion } from "framer-motion";
import "./TechStack.css";

const technologies = [
  {
    category: "WEB DEVELOPMENT",
    items: [
      {
        name: "HTML5",
        description: "Structure & Semantic Markup",
      },
      {
        name: "CSS3",
        description: "Styling & Responsive Layouts",
      },
      {
        name: "JavaScript",
        description: "Interactions & Functionality",
      },
      {
        name: "React",
        description: "Interactive User Interfaces",
      },
      {
        name: "Next.js",
        description: "High-Performance Web Development",
      },
      {
        name: "Python",
        description: "Backend & Automation",
      },
    ],
  },
  {
    category: "DESIGN SOFTWARE",
    items: [
      {
        name: "Figma",
        description: "UI/UX & Interface Design",
      },
      {
        name: "Photoshop",
        description: "Image Editing & Visual Design",
      },
      {
        name: "Illustrator",
        description: "Branding & Vector Design",
      },
      {
        name: "InDesign",
        description: "Editorial & Print Design",
      },
    ],
  },
  {
    category: "MOTION & VIDEO",
    items: [
      {
        name: "After Effects",
        description: "Motion Graphics & Animation",
      },
      {
        name: "Premiere Pro",
        description: "Professional Video Editing",
      },
      {
        name: "CapCut",
        description: "Social & Short-Form Video",
      },
    ],
  },
];

const ease = [0.22, 1, 0.36, 1];

export default function TechStack() {
  const totalTools = technologies.reduce(
    (total, group) => total + group.items.length,
    0
  );

  return (
    <section
      className="techstack"
      id="technology"
    >
      {/* BACKGROUND */}
      <div className="techstack-grid" />

      <div className="techstack-glow techstack-glow-one" />
      <div className="techstack-glow techstack-glow-two" />

      <div className="techstack-orbit" />

      <div className="techstack-container">

        {/* HEADER */}
        <motion.header
          className="techstack-header"
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
          <div className="techstack-index">
            <span className="techstack-dot" />
            <span>03 / TECHNOLOGY</span>
          </div>

          <div className="techstack-header-info">
            <span>OUR STACK</span>

            <i />

            <span>
              {totalTools} TOOLS
            </span>
          </div>
        </motion.header>


        {/* INTRO */}
        <motion.div
          className="techstack-intro"
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
            amount: 0.25,
          }}
          transition={{
            duration: 0.9,
            ease,
          }}
        >
          <div className="techstack-title-wrap">

            <span className="techstack-kicker">
              OUR TOOLKIT
            </span>

            <h2 className="techstack-title">
              <span>BUILT</span>
              <span>WITH</span>

              <span className="techstack-outline">
                PURPOSE.
              </span>
            </h2>

            <div
              className="techstack-title-accent"
              aria-hidden="true"
            >
              <span />
              <span />
              <span />
            </div>

          </div>

          <p className="techstack-intro-copy">
            FROM CODE TO CREATIVE TOOLS, WE USE MODERN
            TECHNOLOGIES AND INDUSTRY-STANDARD SOFTWARE
            TO BUILD FAST, REFINED AND MEMORABLE DIGITAL
            EXPERIENCES.
          </p>
        </motion.div>


        {/* TECHNOLOGY GROUPS */}
        <div className="techstack-groups">

          {technologies.map(
            (group, groupIndex) => (
              <motion.div
                className="techstack-group"
                key={group.category}
                initial={{
                  opacity: 0,
                  y: 28,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                  amount: 0.12,
                }}
                transition={{
                  duration: 0.65,
                  delay: groupIndex * 0.08,
                  ease,
                }}
              >

                {/* CATEGORY */}
                <div className="techstack-category">

                  <span>
                    {String(
                      groupIndex + 1
                    ).padStart(2, "0")}
                  </span>

                  <h3>
                    {group.category}
                  </h3>

                </div>


                {/* ITEMS */}
                <div className="techstack-items">

                  {group.items.map(
                    (item, index) => (
                      <motion.div
                        className="techstack-item"
                        key={item.name}
                        initial={{
                          opacity: 0,
                          y: 18,
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
                          delay:
                            groupIndex * 0.08 +
                            index * 0.045,
                          ease,
                        }}
                      >

                        <div className="techstack-item-number">
                          {String(
                            index + 1
                          ).padStart(2, "0")}
                        </div>


                        <div className="techstack-item-main">

                          <h4>
                            {item.name}
                          </h4>

                          <p>
                            {item.description}
                          </p>

                        </div>


                        {/* STATUS */}
                        <div
                          className="techstack-status"
                          aria-hidden="true"
                        >
                          <span />
                        </div>


                        <span
                          className="techstack-hover-line"
                          aria-hidden="true"
                        />

                      </motion.div>
                    )
                  )}

                </div>

              </motion.div>
            )
          )}

        </div>


        {/* FOOTER */}
        <motion.footer
          className="techstack-footer"
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
            delay: 0.1,
          }}
        >
          <span>
            CODE / DESIGN / MOTION
          </span>

          <span>
            MODERN TOOLS. BETTER EXPERIENCES.
          </span>

          <a href="#contact">
            START A PROJECT

            <span className="techstack-footer-line" />
          </a>
        </motion.footer>

      </div>
    </section>
  );
}