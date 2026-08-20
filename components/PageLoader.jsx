"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import "./PageLoader.css";

const ease = [0.22, 1, 0.36, 1];

export default function PageLoader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    document.body.classList.add("page-loading");

    const timer = setTimeout(() => {
      setIsLoading(false);
      document.body.classList.remove(
        "page-loading"
      );
    }, 2300);

    return () => {
      clearTimeout(timer);
      document.body.classList.remove(
        "page-loading"
      );
    };
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="page-loader"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: {
              duration: 0.7,
              ease,
            },
          }}
        >
          <motion.div
            className="page-loader-brand"
            initial={{
              opacity: 0,
              y: 10,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.4,
              ease,
            }}
          >
            {/* LOGO ROW */}
            <div className="page-loader-logo-row">

              {/* WA */}
              <motion.div
                className="page-loader-mark"
                initial={{
                  x: "-55vw",
                  rotate: -420,
                  opacity: 0,
                  scale: 0.65,
                }}
                animate={{
                  x: 0,
                  rotate: 0,
                  opacity: 1,
                  scale: 1,
                }}
                transition={{
                  duration: 1.15,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                WA
              </motion.div>

              {/* CREATIVE SOLUTIONS */}
              <motion.div
                className="page-loader-name"
                initial={{
                  x: -45,
                  opacity: 0,
                  clipPath:
                    "inset(0 100% 0 0)",
                }}
                animate={{
                  x: 0,
                  opacity: 1,
                  clipPath:
                    "inset(0 0% 0 0)",
                }}
                transition={{
                  duration: 0.75,
                  delay: 0.72,
                  ease,
                }}
              >
                CREATIVE SOLUTIONS
              </motion.div>
            </div>

            {/* UNDERLINE */}
            <motion.div
              className="page-loader-line"
              initial={{
                scaleX: 0,
                opacity: 0,
              }}
              animate={{
                scaleX: 1,
                opacity: 1,
              }}
              transition={{
                duration: 0.65,
                delay: 1.25,
                ease,
              }}
            />

            {/* SMALL STATUS */}
            <motion.div
              className="page-loader-status"
              initial={{
                opacity: 0,
                y: 8,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.5,
                delay: 1.4,
                ease,
              }}
            >
              CREATIVE TECHNOLOGY STUDIO
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}