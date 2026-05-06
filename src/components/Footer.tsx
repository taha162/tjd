"use client";

import { motion } from "framer-motion";
import { personal } from "@/lib/data";
import { Github, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-white/5 py-10 section-padding">
      <div className="neon-line absolute top-0 left-0 right-0" />

      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-display text-lg"
        >
          <span className="text-gradient-cyan font-semibold">TJ</span>
          <span className="text-white/25 ml-1 text-xs font-mono tracking-[0.2em]">
            .portfolio
          </span>
        </motion.div>

        {/* Copyright */}
        <p className="font-mono text-[10px] text-white/20 tracking-wide text-center">
          © {year} {personal.name}. Crafted with precision.
        </p>

        {/* Social */}
        <div className="flex items-center gap-3">
          {[
            { href: personal.github, icon: <Github size={13} />, label: "GitHub" },
            { href: personal.linkedin, icon: <Linkedin size={13} />, label: "LinkedIn" },
            { href: `mailto:${personal.email}`, icon: <Mail size={13} />, label: "Email" },
          ].map((s) => (
            <motion.a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              whileHover={{ y: -2 }}
              className="text-white/25 hover:text-[var(--cyan)] transition-colors"
            >
              {s.icon}
            </motion.a>
          ))}
        </div>
      </div>
    </footer>
  );
}
