"use client";

import { useState } from "react";
import {
  Navbar as ResizableNavbar,
  NavBody,
  NavItems,
  MobileNav,
  MobileNavHeader,
  MobileNavMenu,
  MobileNavToggle,
  NavbarButton,
} from "@/components/ui/resizable-navbar";

const navItems = [
  { name: "Services", link: "/services" },
  { name: "Results", link: "/results" },
  { name: "Process", link: "/process" },
  { name: "Testimonials", link: "/testimonials" },
  { name: "FAQ", link: "/faq" },
  { name: "Contact", link: "/apply" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <ResizableNavbar>
      {/* Desktop view */}
      <NavBody>
        <a href="/" className="flex items-center gap-2 relative z-20">
          <img src="/assets/logo.png" className="w-[7vw] object-contain brightness-0 invert" alt="apsaraCreator Logo" />
        </a>

        <NavItems items={navItems} />

        <div className="flex items-center gap-2 relative z-20">
          <NavbarButton href="#contact" variant="gradient">
            Apply Now
          </NavbarButton>
        </div>
      </NavBody>

      {/* Mobile view */}
      <MobileNav>
        <MobileNavHeader>
          <a href="#" className="flex items-center gap-2 relative z-20">
            <img src="/assets/logo.png" className="h-8 w-auto object-contain brightness-0 invert" alt="apsaraCreator Logo" />
          </a>
          <MobileNavToggle isOpen={menuOpen} onClick={() => setMenuOpen(!menuOpen)} />
        </MobileNavHeader>

        <MobileNavMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)}>
          {navItems.map((item, idx) => (
            <a
              key={idx}
              href={item.link}
              onClick={() => setMenuOpen(false)}
              className="w-full text-left text-white/70 py-2 hover:text-white transition-colors duration-200 border-b border-white/5 last:border-0"
            >
              {item.name}
            </a>
          ))}
          <NavbarButton href="#contact" variant="gradient" className="w-full text-center mt-4 rounded-full" onClick={() => setMenuOpen(false)}>
            Apply Now
          </NavbarButton>
        </MobileNavMenu>
      </MobileNav>
    </ResizableNavbar>
  );
}

