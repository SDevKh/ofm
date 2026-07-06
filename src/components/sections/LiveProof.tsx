"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { ShieldCheck, Maximize2, X, ChevronLeft, ChevronRight, CheckCircle2, TrendingUp } from "lucide-react";

interface ProofItem {
  src: string;
  title: string;
  description: string;
  metric: string;
  badge: string;
  category: "earnings" | "reviews";
}

const proofItems: ProofItem[] = [
  {
    src: "/assets/review.png",
    title: "Creator Scaling Milestone",
    description: "Real feedback from a creator scaling past $22K/month in their first 90 days.",
    metric: "$22.4K/mo",
    badge: "Client Chat",
    category: "reviews",
  },
  {
    src: "/assets/review2.png",
    title: "Messaging Revenue Feedback",
    description: "Creator praising the 24/7 chatters for doubling subscriber PPV conversions.",
    metric: "+115% PPV",
    badge: "Slack Update",
    category: "reviews",
  },
  {
    src: "/assets/review3.png",
    title: "Seamless Onboarding Praise",
    description: "New creator highlighting the professional, stress-free setup & launching phase.",
    metric: "5-Star Setup",
    badge: "WhatsApp Proof",
    category: "reviews",
  },
  {
    src: "/assets/image.png",
    title: "Net Payout Statement",
    description: "$142,800+ in total net revenue generated within 60 days.",
    metric: "$142,842.10",
    badge: "Verified Earnings",
    category: "earnings",
  },
  {
    src: "/assets/image copy.png",
    title: "Weekly Revenue Milestone",
    description: "Consistent scaling, achieving over $32,000 in weekly sales.",
    metric: "$32,492.05/wk",
    badge: "Weekly Peak",
    category: "earnings",
  },
  {
    src: "/assets/image copy 2.png",
    title: "Daily Earnings Spike",
    description: "Peak promotional campaigns driving high conversion velocity.",
    metric: "$6,812.44/day",
    badge: "Daily Peak",
    category: "earnings",
  },
  {
    src: "/assets/image copy 3.png",
    title: "Premium Messaging Sales",
    description: "High-value chatter interactions and custom media upsells.",
    metric: "94% Message Conv.",
    badge: "Chat Scaling",
    category: "earnings",
  },
  {
    src: "/assets/image copy 4.png",
    title: "Subscriber Acquisition",
    description: "Steady stream of organic and funnel-based subscriber growth.",
    metric: "+5,200 Fans",
    badge: "Traffic Engine",
    category: "earnings",
  },
];

export default function LiveProof() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [activeTab, setActiveTab] = useState<"earnings" | "reviews">("reviews");
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  const filteredItems = proofItems.filter((item) => item.category === activeTab);

  // Close modal on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveIdx(null);
      if (e.key === "ArrowRight" && activeIdx !== null) handleNext();
      if (e.key === "ArrowLeft" && activeIdx !== null) handlePrev();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIdx, filteredItems]);

  const handleNext = () => {
    if (activeIdx === null) return;
    setActiveIdx((activeIdx + 1) % filteredItems.length);
  };

  const handlePrev = () => {
    if (activeIdx === null) return;
    setActiveIdx((activeIdx - 1 + filteredItems.length) % filteredItems.length);
  };

  return (
    <section
      id="live-proof"
      className="relative section-padding overflow-hidden bg-[#0e0712]/50"
      aria-label="Verified live proof"
      ref={ref}
    >
      {/* Decorative Orbs */}
      <div
        className="absolute top-[20%] right-[-10%] w-[400px] h-[400px] rounded-full pointer-events-none opacity-20"
        style={{
          background: "radial-gradient(circle, rgba(232, 165, 152, 0.1) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-[10%] left-[-10%] w-[500px] h-[500px] rounded-full pointer-events-none opacity-20"
        style={{
          background: "radial-gradient(circle, rgba(212, 55, 170, 0.08) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
        aria-hidden="true"
      />

      <div className="container-wide relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold tracking-wider uppercase mb-4">
            <ShieldCheck className="h-3.5 w-3.5" />
            Verified Performance & Feedback
          </div>
          <h2
            className="text-3xl sm:text-5xl font-bold text-white mb-5"
            style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.02em" }}
          >
            Live Creator{" "}
            <span className="gradient-text text-[20vw] sm:text-[5vw] font-caveat">Proof</span>
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto leading-relaxed">
            Real payout receipts, subscriber growth curves, and direct chat feedback from our active creator portfolio. Fully audited.
          </p>
        </motion.div>

        {/* Tab Switcher */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex rounded-full p-1 bg-white/5 border border-white/10 backdrop-blur-md relative">
            <button
              onClick={() => {
                setActiveTab("reviews");
                setActiveIdx(null);
              }}
              className={`relative z-10 px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 cursor-pointer ${activeTab === "reviews" ? "text-[#0e0712]" : "text-white/60 hover:text-white"
                }`}
            >
              Creator Reviews
              {activeTab === "reviews" && (
                <motion.div
                  layoutId="activeTabGlow"
                  className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-[#ff00de] to-amber-gold"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </button>
            <button
              onClick={() => {
                setActiveTab("earnings");
                setActiveIdx(null);
              }}
              className={`relative z-10 px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 cursor-pointer ${activeTab === "earnings" ? "text-[#0e0712]" : "text-white/60 hover:text-white"
                }`}
            >
              Earnings Proof
              {activeTab === "earnings" && (
                <motion.div
                  layoutId="activeTabGlow"
                  className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-rose-gold to-[#ff27e7]"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          </div>
        </div>

        {/* Card Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, idx) => (
              <motion.div
                key={item.src}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="glass glass-hover rounded-[24px] overflow-hidden flex flex-col justify-between group"
              >
                {/* Image Thumbnail Container */}
                <div
                  className="relative aspect-video overflow-hidden bg-black/60 border-b border-white/5 cursor-pointer"
                  onClick={() => setActiveIdx(idx)}
                >
                  <img
                    src={item.src}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                    <div className="w-12 h-12 rounded-full bg-white/10 border border-white/25 flex items-center justify-center text-white shadow-xl">
                      <Maximize2 className="h-5 w-5" />
                    </div>
                  </div>
                  {/* Badge Overlay */}
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#180d20]/80 border border-white/10 backdrop-blur-md text-xs font-semibold text-rose-gold tracking-wide">
                    {item.badge}
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6">
                  <div className="flex items-center justify-between gap-4 mb-2">
                    <h3
                      className="text-white font-bold text-lg tracking-tight"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {item.title}
                    </h3>
                    <div className="flex items-center gap-1 text-emerald-400 font-bold text-sm bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/10 flex-shrink-0">
                      <TrendingUp className="h-3.5 w-3.5" />
                      <span>{item.metric}</span>
                    </div>
                  </div>
                  <p className="text-white/50 text-sm leading-relaxed">{item.description}</p>
                  <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-white/30 font-medium">
                    <span className="flex items-center gap-1">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                      System Verified
                    </span>
                    <span>July 2026</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox / Modal */}
      <AnimatePresence>
        {activeIdx !== null && filteredItems[activeIdx] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 md:p-8 backdrop-blur-md"
            onClick={() => setActiveIdx(null)}
          >
            {/* Close button */}
            <button
              onClick={() => setActiveIdx(null)}
              className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/5 border border-white/10 text-white/70 hover:text-white flex items-center justify-center transition-colors cursor-pointer z-50"
              aria-label="Close interactive modal"
            >
              <X className="h-6 w-6" />
            </button>

            {/* Previous navigation button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
              className="absolute left-4 md:left-8 w-12 h-12 rounded-full bg-white/5 border border-white/10 text-white/70 hover:text-white flex items-center justify-center transition-colors cursor-pointer z-50"
              aria-label="Previous proof item"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            {/* Modal content */}
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative max-w-5xl w-full max-h-[85vh] flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Glassmorphic Frame wrapper */}
              <div className="glass rounded-[32px] overflow-hidden border border-white/10 max-w-full flex flex-col bg-black/60">
                {/* Large high-res image */}
                <div className="relative overflow-auto max-h-[60vh] flex justify-center bg-black/30 select-none">
                  <img
                    src={filteredItems[activeIdx].src}
                    alt={filteredItems[activeIdx].title}
                    className="max-w-full h-auto object-contain max-h-[60vh]"
                  />
                  <div className="absolute top-4 left-4 px-3.5 py-1.5 rounded-full bg-white/95 border border-white/20 text-xs font-semibold text-rose-gold tracking-wide">
                    {filteredItems[activeIdx].badge}
                  </div>
                </div>

                {/* Lightbox details panel */}
                <div className="p-6 md:p-8 border-t border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div>
                    <h3
                      className="text-white font-bold text-2xl mb-2"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {filteredItems[activeIdx].title}
                    </h3>
                    <p className="text-white/60 text-base leading-relaxed max-w-2xl">
                      {filteredItems[activeIdx].description}
                    </p>
                  </div>
                  <div className="flex flex-col items-start md:items-end flex-shrink-0">
                    <span className="text-xs text-white/40 uppercase tracking-widest font-semibold mb-1">
                      Impact Metric
                    </span>
                    <div
                      className="text-3xl font-black text-emerald-400 tracking-tight"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {filteredItems[activeIdx].metric}
                    </div>
                    <span className="text-[10px] text-white/30 mt-1 flex items-center gap-1 font-medium">
                      <CheckCircle2 className="h-3 w-3 text-emerald-400" />
                      Audited Verification
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Next navigation button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              className="absolute right-4 md:right-8 w-12 h-12 rounded-full bg-white/5 border border-white/10 text-white/70 hover:text-white flex items-center justify-center transition-colors cursor-pointer z-50"
              aria-label="Next proof item"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
