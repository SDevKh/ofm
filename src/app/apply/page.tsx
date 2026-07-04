"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle, ShieldCheck, Zap, Users, MessageSquareHeart, Award } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ScrollProgress from "@/components/ui/ScrollProgress";
import CursorGlow from "@/components/ui/CursorGlow";
import { NavbarButton } from "@/components/ui/resizable-navbar";

export default function ApplyPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    socials: "",
    onlyfans: "",
    monthly: "$0 - $2,000",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1800);
  };

  return (
    <>
      <ScrollProgress />
      <CursorGlow />
      <Navbar />

      <main className="relative min-h-screen pt-32 pb-24 overflow-hidden bg-[#0e0712]">
        {/* Decorative ambient background glows */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at 10% 20%, rgba(232, 165, 152, 0.05) 0%, transparent 50%), radial-gradient(circle at 90% 80%, rgba(212, 175, 55, 0.06) 0%, transparent 50%)",
          }}
          aria-hidden="true"
        />

        <div className="container-wide relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Left: Info & Trust details */}
            <div className="lg:col-span-5 flex flex-col items-start gap-8">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="flex flex-col items-start gap-4"
              >
                <span className="text-sm font-bold uppercase tracking-[0.3em] text-rose-gold">
                  elite creator partnership
                </span>
                <h1
                  className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-[1.1]"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Join the <span className="gradient-text">Apsara</span> Circle
                </h1>
                <p className="text-white/60 text-lg leading-relaxed mt-2">
                  Take the first step toward complete creative freedom and explosive revenue growth. All applications are treated with absolute discretion.
                </p>
              </motion.div>

              {/* Confidentiality seal */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="p-5 rounded-2xl border border-amber-gold/20 bg-amber-gold/5 w-full flex items-start gap-4"
              >
                <div className="p-2 rounded-xl bg-amber-gold/10 border border-amber-gold/20 text-amber-gold flex-shrink-0">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <div className="text-left">
                  <h4 className="text-white font-bold text-base mb-1">
                    100% Confidential Review
                  </h4>
                  <p className="text-xs text-white/50 leading-relaxed">
                    Your agency request, handle details, and current statistics are protected under strict internal privacy protocols. We never publicize client lists without explicit written authorization.
                  </p>
                </div>
              </motion.div>

              {/* Benefits Checklist */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-col gap-5 w-full"
              >
                <h3 className="text-white font-semibold text-lg border-b border-white/5 pb-2 text-left">
                  What partners receive:
                </h3>
                
                {[
                  { icon: Zap, text: "Data-Driven OnlyFans Growth & Funnel Strategy" },
                  { icon: Users, text: "24/7 Professional Account Management" },
                  { icon: MessageSquareHeart, text: "High-Converting DM Sales & Chatter Audits" },
                  { icon: Award, text: "Proactive DMCA Legal Protection & Privacy Care" },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-left">
                    <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-rose-gold border border-white/5">
                      <item.icon className="h-4 w-4" />
                    </div>
                    <span className="text-white/70 text-sm font-medium">
                      {item.text}
                    </span>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right: Interactive Application Form */}
            <div className="lg:col-span-7">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="glass rounded-3xl p-6 sm:p-10 border border-white/5 backdrop-blur-xl bg-black/40 relative overflow-hidden"
              >
                {/* Horizontal glowing accent line */}
                <div className="absolute top-0 left-10 right-10 h-px bg-gradient-to-r from-transparent via-rose-gold/30 to-transparent" />

                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center text-center py-16 gap-6"
                  >
                    <div className="w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                      <CheckCircle className="h-10 w-10 animate-bounce" />
                    </div>
                    <h2
                      className="text-3xl font-bold text-white"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      Application Received!
                    </h2>
                    <p className="text-white/60 text-base max-w-md">
                      Thank you for applying. A senior partner will review your social media profiles and send you a message within 24 hours to coordinate your private consultation.
                    </p>
                    <NavbarButton href="/" variant="gradient" className="mt-4">
                      Return to Homepage
                    </NavbarButton>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-6 text-left">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {/* Name */}
                      <div className="flex flex-col gap-2">
                        <label className="text-xs text-white/40 font-bold uppercase tracking-wider">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Your legal or stage name"
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          className="w-full px-4 py-3.5 rounded-xl text-sm text-white bg-black/40 border border-white/5 outline-none transition-all duration-300 focus:border-amber-gold/40 focus:ring-1 focus:ring-amber-gold/20"
                        />
                      </div>
                      
                      {/* Email */}
                      <div className="flex flex-col gap-2">
                        <label className="text-xs text-white/40 font-bold uppercase tracking-wider">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="primary@email.com"
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          className="w-full px-4 py-3.5 rounded-xl text-sm text-white bg-black/40 border border-white/5 outline-none transition-all duration-300 focus:border-amber-gold/40 focus:ring-1 focus:ring-amber-gold/20"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {/* Social handles */}
                      <div className="flex flex-col gap-2">
                        <label className="text-xs text-white/40 font-bold uppercase tracking-wider">
                          Social Media Handles *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="@instagram, @tiktok, @twitter"
                          value={form.socials}
                          onChange={(e) => setForm({ ...form, socials: e.target.value })}
                          className="w-full px-4 py-3.5 rounded-xl text-sm text-white bg-black/40 border border-white/5 outline-none transition-all duration-300 focus:border-amber-gold/40 focus:ring-1 focus:ring-amber-gold/20"
                        />
                      </div>

                      {/* OnlyFans link */}
                      <div className="flex flex-col gap-2">
                        <label className="text-xs text-white/40 font-bold uppercase tracking-wider">
                          OnlyFans Link (If active)
                        </label>
                        <input
                          type="url"
                          placeholder="onlyfans.com/yourprofile"
                          value={form.onlyfans}
                          onChange={(e) => setForm({ ...form, onlyfans: e.target.value })}
                          className="w-full px-4 py-3.5 rounded-xl text-sm text-white bg-black/40 border border-white/5 outline-none transition-all duration-300 focus:border-amber-gold/40 focus:ring-1 focus:ring-amber-gold/20"
                        />
                      </div>
                    </div>

                    {/* Revenue select */}
                    <div className="flex flex-col gap-2">
                      <label className="text-xs text-white/40 font-bold uppercase tracking-wider">
                        Current Monthly Revenue *
                      </label>
                      <select
                        value={form.monthly}
                        onChange={(e) => setForm({ ...form, monthly: e.target.value })}
                        className="w-full px-4 py-3.5 rounded-xl text-sm text-white bg-black/40 border border-white/5 outline-none cursor-pointer transition-all duration-300 focus:border-amber-gold/40 focus:ring-1 focus:ring-amber-gold/20"
                      >
                        <option value="$0 - $2,000" className="bg-[#0e0712]">$0 - $2,000 / month</option>
                        <option value="$2,000 - $5,000" className="bg-[#0e0712]">$2,000 - $5,000 / month</option>
                        <option value="$5,000 - $15,000" className="bg-[#0e0712]">$5,000 - $15,000 / month</option>
                        <option value="$15,000+" className="bg-[#0e0712]">$15,000+ / month</option>
                      </select>
                    </div>

                    {/* Message */}
                    <div className="flex flex-col gap-2">
                      <label className="text-xs text-white/40 font-bold uppercase tracking-wider">
                        Tell us about yourself & your goals *
                      </label>
                      <textarea
                        required
                        rows={4}
                        placeholder="What are your current growth bottlenecks? Where do you want your business to be in 6 months?"
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        className="w-full px-4 py-3.5 rounded-xl text-sm text-white bg-black/40 border border-white/5 outline-none resize-none transition-all duration-300 focus:border-amber-gold/40 focus:ring-1 focus:ring-amber-gold/20"
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-4 mt-2 rounded-xl bg-gradient-to-r from-amber-gold to-rose-gold text-plum-black font-extrabold text-base tracking-wide flex items-center justify-center gap-2 cursor-pointer shadow-[0px_2px_0px_0px_rgba(255,255,255,0.4)_inset] active:translate-y-0 hover:-translate-y-0.5 transition duration-200 disabled:opacity-50"
                    >
                      {loading ? (
                        <div className="h-5 w-5 border-2 border-[#0e0712] border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <>
                          Submit Application
                          <ArrowRight className="h-5 w-5" />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </motion.div>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
