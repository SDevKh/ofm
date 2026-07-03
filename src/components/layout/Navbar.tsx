"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Zap } from "lucide-react";

const navLinks = [
  { href: "#services", label: "Services" },
  { href: "#results", label: "Results" },
  { href: "#process", label: "Process" },
  { href: "#testimonials", label: "Testimonials" },
  { href: "#faq", label: "FAQ" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-[100]"
        aria-label="Main navigation"
      >
        <div
          className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl"
          style={{ paddingTop: "1rem", paddingBottom: "1rem" }}
        >
          <div
            className="flex items-center justify-between rounded-2xl px-5 py-3 transition-all duration-500"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              background: scrolled
                ? "rgba(8, 8, 8, 0.85)"
                : "rgba(8, 8, 8, 0.4)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
              border: `1px solid ${scrolled ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.06)"}`,
              boxShadow: scrolled
                ? "0 8px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)"
                : "none",
            }}
          >
            {/* Logo */}
            <a
              href="#"
              className="flex items-center gap-2 group"
              aria-label="EliteCreator Agency home"
            >
              <div className="relative">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{
                    background: "linear-gradient(135deg, #4d9fff, #8b5cf6)",
                  }}
                >
                  <Zap size={16} className="text-white" fill="white" />
                </div>
                <div
                  className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ boxShadow: "0 0 20px rgba(77, 159, 255, 0.6)" }}
                />
              </div>
              <span
                className="text-white font-bold text-lg tracking-tight hidden sm:block"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                Elite<span className="gradient-text">Creator</span>
              </span>
            </a>

            {/* Desktop links */}
            <div className="hidden lg:flex items-center gap-1" style={{ display: "flex", alignItems: "center" }}>
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className="px-4 py-2 text-sm text-white/70 hover:text-white rounded-lg hover:bg-white/5 transition-all duration-200 font-medium cursor-pointer"
                >
                  {link.label}
                </button>
              ))}
            </div>

            {/* CTA */}
            <div className="flex items-center gap-3" style={{ display: "flex", alignItems: "center" }}>
              <button
                onClick={() => handleNavClick("#contact")}
                className="hidden sm:block px-5 py-2.5 rounded-xl text-sm font-semibold btn-neon cursor-pointer"
                aria-label="Apply Now"
              >
                <span>Apply Now</span>
              </button>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="lg:hidden p-2 rounded-lg text-white/70 hover:text-white hover:bg-white/5 transition-all"
                aria-label="Toggle menu"
                aria-expanded={menuOpen}
              >
                {menuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed top-[84px] left-4 right-4 z-[99] rounded-2xl overflow-hidden"
            style={{
              background: "rgba(10, 10, 15, 0.95)",
              backdropFilter: "blur(24px)",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            <div className="p-4 flex flex-col gap-1">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => handleNavClick(link.href)}
                  className="w-full text-left px-4 py-3 rounded-xl text-white/80 hover:text-white hover:bg-white/5 transition-all font-medium cursor-pointer"
                >
                  {link.label}
                </motion.button>
              ))}
              <div className="pt-2 border-t border-white/10 mt-2">
                <button
                  onClick={() => handleNavClick("#contact")}
                  className="w-full py-3 rounded-xl text-sm font-semibold btn-neon cursor-pointer"
                >
                  <span>Apply Now →</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
