"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import "./CustomCursor.css";

export default function CustomCursor() {
  const [position, setPosition] = useState({
    x: -100,
    y: -100,
  });

  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const moveCursor = (event) => {
      setPosition({
        x: event.clientX,
        y: event.clientY,
      });

      setIsVisible(true);
    };

    const handleOver = (event) => {
      if (
        event.target.closest(
          "a, button, input, textarea, select, [data-cursor]"
        )
      ) {
        setIsHovering(true);
      }
    };

    const handleOut = (event) => {
      if (
        event.target.closest(
          "a, button, input, textarea, select, [data-cursor]"
        )
      ) {
        setIsHovering(false);
      }
    };

    const handleLeave = () => {
      setIsVisible(false);
    };

    const handleEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener("mousemove", moveCursor);

    document.addEventListener("mouseover", handleOver);
    document.addEventListener("mouseout", handleOut);

    document.addEventListener("mouseleave", handleLeave);
    document.addEventListener("mouseenter", handleEnter);

    return () => {
      window.removeEventListener("mousemove", moveCursor);

      document.removeEventListener("mouseover", handleOver);
      document.removeEventListener("mouseout", handleOut);

      document.removeEventListener("mouseleave", handleLeave);
      document.removeEventListener("mouseenter", handleEnter);
    };
  }, []);

  return (
    <motion.div
      className={`custom-cursor ${
        isHovering ? "custom-cursor--hover" : ""
      } ${isVisible ? "custom-cursor--visible" : ""}`}
      animate={{
        x: position.x,
        y: position.y,
      }}
      transition={{
        type: "spring",
        stiffness: 500,
        damping: 35,
        mass: 0.25,
      }}
    >
      <span className="custom-cursor__ring" />

      <span className="custom-cursor__brand">
        WA
      </span>
    </motion.div>
  );
}