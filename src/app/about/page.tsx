"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CursorGlow from "@/components/ui/CursorGlow";
import ScrollProgress from "@/components/ui/ScrollProgress";
import { Zap, Sparkles, TrendingUp, Users, MessageSquare, CheckCircle, ShieldCheck } from "lucide-react";

// Register GSAP ScrollTrigger plugin on client side
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function AboutUs() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);
    }
    if (!containerRef.current) return;

    // Select items
    const workItems = containerRef.current.querySelectorAll('[data-work="item"]');
    const ghostItems = containerRef.current.querySelectorAll('.ghost_work-item');

    console.log("=== ABOUT PAGE DIAGNOSTICS ===");
    console.log("workItems count:", workItems.length);
    console.log("ghostItems count:", ghostItems.length);
    if (ghostItems.length > 0) {
      const el = ghostItems[0] as HTMLElement;
      console.log("ghostItem clientHeight:", el.clientHeight);
      console.log("ghostItem computed style height:", window.getComputedStyle(el).height);
    }

    console.log("==============================");

    if (workItems.length === 0 || ghostItems.length === 0) return;

    // Initial setup for the panels
    gsap.set(workItems, {
      position: "absolute",
      top: "0",
      left: "0",
      width: "100%",
      height: "100%",
      clipPath: "inset(100% 0% 0% 0%)",
      webkitClipPath: "inset(100% 0% 0% 0%)",
      zIndex: (i) => 10 + i,
    });

    const ctx = gsap.context(() => {
      // Loop over each panel
      workItems.forEach((element, index) => {
        const itemEl = element as HTMLElement;
        const triggerEl = ghostItems[index] as HTMLElement;
        if (!triggerEl) return;

        // Query components inside this specific panel
        const lines = itemEl.querySelectorAll('[data-line]');
        const workImage = itemEl.querySelector('[data-work="image"]');
        const videoContainer = itemEl.querySelectorAll('[data-work="video"]');
        const overlay = itemEl.querySelectorAll('[data-work="item-overlay"]');

        // Set initial scale and translation on main image
        if (workImage) {
          gsap.set(workImage, {
            scale: 1.4,
            yPercent: 10,
          });
        }

        // 1. Reveal panel clip-path animation
        const stStarting = {
          trigger: triggerEl,
          scrub: true,
          start: "top bottom",
          end: "+75vh top",
        };

        gsap.to(itemEl, {
          clipPath: "inset(0% 0% 0% 0%)",
          webkitClipPath: "inset(0% 0% 0% 0%)",
          scrollTrigger: stStarting,
        });

        if (workImage) {
          gsap.to(workImage, {
            yPercent: 10,
            scale: 1.2,
            scrollTrigger: stStarting,
          });
        }

        // Toggle active pointer events class on panel entering
        ScrollTrigger.create({
          trigger: triggerEl,
          start: "top 50%",
          end: "bottom 50%",
          onToggle: (self) => {
            if (self.isActive) {
              itemEl.classList.add("active-events");
            } else {
              itemEl.classList.remove("active-events");
            }
          },
        });

        // 2. Line text animation
        if (lines.length > 0) {
          gsap.from(lines, {
            yPercent: 125,
            rotate: 2.5,
            ease: "power2.inOut",
            duration: 1.25,
            scrollTrigger: {
              trigger: triggerEl,
              start: "top 75%",
              toggleActions: "play none none reverse",
            },
          });
        }

        // 3. Image blur and fade-out transition
        if (workImage) {
          gsap.to(workImage, {
            filter: "blur(10px)",
            opacity: 0.3,
            ease: "power2.inOut",
            scrollTrigger: {
              trigger: triggerEl,
              scrub: true,
              start: "0 top", // Equivalent to top top
              end: "35% top",
            },
          });
        }

        // 4. Floating media card slide in
        if (videoContainer.length > 0) {
          gsap.from(videoContainer, {
            xPercent: index % 2 === 0 ? 100 : -100,
            opacity: 0,
            scrollTrigger: {
              trigger: triggerEl,
              scrub: true,
              start: "0 top",
              end: "65% top",
              onLeave: () => {
                if (overlay.length > 0) {
                  gsap.set(overlay, {
                    display: 'flex',
                    opacity: 0,
                  });
                }
              },
            },
          });
        }

        // 5. Final overlay fade, blur, and drift-up transitions
        const stFinal = {
          trigger: triggerEl,
          scrub: true,
          start: "105% bottom",
          toggleActions: "play reverse play reverse",
        };

        if (overlay.length > 0) {
          gsap.fromTo(overlay,
            { opacity: 0 },
            {
              opacity: 1,
              scrollTrigger: stFinal,
            }
          );
        }

        if (videoContainer.length > 0) {
          gsap.to(videoContainer, {
            yPercent: 15,
            scrollTrigger: stFinal,
          });
        }

        gsap.to(itemEl, {
          filter: "blur(1px)",
          scrollTrigger: stFinal,
        });
      });
    }, containerRef);

    // Log all ScrollTrigger instances for verification
    ScrollTrigger.getAll().forEach((st, idx) => {
      console.log(`ScrollTrigger ${idx} (${st.trigger?.className || 'no-trigger'}): start=${st.start}, end=${st.end}`);
    });

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <>
      <ScrollProgress />
      <CursorGlow />
      <Navbar />

      <main ref={containerRef} className="bg-[#0e0712]">
        {/* Intro Hero Section */}
        <section className="relative min-h-[90vh] flex flex-col justify-center items-center text-center px-4 overflow-hidden pt-24 pb-12">
          <div className="absolute inset-0 z-0 pointer-events-none">
            <div
              className="absolute top-[20%] left-[10%] w-[300px] h-[300px] orb opacity-10"
              style={{ background: "radial-gradient(circle, #e8a598 0%, transparent 75%)" }}
            />
            <div
              className="absolute bottom-[20%] right-[10%] w-[400px] h-[400px] orb opacity-15"
              style={{ background: "radial-gradient(circle, #d4af37 0%, transparent 75%)" }}
            />
          </div>

          <div className="max-w-4xl mx-auto z-10 space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-white/5 text-sm font-semibold tracking-wider uppercase text-rose-gold">
              <Sparkles size={14} />
              APSARA Agency
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-cinzel font-bold leading-tight tracking-tight text-white">
              The Standard of <br />
              <span className="gradient-text font-caveat text-[5vw]">OnlyFans Stewardship</span>
            </h1>
            <p className="text-white/60 text-lg md:text-xl font-body max-w-2xl font-syne mx-auto leading-relaxed">
              We do not simply manage creators; we build empires. Discover how APSARA handles operations, positioning, marketing, and messaging to unlock true freedom.
            </p>
            <div className="pt-6">
              <a
                href="/apply"
                className="btn-neon px-8 py-4 rounded-full text-base tracking-wide uppercase transition-all duration-300"
              >
                <span>Partner With Us</span>
              </a>
            </div>
          </div>
        </section>

        {/* Scroll Reveal Animation Section */}
        <section data-work="section" className="work_section" style={{ position: "relative", width: "100%" }}>
          {/* Sticky viewports */}
          <div className="sticky_work-wrapper" style={{ position: "sticky", top: 0, width: "100%", height: "100vh", overflow: "hidden", backgroundColor: "#0e0712", zIndex: 5 }}>

            {/* Panel 1 */}
            <div
              data-work="item"
              className="work_item"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                clipPath: "inset(100% 0% 0% 0%)",
                WebkitClipPath: "inset(100% 0% 0% 0%)",
              }}
            >
              {/* Dark Overlay overlay */}
              <div data-work="item-overlay" className="absolute inset-0 bg-[#0e0712]/90 z-20 hidden items-center justify-center pointer-events-none" />

              {/* Background Image */}
              <div className="absolute inset-0 w-full h-full z-0 overflow-hidden select-none">
                <img
                  data-work="image"
                  src="/assets/about.jpg"
                  alt="Elite Creator Vision"
                  className="w-full h-full object-cover filter brightness-[0.35]"
                />
              </div>

              {/* Panel Content */}
              <div
                className="container-wide relative z-10 w-full px-6 md:px-16 lg:px-24"
                style={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                  {/* Text Column */}
                  <div className="space-y-6 max-w-xl">
                    <h2 className="text-4xl md:text-6xl font-display font-extrabold text-white leading-[1.1] tracking-tight uppercase">
                      <span className="text-line-wrapper" style={{ display: "block", overflow: "hidden", position: "relative" }}>
                        <span data-line style={{ display: "inline-block", willChange: "transform, rotate" }}>Redefining</span>
                      </span>
                      <br />
                      <span className="text-line-wrapper" style={{ display: "block", overflow: "hidden", position: "relative" }}>
                        <span data-line className="text-rose-gold" style={{ display: "inline-block", willChange: "transform, rotate" }}>Creator</span>
                      </span>
                      <br />
                      <span className="text-line-wrapper" style={{ display: "block", overflow: "hidden", position: "relative" }}>
                        <span data-line style={{ display: "inline-block", willChange: "transform, rotate" }}>Independence</span>
                      </span>
                    </h2>
                    <p className="text-white/70 text-base md:text-lg leading-relaxed font-body">
                      We believe creators shouldn't spend 12 hours a day messaging, marketing, and managing operations. We handle the heavy lifting so you can focus entirely on production and command true lifestyle freedom.
                    </p>
                    <div className="flex items-center gap-4 text-rose-gold font-semibold tracking-wide">
                      <CheckCircle size={20} />
                      Complete Account Management
                    </div>
                  </div>

                  {/* Media / Video Column */}
                  <div data-work="video" className="w-full max-w-md mx-auto lg:ml-auto glass p-6 rounded-[24px] relative border border-white/10 shadow-2xl backdrop-blur-md">
                    <div className="aspect-[4/3] w-full rounded-2xl overflow-hidden relative bg-black/40 border border-white/5">
                      <img
                        src="/assets/ofm.jpg"
                        alt="Stats Interface"
                        className="w-full h-full object-cover opacity-80"
                      />
                      {/* Floating Mock Stats card */}
                      <div className="absolute bottom-4 left-4 right-4 glass p-4 rounded-xl border border-rose-gold/15 flex items-center justify-between">
                        <div>
                          <p className="text-xs text-white/50 uppercase tracking-wider">Average Growth Rate</p>
                          <p className="text-xl font-bold text-white font-display">+320% MoM</p>
                        </div>
                        <div className="bg-rose-gold/10 p-2.5 rounded-full text-rose-gold">
                          <TrendingUp size={20} />
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>

            {/* Panel 2 */}
            <div
              data-work="item"
              className="work_item"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                clipPath: "inset(100% 0% 0% 0%)",
                WebkitClipPath: "inset(100% 0% 0% 0%)",
              }}
            >
              <div data-work="item-overlay" className="absolute inset-0 bg-[#0e0712]/90 z-20 hidden items-center justify-center pointer-events-none" />

              <div className="absolute inset-0 w-full h-full z-0 overflow-hidden select-none">
                <img
                  data-work="image"
                  src="/assets/ofm.jpg"
                  alt="Elite Growth Strategy"
                  className="w-full h-full object-cover filter brightness-[0.35]"
                />
              </div>

              <div
                className="container-wide relative z-10 w-full px-6 md:px-16 lg:px-24"
                style={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                  {/* Media / Video Column */}
                  <div data-work="video" className="w-full max-w-md mx-auto lg:mr-auto glass p-6 rounded-[24px] relative border border-white/10 shadow-2xl backdrop-blur-md order-2 lg:order-1">
                    <div className="aspect-[4/3] w-full rounded-2xl overflow-hidden relative bg-black/40 border border-white/5">
                      <img
                        src="/assets/02.webp"
                        alt="Audience Expansion Analytics"
                        className="w-full h-full object-cover opacity-80"
                      />
                      <div className="absolute bottom-4 left-4 right-4 glass p-4 rounded-xl border border-gold/15 flex items-center justify-between">
                        <div>
                          <p className="text-xs text-white/50 uppercase tracking-wider">Acquisition Channels</p>
                          <p className="text-xl font-bold text-white font-display">Tiktok, IG & Reddit</p>
                        </div>
                        <div className="bg-gold/10 p-2.5 rounded-full text-gold">
                          <Users size={20} />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Text Column */}
                  <div className="space-y-6 max-w-xl order-1 lg:order-2 lg:ml-auto">
                    <h2 className="text-4xl md:text-6xl font-display font-extrabold text-white leading-[1.1] tracking-tight uppercase">
                      <span className="text-line-wrapper" style={{ display: "block", overflow: "hidden", position: "relative" }}>
                        <span data-line style={{ display: "inline-block", willChange: "transform, rotate" }}>Preternatural</span>
                      </span>
                      <br />
                      <span className="text-line-wrapper" style={{ display: "block", overflow: "hidden", position: "relative" }}>
                        <span data-line className="text-gold" style={{ display: "inline-block", willChange: "transform, rotate" }}>Brand</span>
                      </span>
                      <br />
                      <span className="text-line-wrapper" style={{ display: "block", overflow: "hidden", position: "relative" }}>
                        <span data-line style={{ display: "inline-block", willChange: "transform, rotate" }}>Acquisition</span>
                      </span>
                    </h2>
                    <p className="text-white/70 text-base md:text-lg leading-relaxed font-body">
                      We design hyper-targeted marketing campaigns across platforms. Our social traffic funnels convert passive viewers into top-tier subscribing fans, driving organic and sustained brand expansion.
                    </p>
                    <div className="flex items-center gap-4 text-gold font-semibold tracking-wide">
                      <TrendingUp size={20} />
                      Organic Viral Growth Engine
                    </div>
                  </div>

                </div>
              </div>
            </div>

            {/* Panel 3 */}
            <div
              data-work="item"
              className="work_item"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                clipPath: "inset(100% 0% 0% 0%)",
                WebkitClipPath: "inset(100% 0% 0% 0%)",
              }}
            >
              <div data-work="item-overlay" className="absolute inset-0 bg-[#0e0712]/90 z-20 hidden items-center justify-center pointer-events-none" />

              <div className="absolute inset-0 w-full h-full z-0 overflow-hidden select-none">
                <img
                  data-work="image"
                  src="/assets/gpt-image-2_A_breathtakingly_beautiful_hyper-realistic_22-year-old_Afro-Latina_influencer_go-0.jpg"
                  alt="Elite Fan Messaging Ops"
                  className="w-full h-full object-cover filter brightness-[0.35]"
                />
              </div>

              <div
                className="container-wide relative z-10 w-full px-6 md:px-16 lg:px-24"
                style={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                  {/* Text Column */}
                  <div className="space-y-6 max-w-xl">
                    <h2 className="text-4xl md:text-6xl font-display font-extrabold text-white leading-[1.1] tracking-tight uppercase">
                      <span className="text-line-wrapper" style={{ display: "block", overflow: "hidden", position: "relative" }}>
                        <span data-line style={{ display: "inline-block", willChange: "transform, rotate" }}>Unparalleled</span>
                      </span>
                      <br />
                      <span className="text-line-wrapper" style={{ display: "block", overflow: "hidden", position: "relative" }}>
                        <span data-line className="text-rose-gold" style={{ display: "inline-block", willChange: "transform, rotate" }}>24/7</span>
                      </span>
                      <br />
                      <span className="text-line-wrapper" style={{ display: "block", overflow: "hidden", position: "relative" }}>
                        <span data-line style={{ display: "inline-block", willChange: "transform, rotate" }}>Stewardship</span>
                      </span>
                    </h2>
                    <p className="text-white/70 text-base md:text-lg leading-relaxed font-body">
                      Our elite sales chat managers operate 24/7/365 to monetize messages, upsell exclusive pay-per-views, build intimate subscriber relationships, and multiply your daily earnings.
                    </p>
                    <div className="flex items-center gap-4 text-rose-gold font-semibold tracking-wide">
                      <MessageSquare size={20} />
                      High-Ticket Conversion Strategy
                    </div>
                  </div>

                  {/* Media / Video Column */}
                  <div data-work="video" className="w-full max-w-md mx-auto lg:ml-auto glass p-6 rounded-[24px] relative border border-white/10 shadow-2xl backdrop-blur-md">
                    <div className="aspect-[4/3] w-full rounded-2xl overflow-hidden relative bg-black/40 border border-white/5">
                      <img
                        src="/assets/recraft-v4_.couture_magazine_featuring_a_beautiful_tall_blond_model_with_long_layered_hair-0.jpg"
                        alt="High Ticket Chat Log"
                        className="w-full h-full object-cover opacity-80"
                      />
                      <div className="absolute bottom-4 left-4 right-4 glass p-4 rounded-xl border border-rose-gold/15 flex items-center justify-between">
                        <div>
                          <p className="text-xs text-white/50 uppercase tracking-wider">Daily Messaging Yield</p>
                          <p className="text-xl font-bold text-white font-display">+$1,450 / Day</p>
                        </div>
                        <div className="bg-rose-gold/10 p-2.5 rounded-full text-rose-gold">
                          <MessageSquare size={20} />
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>

          </div>

          {/* Ghost Spacer container for scroll tracking */}
          <div className="ghost_work-container" style={{ position: "relative", width: "100%", zIndex: 1, pointerEvents: "none" }}>
            <div className="ghost_work-item" style={{ width: "100%", height: "300vh" }}></div>
            <div className="ghost_work-item" style={{ width: "100%", height: "300vh" }}></div>
            <div className="ghost_work-item" style={{ width: "100%", height: "300vh" }}></div>
          </div>
        </section>

        {/* Outro Call To Action Section */}
        <section className="relative py-24 px-4 overflow-hidden border-t border-white/5">
          <div className="absolute inset-0 z-0 pointer-events-none">
            <div
              className="absolute bottom-0 left-[20%] w-[500px] h-[300px] orb opacity-10"
              style={{ background: "radial-gradient(ellipse at center, #de2ede 0%, transparent 70%)" }}
            />
          </div>

          <div className="max-w-4xl mx-auto text-center space-y-8 relative z-10">
            <h2 className="text-3xl md:text-5xl font-display font-syne-bold text-white">
              Ready to claim your freedom?
            </h2>
            <p className="text-white/60 text-base md:text-lg max-w-xl mx-auto font-body">
              Stop letting your account own you. Partner with APSARA and watch your earnings scale while you focus on what you do best.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4">
              <a
                href="/apply"
                className="btn-neon px-8 py-4 rounded-full text-sm font-semibold tracking-wider uppercase transition-all duration-300 w-full sm:w-auto"
              >
                <span>Apply To Partner</span>
              </a>
              <a
                href="/services"
                className="btn-ghost px-8 py-4 rounded-full text-sm font-semibold tracking-wider uppercase transition-all duration-300 w-full sm:w-auto"
              >
                Learn More
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
