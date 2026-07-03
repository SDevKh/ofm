"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    q: "How does your agency handle privacy and confidentiality?",
    a: "Privacy is our top priority. We operate under strict NDAs, never disclose creator identities, use secure communication channels, and our entire team is trained in creator confidentiality. Your brand, identity, and financial information are always protected.",
  },
  {
    q: "How quickly can I expect to see results?",
    a: "Most creators see measurable revenue increases within the first 30 days. Full optimization usually takes 60–90 days as we fine-tune strategies based on your specific audience data. Average revenue growth across our portfolio is 340% within the first 6 months.",
  },
  {
    q: "What platforms do you manage?",
    a: "We primarily specialize in OnlyFans but also support Fansly, Patreon, and other subscription platforms. Our social media growth team works across Reddit, Twitter/X, TikTok, and Instagram to drive consistent traffic to your paid pages.",
  },
  {
    q: "Do I retain full creative control?",
    a: "Absolutely. You always retain 100% creative control over your content. We handle the business and operations side — strategy, messaging, marketing, analytics — while you focus solely on creating. Nothing gets posted without your approval.",
  },
  {
    q: "How are your services priced?",
    a: "We operate on a performance-based model, meaning we earn more when you earn more. This ensures our incentives are always perfectly aligned with your growth. Pricing details are discussed during your Discovery Call after reviewing your profile.",
  },
  {
    q: "What makes you different from other OFM agencies?",
    a: "Three things: transparency, performance alignment, and proven results. We provide weekly detailed reports, our compensation is tied to your revenue growth, and our portfolio shows consistent 200–700% revenue increases. We don't take on creators we can't genuinely help.",
  },
  {
    q: "How does the application process work?",
    a: "Submit a short application (3 minutes), and if there's a mutual fit, we schedule a private Discovery Call with a senior strategist. We review your current numbers, discuss your goals, and present a tailored growth roadmap. No obligations until you're ready to proceed.",
  },
  {
    q: "Do you work with new creators or only established ones?",
    a: "We work with both. For new creators, we build the right foundation from day one. For established creators, we focus on optimization and scaling. The key is motivation and commitment to growth — the starting point matters less than the trajectory.",
  },
  {
    q: "How do you handle fan messaging?",
    a: "Our trained chatters handle fan communication professionally, maintaining your brand voice and maximizing engagement. Every chatter goes through our proprietary training program and is monitored for quality. You set the tone, they execute it.",
  },
  {
    q: "Is my financial information secure?",
    a: "Yes. We use end-to-end encrypted communication for all sensitive data. We never have access to your payment accounts — our reporting is based on data you share with us, never direct account access.",
  },
];

function FAQItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06 }}
      className="rounded-2xl overflow-hidden transition-all duration-300"
      style={{
        background: open ? "rgba(77, 159, 255, 0.05)" : "rgba(255,255,255,0.03)",
        border: open ? "1px solid rgba(77, 159, 255, 0.2)" : "1px solid rgba(255,255,255,0.07)",
      }}
    >
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full px-5 sm:px-6 py-4 sm:py-5 flex items-center justify-between gap-4 text-left cursor-pointer"
        aria-expanded={open}
      >
        <span
          className="text-white font-medium text-sm sm:text-base leading-relaxed"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          {q}
        </span>
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300"
          style={{
            background: open
              ? "linear-gradient(135deg, #4d9fff, #8b5cf6)"
              : "rgba(255,255,255,0.06)",
          }}
        >
          {open ? (
            <Minus size={14} className="text-white" />
          ) : (
            <Plus size={14} className="text-white/60" />
          )}
        </div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="px-5 sm:px-6 pb-4 sm:pb-5">
              <div
                className="h-px mb-4"
                style={{ background: "rgba(77, 159, 255, 0.15)" }}
              />
              <p className="text-white/55 text-sm leading-relaxed">{a}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQ() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="faq"
      className="relative section-padding overflow-hidden"
      aria-label="Frequently asked questions"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 50%, rgba(139, 92, 246, 0.04) 0%, transparent 70%)",
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
            Questions
          </p>
          <h2
            className="text-3xl sm:text-5xl font-bold text-white mb-5"
            style={{ fontFamily: "var(--font-space-grotesk)", letterSpacing: "-0.03em" }}
          >
            Everything you need{" "}
            <span className="gradient-text">to know</span>
          </h2>
          <p className="text-white/50 text-lg max-w-lg mx-auto">
            Have more questions? Reach out at{" "}
            <a
              href="mailto:hello@elitecreator.agency"
              className="underline underline-offset-2"
              style={{ color: "#4d9fff" }}
            >
              hello@elitecreator.agency
            </a>
          </p>
        </motion.div>

        {/* Accordion */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-3xl mx-auto flex flex-col gap-3"
        >
          {faqs.map((item, i) => (
            <FAQItem key={i} q={item.q} a={item.a} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
