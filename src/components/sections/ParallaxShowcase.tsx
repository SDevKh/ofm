"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Sparkles, TrendingUp, ShieldCheck } from "lucide-react";
import { NavbarButton } from "@/components/ui/resizable-navbar";

gsap.registerPlugin(ScrollTrigger);

const slidesData = [
  {
    image: "/assets/01.webp",
    tag: "01 / SCALING SYSTEMS",
    title: "REWRITE THE LAWS OF GROWTH",
    desc: "We scale creator businesses with predictive strategy, content directions, and hyper-targeted execution. Focus entirely on content while we run the machine.",
    metric: "$18,400/mo average",
    metricLabel: "Creator A (Fitness niche)",
    icon: Sparkles,
  },
  {
    image: "/assets/02.webp",
    tag: "02 / TRAFFIC ENGINE",
    title: "UNRIVALED ACQUISITION",
    desc: "Deploy cross-platform funnels across Reddit, X, TikTok, and Instagram. We drive high-intent subscribers to your profile 24/7 without paid ads.",
    metric: "+510% Revenue Growth",
    metricLabel: "Creator B (Fashion & Beauty)",
    icon: TrendingUp,
  },
  {
    image: "/assets/03.webp",
    tag: "03 / CONVERSION LABS",
    title: "MAXIMUM FAN VALUE",
    desc: "Professional 24/7 chatters convert casual subscribers into super-fans using premium messaging architectures, personalized flows, and custom upsells.",
    metric: "94% Fan Retention",
    metricLabel: "Creator C (Gaming & Ent.)",
    icon: ShieldCheck,
  },
];

export default function ParallaxShowcase() {
  const triggerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Pin wrapper and translate section horizontally
      const horizontalTween = gsap.fromTo(
        sectionRef.current,
        { x: 0 },
        {
          x: "-200vw",
          ease: "none",
          scrollTrigger: {
            trigger: triggerRef.current,
            pin: true,
            scrub: 1,
            start: "top top",
            end: () => `+=${window.innerHeight * 2.5}`,
            invalidateOnRefresh: true,
          },
        }
      );

      // Parallax effect on images
      gsap.utils.toArray(".parallax-img-container").forEach((container: any) => {
        const img = container.querySelector(".parallax-img");
        if (img) {
          gsap.fromTo(
            img,
            { xPercent: -15 },
            {
              xPercent: 15,
              ease: "none",
              scrollTrigger: {
                trigger: container.closest(".parallax-slide"),
                containerAnimation: horizontalTween,
                start: "left right",
                end: "right left",
                scrub: true,
              },
            }
          );
        }
      });

      // Parallax on marquees (horizontal movement + scale pulse)
      gsap.utils.toArray(".parallax-marquee").forEach((marquee: any) => {
        gsap.fromTo(
          marquee,
          { xPercent: 30, scale: 1.25 },
          {
            xPercent: -35,
            scale: 0.9,
            ease: "none",
            scrollTrigger: {
              trigger: marquee.closest(".parallax-slide"),
              containerAnimation: horizontalTween,
              start: "left right",
              end: "right left",
              scrub: true,
            },
          }
        );
      });

      // Reveal text content in each slide smoothly
      gsap.utils.toArray(".slide-content").forEach((content: any) => {
        gsap.fromTo(
          content,
          { opacity: 0.4, y: 30 },
          {
            opacity: 1,
            y: 0,
            ease: "power2.out",
            scrollTrigger: {
              trigger: content.closest(".parallax-slide"),
              containerAnimation: horizontalTween,
              start: "left center",
              end: "center center",
              scrub: 0.5,
            },
          }
        );
      });
    }, triggerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={triggerRef} className="relative w-full overflow-hidden bg-black">
      {/* Horizontal container */}
      <div
        ref={sectionRef}
        className="flex h-screen w-[300vw] flex-row items-center"
      >
        {slidesData.map((slide, index) => {
          const Icon = slide.icon;
          return (
            <section
              key={index}
              className="parallax-slide relative flex h-full w-screen flex-shrink-0 items-center justify-center overflow-hidden px-6 lg:px-24"
            >
              {/* Background Parallax Image */}
              <div className="parallax-img-container absolute inset-0 -z-10 h-full w-full bg-black">
                <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/45 to-black/90 z-10" />
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="parallax-img h-full w-[130%] object-cover opacity-100 pointer-events-none"
                />
              </div>

              {/* Huge Background Decorative Marquee */}
              <div className="absolute top-[12vh] left-0 right-0 pointer-events-none overflow-hidden select-none z-0 opacity-5">
                <div
                  className="parallax-marquee whitespace-nowrap text-[12vw] font-black tracking-tighter text-white"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {slide.title.split(" ").slice(-2).join(" ")} • {slide.title.split(" ").slice(-2).join(" ")}
                </div>
              </div>

              {/* Main Content Layout */}
              <div className="slide-content relative z-20 grid w-full max-w-7xl grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                {/* Text column */}
                <div className="lg:col-span-7 flex flex-col items-start gap-6 text-left">
                  <span className="text-sm font-bold uppercase tracking-[0.3em] text-rose-gold">
                    {slide.tag}
                  </span>

                  <h2
                    className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-[1.1]"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {slide.title.split(" ").map((word, i) => (
                      <span key={i} className={i % 2 === 1 ? "gradient-text" : ""}>
                        {word}{" "}
                      </span>
                    ))}
                  </h2>

                  <p className="text-white/60 text-lg leading-relaxed max-w-xl">
                    {slide.desc}
                  </p>

                  <div className="flex flex-wrap items-center gap-4 mt-2">
                    <NavbarButton href="#contact" variant="gradient" className="flex items-center gap-2 group">
                      Get Started
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </NavbarButton>
                    <NavbarButton href="#services" variant="secondary">
                      Learn Our Systems
                    </NavbarButton>
                  </div>
                </div>

                {/* Glassmorphic Metrics Card column */}
                <div className="lg:col-span-5 flex justify-center lg:justify-end">
                  <div className="glass w-full max-w-md rounded-[24px] p-8 border border-white/5 relative overflow-hidden backdrop-blur-xl bg-black/40">
                    {/* Top Glow Accent */}
                    <div className="absolute top-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-amber-gold/40 to-transparent" />

                    <div className="flex items-center justify-between mb-8">
                      <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-amber-gold">
                        <Icon className="h-6 w-6" />
                      </div>
                      <span className="text-xs font-bold tracking-[0.2em] text-white/30 uppercase">
                        verified performance
                      </span>
                    </div>

                    <div className="flex flex-col gap-2">
                      <span className="text-4xl sm:text-5xl font-black text-white tracking-tight">
                        {slide.metric}
                      </span>
                      <span className="text-sm font-medium text-white/50">
                        {slide.metricLabel}
                      </span>
                    </div>

                    {/* Chart visual representation */}
                    <div className="mt-8 pt-6 border-t border-white/5 flex items-end justify-between h-20 gap-1.5" aria-hidden="true">
                      {[35, 45, 40, 55, 60, 50, 70, 85, 95, 100].map((h, i) => (
                        <div
                          key={i}
                          className="w-full rounded-t bg-gradient-to-t from-amber-gold/40 to-rose-gold/90 transition-all duration-500 hover:opacity-100"
                          style={{
                            height: `${h}%`,
                            opacity: 0.4 + i * 0.06,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
