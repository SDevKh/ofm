"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ScrollProgress from "@/components/ui/ScrollProgress";
import CursorGlow from "@/components/ui/CursorGlow";
import FAQ from "@/components/sections/FAQ";

export default function FAQPage() {
  return (
    <>
      <ScrollProgress />
      <CursorGlow />
      <Navbar />

      <main className="bg-[#0e0712] min-h-screen pt-32 pb-16">
        <div className="container-wide text-center mb-4">
          <span className="text-sm font-bold uppercase tracking-[0.3em] text-rose-gold">
            FAQ
          </span>
          <h1 
            className="text-4xl sm:text-6xl font-black text-white mt-3"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Frequently Asked Questions
          </h1>
        </div>
        <FAQ />
      </main>

      <Footer />
    </>
  );
}
