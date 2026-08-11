"use client";

import { motion } from "framer-motion";
import "./Process.css";

const processSteps = [
  {
    number: "01",
    title: "DISCOVER",
    description:
      "We understand your brand, audience, goals, and the problem we're solving before anything gets designed.",
    keyword: "UNDERSTAND",
  },
  {
    number: "02",
    title: "DEFINE",
    description:
      "We turn research into a clear creative direction, visual language, structure, and strategic foundation.",
    keyword: "STRATEGY",
  },
  {
    number: "03",
    title: "DESIGN",
    description:
      "We craft the identity, interface, interactions, and visual details that make the experience distinctive.",
    keyword: "CREATE",
  },
  {
    number: "04",
    title: "BUILD",
    description:
      "We transform the approved direction into a refined, responsive, and high-performing digital experience.",
    keyword: "DEVELOP",
  },
  {
    number: "05",
    title: "REFINE",
    description:
      "We test, polish, and optimize every detail until the final experience feels intentional from every angle.",
    keyword: "PERFECT",
  },
];

export default function Process() {
  return (
    <section className="process" id="process">

      {/* Background Grid */}
      <div className="process-grid" />

      <div className="process-container">

        {/* =========================================
            HEADER
        ========================================= */}

        <motion.div
          className="process-header"
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{
            once: true,
            amount: 0.25,
          }}
          transition={{
            duration: 0.7,
            ease: "easeOut",
          }}
        >

          <div className="process-label">
            <span className="process-label-number">
              04
            </span>

            <span className="process-label-line" />

            <span>
              OUR PROCESS
            </span>
          </div>


          <div className="process-heading">
            <h2>
              FROM
              <br />

              <span>IDEA</span>

              <br />

              TO IMPACT.
            </h2>
          </div>


          <div className="process-intro">

            <span className="process-intro-label">
              HOW WE WORK
            </span>

            <p>
              A focused creative process built to
              turn ambitious ideas into meaningful
              digital experiences.
            </p>

          </div>

        </motion.div>


        {/* =========================================
            PROCESS LIST
        ========================================= */}

        <div className="process-list">

          {processSteps.map((step, index) => (

            <motion.article
              className="process-item"
              key={step.number}
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
                duration: 0.65,
                delay: index * 0.08,
                ease: "easeOut",
              }}
            >

              {/* Progress Line */}

              <div className="process-progress">
                <span />
              </div>


              {/* Number */}

              <div className="process-number">
                {step.number}
              </div>


              {/* Main Content */}

              <div className="process-main">

                <div className="process-title-row">

                  <h3>
                    {step.title}
                  </h3>

                  <span className="process-keyword">
                    {step.keyword}
                  </span>

                </div>


                <p>
                  {step.description}
                </p>

              </div>


              {/* Arrow */}

              <div className="process-arrow">
                <span>↗</span>
              </div>


              {/* Hover Number */}

              <span className="process-background-number">
                {step.number}
              </span>

            </motion.article>

          ))}

        </div>


        {/* =========================================
            FOOTER STATEMENT
        ========================================= */}

        <motion.div
          className="process-footer"
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
            ONE PROCESS
          </span>

          <span>
            FIVE STAGES
          </span>

          <span className="process-footer-accent">
            BETTER OUTCOMES
          </span>

        </motion.div>

      </div>
    </section>
  );
}