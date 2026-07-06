"use client";

import { motion } from "framer-motion";
import { Zap, Mail, ArrowUpRight } from "lucide-react";

function TwitterIcon({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function InstagramIcon({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

const footerLinks = {
  Company: [
    { label: "About Us", href: "/" },
    { label: "Services", href: "/services" },
    { label: "Results", href: "/results" },
    { label: "Process", href: "/process" },
  ],
  Support: [
    { label: "FAQ", href: "/faq" },
    { label: "Contact", href: "/apply" },
    { label: "Apply Now", href: "/apply" },
    { label: "Book a Call", href: "/apply" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "Cookie Policy", href: "#" },
    { label: "DMCA Policy", href: "#" },
  ],
};

const socials = [
  { icon: TwitterIcon, href: "#", label: "Twitter" },
  { icon: InstagramIcon, href: "#", label: "Instagram" },
  { icon: Mail, href: "mailto:hello@apsaracreator.agency", label: "Email" },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-[rgba(232,165,152,0.08)] overflow-hidden" aria-label="Site footer">
      {/* Background glow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] opacity-10 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, #d437b5ff 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      <div className="container-wide relative z-10">
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <a href="#" className="flex items-center gap-2 mb-5">
              <img src="/assets/logo.png" className="h-8 w-auto object-contain brightness-0 invert" alt="apsaraCreator Logo" />
            </a>
            <p className="text-white/50 text-sm leading-relaxed max-w-xs mb-6">
              The world&apos;s most trusted international OnlyFans management agency.
              We scale creator businesses with strategy, precision, and excellence.
            </p>
            <div className="flex items-center gap-3">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-lg flex items-center justify-center text-white/50 hover:text-white transition-all duration-200"
                  style={{ background: "rgba(24, 13, 32, 0.45)", border: "1px solid rgba(232, 165, 152, 0.08)", display: "flex", alignItems: "center", justifyContent: "center" }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(212, 55, 209, 0.4)";
                    (e.currentTarget as HTMLAnchorElement).style.background = "rgba(212, 55, 204, 0.1)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(232, 165, 152, 0.08)";
                    (e.currentTarget as HTMLAnchorElement).style.background = "rgba(24, 13, 32, 0.45)";
                  }}
                >
                  <Icon size={15} className="flex-shrink-0" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-white/40 text-xs font-semibold uppercase tracking-widest mb-4">
                {category}
              </h3>
              <ul className="flex flex-col gap-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-white/60 hover:text-white transition-colors duration-200"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="py-6 border-t border-[rgba(232,165,152,0.08)] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-sm">
            © {new Date().getFullYear()} APSARA Agency. All rights reserved.
          </p>
          <div className="flex items-center gap-1 text-sm text-white/30">
            <a href="mailto:hello@apsaracreator.agency" className="hover:text-gold transition-colors flex items-center gap-1">
              hello@apsaracreator.agency
              <ArrowUpRight size={12} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
