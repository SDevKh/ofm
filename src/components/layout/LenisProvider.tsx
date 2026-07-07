"use client";

import { ReactLenis, LenisRef } from "lenis/react";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "lenis/dist/lenis.css";

// Register GSAP ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export default function LenisProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<LenisRef>(null);

  useEffect(() => {
    let lenisInstance: any = null;

    // Disable lag smoothing for tighter GSAP integration
    gsap.ticker.lagSmoothing(0);

    // Synchronize Lenis scrolling with GSAP ticker loop
    function update(time: number) {
      if (!lenisInstance) {
        lenisInstance = lenisRef.current?.lenis;
        if (lenisInstance) {
          lenisInstance.on("scroll", ScrollTrigger.update);
        }
      }
      if (lenisInstance) {
        lenisInstance.raf(time * 1000);
      }
    }

    gsap.ticker.add(update);

    // Clean up connections on unmount
    return () => {
      gsap.ticker.remove(update);
      if (lenisInstance) {
        lenisInstance.off("scroll", ScrollTrigger.update);
      }
    };
  }, []);

  return (
    <ReactLenis
      root
      ref={lenisRef}
      options={{
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // easeOutExpo
        orientation: "vertical",
        gestureOrientation: "vertical",
        smoothWheel: true,
        wheelMultiplier: 1.0,
        touchMultiplier: 1.5,
        autoRaf: false, // Drive RAF through GSAP ticker for perfect synchronization
      }}
    >
      {children}
    </ReactLenis>
  );
}
