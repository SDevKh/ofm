"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Check, X, Zap } from "lucide-react";

const usFeatures = [
  "Dedicated Account Manager",
  "Performance-Driven Compensation",
  "Deep Data Analytics & Reporting",
  "Privacy-First Operations",
  "Transparent Communication",
  "Long-Term Growth Focus",
  "Custom Strategy Per Creator",
  "24/7 Live Support",
  "Content Protection (DMCA)",
  "Vetted & Trained Chatters",
];

const themFeatures = [
  "Generic Account Handling",
  "Flat Fee, No Incentive",
  "No Performance Data",
  "Data Privacy Unknown",
  "Slow or No Communication",
  "Short-Term Thinking",
  "Cookie-Cutter Approach",
  "Limited Support Hours",
  "No DMCA Protection",
  "Untrained Contractors",
];

export default function WhyChooseUs() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="why-us"
      className="relative section-padding overflow-hidden"
      aria-label="Why choose us"
    >
      {/* Orb */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(212, 175, 55, 0.03) 0%, transparent 60%)",
          filter: "blur(80px)",
        }}
        aria-hidden="true"
      />

      <div className="container-wide relative z-10" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/30 mb-3">
            Why apsaraCreator
          </p>
          <h2
            className="text-3xl sm:text-5xl font-bold text-white"
            style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.02em" }}
          >
            The difference is{" "}
            <span className="gradient-text">night and day</span>
          </h2>
        </motion.div>

        {/* Comparison */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* Us Card */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative rounded-2xl overflow-hidden"
            style={{ borderRadius: "24px" }}
          >
            {/* Gradient border effect */}
            <div
              className="absolute inset-0 rounded-2xl"
              style={{
                background: "linear-gradient(135deg, rgba(232,165,152,0.35), rgba(212,175,55,0.22), rgba(228,204,23,0.1))",
                padding: "1px",
              }}
            />
            <div
              className="relative rounded-2xl p-6 sm:p-8 h-full"
              style={{
                background: "rgba(26, 12, 20, 0.45)",
                border: "1px solid rgba(232, 165, 152, 0.1)",
                boxShadow: "0 0 40px rgba(212, 175, 55, 0.06), inset 0 1px 0 rgba(232, 165, 152, 0.05)",
              }}
            >
              {/* Header */}
              <div className="flex items-center gap-3 mb-8">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: "linear-gradient(135deg, #e8a598, #d4af37)" }}
                >
                  <Zap size={18} className="text-[#0e0712]" fill="#0e0712" />
                </div>
                <div>
                  <div
                    className="text-white font-bold text-lg"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    ApsaraCreator Agency
                  </div>
                  <div className="text-xs text-white/40">Premium Management</div>
                </div>
              </div>

              <ul className="space-y-3.5">
                {usFeatures.map((feature, i) => (
                  <motion.li
                    key={feature}
                    initial={{ opacity: 0, x: -10 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.4 + i * 0.04 }}
                    className="flex items-center gap-3"
                  >
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ background: "rgba(212, 175, 55, 0.12)", border: "1px solid rgba(212, 175, 55, 0.25)" }}
                    >
                      <Check size={11} style={{ color: "#d4af37" }} strokeWidth={3} />
                    </div>
                    <span className="text-white/85 text-sm font-medium">{feature}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Others Card */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-2xl p-6 sm:p-8"
            style={{
              background: "rgba(255, 255, 255, 0.02)",
              border: "1px solid rgba(255, 255, 255, 0.06)",
              borderRadius: "24px",
            }}
          >
            {/* Header */}
            <div className="flex items-center gap-3 mb-8">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
              >
                <span className="text-white/30 text-lg font-bold">?</span>
              </div>
              <div>
                <div
                  className="text-white/50 font-bold text-lg"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Other Agencies
                </div>
                <div className="text-xs text-white/25">Generic Management</div>
              </div>
            </div>

            <ul className="space-y-3.5">
              {themFeatures.map((feature, i) => (
                <motion.li
                  key={feature}
                  initial={{ opacity: 0, x: 10 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.5 + i * 0.04 }}
                  className="flex items-center gap-3"
                >
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: "rgba(255, 80, 80, 0.1)", border: "1px solid rgba(255, 80, 80, 0.2)" }}
                  >
                    <X size={11} style={{ color: "#ff5050" }} strokeWidth={3} />
                  </div>
                  <span className="text-white/35 text-sm">{feature}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
