"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import "./Contact.css";

const contactDetails = [
  {
    label: "PHONE",
    value: "0311 5962551",
    href: "tel:+923115962551",
  },
  {
    label: "PHONE",
    value: "0346 5187384",
    href: "tel:+923465187384",
  },
  {
    label: "EMAIL",
    value: "amuhammadwaseem867@gmail.com",
    href: "mailto:amuhammadwaseem867@gmail.com",
  },
  {
    label: "LOCATION",
    value: "Rawalpindi, Pakistan",
    href: "#",
  },
];

const services = [
  "BRAND IDENTITY",
  "WEB DESIGN",
  "WEB DEVELOPMENT",
  "UI / UX",
  "MOTION DESIGN",
  "DIGITAL MARKETING",
];

const ease = [0.22, 1, 0.36, 1];

export default function Contact() {
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting) return;

    setIsSubmitting(true);
    setSubmitStatus("");

    try {
      const form = e.currentTarget;
      const formData = new FormData(form);

      const payload = {
        name: formData.get("name")?.toString().trim(),
        email: formData.get("email")?.toString().trim(),
        company: formData.get("company")?.toString().trim(),
        service: formData.get("service")?.toString().trim(),
        message: formData.get("message")?.toString().trim(),
      };

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      /*
        Read response as text first.
        This prevents:
        "Unexpected end of JSON input"
        when the server returns an empty response.
      */
      const responseText = await response.text();

      let result = {};

      if (responseText) {
        try {
          result = JSON.parse(responseText);
        } catch (jsonError) {
          console.error(
            "Invalid API response:",
            responseText
          );

          throw new Error(
            "The server returned an invalid response."
          );
        }
      }

      if (!response.ok) {
        throw new Error(
          result?.message ||
            "Failed to send project inquiry."
        );
      }

      setSubmitStatus(
        "PROJECT INQUIRY SENT SUCCESSFULLY."
      );

      form.reset();

    } catch (error) {
      console.error(
        "Contact form error:",
        error
      );

      setSubmitStatus(
        error?.message ||
          "FAILED TO SEND. PLEASE TRY AGAIN."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      className="contact"
      id="contact"
    >
      {/* =================================================
          BACKGROUND
      ================================================= */}

      <div className="contact__grid-bg" />

      <div className="contact__glow contact__glow-one" />

      <div className="contact__glow contact__glow-two" />

      <div className="contact__orbit" />


      <div className="contact__container">

        {/* =================================================
            HEADER
        ================================================= */}

        <motion.header
          className="contact__header"
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
          <div className="contact__eyebrow">
            <span className="contact__eyebrow-dot" />

            <span>
              05 / CONTACT
            </span>
          </div>

          <div className="contact__header-meta">
            <span>
              LET&apos;S TALK
            </span>

            <i />

            <span>
              2026
            </span>
          </div>
        </motion.header>


        {/* =================================================
            HERO
        ================================================= */}

        <div className="contact__hero">

          <motion.div
            className="contact__hero-main"
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
              amount: 0.2,
            }}
            transition={{
              duration: 0.95,
              ease,
            }}
          >
            <span className="contact__kicker">
              GET IN TOUCH
            </span>

            <h2>
              LET&apos;S CREATE

              <span>
                SOMETHING
              </span>

              <span className="contact__outline">
                REMARKABLE.
              </span>
            </h2>

            <div
              className="contact__title-accent"
              aria-hidden="true"
            >
              <span />
              <span />
              <span />
            </div>
          </motion.div>


          <motion.div
            className="contact__hero-side"
            initial={{
              opacity: 0,
              x: 30,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
              amount: 0.25,
            }}
            transition={{
              duration: 0.8,
              delay: 0.12,
              ease,
            }}
          >
            <span className="contact__hero-side-index">
              01 / CONTACT
            </span>

            <p>
              HAVE A PROJECT, IDEA OR
              OPPORTUNITY IN MIND?
              TELL US WHAT YOU&apos;RE
              BUILDING AND LET&apos;S TURN
              IT INTO SOMETHING PEOPLE
              REMEMBER.
            </p>

            <span className="contact__hero-side-line" />
          </motion.div>

        </div>


        {/* =================================================
            DIVIDER
        ================================================= */}

        <motion.div
          className="contact__divider"
          initial={{
            scaleX: 0,
          }}
          whileInView={{
            scaleX: 1,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.9,
            ease,
          }}
        />


        {/* =================================================
            MAIN GRID
        ================================================= */}

        <div className="contact__grid">

          {/* =================================================
              LEFT — CONTACT INFO
          ================================================= */}

          <motion.div
            className="contact__info"
            initial={{
              opacity: 0,
              x: -30,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
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

            <div className="contact__info-intro">

              <span className="contact__info-label">
                CONTACT DETAILS
              </span>

              <p className="contact__info-description">
                LET&apos;S START A CONVERSATION
                ABOUT YOUR NEXT DIGITAL
                EXPERIENCE, BRAND OR
                CREATIVE PROJECT.
              </p>

            </div>


            <div className="contact__details">

              {contactDetails.map(
                (item, index) => (
                  <motion.a
                    key={`${item.label}-${index}`}
                    href={item.href}
                    className="contact__detail"
                    initial={{
                      opacity: 0,
                      y: 16,
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
                      delay: index * 0.06,
                      ease,
                    }}
                  >

                    <span className="contact__detail-label">
                      {item.label}
                    </span>

                    <span className="contact__detail-value">
                      {item.value}
                    </span>

                    <span
                      className="contact__detail-status"
                      aria-hidden="true"
                    >
                      <span />
                    </span>

                    <span
                      className="contact__detail-line"
                      aria-hidden="true"
                    />

                  </motion.a>
                )
              )}

            </div>

          </motion.div>


          {/* =================================================
              RIGHT — CTA
          ================================================= */}

          <motion.div
            className="contact__cta"
            initial={{
              opacity: 0,
              x: 30,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
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

            <AnimatePresence mode="wait">

              {!showForm ? (

                /* =================================================
                   ORIGINAL CTA
                ================================================= */

                <motion.div
                  key="cta"
                  initial={{
                    opacity: 0,
                  }}
                  animate={{
                    opacity: 1,
                  }}
                  exit={{
                    opacity: 0,
                  }}
                  transition={{
                    duration: 0.25,
                  }}
                >

                  <div className="contact__cta-top">

                    <span>
                      START A PROJECT
                    </span>

                    <span className="contact__cta-number">
                      02
                    </span>

                  </div>


                  <h3>
                    HAVE AN

                    <span>
                      IDEA?
                    </span>
                  </h3>


                  <p>
                    FROM IDENTITY AND
                    WEBSITES TO DIGITAL
                    EXPERIENCES, WE BUILD
                    WORK THAT GIVES BRANDS
                    A REASON TO BE REMEMBERED.
                  </p>


                  {/* SERVICES */}

                  <div className="contact__services">

                    <span className="contact__services-label">
                      WHAT DO YOU NEED?
                    </span>

                    <div className="contact__services-list">

                      {services.map(
                        (service, index) => (
                          <span key={service}>

                            <small>
                              {String(index + 1).padStart(
                                2,
                                "0"
                              )}
                            </small>

                            {service}

                          </span>
                        )
                      )}

                    </div>

                  </div>


                  {/* START PROJECT */}

                  <button
                    type="button"
                    className="contact__button contact__button-trigger"
                    onClick={() => {
                      setSubmitStatus("");
                      setShowForm(true);
                    }}
                  >
                    <span>
                      START A PROJECT
                    </span>

                    <span
                      className="contact__button-line"
                      aria-hidden="true"
                    />
                  </button>

                </motion.div>

              ) : (

                /* =================================================
                   PROJECT FORM
                ================================================= */

                <motion.div
                  key="form"
                  initial={{
                    opacity: 0,
                    y: 15,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                    y: -15,
                  }}
                  transition={{
                    duration: 0.45,
                    ease,
                  }}
                  className="contact__project-form"
                >

                  <div className="contact__cta-top">

                    <span>
                      PROJECT INQUIRY
                    </span>

                    <button
                      type="button"
                      className="contact__form-close"
                      onClick={() => {
                        if (!isSubmitting) {
                          setShowForm(false);
                          setSubmitStatus("");
                        }
                      }}
                      aria-label="Close project form"
                    >
                      CLOSE
                    </button>

                  </div>


                  <h3>
                    LET&apos;S

                    <span>
                      TALK.
                    </span>
                  </h3>


                  <p>
                    TELL US ABOUT YOUR PROJECT
                    AND WE&apos;LL GET BACK TO YOU
                    WITH THE NEXT STEPS.
                  </p>


                  {/* =================================================
                      FORM
                  ================================================= */}

                  <form
                    className="contact__form"
                    onSubmit={handleSubmit}
                  >

                    {/* NAME + EMAIL */}

                    <div className="contact__form-row">

                      <div className="contact__field">

                        <label htmlFor="contact-name">
                          YOUR NAME
                        </label>

                        <input
                          id="contact-name"
                          type="text"
                          name="name"
                          placeholder="YOUR NAME"
                          autoComplete="name"
                          required
                          disabled={isSubmitting}
                        />

                      </div>


                      <div className="contact__field">

                        <label htmlFor="contact-email">
                          EMAIL
                        </label>

                        <input
                          id="contact-email"
                          type="email"
                          name="email"
                          placeholder="YOUR EMAIL"
                          autoComplete="email"
                          required
                          disabled={isSubmitting}
                        />

                      </div>

                    </div>


                    {/* COMPANY + SERVICE */}

                    <div className="contact__form-row">

                      <div className="contact__field">

                        <label htmlFor="contact-company">
                          COMPANY / BRAND
                        </label>

                        <input
                          id="contact-company"
                          type="text"
                          name="company"
                          placeholder="COMPANY / BRAND"
                          autoComplete="organization"
                          disabled={isSubmitting}
                        />

                      </div>


                      <div className="contact__field">

                        <label htmlFor="contact-service">
                          SERVICE
                        </label>

                        <select
                          id="contact-service"
                          name="service"
                          defaultValue=""
                          required
                          disabled={isSubmitting}
                        >

                          <option
                            value=""
                            disabled
                          >
                            SELECT SERVICE
                          </option>

                          {services.map(
                            (service) => (
                              <option
                                key={service}
                                value={service}
                              >
                                {service}
                              </option>
                            )
                          )}

                        </select>

                      </div>

                    </div>


                    {/* PROJECT DETAILS */}

                    <div className="contact__field">

                      <label htmlFor="contact-message">
                        PROJECT DETAILS
                      </label>

                      <textarea
                        id="contact-message"
                        name="message"
                        rows="5"
                        placeholder="TELL US ABOUT YOUR PROJECT..."
                        required
                        disabled={isSubmitting}
                      />

                    </div>


                    {/* STATUS */}

                    {submitStatus && (
                      <motion.div
                        className={`contact__form-status ${
                          submitStatus.includes(
                            "SUCCESSFULLY"
                          )
                            ? "is-success"
                            : "is-error"
                        }`}
                        initial={{
                          opacity: 0,
                          y: 8,
                        }}
                        animate={{
                          opacity: 1,
                          y: 0,
                        }}
                      >
                        {submitStatus}
                      </motion.div>
                    )}


                    {/* SUBMIT */}

                    <button
                      type="submit"
                      className="contact__button"
                      disabled={isSubmitting}
                    >

                      <span>
                        {isSubmitting
                          ? "SENDING..."
                          : "SEND PROJECT INQUIRY"}
                      </span>

                      <span
                        className="contact__button-line"
                        aria-hidden="true"
                      />

                    </button>

                  </form>

                </motion.div>

              )}

            </AnimatePresence>

          </motion.div>

        </div>


        {/* =================================================
            BOTTOM
        ================================================= */}

        <motion.footer
          className="contact__bottom"
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
            WA CREATIVE SOLUTIONS
          </span>

          <span>
            RAWALPINDI, PAKISTAN
          </span>

          <span className="contact__accent">
            AVAILABLE FOR PROJECTS
          </span>

        </motion.footer>

      </div>
    </section>
  );
}