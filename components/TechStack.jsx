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
    category: "DESIGN",
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

export default function TechStack() {
  return (
    <section className="techstack" id="technology">

      {/* BACKGROUND */}
      <div className="techstack-grid"></div>

      <div className="techstack-container">

        {/* HEADER */}
        <motion.div
          className="techstack-header"
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
          }}
          transition={{
            duration: 0.7,
          }}
        >
          <div className="techstack-index">
            <span className="techstack-dot"></span>

            <span>
              03 / TECHNOLOGY
            </span>
          </div>

          <div className="techstack-header-info">
            <span>
              OUR STACK
            </span>

            <span>
              13 TOOLS
            </span>
          </div>
        </motion.div>

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
          }}
          transition={{
            duration: 0.8,
          }}
        >
          <h2>
            BUILT
            <span>WITH</span>
            <span className="techstack-outline">
              PURPOSE.
            </span>
          </h2>

          <p>
            FROM CODE TO CREATIVE TOOLS,
            WE USE MODERN TECHNOLOGIES AND
            INDUSTRY-STANDARD SOFTWARE TO
            BUILD FAST, REFINED AND MEMORABLE
            DIGITAL EXPERIENCES.
          </p>
        </motion.div>

        {/* TECHNOLOGY GROUPS */}
        <div className="techstack-groups">

          {technologies.map((group, groupIndex) => (
            <motion.div
              className="techstack-group"
              key={group.category}
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
              }}
              transition={{
                duration: 0.6,
                delay: groupIndex * 0.1,
              }}
            >

              {/* CATEGORY */}
              <div className="techstack-category">
                <span>
                  {String(groupIndex + 1).padStart(2, "0")}
                </span>

                <h3>
                  {group.category}
                </h3>
              </div>

              {/* ITEMS */}
              <div className="techstack-items">

                {group.items.map((item, index) => (
                  <motion.div
                    className="techstack-item"
                    key={item.name}
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
                    }}
                    transition={{
                      duration: 0.45,
                      delay:
                        groupIndex * 0.1 +
                        index * 0.05,
                    }}
                  >

                    <div className="techstack-item-number">
                      {String(index + 1).padStart(2, "0")}
                    </div>

                    <div className="techstack-item-main">
                      <h4>
                        {item.name}
                      </h4>

                      <p>
                        {item.description}
                      </p>
                    </div>

                    <div className="techstack-arrow">
                      ↗
                    </div>

                    <div className="techstack-hover-line"></div>

                  </motion.div>
                ))}

              </div>

            </motion.div>
          ))}

        </div>

        {/* FOOTER */}
        <motion.div
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
          }}
        >
          <span>
            CODE / DESIGN / MOTION
          </span>

          <span>
            MODERN TOOLS. BETTER EXPERIENCES.
          </span>

          <a href="#contact">
            START A PROJECT ↗
          </a>
        </motion.div>

      </div>
    </section>
  );
}