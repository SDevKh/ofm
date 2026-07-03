"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, Star } from "lucide-react";

/* ─── Particle Canvas ─── */
function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const particles: {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      baseOpacity: number;
      phase: number;
      twinkleSpeed: number;
      color: string;
    }[] = [];

    const COLORS = [
      "rgba(255, 255, 255,",      // Bright White
      "rgba(123, 184, 255,",      // Electric Blue
      "rgba(167, 139, 250,",      // Vivid Purple
      "rgba(244, 143, 177,",      // Bright Pink
    ];

    let meteor = {
      x: 0,
      y: 0,
      dx: 0,
      dy: 0,
      length: 0,
      speed: 0,
      opacity: 0,
      active: false,
    };

    const mouse = { x: -1000, y: -1000 };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const init = () => {
      particles.length = 0;
      // Increased particle count density (from /12000 to /8500)
      const count = Math.min(180, Math.floor((canvas.width * canvas.height) / 8500));
      for (let i = 0; i < count; i++) {
        const baseOpacity = Math.random() * 0.5 + 0.4; // 0.4 to 0.9 (was 0.1 to 0.6)
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.4, // slightly faster drift (was 0.3)
          vy: (Math.random() - 0.5) * 0.4,
          radius: Math.random() * 2.0 + 0.4, // slightly larger max size (was 1.5 + 0.3)
          baseOpacity,
          phase: Math.random() * Math.PI * 2,
          twinkleSpeed: Math.random() * 0.02 + 0.008,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
        });
      }
    };

    const spawnMeteor = () => {
      meteor.active = true;
      meteor.x = Math.random() * canvas.width * 0.8;
      meteor.y = Math.random() * canvas.height * 0.3;
      const angle = Math.PI / 6 + Math.random() * (Math.PI / 12); // 30-45 degrees downwards
      meteor.speed = Math.random() * 9 + 7;
      meteor.dx = Math.cos(angle) * meteor.speed;
      meteor.dy = Math.sin(angle) * meteor.speed;
      meteor.length = Math.random() * 100 + 60;
      meteor.opacity = 1.0;
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw connections (subtle, glowy)
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 110) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            const lineOpacity = 0.09 * (1 - dist / 110) * ((particles[i].baseOpacity + particles[j].baseOpacity) / 2);
            ctx.strokeStyle = `rgba(123, 184, 255, ${lineOpacity})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      // Draw particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.phase += p.twinkleSpeed;

        // Mouse interaction: push particles away gently
        if (mouse.x > -500) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 160) {
            const force = (160 - dist) / 160;
            const angle = Math.atan2(dy, dx);
            p.x += Math.cos(angle) * force * 1.5;
            p.y += Math.sin(angle) * force * 1.5;
          }
        }

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        // Twinkle factor calculation
        const opacity = p.baseOpacity * (0.4 + 0.6 * Math.abs(Math.sin(p.phase)));

        // Large star glow
        if (p.radius > 1.5 && opacity > 0.6) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius * 2.2, 0, Math.PI * 2);
          ctx.fillStyle = `${p.color}${opacity * 0.22})`;
          ctx.fill();
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${opacity})`;
        ctx.fill();
      });

      // Update & Draw Shooting Star
      if (meteor.active) {
        meteor.x += meteor.dx;
        meteor.y += meteor.dy;
        meteor.opacity -= 0.018; // Fade out rate

        if (meteor.opacity <= 0 || meteor.x > canvas.width || meteor.y > canvas.height) {
          meteor.active = false;
        } else {
          const gradient = ctx.createLinearGradient(
            meteor.x,
            meteor.y,
            meteor.x - meteor.dx * (meteor.length / meteor.speed),
            meteor.y - meteor.dy * (meteor.length / meteor.speed)
          );
          gradient.addColorStop(0, `rgba(255, 255, 255, ${meteor.opacity})`);
          gradient.addColorStop(0.3, `rgba(123, 184, 255, ${meteor.opacity * 0.7})`);
          gradient.addColorStop(1, "rgba(77, 159, 255, 0)");

          ctx.beginPath();
          ctx.moveTo(meteor.x, meteor.y);
          ctx.lineTo(
            meteor.x - meteor.dx * (meteor.length / meteor.speed),
            meteor.y - meteor.dy * (meteor.length / meteor.speed)
          );
          ctx.strokeStyle = gradient;
          ctx.lineWidth = 2.2;
          ctx.stroke();
        }
      } else {
        // 0.25% chance to trigger shooting star per frame
        if (Math.random() < 0.0025) {
          spawnMeteor();
        }
      }

      animId = requestAnimationFrame(draw);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    resize();
    init();
    draw();

    window.addEventListener("resize", () => {
      resize();
      init();
    });
    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", () => {
        resize();
        init();
      });
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full opacity-90"
      aria-hidden="true"
    />
  );
}

/* ─── Hero ─── */
export default function Hero() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.12, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  return (
    <section
      id="home"
      className="relative min-h-[100svh] flex flex-col items-center justify-center overflow-hidden"
      aria-label="Hero"
    >
      {/* Canvas background */}
      <ParticleCanvas />

      {/* Gradient orbs */}
      <div
        className="absolute top-[10%] left-[15%] w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(77, 159, 255, 0.12) 0%, transparent 70%)",
          filter: "blur(60px)",
          animation: "float 8s ease-in-out infinite",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-[10%] right-[10%] w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(139, 92, 246, 0.1) 0%, transparent 70%)",
          filter: "blur(80px)",
          animation: "float 10s ease-in-out infinite reverse",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute top-[40%] right-[30%] w-[300px] h-[300px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(244, 114, 182, 0.07) 0%, transparent 70%)",
          filter: "blur(60px)",
          animation: "float 12s ease-in-out infinite 2s",
        }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="container-wide relative z-10 py-20 sm:py-32 flex-1 flex items-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center max-w-5xl mx-auto"
        >
          {/* Badge */}
          <motion.div variants={itemVariants} className="flex justify-center mb-8">
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium"
              style={{
                background: "rgba(77, 159, 255, 0.1)",
                border: "1px solid rgba(77, 159, 255, 0.25)",
                color: "#7bb8ff",
              }}
            >
              <Star size={13} fill="#7bb8ff" />
              <span>Trusted by 200+ creators worldwide</span>
              <Star size={13} fill="#7bb8ff" />
            </div>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={itemVariants}
            className="font-bold leading-[1.05] mb-7"
            style={{
              fontFamily: "var(--font-space-grotesk)",
              fontSize: "clamp(2.8rem, 7vw, 6rem)",
              letterSpacing: "-0.03em",
              color: "#ffffff",
            }}
          >
            Scale Your Creator Business{" "}
            <span className="gradient-text block sm:inline">
              Without Managing It Yourself.
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            variants={itemVariants}
            className="text-lg sm:text-xl text-white/55 max-w-2xl mx-auto leading-relaxed mb-12"
          >
            We handle strategy, fan messaging, marketing, growth, and operations
            while you focus on creating content.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a
              href="#contact"
              className="btn-neon px-8 py-4 rounded-2xl text-base font-semibold flex items-center gap-2 group"
              style={{ minWidth: "180px", justifyContent: "center", display: "flex", alignItems: "center" }}
            >
              <span>Apply Now</span>
              <ArrowRight
                size={16}
                className="group-hover:translate-x-1 transition-transform duration-200"
              />
            </a>
            <a
              href="#contact"
              className="btn-ghost px-8 py-4 rounded-2xl text-base font-semibold flex items-center gap-2"
              style={{ minWidth: "200px", justifyContent: "center", display: "flex", alignItems: "center" }}
            >
              <Calendar size={16} />
              <span>Book a Discovery Call</span>
            </a>
          </motion.div>

          {/* Social proof micro-stats */}
          <motion.div
            variants={itemVariants}
            className="mt-16 flex flex-wrap items-center justify-center gap-8"
          >
            {[
              { label: "Creator Revenue", value: "$50M+" },
              { label: "Active Creators", value: "200+" },
              { label: "Avg Revenue Lift", value: "340%" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div
                  className="text-2xl font-bold gradient-text"
                  style={{ fontFamily: "var(--font-space-grotesk)" }}
                >
                  {stat.value}
                </div>
                <div className="text-xs text-white/40 mt-0.5 uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, transparent, #080808)",
        }}
        aria-hidden="true"
      />
    </section>
  );
}
