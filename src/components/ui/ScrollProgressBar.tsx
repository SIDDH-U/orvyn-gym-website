"use client";

import React from "react";
import { motion, useScroll, useSpring } from "framer-motion";

export function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-[2px] bg-[var(--color-accent,#E4FF1A)] z-50 origin-left pointer-events-none shadow-[0_0_8px_var(--color-glow,rgba(228,255,26,0.6))]"
    />
  );
}
