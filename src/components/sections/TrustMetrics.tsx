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
    end: 5,
    suffix: "M+",
    prefix: "$",
    label: "Creator Revenue Managed",
    sublabel: "Total revenue generated for our creators",
    icon: DollarSign,
    delay: 0,
  },
  {
    end: 40,
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
    end: 8,
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
        style={{ background: "linear-gradient(to bottom, transparent, var(--color-amber-gold))" }}
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
            style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.01em" }}
          >
            Results that speak{" "}
            <span className="gradient-text text-[20vw] sm:text-[5vw] font-caveat">for themselves</span>
          </h2>
        </motion.div>


        {/* Stats grid */}
        <div className="content sm:grid-cols-3">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className=""
                style={{ lineHeight: 0.9 }}
              >

                <div
                  className="text-[5vw] sm:text-[5vw] font-bold font-syne gradient-text mb-2"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  <AnimatedCounter
                    end={stat.end}
                    suffix={stat.suffix}
                    prefix={stat.prefix}
                    delay={stat.delay}
                  />
                </div>
                <div className="text-white/80 font-bold text-[8vw] mb-1 font-syne">{stat.label}</div>
                <div className="text-white/35 text-[3vw] leading-relaxed w-[100%] border-b border-gray-100  mb-5 font-syne">{stat.sublabel}</div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
