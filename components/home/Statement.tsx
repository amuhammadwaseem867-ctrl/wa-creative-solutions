"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";

const TEXT =
  "We are a creative technology studio. Brand strategy, design, engineering, 3D and AI — combined to build digital experiences that are as precise as they are memorable. Honest scope, clear pricing, no shortcuts.";

function Word({ word, progress, range, still }: { word: string; progress: MotionValue<number>; range: [number, number]; still: boolean }) {
  const opacity = useTransform(progress, range, [0.14, 1]);
  return (
    <motion.span style={{ opacity: still ? 1 : opacity }} className="mr-[0.26em] inline-block">
      {word}
    </motion.span>
  );
}

/** Scroll-linked reading reveal. The full sentence is real text (and fully opaque without motion). */
export function Statement() {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 45%"] });
  const words = TEXT.split(" ");

  return (
    <section className="section-y" aria-label="About the studio">
      <div className="container-site">
        <p className="label-bracket mb-8">Who we are</p>
        <p ref={ref} className="max-w-5xl font-display text-[clamp(1.7rem,3.6vw,3.1rem)] leading-[1.18] font-semibold tracking-[-0.025em] text-paper">
          {words.map((w, i) => (
            <Word key={i} word={w} still={!!reduce} progress={scrollYProgress} range={[i / words.length, Math.min(1, (i + 2) / words.length)]} />
          ))}
        </p>
      </div>
    </section>
  );
}
