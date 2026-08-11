"use client";

import { motion } from "framer-motion";
import "./Testimonials.css";

const testimonials = [
  {
    number: "01",
    name: "Justin Guld",
    role: "Co-Founder",
    company: "MODL",
    quote:
      "Truly incredible minds and humans here.",
    source: "Founding Creative",
  },
  {
    number: "02",
    name: "Brooke McPoyle",
    role: "Founder",
    company: "Musical Breathwork",
    quote:
      "Their expertise and creativity brought our vision to life, resulting in a stunning website.",
    source: "Founding Creative",
  },
  {
    number: "03",
    name: "Anna Claire Beasley",
    role: "Founder",
    company: "",
    quote:
      "Everything about this homepage is exactly what I was imagining. I'm so blown away!",
    source: "Studio Founded",
  },
  {
    number: "04",
    name: "Lauren Ledbetter",
    role: "Founder",
    company: "Ledbetter Studio",
    quote:
      "They demonstrated a remarkable level of professionalism, talent, and a genuine commitment to understanding and realizing my vision.",
    source: "Studio Founded",
  },
];

export default function Testimonials() {
  return (
    <section className="testimonials" id="testimonials">

      <div className="testimonials-grid" />

      <div className="testimonials-container">

        {/* HEADER */}

        <motion.div
          className="testimonials-header"
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
        >

          <div className="testimonials-label">
            <span className="testimonials-dot" />
            <span>05 / INDUSTRY VOICES</span>
          </div>

          <div className="testimonials-heading-row">

            <h2>
              WORDS
              <span> MATTER.</span>
            </h2>

            <div className="testimonials-intro">
              <span>SELECTED PERSPECTIVES</span>

              <p>
                A collection of perspectives from founders
                and creative leaders on meaningful digital
                work.
              </p>
            </div>

          </div>

        </motion.div>


        {/* TESTIMONIALS */}

        <div className="testimonials-list">

          {testimonials.map((testimonial, index) => (

            <motion.article
              className="testimonial"
              key={testimonial.number}
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
              }}
            >

              <div className="testimonial-number">
                {testimonial.number}
              </div>


              <div className="testimonial-quote">

                <span className="testimonial-mark">
                  “
                </span>

                <p>
                  {testimonial.quote}
                </p>

              </div>


              <div className="testimonial-person">

                <div className="testimonial-avatar">
                  {testimonial.name
                    .split(" ")
                    .map((word) => word[0])
                    .join("")
                    .slice(0, 2)}
                </div>

                <div>
                  <h3>
                    {testimonial.name}
                  </h3>

                  <p>
                    {testimonial.role}
                    {testimonial.company
                      ? ` · ${testimonial.company}`
                      : ""}
                  </p>
                </div>

              </div>


              <div className="testimonial-source">
                <span>PUBLIC TESTIMONIAL</span>
                <span>↗</span>
              </div>

            </motion.article>

          ))}

        </div>


        {/* FOOTER */}

        <motion.div
          className="testimonials-footer"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span>TRUST / CREATIVITY / RESULTS</span>

          <span>
            PERSPECTIVES FROM THE INDUSTRY
          </span>

          <span className="testimonials-accent">
            2026
          </span>
        </motion.div>

      </div>
    </section>
  );
}