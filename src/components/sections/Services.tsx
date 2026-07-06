"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  UserCog,
  MessageSquareHeart,
  TrendingUp,
  Lightbulb,
  Share2,
  Megaphone,
  BarChart3,
  ShieldCheck,
  Sparkles,
  Rocket,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    icon: UserCog,
    title: "Account Management",
    description:
      "A dedicated account manager handles your daily operations, keeping everything optimized and revenue-generating 24/7.",
    color: "#ffffffff",
    image: "/assets/1.webp",
  },
  {
    icon: MessageSquareHeart,
    title: "Fan Messaging",
    description:
      "Professional chatters engage your fanbase with personalized messaging strategies that maximize conversions and retention.",
    color: "#ffffffff",
    image: "/assets/2.webp",
  },
  {
    icon: Lightbulb,
    title: "Content Strategy",
    description:
      "Custom content calendars and creative direction tailored to your brand, audience, and growth goals.",
    color: "#ffffffff",
    image: "/assets/3.webp",
  },
  {
    icon: Share2,
    title: "Social Media Growth",
    description:
      "Cross-platform growth strategies on Reddit, Twitter/X, TikTok, and Instagram to drive consistent traffic.",
    color: "#ffffffff",
    image: "/assets/4.webp",
  },
  {
    icon: Megaphone,
    title: "Marketing",
    description:
      "Paid and organic marketing campaigns designed by specialists who understand the creator economy deeply.",
    color: "#ffffffff",
    image: "/assets/5.webp",
  },
  {
    icon: Rocket,
    title: "Scaling Systems",
    description:
      "Proven systems and automation frameworks to scale beyond income plateaus into apsara creator territory.",
    color: "#ffffffff",
    image: "/assets/6.webp",
  },
  {
    icon: TrendingUp,
    title: "Revenue Optimization",
    description:
      "Data-driven pricing, PPV strategy, and upsell frameworks that consistently push your earnings to new heights.",
    color: "#ffffffff",
    image: "/assets/7.webp",
  },
  {
    icon: BarChart3,
    title: "Analytics & Reporting",
    description:
      "Weekly performance reports with actionable insights, revenue breakdowns, and growth tracking dashboards.",
    color: "#ffffffff",
    image: "/assets/8.webp",
  },
  {
    icon: ShieldCheck,
    title: "DMCA & Privacy",
    description:
      "Full content protection service — active monitoring, DMCA takedowns, and privacy safeguarding done for you.",
    color: "#ffffffff",
    image: "/assets/9.webp",
  },
  {
    icon: Sparkles,
    title: "Brand Strategy",
    description:
      "Build a sustainable, memorable personal brand that commands premium pricing and long-term audience loyalty.",
    color: "#ffffffff",
    image: "/assets/10.webp",
  },
];

export default function Services() {
  const triggerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    const trigger = triggerRef.current;
    if (!track || !trigger) return;

    let horizontalTween: gsap.core.Tween;

    const ctx = gsap.context(() => {
      // Calculate scroll offset dynamically based on content width
      const getScrollAmount = () => {
        return -(track.scrollWidth - window.innerWidth + 80);
      };

      horizontalTween = gsap.fromTo(
        track,
        { x: 0 },
        {
          x: getScrollAmount,
          ease: "none",
          scrollTrigger: {
            trigger: trigger,
            pin: true,
            scrub: 1,
            start: "top top",
            end: () => `+=${track.scrollWidth - window.innerWidth + 300}`,
            invalidateOnRefresh: true,
          },
        }
      );

      // Parallax effect on image container displacement
      const images = gsap.utils.toArray(".services-media-img");
      images.forEach((img: any) => {
        const container = img.closest(".services-media-container");
        if (container) {
          gsap.fromTo(
            img,
            { xPercent: -10 },
            {
              xPercent: 10,
              ease: "none",
              scrollTrigger: {
                trigger: container,
                containerAnimation: horizontalTween,
                start: "left right",
                end: "right left",
                scrub: true,
              },
            }
          );
        }
      });
    }, triggerRef);

    // Delayed refreshes to capture layout stabilization
    const timer1 = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 500);

    const timer2 = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 1500);

    const handleLoad = () => {
      ScrollTrigger.refresh();
    };
    window.addEventListener("load", handleLoad);

    return () => {
      ctx.revert();
      clearTimeout(timer1);
      clearTimeout(timer2);
      window.removeEventListener("load", handleLoad);
    };
  }, []);

  return (
    <section
      id="services"
      ref={triggerRef}
      className="relative w-full bg-[#0e0712] overflow-hidden animate-fade-up"
      aria-label="Services"
    >
      {/* Background radial gradient mesh */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(212, 55, 188, 0.03) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div
        ref={containerRef}
        className="min-h-screen w-full flex flex-col justify-center sticky top-0 overflow-hidden py-16 z-10"
      >
        {/* Header Block */}
        <div className="container-wide relative z-20 w-full mb-10 flex flex-col items-center text-center px-6">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/30 mb-3">
            What We Do
          </p>
          <h2
            className="text-3xl sm:text-5xl font-bold text-white mb-4 font-dmSans leading-tight"
          >
            Everything your creator business{" "}
            <span className="gradient-text text-[15vw] sm:text-[5vw] font-caveat">needs to scale</span>
          </h2>
          <p className="text-white/50 text-sm sm:text-base max-w-2xl leading-relaxed">
            A full-stack management suite covering every dimension of creator growth — so you never have to juggle operations again.
          </p>
        </div>

        {/* Horizontal scroll track of services */}
        <div className="relative w-full z-20 flex items-center overflow-hidden">
          <div
            ref={trackRef}
            className="flex  will-change-transform"
          >
            {services.map((service, i) => {
              const Icon = service.icon;
              return (
                <article
                  key={service.title}
                  className="flex-shrink-0 relative overflow-hidden glass aspect-[4/3] h-[55vh] sm:h-[65vh] w-[73.33vh] sm:w-[86.67vh] group cursor-pointer border border-white/5 bg-black/40 flex flex-col justify-end"
                >
                  {/* Full image background container */}
                  <div className="services-media-container absolute inset-0 w-full h-full overflow-hidden  z-0 bg-black/50">
                    {/* Shadow overlay to improve text visibility */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent z-10" />

                    <img
                      src={service.image}
                      alt={service.title}
                      className="services-media-img absolute top-0  w-[130%] h-full object-cover transition-transform duration-500 group-hover:scale-105 will-change-transform"
                      loading="lazy"
                    />
                  </div>

                  {/* Floating Glassmorphic Title & Description Box */}
                  <div className="absolute bottom-4 left-4 right-4 z-20 glass rounded-[20px] border border-white/10 backdrop-blur-md bg-black/50 p-4 sm:p-5 flex flex-col justify-start transition-all duration-500 ease-out h-[64px] group-hover:h-[82%] overflow-hidden">

                    {/* Centered Title (Non-hovered state) */}
                    <div className="h-[32px] flex items-center justify-center transition-all duration-500 group-hover:justify-start group-hover:mb-4">
                      <h3
                        className="text-white font-bold text-[11px] sm:text-xs tracking-[0.15em] uppercase text-center group-hover:text-left transition-all duration-500"
                        style={{ fontFamily: "var(--font-sans)" }}
                      >
                        {service.title}
                      </h3>
                    </div>

                    {/* Description & Icon (Fades in on hover) */}
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100 flex flex-col flex-grow justify-between">
                      <div>
                        {/* Icon */}
                        <div
                          className="w-9 h-9 rounded-xl flex items-center justify-center mb-3 relative"
                          style={{
                            background: `${service.color}18`,
                            border: `1px solid ${service.color}30`,
                          }}
                        >
                          <Icon size={16} style={{ color: service.color }} />
                        </div>
                        <p className="text-white/65 text-[11px] sm:text-xs leading-relaxed">
                          {service.description}
                        </p>
                      </div>

                      {/* Accent Action Link */}
                      <div
                        className="text-[10px] sm:text-xs font-semibold flex items-center gap-1.5 mt-auto pt-2 border-t border-white/5"
                        style={{ color: service.color }}
                      >
                        Learn more <span>→</span>
                      </div>
                    </div>

                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
