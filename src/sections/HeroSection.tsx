"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button, AnimatedWords } from "@/components/ui";
import { personal } from "@/lib/data";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";

function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const particles: Array<{
      x: number; y: number; vx: number; vy: number;
      r: number; alpha: number; color: string;
    }> = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize, { passive: true });

    const colors = ["#00e5ff", "#00bcd4", "#0066ff", "#00e5cc"];
    for (let i = 0; i < 70; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 1.4 + 0.3,
        alpha: Math.random() * 0.4 + 0.08,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 110) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(0,229,255,${0.05 * (1 - dist / 110)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        const hex = Math.round(p.alpha * 255).toString(16).padStart(2, "0");
        ctx.fillStyle = p.color + hex;
        ctx.fill();
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
      }
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-50" aria-hidden="true" />;
}

function useTypewriter(words: string[], speed = 75) {
  const [display, setDisplay] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIdx];
    const delay = deleting ? speed / 2 : speed;
    const t = setTimeout(() => {
      if (!deleting && charIdx < current.length) {
        setDisplay(current.slice(0, charIdx + 1));
        setCharIdx((c) => c + 1);
      } else if (!deleting && charIdx === current.length) {
        setTimeout(() => setDeleting(true), 2000);
      } else if (deleting && charIdx > 0) {
        setDisplay(current.slice(0, charIdx - 1));
        setCharIdx((c) => c - 1);
      } else {
        setDeleting(false);
        setWordIdx((w) => (w + 1) % words.length);
      }
    }, delay);
    return () => clearTimeout(t);
  }, [charIdx, deleting, wordIdx, words, speed]);

  return display;
}

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const opacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);

  const typeText = useTypewriter([
    "Mechatronics Engineer",
    "Graphic Designer",
    "UI/UX Designer",
    "Problem Solver",
    "Creative Thinker",
  ]);

  return (
    <section id="home" ref={sectionRef} className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-obsidian-950" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 55% at 50% -5%, rgba(0,102,255,0.08) 0%, transparent 65%), radial-gradient(ellipse 55% 45% at 85% 75%, rgba(0,229,255,0.05) 0%, transparent 55%)",
        }}
      />

      {/* Grid */}
      <div className="absolute inset-0 grid-lines pointer-events-none" aria-hidden="true" />

      {/* Animated orbs */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <motion.div
          animate={{ scale: [1, 1.12, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[15%] left-[8%] w-[650px] h-[650px] orb"
          style={{ background: "radial-gradient(circle, rgba(0,229,255,0.09) 0%, transparent 65%)" }}
        />
        <motion.div
          animate={{ scale: [1.1, 1, 1.1], opacity: [0.07, 0.15, 0.07] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[8%] right-[3%] w-[580px] h-[580px] orb"
          style={{ background: "radial-gradient(circle, rgba(0,102,255,0.09) 0%, transparent 65%)" }}
        />
      </div>

      <ParticleCanvas />

      {/* Content — scrolls out with parallax */}
      <motion.div style={{ y, opacity }} className="relative z-10 section-padding flex flex-col gap-6 pt-32">
        {/* Status badge */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="inline-flex items-center gap-2.5 font-mono text-[11px] tracking-[0.22em] uppercase text-[var(--cyan)] glass px-4 py-2 rounded-full border border-[var(--cyan)]/12">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--cyan)] opacity-55" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--cyan)]" />
            </span>
            Available for Collaboration
          </span>
        </motion.div>

        {/* Name */}
        <div className="overflow-hidden">
          <AnimatedWords
            text={personal.nameShort}
            delay={0.5}
            stagger={0.09}
            className="font-display text-[clamp(3.5rem,11vw,8rem)] font-light leading-none text-white tracking-[-0.03em]"
          />
        </div>

        {/* Typewriter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="flex items-center gap-3 h-8"
        >
          <span className="text-white/20 font-mono text-lg">—</span>
          <span className="font-mono text-lg md:text-xl text-[var(--cyan)] tracking-wide">
            {typeText}
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 1, repeat: Infinity, ease: "steps(1)" }}
              className="ml-0.5 inline-block"
            >
              |
            </motion.span>
          </span>
        </motion.div>

        {/* Summary */}
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-[480px] text-white/38 leading-[1.85] text-sm md:text-base font-light"
        >
          {personal.summary}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.25, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap items-center gap-3 mt-1"
        >
          <Button variant="primary" href="#works">View My Work</Button>
          <Button variant="secondary" href="#contact">Hire Me</Button>
        </motion.div>

        {/* Socials */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.45 }}
          className="flex items-center gap-3 mt-2"
        >
          {[
            { href: personal.github, icon: <Github size={15} />, label: "GitHub" },
            { href: personal.linkedin, icon: <Linkedin size={15} />, label: "LinkedIn" },
            { href: `mailto:${personal.email}`, icon: <Mail size={15} />, label: "Email" },
          ].map((s) => (
            <motion.a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              whileHover={{ y: -2, scale: 1.1 }}
              className="w-9 h-9 glass rounded-full flex items-center justify-center text-white/30 hover:text-[var(--cyan)] border border-transparent hover:border-[var(--cyan)]/20 transition-all duration-300"
            >
              {s.icon}
            </motion.a>
          ))}
          <span className="w-px h-5 bg-white/10 mx-1" />
          <span className="font-mono text-[11px] text-white/22 tracking-wide">{personal.location}</span>
        </motion.div>
      </motion.div>

      {/* Scroll hint */}
      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/18 hover:text-[var(--cyan)] transition-colors group"
        aria-label="Scroll down"
      >
        <span className="font-mono text-[10px] tracking-[0.3em] uppercase">Scroll</span>
        <motion.div animate={{ y: [0, 7, 0] }} transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}>
          <ArrowDown size={13} />
        </motion.div>
      </motion.a>
    </section>
  );
}
