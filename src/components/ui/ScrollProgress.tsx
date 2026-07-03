"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-[2px] origin-left z-[9999]"
      aria-hidden="true"
    >
      <div
        className="h-full w-full"
        style={{
          background: "linear-gradient(90deg, #4d9fff, #8b5cf6, #f472b6)",
        }}
      />
    </motion.div>
  );
}
