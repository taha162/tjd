"use client";

import { motion, Variants } from "framer-motion";
import { ReactNode } from "react";
import { clsx } from "clsx";

// ── Button ─────────────────────────────────────────────────────────
type ButtonVariant = "primary" | "secondary" | "ghost";

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
    "inline-flex items-center gap-2 font-body font-medium text-sm tracking-wide rounded-full transition-all duration-300 select-none";

  const variants: Record<ButtonVariant, string> = {
    primary:
      "px-7 py-3 bg-gradient-to-r from-cyan-400 to-purple-600 text-obsidian-950 hover:shadow-glow-cyan hover:scale-105 active:scale-95 disabled:opacity-50",
    secondary:
      "px-7 py-3 glass border border-[var(--cyan)]/30 text-[var(--cyan)] hover:bg-[var(--cyan)]/10 hover:border-[var(--cyan)]/60 active:scale-95",
    ghost:
      "px-5 py-2 text-white/50 hover:text-white hover:bg-white/5 active:scale-95",
  };

  const classes = clsx(base, variants[variant], className);

  if (href) {
    return (
      <motion.a
        href={href}
        className={classes}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
      >
        {icon && <span>{icon}</span>}
        {children}
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
      {loading ? (
        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : (
        icon && <span>{icon}</span>
      )}
      {children}
    </motion.button>
  );
}

// ── SectionWrapper ─────────────────────────────────────────────────
interface SectionProps {
  id: string;
  children: ReactNode;
  className?: string;
}

export function Section({ id, children, className }: SectionProps) {
  return (
    <section
      id={id}
      className={clsx("relative py-24 md:py-32 section-padding", className)}
    >
      {children}
    </section>
  );
}

// ── SectionHeading ─────────────────────────────────────────────────
interface HeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
}: HeadingProps) {
  const textAlign = align === "center" ? "text-center items-center" : "";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={clsx("flex flex-col mb-16", textAlign)}
    >
      {eyebrow && (
        <span className="font-mono text-xs tracking-[0.25em] uppercase text-[var(--cyan)] mb-3">
          {eyebrow}
        </span>
      )}
      <h2 className="font-display text-4xl md:text-6xl font-light text-white leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-white/45 max-w-2xl leading-relaxed text-sm md:text-base">
          {subtitle}
        </p>
      )}
      <div
        className={clsx("mt-5 h-px w-24 bg-gradient-to-r from-[var(--cyan)] to-transparent", align === "center" && "mx-auto")}
      />
    </motion.div>
  );
}

// ── AnimatedText ───────────────────────────────────────────────────
interface AnimatedTextProps {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
}

export function AnimatedWords({
  text,
  className,
  delay = 0,
  stagger = 0.05,
}: AnimatedTextProps) {
  const words = text.split(" ");

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: delay,
        staggerChildren: stagger,
      },
    },
  };

  const child: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="visible"
      className={clsx("flex flex-wrap", className)}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          variants={child}
          className="mr-[0.25em] last:mr-0"
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
}

// ── GlassCard ──────────────────────────────────────────────────────
interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  glow?: "cyan" | "purple" | "none";
  onClick?: () => void;
}

export function GlassCard({
  children,
  className,
  hover = false,
  glow = "none",
  onClick,
}: CardProps) {
  return (
    <motion.div
      onClick={onClick}
      whileHover={
        hover
          ? {
              y: -4,
              boxShadow:
                glow === "cyan"
                  ? "var(--glow-cyan)"
                  : glow === "purple"
                  ? "var(--glow-purple)"
                  : "0 20px 60px rgba(0,0,0,0.4)",
            }
          : {}
      }
      transition={{ duration: 0.25 }}
      className={clsx(
        "glass rounded-2xl",
        hover && "cursor-pointer",
        className
      )}
    >
      {children}
    </motion.div>
  );
}
