"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  UserCog,
  MessageSquareHeart,
  TrendingUp,
  Lightbulb,
  Share2,
  Megaphone,
  BarChart3,
  ShieldCheck,
  Sparkles,
  Rocket,
} from "lucide-react";

const services = [
  {
    icon: UserCog,
    title: "Account Management",
    description:
      "A dedicated account manager handles your daily operations, keeping everything optimized and revenue-generating 24/7.",
    color: "#d4af37",
  },
  {
    icon: MessageSquareHeart,
    title: "Fan Messaging",
    description:
      "Professional chatters engage your fanbase with personalized messaging strategies that maximize conversions and retention.",
    color: "#e8a598",
  },
  {
    icon: TrendingUp,
    title: "Revenue Optimization",
    description:
      "Data-driven pricing, PPV strategy, and upsell frameworks that consistently push your earnings to new heights.",
    color: "#e4cc17",
  },
  {
    icon: Lightbulb,
    title: "Content Strategy",
    description:
      "Custom content calendars and creative direction tailored to your brand, audience, and growth goals.",
    color: "#d4af37",
  },
  {
    icon: Share2,
    title: "Social Media Growth",
    description:
      "Cross-platform growth strategies on Reddit, Twitter/X, TikTok, and Instagram to drive consistent traffic.",
    color: "#e8a598",
  },
  {
    icon: Megaphone,
    title: "Marketing",
    description:
      "Paid and organic marketing campaigns designed by specialists who understand the creator economy deeply.",
    color: "#e4cc17",
  },
  {
    icon: BarChart3,
    title: "Analytics & Reporting",
    description:
      "Weekly performance reports with actionable insights, revenue breakdowns, and growth tracking dashboards.",
    color: "#d4af37",
  },
  {
    icon: ShieldCheck,
    title: "DMCA & Privacy",
    description:
      "Full content protection service — active monitoring, DMCA takedowns, and privacy safeguarding done for you.",
    color: "#e8a598",
  },
  {
    icon: Sparkles,
    title: "Brand Strategy",
    description:
      "Build a sustainable, memorable personal brand that commands premium pricing and long-term audience loyalty.",
    color: "#e4cc17",
  },
  {
    icon: Rocket,
    title: "Scaling Systems",
    description:
      "Proven systems and automation frameworks to scale beyond income plateaus into apsara creator territory.",
    color: "#d4af37",
  },
];

export default function Services() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="services"
      className="relative section-padding overflow-hidden"
      aria-label="Services"
    >
      {/* Background mesh */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(212, 175, 55, 0.04) 0%, transparent 70%)",
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
            What We Do
          </p>
          <h2
            className="text-3xl sm:text-3xl font-bold text-white mb-5 font-dmSans"
          >
            Everything your creator business{" "}
            <span className="gradient-text text-[20vw] sm:text-[8vw] font-caveat">needs to scale</span>
          </h2>
          <p className="text-white/50 text-lg max-w-xl mx-auto">
            A full-stack management suite covering every dimension of creator growth — so you never have to juggle operations again.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {/* Span wide first card */}
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <motion.article
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.55,
                  delay: i * 0.06,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="glass glass-hover rounded-2xl p-5 sm:p-6 group relative overflow-hidden"
                style={{ borderRadius: "20px" }}
              >
                {/* Top glow on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                  style={{
                    background: `radial-gradient(circle at 50% 0%, ${service.color}15 0%, transparent 60%)`,
                  }}
                  aria-hidden="true"
                />

                {/* Icon */}
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 relative"
                  style={{
                    background: `${service.color}18`,
                    border: `1px solid ${service.color}30`,
                  }}
                >
                  <Icon size={20} style={{ color: service.color }} />
                </div>

                {/* Text */}
                <h3
                  className="text-white font-semibold text-base mb-2"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {service.title}
                </h3>
                <p className="text-white/45 text-sm leading-relaxed">
                  {service.description}
                </p>

                {/* Arrow on hover */}
                <div
                  className="mt-4 text-xs font-semibold opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center gap-1.5"
                  style={{ color: service.color }}
                >
                  Learn more <span>→</span>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
