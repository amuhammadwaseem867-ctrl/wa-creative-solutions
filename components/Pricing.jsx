"use client";

import { motion } from "framer-motion";
import "./Pricing.css";

const pricingPlans = [
  {
    number: "01",
    name: "STARTER",
    label: "FOR NEW BUSINESSES",
    price: "$499",
    description:
      "A focused creative package for businesses that need a strong and professional digital foundation.",
    features: [
      "Logo Design",
      "Basic Brand Identity",
      "Social Media Assets",
      "Responsive Landing Page",
      "Basic UI/UX",
    ],
    featured: false,
  },

  {
    number: "02",
    name: "GROWTH",
    label: "MOST POPULAR",
    price: "$1,499",
    description:
      "A complete design and development package built for growing businesses ready to look and perform professionally.",
    features: [
      "Complete Brand Identity",
      "UI/UX Design",
      "Premium Website Design",
      "Next.js Development",
      "Responsive Development",
      "Basic SEO Setup",
      "Motion & Interaction",
    ],
    featured: true,
  },

  {
    number: "03",
    name: "SIGNATURE",
    label: "FOR AMBITIOUS BRANDS",
    price: "$2,999+",
    description:
      "A premium end-to-end digital experience combining strategy, branding, design and high-performance development.",
    features: [
      "Strategic Brand Direction",
      "Complete Visual Identity",
      "Advanced UI/UX",
      "Premium Website",
      "Next.js Development",
      "Advanced Animations",
      "CMS / Dynamic Content",
      "SEO & Performance",
      "Priority Support",
    ],
    featured: false,
  },
];

export default function Pricing() {
  return (
    <section className="pricing" id="pricing">
      {/* BACKGROUND GRID */}
      <div className="pricing-grid"></div>

      {/* DECORATIVE ELEMENTS */}
      <div className="pricing-orbit pricing-orbit-one"></div>
      <div className="pricing-orbit pricing-orbit-two"></div>

      <div className="pricing-container">

        {/* HEADER */}
        <motion.div
          className="pricing-header"
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
          <div className="pricing-index">
            <span className="pricing-dot"></span>

            <span>05 / PRICING</span>
          </div>

          <div className="pricing-header-info">
            <span>INVESTMENT</span>
            <span>GLOBAL CLIENTS</span>
          </div>
        </motion.div>

        {/* INTRO */}
        <motion.div
          className="pricing-intro"
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
          <div className="pricing-title-wrap">
            <h2>
              SIMPLE
              <span>PRICING</span>
              <span className="pricing-outline">
                SERIOUS
              </span>
              <span className="pricing-lime">
                WORK.
              </span>
            </h2>
          </div>

          <div className="pricing-intro-copy">
            <p>
              PREMIUM CREATIVE, DESIGN AND DEVELOPMENT
              SERVICES FOR BUSINESSES THAT WANT TO BUILD
              A STRONGER DIGITAL PRESENCE.
            </p>

            <span className="pricing-note">
              ALL PRICES ARE STARTING POINTS AND MAY VARY
              DEPENDING ON PROJECT SCOPE.
            </span>
          </div>
        </motion.div>

        {/* PRICING GRID */}
        <div className="pricing-list">
          {pricingPlans.map((plan, index) => (
            <motion.article
              className={`pricing-card ${
                plan.featured ? "pricing-card-featured" : ""
              }`}
              key={plan.number}
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
                delay: index * 0.1,
              }}
            >
              {/* CARD TOP */}
              <div className="pricing-card-top">

                <div className="pricing-card-number">
                  {plan.number}
                </div>

                {plan.featured && (
                  <div className="pricing-featured">
                    RECOMMENDED
                  </div>
                )}
              </div>

              {/* PLAN NAME */}
              <div className="pricing-plan-heading">
                <span>{plan.label}</span>

                <h3>{plan.name}</h3>
              </div>

              {/* PRICE */}
              <div className="pricing-price">
                <span>FROM</span>

                <strong>{plan.price}</strong>
              </div>

              {/* DESCRIPTION */}
              <p className="pricing-description">
                {plan.description}
              </p>

              {/* FEATURES */}
              <div className="pricing-features">

                <div className="pricing-features-header">
                  <span>INCLUDED</span>
                  <span>{String(plan.features.length).padStart(2, "0")}</span>
                </div>

                {plan.features.map((feature, featureIndex) => (
                  <div
                    className="pricing-feature"
                    key={feature}
                  >
                    <span className="pricing-feature-number">
                      {String(featureIndex + 1).padStart(2, "0")}
                    </span>

                    <span className="pricing-feature-name">
                      {feature}
                    </span>

                    <span className="pricing-feature-check">
                      +
                    </span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <a
                href="#contact"
                className="pricing-button"
              >
                <span>START A PROJECT</span>

                <span className="pricing-button-arrow">
                  ↗
                </span>
              </a>

              {/* HOVER LINE */}
              <div className="pricing-hover-line"></div>
            </motion.article>
          ))}
        </div>

        {/* CUSTOM PROJECT */}
        <motion.div
          className="pricing-custom"
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
            delay: 0.2,
          }}
        >
          <div className="pricing-custom-left">

            <span className="pricing-custom-index">
              04
            </span>

            <div>
              <span className="pricing-custom-label">
                CUSTOM PROJECT
              </span>

              <h3>
                HAVE SOMETHING
                <span>DIFFERENT IN MIND?</span>
              </h3>
            </div>

          </div>

          <div className="pricing-custom-right">

            <p>
              LARGE-SCALE DIGITAL PRODUCTS, UNIQUE BRAND
              SYSTEMS AND CUSTOM EXPERIENCES ARE PRICED
              BASED ON YOUR SPECIFIC REQUIREMENTS.
            </p>

            <a href="#contact">
              DISCUSS YOUR PROJECT
              <span>↗</span>
            </a>

          </div>
        </motion.div>

        {/* FOOTER */}
        <motion.div
          className="pricing-footer"
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
            DESIGN / DEVELOPMENT / STRATEGY
          </span>

          <span>
            QUALITY OVER QUANTITY
          </span>

          <a href="#contact">
            START A PROJECT ↗
          </a>
        </motion.div>

      </div>
    </section>
  );
}