"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import "./PageLoader.css";

export default function PageLoader() {
  const [showLoader, setShowLoader] = useState(null);

  useEffect(() => {
    const hasLoaded =
      sessionStorage.getItem("wa-site-loaded");

    if (hasLoaded) {
      setShowLoader(false);
      return;
    }

    setShowLoader(true);

    sessionStorage.setItem(
      "wa-site-loaded",
      "true"
    );

    const timer = setTimeout(() => {
      setShowLoader(false);
    }, 2100);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  // Avoid flashing page before checking sessionStorage
  if (showLoader === null || !showLoader) {
    return null;
  }

  return (
    <motion.div
      className="page-loader"
      initial={{
        opacity: 1,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
      }}
    >
      <div className="page-loader-brand">

        {/* LOGO */}
        <div className="page-loader-logo-row">

          <motion.div
            className="page-loader-mark"
            initial={{
              x: "-48vw",
              rotate: -360,
              opacity: 0,
            }}
            animate={{
              x: 0,
              rotate: 0,
              opacity: 1,
            }}
            transition={{
              duration: 1.05,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            WA
          </motion.div>

          <motion.div
            className="page-loader-name"
            initial={{
              opacity: 0,
              x: -35,
              clipPath:
                "inset(0 100% 0 0)",
            }}
            animate={{
              opacity: 1,
              x: 0,
              clipPath:
                "inset(0 0% 0 0)",
            }}
            transition={{
              duration: 0.72,
              delay: 0.72,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            CREATIVE SOLUTIONS
          </motion.div>

        </div>

        {/* LINE */}
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
            delay: 1.05,
            ease: [0.22, 1, 0.36, 1],
          }}
        />

      </div>
    </motion.div>
  );
}