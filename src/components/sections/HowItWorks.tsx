"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ClipboardList, Phone, Map, Rocket, TrendingUp } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: ClipboardList,
    title: "Apply",
    description:
      "Fill out our quick application to tell us about your current numbers, goals, and niche. Takes 3 minutes.",
    color: "#d4af37",
  },
  {
    number: "02",
    icon: Phone,
    title: "Discovery Call",
    description:
      "A senior strategist reviews your profile and holds a confidential 1-on-1 strategy session with you.",
    color: "#e8a598",
  },
  {
    number: "03",
    icon: Map,
    title: "Strategy",
    description:
      "We build a custom growth roadmap tailored to your brand, audience, and revenue targets.",
    color: "#e4cc17",
  },
  {
    number: "04",
    icon: Rocket,
    title: "Launch",
    description:
      "Your dedicated team is assembled and onboarded. We go live within 48 hours of signing.",
    color: "#d4af37",
  },
  {
    number: "05",
    icon: TrendingUp,
    title: "Scale",
    description:
      "Watch your revenue climb month over month as our systems compound your growth continuously.",
    color: "#e8a598",
  },
];

export default function HowItWorks() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="process"
      className="relative section-padding overflow-hidden"
      aria-label="How it works"
    >
      {/* Background gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 100%, rgba(212, 175, 55, 0.04) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="container-wide relative z-10" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/30 mb-3">
            The Process
          </p>
          <h2
            className="text-3xl sm:text-5xl font-bold text-white mb-5"
            style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.02em" }}
          >
            From application to{" "}
            <span className="gradient-text text-[20vw] sm:text-[5vw] font-caveat">full scale</span>
            <br />in 5 steps
          </h2>
        </motion.div>

        {/* Desktop: horizontal timeline */}
        <div className="hidden lg:block">
          {/* Connecting line */}
          <div className="relative mb-2">
            <div
              className="absolute top-10 left-[10%] right-[10%] h-px"
              style={{ background: "rgba(255,255,255,0.07)" }}
              aria-hidden="true"
            />
            <motion.div
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : {}}
              transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
              className="absolute top-10 left-[10%] right-[10%] h-px origin-left"
              style={{ background: "linear-gradient(90deg, #e8a598, #d4af37, #e4cc17)" }}
              aria-hidden="true"
            />
          </div>

          <div className="grid grid-cols-5 gap-6">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 40 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 + i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                  className="flex flex-col items-center text-center group"
                >
                  {/* Circle */}
                  <div
                    className="relative w-20 h-20 rounded-full flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110"
                    style={{
                      background: `${step.color}15`,
                      border: `1px solid ${step.color}40`,
                      boxShadow: `0 0 0 8px ${step.color}08`,
                    }}
                  >
                    <Icon size={28} style={{ color: step.color }} />
                    {/* Step number */}
                    <span
                      className="absolute -top-2 -right-2 w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center text-white"
                      style={{ background: step.color, fontSize: "10px" }}
                    >
                      {i + 1}
                    </span>
                  </div>

                  <h3
                    className="text-white font-bold text-lg mb-3"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {step.title}
                  </h3>
                  <p className="text-white/45 text-sm leading-relaxed">{step.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Mobile: vertical timeline */}
        <div className="lg:hidden flex flex-col gap-0">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: -30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex gap-5 pb-10 relative"
              >
                {/* Vertical line */}
                {i < steps.length - 1 && (
                  <div
                    className="absolute left-[22px] top-[44px] bottom-0 w-px"
                    style={{ background: `linear-gradient(to bottom, ${step.color}60, ${steps[i + 1].color}20)` }}
                    aria-hidden="true"
                  />
                )}

                {/* Icon */}
                <div
                  className="w-11 h-11 rounded-full flex-shrink-0 flex items-center justify-center relative z-10"
                  style={{ background: `${step.color}20`, border: `1px solid ${step.color}40` }}
                >
                  <Icon size={18} style={{ color: step.color }} />
                </div>

                {/* Content */}
                <div className="pt-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-bold" style={{ color: step.color }}>
                      Step {i + 1}
                    </span>
                    <span className="text-xs text-white/20">—</span>
                  </div>
                  <h3
                    className="text-white font-semibold text-base mb-2"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {step.title}
                  </h3>
                  <p className="text-white/45 text-sm leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
