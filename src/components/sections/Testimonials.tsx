"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sophie M.",
    niche: "Only Fans",
    avatar: "SM",
    avatarColor: "#af37d4ff",
    rating: 5,
    revenue: "$22,000/mo",
    quote:
      "apsaraCreator completely transformed my business. Before, I was stuck at $3K/month and burnout. Now I earn $22K and barely spend time on admin. Their team is world-class.",
    growth: "+633%",
  },
  {
    name: "Aria K.",
    niche: "Instagram",
    avatar: "AK",
    avatarColor: "#af98e8ff",
    rating: 5,
    revenue: "$41,000/mo",
    quote:
      "I was skeptical at first, but the results speak for themselves. In 8 months, they scaled me to $41K/month. The messaging team alone is worth every cent.",
    growth: "+720%",
  },
  {
    name: "Luna V.",
    niche: "Only Fans",
    avatar: "LV",
    avatarColor: "#e417d3ff",
    rating: 5,
    revenue: "$15,500/mo",
    quote:
      "The privacy and professionalism are unmatched. They handle everything discreetly and communicate clearly. I finally feel like I run a real business.",
    growth: "+410%",
  },
  {
    name: "Mia R.",
    niche: "Favenu",
    avatar: "MR",
    avatarColor: "#a237d4ff",
    rating: 5,
    revenue: "$8,900/mo",
    quote:
      "Started with them 4 months ago. Revenue went from $2K to nearly $9K. The content strategy they built for me is genius. Highly recommend to any serious creator.",
    growth: "+345%",
  },
  {
    name: "Zara N.",
    niche: "Only Fans",
    avatar: "ZN",
    avatarColor: "#e898bfff",
    rating: 5,
    revenue: "$28,000/mo",
    quote:
      "Their analytics reports are insane. I actually understand my business now. The data-driven approach they use is what separates them from every other agency.",
    growth: "+480%",
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} star rating`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={14}
          fill={i < rating ? "#24fb44ff" : "none"}
          stroke={i < rating ? "#24fb8cff" : "rgba(255,255,255,0.2)"}
        />
      ))}
    </div>
  );
}

export default function Testimonials() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const [direction, setDirection] = useState(1);

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((c) => (c + 1) % testimonials.length);
  }, []);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  }, []);

  // Auto-play
  useEffect(() => {
    if (paused) return;
    const id = setInterval(next, 5000);
    return () => clearInterval(id);
  }, [paused, next]);

  const variants = {
    enter: (d: number) => ({ opacity: 0, x: d > 0 ? 60 : -60 }),
    center: { opacity: 1, x: 0 },
    exit: (d: number) => ({ opacity: 0, x: d > 0 ? -60 : 60 }),
  };

  const t = testimonials[current];

  return (
    <section
      id="testimonials"
      className="relative section-padding overflow-hidden"
      aria-label="Testimonials"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 80%, rgba(157, 55, 212, 0.03) 0%, transparent 70%)",
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
            Creator Stories
          </p>
          <h2
            className="text-3xl sm:text-5xl font-bold text-white"
            style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.02em" }}
          >
            Hear it from our{" "}
            <span className="gradient-text text-[20vw] sm:text-[5vw] font-caveat">creators</span>
          </h2>
        </motion.div>

        {/* Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="max-w-3xl mx-auto"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div
            className="relative rounded-3xl p-1 overflow-hidden"
            style={{
              background: "linear-gradient(135deg, rgba(232,165,152,0.25), rgba(212, 55, 120, 0.15), rgba(228,204,23,0.1))",
            }}
          >
            <div
              className="rounded-3xl overflow-hidden"
              style={{ background: "rgba(18, 8, 16, 0.95)", minHeight: "280px" }}
            >
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={current}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="p-6 sm:p-10 md:p-14"
                >
                  {/* Quote icon */}
                  <Quote
                    size={32}
                    className="mb-6 opacity-20"
                    style={{ color: t.avatarColor }}
                    fill={t.avatarColor}
                  />

                  {/* Quote text */}
                  <p
                    className="text-white/85 text-lg sm:text-xl leading-relaxed mb-8 italic"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    &quot;{t.quote}&quot;
                  </p>

                  {/* Author */}
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div className="flex items-center gap-4">
                      {/* Avatar */}
                      <div
                        className="w-12 h-12 rounded-2xl flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                        style={{
                          background: `linear-gradient(135deg, ${t.avatarColor}50, ${t.avatarColor}20)`,
                          border: `1px solid ${t.avatarColor}40`,
                        }}
                      >
                        {t.avatar}
                      </div>
                      <div>
                        <div className="text-white font-semibold text-base" style={{ fontFamily: "var(--font-display)" }}>
                          {t.name}
                        </div>
                        <div className="text-white/40 text-sm">{t.niche}</div>
                        <StarRating rating={t.rating} />
                      </div>
                    </div>

                    {/* Revenue badge */}
                    <div
                      className="px-4 py-2 rounded-xl text-center"
                      style={{
                        background: `${t.avatarColor}12`,
                        border: `1px solid ${t.avatarColor}25`,
                      }}
                    >
                      <div className="text-xs text-white/40 mb-0.5">Monthly Revenue</div>
                      <div className="font-bold text-lg" style={{ color: t.avatarColor, fontFamily: "var(--font-display)" }}>
                        {t.revenue}
                      </div>
                      <div className="text-xs font-semibold" style={{ color: "#34d399" }}>
                        {t.growth} growth
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              aria-label="Previous testimonial"
              className="w-10 h-10 rounded-full flex items-center justify-center text-white/50 hover:text-white transition-all duration-200 cursor-pointer"
              style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
            >
              <ChevronLeft size={18} />
            </button>

            {/* Dots */}
            <div className="flex items-center gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
                  aria-label={`Go to testimonial ${i + 1}`}
                  className="transition-all duration-300 rounded-full cursor-pointer"
                  style={{
                    width: i === current ? "24px" : "6px",
                    height: "6px",
                    background: i === current
                      ? "linear-gradient(90deg, #e498e8ff, #d437d1ff)"
                      : "rgba(255,255,255,0.2)",
                  }}
                />
              ))}
            </div>

            <button
              onClick={next}
              aria-label="Next testimonial"
              className="w-10 h-10 rounded-full flex items-center justify-center text-white/50 hover:text-white transition-all duration-200 cursor-pointer"
              style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
