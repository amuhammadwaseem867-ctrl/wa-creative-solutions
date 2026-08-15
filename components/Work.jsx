"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import "./Work.css";

const projects = [
  {
    number: "01",
    title: "EMBER & OAK",
    category: "Brand Identity",
    description:
      "A complete luxury coffee brand experience combining visual identity, premium packaging and an editorial e-commerce website.",
    tags: ["Brand Identity", "Packaging", "Web Design"],
    route: "/work/ember-and-oaks",
    image: "/portfolio/project-01/cover.png",
  },
  {
    number: "02",
    title: "NOVA",
    category: "UI/UX Design",
    description:
      "A futuristic productivity platform focused on clean interfaces, intelligent workflows and seamless user experiences.",
    tags: ["UI/UX", "Figma", "Product Design"],
    route: "/work/nova",
    image: "/portfolio/project-02/cover.png",
  },
  {
    number: "03",
    title: "MONO",
    category: "Graphic Design",
    description:
      "A bold visual design system built around typography, composition and a refined monochromatic aesthetic.",
    tags: ["Graphic Design", "Art Direction", "Print"],
    route: "/work/mono",
    image: "/portfolio/project-03/cover.png",
  },
  {
    number: "04",
    title: "NEXUS",
    category: "AI Automation",
    description:
      "An intelligent automation concept designed to connect AI tools with modern business workflows.",
    tags: ["AI", "Automation", "Workflow"],
    route: "/work/nexus",
    image: "/portfolio/project-05/cover.png",
  },
  {
    number: "05",
    title: "VANTA",
    category: "Digital Marketing",
    description:
      "A performance-focused digital campaign combining creative direction, social content and strategic communication.",
    tags: ["Marketing", "Campaign", "Social"],
    route: "/work/vanta",
    image: "/portfolio/project-06/cover.png",
  },
  {
    number: "06",
    title: "NOORAH",
    category: "Brand Identity",
    description:
      "A distinctive brand identity created with a refined visual language, memorable character and a cohesive identity system.",
    tags: ["Branding", "Identity", "Art Direction"],
    route: "/work/noorah",
    image: "/portfolio/project-07/cover.jpg",
  },
];

export default function Work() {
  const [activeProject, setActiveProject] = useState(projects[0]);

  return (
    <section className="work" id="work">

      <div className="work-grid" />

      <div className="work-container">

        {/* =========================================
            HEADER
        ========================================= */}

        <motion.div
          className="work-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
        >
          <div className="work-eyebrow">
            <span className="work-dot" />
            <span>03 / SELECTED WORK</span>
          </div>

          <div className="work-header-meta">
            <span>PORTFOLIO</span>
            <span>2026</span>
          </div>
        </motion.div>


        {/* =========================================
            INTRO
        ========================================= */}

        <motion.div
          className="work-intro"
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >

          <div className="work-title">

            <h2>
              SELECTED
              <span>WORK.</span>
            </h2>

          </div>


          <div className="work-intro-copy">

            <span className="work-intro-label">
              OUR RECENT WORK
            </span>

            <p>
              A CURATED COLLECTION OF DIGITAL
              EXPERIENCES, IDENTITIES AND CREATIVE
              SYSTEMS BUILT WITH PURPOSE.
            </p>

          </div>

        </motion.div>


        {/* =========================================
            MAIN WORK AREA
        ========================================= */}

        <div className="work-content">


          {/* =========================================
              PROJECT LIST
          ========================================= */}

          <div className="work-projects">

            <div className="work-projects-header">

              <span>
                PROJECT
              </span>

              <span>
                06
              </span>

            </div>


            <div className="work-projects-list">

              {projects.map((project, index) => {

                const isActive =
                  activeProject.number === project.number;

                return (

                  <motion.button
                    key={project.number}
                    type="button"
                    className={`work-project ${
                      isActive
                        ? "work-project-active"
                        : ""
                    }`}
                    onClick={() =>
                      setActiveProject(project)
                    }
                    initial={{
                      opacity: 0,
                      x: -20,
                    }}
                    whileInView={{
                      opacity: 1,
                      x: 0,
                    }}
                    viewport={{
                      once: true,
                    }}
                    transition={{
                      duration: 0.45,
                      delay: index * 0.05,
                    }}
                  >

                    <span className="work-project-number">
                      {project.number}
                    </span>


                    <span className="work-project-info">

                      <span className="work-project-title">
                        {project.title}
                      </span>

                      <span className="work-project-category">
                        {project.category}
                      </span>

                    </span>


                    <span className="work-project-arrow">
                      ↗
                    </span>


                    <span className="work-project-line" />

                  </motion.button>

                );

              })}

            </div>

          </div>


          {/* =========================================
              PREVIEW
          ========================================= */}

          <div className="work-preview">

            <AnimatePresence mode="wait">

              <motion.div
                key={activeProject.number}
                className="work-card"
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  y: -20,
                }}
                transition={{
                  duration: 0.45,
                }}
              >


                {/* =================================
                    PROJECT IMAGE
                ================================= */}

                <Link
                  href={activeProject.route}
                  className="work-image-link"
                  aria-label={`View ${activeProject.title} project`}
                >

                  <div className="work-image">

                    <img
                      src={activeProject.image}
                      alt={`${activeProject.title} project`}
                    />


                    <div className="work-image-overlay" />


                    <div className="work-image-top">

                      <span>
                        PROJECT / {activeProject.number}
                      </span>

                      <span>
                        {activeProject.category}
                      </span>

                    </div>


                    <div className="work-image-view">

                      <span>
                        VIEW PROJECT
                      </span>

                      <span>
                        ↗
                      </span>

                    </div>

                  </div>

                </Link>


                {/* =================================
                    PROJECT DETAILS
                ================================= */}

                <div className="work-details">

                  <div className="work-details-top">

                    <div>

                      <span className="work-details-category">
                        {activeProject.category}
                      </span>

                      <h3>
                        {activeProject.title}
                      </h3>

                    </div>


                    <span className="work-details-number">
                      {activeProject.number}
                    </span>

                  </div>


                  <p className="work-description">
                    {activeProject.description}
                  </p>


                  <div className="work-details-bottom">

                    <div className="work-tags">

                      {activeProject.tags.map((tag) => (

                        <span key={tag}>
                          {tag}
                        </span>

                      ))}

                    </div>


                    <Link
                      href={activeProject.route}
                      className="work-cta"
                    >

                      <span>
                        VIEW PROJECT
                      </span>

                      <span>
                        ↗
                      </span>

                    </Link>

                  </div>

                </div>

              </motion.div>

            </AnimatePresence>

          </div>

        </div>


        {/* =========================================
            BOTTOM
        ========================================= */}

        <motion.div
          className="work-bottom"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >

          <span>
            06 PROJECTS
          </span>

          <span>
            DESIGN / DIGITAL / TECHNOLOGY
          </span>

          <span className="work-bottom-accent">
            2026
          </span>

        </motion.div>

      </div>

    </section>
  );
}