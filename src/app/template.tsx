"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [animating, setAnimating] = useState(true);

  useEffect(() => {
    // Whenever pathname changes, trigger the liquid transition
    setAnimating(true);
    const timer = setTimeout(() => {
      setAnimating(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <>
      {/* Liquid morphing SVG page overlay */}
      <svg
        className="fixed inset-0 z-[9999] w-screen h-screen pointer-events-none"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <motion.path
          fill="#0e0712"
          stroke="#d4af37"
          strokeWidth="0.5"
          initial={{ d: "M 0 100 V 100 Q 50 100 100 100 V 100 Z" }}
          animate={
            animating
              ? {
                  d: [
                    "M 0 100 V 100 Q 50 100 100 100 V 100 Z", // Flat at bottom
                    "M 0 100 V 45 Q 50 0 100 45 V 100 Z",     // Morph curve rising up
                    "M 0 100 V 0 Q 50 0 100 0 V 100 Z",       // Cover whole screen
                    "M 0 0 V 45 Q 50 100 100 45 V 0 Z",       // Morph curve moving out top
                    "M 0 0 V 0 Q 50 0 100 0 V 0 Z",           // Flat at top (exited)
                  ],
                }
              : { d: "M 0 0 V 0 Q 50 0 100 0 V 0 Z" }
          }
          transition={{
            duration: 1.2,
            times: [0, 0.3, 0.5, 0.8, 1],
            ease: "easeInOut",
          }}
        />
      </svg>

      {/* Main page content wrapper - zooms slightly and fades in sync with liquid slide */}
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 20, scale: 0.97 }}
        animate={
          animating
            ? {
                opacity: [0, 0, 1],
                y: [20, 20, 0],
                scale: [0.97, 0.97, 1],
              }
            : { opacity: 1, y: 0, scale: 1 }
        }
        transition={{
          duration: 1.2,
          times: [0, 0.55, 1],
          ease: "easeInOut",
        }}
        className="w-full min-h-screen"
      >
        {children}
      </motion.div>
    </>
  );
}
