"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { DollarSign, Users, Headphones, Globe, TrendingUp } from "lucide-react";

interface StatProps {
  end: number;
  suffix: string;
  prefix?: string;
  label: string;
  sublabel: string;
  icon: React.ElementType;
  delay: number;
}

function AnimatedCounter({ end, suffix, prefix = "", delay }: { end: number; suffix: string; prefix?: string; delay: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let startTime: number | null = null;
    const duration = 2000;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime - (delay * 1000);
      if (elapsed < 0) {
        requestAnimationFrame(step);
        return;
      }
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));
      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  }, [inView, end, delay]);

  return (
    <span ref={ref}>
      {prefix}{count}{suffix}
    </span>
  );
}

const stats: StatProps[] = [
  {
    end: 50,
    suffix: "M+",
    prefix: "$",
    label: "Creator Revenue Managed",
    sublabel: "Total revenue generated for our creators",
    icon: DollarSign,
    delay: 0,
  },
  {
    end: 200,
    suffix: "+",
    label: "Creators Managed",
    sublabel: "Active creators in our portfolio",
    icon: Users,
    delay: 0.1,
  },
  {
    end: 85,
    suffix: "+",
    label: "Team Members",
    sublabel: "Dedicated specialists across departments",
    icon: Headphones,
    delay: 0.2,
  },
  {
    end: 24,
    suffix: "/7",
    label: "Operations",
    sublabel: "Round-the-clock support and management",
    icon: TrendingUp,
    delay: 0.3,
  },
  {
    end: 30,
    suffix: "+",
    label: "Countries Served",
    sublabel: "Truly global creator management",
    icon: Globe,
    delay: 0.4,
  },
];

export default function TrustMetrics() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="results"
      className="relative section-padding overflow-hidden"
      aria-label="Trust metrics"
      ref={ref}
    >
      {/* Divider line top */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 opacity-30"
        style={{ background: "linear-gradient(to bottom, transparent, #4d9fff)" }}
        aria-hidden="true"
      />

      <div className="container-wide relative z-10">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/30 mb-3">
            By the Numbers
          </p>
          <h2
            className="text-3xl sm:text-4xl font-bold text-white"
            style={{ fontFamily: "var(--font-space-grotesk)", letterSpacing: "-0.02em" }}
          >
            Results that speak{" "}
            <span className="gradient-text">for themselves</span>
          </h2>
        </motion.div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="glass glass-hover rounded-2xl p-4 sm:p-6 text-center group"
                style={{ borderRadius: "20px" }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-4"
                  style={{ background: "rgba(77, 159, 255, 0.1)", border: "1px solid rgba(77, 159, 255, 0.2)" }}
                >
                  <Icon size={18} style={{ color: "#4d9fff" }} />
                </div>
                <div
                  className="text-3xl sm:text-4xl font-bold gradient-text mb-2"
                  style={{ fontFamily: "var(--font-space-grotesk)", letterSpacing: "-0.02em" }}
                >
                  <AnimatedCounter
                    end={stat.end}
                    suffix={stat.suffix}
                    prefix={stat.prefix}
                    delay={stat.delay}
                  />
                </div>
                <div className="text-white/80 font-semibold text-sm mb-1">{stat.label}</div>
                <div className="text-white/35 text-xs leading-relaxed">{stat.sublabel}</div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
