"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Calendar, CheckCircle, Send, Mail } from "lucide-react";

function TwitterIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function InstagramIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

export default function CTAContact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", monthly: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1500);
  };

  return (
    <>
      {/* ─── CTA Banner ─── */}
      <section
        id="cta"
        className="relative py-32 overflow-hidden"
        aria-label="Call to action"
      >
        {/* Animated gradient background */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(135deg, rgba(232, 165, 152, 0.08) 0%, rgba(212, 175, 55, 0.12) 50%, rgba(228, 204, 23, 0.06) 100%)",
            backgroundSize: "200% 200%",
            animation: "gradient-shift 8s ease infinite",
          }}
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(212, 175, 55, 0.05) 0%, transparent 70%)",
          }}
          aria-hidden="true"
        />

        {/* Glowing border top/bottom */}
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{ background: "linear-gradient(90deg, transparent, rgba(232, 165, 152, 0.35), rgba(212, 175, 55, 0.35), transparent)" }}
          aria-hidden="true"
        />
        <div
          className="absolute bottom-0 left-0 right-0 h-px"
          style={{ background: "linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.25), rgba(228, 204, 23, 0.25), transparent)" }}
          aria-hidden="true"
        />

        <div className="container-wide relative z-10 text-center" ref={ref}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/30 mb-4">
              Ready to Scale?
            </p>
            <h2
              className="text-4xl sm:text-6xl font-bold text-white mb-6"
              style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.02em" }}
            >
              Ready to Scale Your{" "}
              <span className="gradient-text block sm:inline">
                Creator Business?
              </span>
            </h2>
            <p className="text-white/55 text-lg sm:text-xl max-w-xl mx-auto mb-12">
              Join 200+ creators who trust apsaraCreator to handle their operations
              while they focus on what they do best.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="#contact"
                className="btn-neon px-10 py-4 rounded-2xl text-base font-semibold flex items-center gap-2 group"
                style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
              >
                <span>Apply Now</span>
                <ArrowRight
                  size={16}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </a>
              <a
                href="#contact"
                className="btn-ghost px-10 py-4 rounded-2xl text-base font-semibold flex items-center gap-2"
                style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
              >
                <Calendar size={16} />
                <span>Schedule a Call</span>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── Contact Form ─── */}
      <section
        id="contact"
        className="relative section-padding overflow-hidden"
        aria-label="Contact form"
      >
        <div className="container-wide relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-5xl mx-auto">
            {/* Left: Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7 }}
            >
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/30 mb-4">
                Get in Touch
              </p>
              <h2
                className="text-3xl sm:text-4xl font-bold text-white mb-6"
                style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.02em" }}
              >
                Start your{" "}
                <span className="gradient-text">application</span>
              </h2>
              <p className="text-white/50 leading-relaxed mb-8">
                Fill out the form and our team will get back to you within 24 hours
                to schedule your private Discovery Call. All information is 100% confidential.
              </p>

              {/* Contact details */}
              <div className="flex flex-col gap-4 mb-8">
                <a
                  href="mailto:hello@apsaracreator.agency"
                  className="flex items-center gap-3 text-white/60 hover:text-white transition-colors group"
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: "rgba(212, 175, 55, 0.08)", border: "1px solid rgba(212, 175, 55, 0.22)" }}
                  >
                    <Mail size={16} style={{ color: "var(--color-rose-gold)" }} />
                  </div>
                  <span className="text-sm">hello@apsaracreator.agency</span>
                </a>
                <a
                  href="#"
                  className="flex items-center gap-3 text-white/60 hover:text-white transition-colors"
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: "rgba(232, 165, 152, 0.08)", border: "1px solid rgba(232, 165, 152, 0.2)" }}
                  >
                    <InstagramIcon size={16} />
                  </div>
                  <span className="text-sm">@apsaracreatoragency</span>
                </a>
                <a
                  href="#"
                  className="flex items-center gap-3 text-white/60 hover:text-white transition-colors"
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: "rgba(228, 204, 23, 0.08)", border: "1px solid rgba(228, 204, 23, 0.2)" }}
                  >
                    <TwitterIcon size={16} />
                  </div>
                  <span className="text-sm">@apsaracreatoragency</span>
                </a>
              </div>

              {/* Privacy assurance */}
              <div
                className="p-4 rounded-xl"
                style={{ background: "rgba(212, 175, 55, 0.08)", border: "1px solid rgba(212, 175, 55, 0.22)" }}
              >
                <div className="flex items-center gap-2 mb-1">
                  <CheckCircle size={14} style={{ color: "#d4af37" }} />
                  <span className="text-xs font-semibold" style={{ color: "#d4af37" }}>100% Confidential</span>
                </div>
                <p className="text-xs text-white/40">
                  Your information is never shared. All applications are reviewed in strict confidence by senior team members only.
                </p>
              </div>
            </motion.div>

            {/* Right: Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.15 }}
            >
              {submitted ? (
                <div
                  className="glass rounded-2xl p-10 text-center flex flex-col items-center justify-center h-full gap-4"
                  style={{ minHeight: "400px", borderRadius: "24px" }}
                >
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center"
                    style={{ background: "rgba(52, 211, 153, 0.1)", border: "1px solid rgba(52, 211, 153, 0.3)" }}
                  >
                    <CheckCircle size={28} style={{ color: "#34d399" }} />
                  </div>
                  <h3
                    className="text-white text-2xl font-bold"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    Application Received!
                  </h3>
                  <p className="text-white/50 text-sm max-w-xs">
                    We&apos;ll review your profile and reach out within 24 hours to schedule your Discovery Call.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="glass rounded-2xl p-5 sm:p-8 flex flex-col gap-4"
                  style={{ borderRadius: "24px" }}
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-white/40 font-medium block mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Your name"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-white/25 outline-none transition-all duration-200"
                        style={{
                          background: "rgba(26, 12, 20, 0.45)",
                          border: "1px solid rgba(232, 165, 152, 0.08)",
                        }}
                        onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(212, 175, 55, 0.4)")}
                        onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(232, 165, 152, 0.08)")}
                      />
                    </div>
                    <div>
                      <label className="text-xs text-white/40 font-medium block mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="your@email.com"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-white/25 outline-none transition-all duration-200"
                        style={{
                          background: "rgba(26, 12, 20, 0.45)",
                          border: "1px solid rgba(232, 165, 152, 0.08)",
                        }}
                        onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(212, 175, 55, 0.4)")}
                        onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(232, 165, 152, 0.08)")}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs text-white/40 font-medium block mb-2">
                      Current Monthly Revenue (approximate)
                    </label>
                    <select
                      value={form.monthly}
                      onChange={(e) => setForm({ ...form, monthly: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl text-sm text-white/80 outline-none transition-all duration-200 cursor-pointer"
                      style={{
                        background: "rgba(26, 12, 20, 0.45)",
                        border: "1px solid rgba(232, 165, 152, 0.08)",
                      }}
                    >
                      <option value="" className="bg-[#120810]">Select range</option>
                      <option value="0-1k" className="bg-[#120810]">$0 – $1,000</option>
                      <option value="1k-5k" className="bg-[#120810]">$1,000 – $5,000</option>
                      <option value="5k-15k" className="bg-[#120810]">$5,000 – $15,000</option>
                      <option value="15k-50k" className="bg-[#120810]">$15,000 – $50,000</option>
                      <option value="50k+" className="bg-[#120810]">$50,000+</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs text-white/40 font-medium block mb-2">
                      Tell us about your goals
                    </label>
                    <textarea
                      rows={4}
                      placeholder="What are you looking to achieve? What's your biggest challenge right now?"
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-white/25 outline-none transition-all duration-200 resize-none"
                      style={{
                        background: "rgba(26, 12, 20, 0.45)",
                        border: "1px solid rgba(232, 165, 152, 0.08)",
                      }}
                      onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(212, 175, 55, 0.4)")}
                      onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(232, 165, 152, 0.08)")}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-neon w-full py-4 rounded-xl font-semibold flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
                  >
                    {loading ? (
                      <span>Submitting...</span>
                    ) : (
                      <>
                        <span>Submit Application</span>
                        <Send size={16} />
                      </>
                    )}
                  </button>

                  <p className="text-center text-xs text-white/25">
                    By applying, you agree to our Privacy Policy. All information is confidential.
                  </p>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
