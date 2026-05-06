"use client";

import { motion } from "framer-motion";
import { personal } from "@/lib/data";
import { Github, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-white/[0.05] py-10 section-padding overflow-hidden">
      <div className="neon-line absolute top-0 left-0 right-0 opacity-25" />

      <div className="flex flex-col md:flex-row items-center justify-between gap-5">
        <motion.a
          href="#home"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.02 }}
          className="font-display text-lg"
        >
          <span className="text-gradient-cyan font-semibold">TJ</span>
          <span className="text-white/20 ml-1 text-xs font-mono tracking-[0.2em]">.portfolio</span>
        </motion.a>

        <p className="font-mono text-[10px] text-white/18 tracking-wide text-center">
          © {year} {personal.name}. Crafted with precision.
        </p>

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
              whileHover={{ y: -2, scale: 1.1 }}
              className="w-8 h-8 glass rounded-full flex items-center justify-center text-white/22 hover:text-[var(--cyan)] border border-white/[0.05] hover:border-[var(--cyan)]/20 transition-all duration-300"
            >
              {s.icon}
            </motion.a>
          ))}
        </div>
      </div>
    </footer>
  );
}
