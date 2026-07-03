"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CursorGlow() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 200 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    if (isMobile) return;

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 200);
      cursorY.set(e.clientY - 200);
    };

    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, [cursorX, cursorY]);

  return (
    <motion.div
      style={{
        translateX: cursorXSpring,
        translateY: cursorYSpring,
      }}
      className="pointer-events-none fixed top-0 left-0 z-50 hidden md:block"
      aria-hidden="true"
    >
      <div
        className="w-[400px] h-[400px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(77, 159, 255, 0.06) 0%, rgba(139, 92, 246, 0.04) 40%, transparent 70%)",
        }}
      />
    </motion.div>
  );
}
