"use client";

import type { ReactNode } from "react";

type Props = {
  as?: "div" | "li" | "article" | "section";
  className?: string;
  children: ReactNode;
};

/**
 * Card with a soft red glow that follows the pointer (pattern popularised by
 * Aceternity / Linear). Purely decorative — content stays static.
 */
export function Spotlight({ as: Tag = "div", className = "", children }: Props) {
  return (
    <Tag
      className={`spotlight ${className}`}
      onPointerMove={(e: React.PointerEvent<HTMLElement>) => {
        const r = e.currentTarget.getBoundingClientRect();
        e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
        e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
      }}
    >
      {children}
    </Tag>
  );
}
