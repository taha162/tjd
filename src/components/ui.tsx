"use client";

import { motion, Variants } from "framer-motion";
import { ReactNode, useRef } from "react";
import { clsx } from "clsx";

// ── Easing presets ─────────────────────────────────────────────────
export const ease = {
  spring: [0.16, 1, 0.3, 1] as [number, number, number, number],
  smooth: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
};

// ── FadeIn ─────────────────────────────────────────────────────────
interface FadeInProps {
  children: ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  className?: string;
  blur?: boolean;
}

export function FadeIn({
  children,
  delay = 0,
  direction = "up",
  className,
  blur = false,
}: FadeInProps) {
  const offsets = { up: [0, 30], down: [0, -20], left: [30, 0], right: [-30, 0], none: [0, 0] };
  const [ox, oy] = offsets[direction];

  return (
    <motion.div
      initial={{ opacity: 0, x: ox, y: oy, filter: blur ? "blur(8px)" : undefined }}
      whileInView={{ opacity: 1, x: 0, y: 0, filter: blur ? "blur(0px)" : undefined }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.75, delay, ease: ease.spring }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ── StaggerContainer ───────────────────────────────────────────────
export function StaggerContainer({
  children,
  className,
  delay = 0,
  stagger = 0.08,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  stagger?: number;
}) {
  const container: Variants = {
    hidden: {},
    visible: { transition: { delayChildren: delay, staggerChildren: stagger } },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className }: { children: ReactNode; className?: string }) {
  const item: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: ease.spring } },
  };

  return (
    <motion.div variants={item} className={className}>
      {children}
    </motion.div>
  );
}

// ── Button ─────────────────────────────────────────────────────────
type ButtonVariant = "primary" | "secondary" | "ghost" | "outline";

interface ButtonProps {
  children: ReactNode;
  variant?: ButtonVariant;
  href?: string;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  loading?: boolean;
  icon?: ReactNode;
}

export function Button({
  children,
  variant = "primary",
  href,
  onClick,
  className,
  type = "button",
  disabled,
  loading,
  icon,
}: ButtonProps) {
  const base =
    "relative inline-flex items-center gap-2.5 font-body font-medium text-sm tracking-wide rounded-full transition-all duration-300 select-none overflow-hidden";

  const variantStyles: Record<ButtonVariant, string> = {
    primary:
      "px-7 py-3.5 bg-gradient-to-r from-[#00e5ff] to-[#0099cc] text-obsidian-950 font-semibold shadow-glow-sm hover:shadow-glow-cyan hover:scale-[1.03] active:scale-[0.97] disabled:opacity-40 disabled:cursor-not-allowed",
    secondary:
      "px-7 py-3.5 glass border border-[var(--cyan)]/25 text-[var(--cyan)] hover:bg-[var(--cyan)]/8 hover:border-[var(--cyan)]/50 hover:shadow-glow-sm active:scale-[0.97]",
    outline:
      "px-7 py-3.5 border border-white/10 text-white/70 hover:border-white/25 hover:text-white hover:bg-white/4 active:scale-[0.97]",
    ghost:
      "px-5 py-2.5 text-white/45 hover:text-white hover:bg-white/5 active:scale-[0.97]",
  };

  const classes = clsx(base, variantStyles[variant], className);
  const content = (
    <>
      {loading ? (
        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin shrink-0" />
      ) : icon ? (
        <span className="shrink-0">{icon}</span>
      ) : null}
      {children}
    </>
  );

  if (href) {
    return (
      <motion.a href={href} className={classes} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={classes}
      whileHover={!disabled ? { scale: 1.03 } : {}}
      whileTap={!disabled ? { scale: 0.97 } : {}}
    >
      {content}
    </motion.button>
  );
}

// ── Section ────────────────────────────────────────────────────────
export function Section({ id, children, className }: { id: string; children: ReactNode; className?: string }) {
  return (
    <section id={id} className={clsx("relative py-28 md:py-36 section-padding", className)}>
      {children}
    </section>
  );
}

// ── SectionHeading ─────────────────────────────────────────────────
export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
}) {
  const isCenter = align === "center";

  return (
    <motion.div
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease: ease.spring }}
      className={clsx("flex flex-col mb-16", isCenter && "items-center text-center")}
    >
      {eyebrow && (
        <motion.span
          initial={{ opacity: 0, x: isCenter ? 0 : -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1, ease: ease.spring }}
          className="inline-flex items-center gap-2.5 font-mono text-[10px] tracking-[0.3em] uppercase text-[var(--cyan)] mb-4"
        >
          <span className="w-5 h-px bg-[var(--cyan)] opacity-60" />
          {eyebrow}
          <span className="w-5 h-px bg-[var(--cyan)] opacity-60" />
        </motion.span>
      )}
      <h2 className="font-display text-4xl md:text-[3.5rem] lg:text-[4rem] font-light text-white leading-[1.08] tracking-[-0.02em]">
        {title}
      </h2>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2, ease: ease.spring }}
          className={clsx(
            "mt-5 text-white/40 leading-[1.75] text-sm md:text-base font-light",
            isCenter ? "max-w-lg" : "max-w-2xl"
          )}
        >
          {subtitle}
        </motion.p>
      )}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3, ease: ease.spring }}
        style={{ originX: isCenter ? 0.5 : 0 }}
        className={clsx(
          "mt-6 h-px w-20 bg-gradient-to-r from-[var(--cyan)] via-[var(--cyan)]/50 to-transparent",
          isCenter && "mx-auto"
        )}
      />
    </motion.div>
  );
}

// ── AnimatedWords ──────────────────────────────────────────────────
export function AnimatedWords({
  text,
  className,
  delay = 0,
  stagger = 0.05,
}: {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
}) {
  const words = text.split(" ");

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { delayChildren: delay, staggerChildren: stagger } },
  };

  const child: Variants = {
    hidden: { opacity: 0, y: 35 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: ease.spring } },
  };

  return (
    <motion.div variants={container} initial="hidden" animate="visible" className={clsx("flex flex-wrap", className)}>
      {words.map((word, i) => (
        <motion.span key={i} variants={child} className="mr-[0.22em] last:mr-0">
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
}

// ── GlassCard ──────────────────────────────────────────────────────
export function GlassCard({
  children,
  className,
  hover = false,
  glow = "none",
  onClick,
}: {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  glow?: "cyan" | "purple" | "blue" | "none";
  onClick?: () => void;
}) {
  const glowMap: Record<string, string> = {
    cyan: "0 20px 60px rgba(0,0,0,0.5), 0 0 40px rgba(0,229,255,0.1), inset 0 1px 0 rgba(255,255,255,0.08)",
    purple: "0 20px 60px rgba(0,0,0,0.5), 0 0 40px rgba(0,102,255,0.1), inset 0 1px 0 rgba(255,255,255,0.08)",
    blue: "0 20px 60px rgba(0,0,0,0.5), 0 0 40px rgba(0,102,255,0.1), inset 0 1px 0 rgba(255,255,255,0.08)",
    none: "0 16px 48px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.07)",
  };

  return (
    <motion.div
      onClick={onClick}
      whileHover={hover ? { y: -4, boxShadow: glowMap[glow] } : {}}
      transition={{ duration: 0.3, ease: ease.smooth }}
      className={clsx("glass rounded-2xl", hover && "cursor-pointer", className)}
    >
      {children}
    </motion.div>
  );
}

// ── TiltCard ───────────────────────────────────────────────────────
export function TiltCard({
  children,
  className,
  onClick,
  glowColor = "rgba(0,229,255,0.08)",
  intensity = 8,
}: {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  glowColor?: string;
  intensity?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(900px) rotateY(${x * intensity}deg) rotateX(${-y * intensity}deg) scale3d(1.025,1.025,1.025)`;
    el.style.boxShadow = `${-x * 14}px ${y * 10}px 50px rgba(0,0,0,0.45), 0 0 35px ${glowColor}`;
  };

  const handleLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "";
    el.style.boxShadow = "";
  };

  return (
    <div
      ref={ref}
      onClick={onClick}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={clsx("cursor-pointer", className)}
      style={{ transition: "transform 0.15s ease, box-shadow 0.35s ease", transformStyle: "preserve-3d" }}
    >
      {children}
    </div>
  );
}
