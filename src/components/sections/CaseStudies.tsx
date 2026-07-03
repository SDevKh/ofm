"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { TrendingUp, Users, DollarSign, ArrowUpRight } from "lucide-react";

/* ─── Sparkline SVG ─── */
function Sparkline({ data, color }: { data: number[]; color: string }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const w = 200;
  const h = 60;

  const points = data.map((v, i) => ({
    x: (i / (data.length - 1)) * w,
    y: h - ((v - min) / range) * h * 0.85 - 4,
  }));

  const pathD = points.reduce(
    (acc, p, i) =>
      i === 0
        ? `M ${p.x} ${p.y}`
        : `${acc} C ${points[i - 1].x + 20} ${points[i - 1].y}, ${p.x - 20} ${p.y}, ${p.x} ${p.y}`,
    ""
  );

  const fillD = `${pathD} L ${w} ${h} L 0 ${h} Z`;

  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      className="w-full"
      style={{ height: "60px" }}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`fill-${color.replace("#", "")}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <motion.path
        d={fillD}
        fill={`url(#fill-${color.replace("#", "")})`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      />
      <motion.path
        d={pathD}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      />
      {/* Last dot */}
      <circle
        cx={points[points.length - 1].x}
        cy={points[points.length - 1].y}
        r="3"
        fill={color}
      />
    </svg>
  );
}

const caseStudies = [
  {
    creator: "Creator A",
    niche: "Fitness & Lifestyle",
    avatar: "A",
    avatarColor: "#4d9fff",
    revenue: "$18,400/mo",
    revenueGrowth: "+340%",
    followers: "47K",
    followerGrowth: "+210%",
    monthlyGrowth: "+28%",
    duration: "6 months",
    chartData: [1200, 1800, 2400, 4100, 6800, 9200, 12400, 14600, 16900, 18400],
    color: "#4d9fff",
    quote: "My revenue tripled in the first 90 days. Best decision I ever made.",
  },
  {
    creator: "Creator B",
    niche: "Fashion & Beauty",
    avatar: "B",
    avatarColor: "#8b5cf6",
    revenue: "$31,200/mo",
    revenueGrowth: "+510%",
    followers: "128K",
    followerGrowth: "+380%",
    monthlyGrowth: "+35%",
    duration: "8 months",
    chartData: [2100, 3400, 5800, 8200, 12400, 16800, 21000, 25600, 28900, 31200],
    color: "#8b5cf6",
    quote: "I went from $5K to $31K monthly in under a year. Absolutely insane.",
  },
  {
    creator: "Creator C",
    niche: "Gaming & Entertainment",
    avatar: "C",
    avatarColor: "#f472b6",
    revenue: "$9,800/mo",
    revenueGrowth: "+220%",
    followers: "22K",
    followerGrowth: "+160%",
    monthlyGrowth: "+18%",
    duration: "4 months",
    chartData: [1800, 2200, 3100, 4200, 5500, 6800, 7600, 8400, 9100, 9800],
    color: "#f472b6",
    quote: "Professional, private, and they actually deliver. No BS.",
  },
];

export default function CaseStudies() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="case-studies"
      className="relative section-padding overflow-hidden"
      aria-label="Case studies"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(77, 159, 255, 0.04) 0%, transparent 60%)",
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
            Real Results
          </p>
          <h2
            className="text-3xl sm:text-5xl font-bold text-white mb-5"
            style={{ fontFamily: "var(--font-space-grotesk)", letterSpacing: "-0.03em" }}
          >
            Creator success{" "}
            <span className="gradient-text">stories</span>
          </h2>
          <p className="text-white/50 text-lg max-w-xl mx-auto">
            Real numbers from real creators who trusted us with their business.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {caseStudies.map((cs, i) => (
            <motion.article
              key={cs.creator}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="glass glass-hover rounded-2xl overflow-hidden"
              style={{ borderRadius: "24px" }}
            >
              {/* Card header */}
              <div className="p-5 sm:p-6 pb-0">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    {/* Avatar */}
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center text-white font-bold text-lg"
                      style={{
                        background: `linear-gradient(135deg, ${cs.color}40, ${cs.color}20)`,
                        border: `1px solid ${cs.color}30`,
                      }}
                    >
                      {cs.avatar}
                    </div>
                    <div>
                      <div
                        className="text-white font-semibold"
                        style={{ fontFamily: "var(--font-space-grotesk)" }}
                      >
                        {cs.creator}
                      </div>
                      <div className="text-white/40 text-xs">{cs.niche}</div>
                    </div>
                  </div>
                  <div className="text-xs text-white/30 font-medium">{cs.duration}</div>
                </div>

                {/* Revenue headline */}
                <div className="mb-4">
                  <div
                    className="text-3xl font-bold mb-1"
                    style={{
                      color: cs.color,
                      fontFamily: "var(--font-space-grotesk)",
                    }}
                  >
                    {cs.revenue}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <TrendingUp size={12} style={{ color: "#4dff8c" }} />
                    <span className="text-xs font-semibold" style={{ color: "#4dff8c" }}>
                      {cs.revenueGrowth} revenue growth
                    </span>
                  </div>
                </div>
              </div>

              {/* Sparkline chart */}
              <div className="px-5 sm:px-6 pb-2">
                <Sparkline data={cs.chartData} color={cs.color} />
              </div>

              {/* Stats row */}
              <div
                className="mx-5 sm:mx-6 mb-5 sm:mb-6 p-3 sm:p-4 rounded-xl grid grid-cols-2 gap-3"
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }}
              >
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 mb-0.5">
                    <Users size={11} className="text-white/40" />
                    <span className="text-xs text-white/40">Followers</span>
                  </div>
                  <div className="font-bold text-white text-sm">{cs.followers}</div>
                  <div className="text-xs" style={{ color: "#4dff8c" }}>{cs.followerGrowth}</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 mb-0.5">
                    <DollarSign size={11} className="text-white/40" />
                    <span className="text-xs text-white/40">Monthly</span>
                  </div>
                  <div className="font-bold text-white text-sm">{cs.monthlyGrowth}</div>
                  <div className="text-xs text-white/40">avg growth</div>
                </div>
              </div>

              {/* Quote */}
              <div
                className="mx-5 sm:mx-6 mb-5 sm:mb-6 p-3 sm:p-4 rounded-xl"
                style={{ background: `${cs.color}0a`, border: `1px solid ${cs.color}15` }}
              >
                <p className="text-white/60 text-sm italic leading-relaxed">
                  &quot;{cs.quote}&quot;
                </p>
              </div>

              {/* CTA */}
              <div className="px-5 sm:px-6 pb-5 sm:pb-6">
                <button
                  className="w-full py-2.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-1.5 transition-all duration-200 group"
                  style={{
                    background: `${cs.color}15`,
                    border: `1px solid ${cs.color}25`,
                    color: cs.color,
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.background = `${cs.color}25`;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.background = `${cs.color}15`;
                  }}
                >
                  View Full Case Study
                  <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
