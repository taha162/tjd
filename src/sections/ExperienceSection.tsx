"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Section, SectionHeading } from "@/components/ui";
import { experience } from "@/lib/data";

const accentMap: Record<string, string> = {
  cyan: "var(--cyan)",
  purple: "var(--blue)",
  teal: "var(--teal)",
  blue: "var(--blue)",
};

export default function ExperienceSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const lineScaleY = useTransform(scrollYProgress, [0.05, 0.9], [0, 1]);

  return (
    <Section id="experience">
      <div
        className="absolute left-0 top-1/3 w-[400px] h-[400px] opacity-[0.04] pointer-events-none orb"
        style={{ background: "radial-gradient(circle, var(--cyan) 0%, transparent 70%)" }}
      />

      <SectionHeading
        eyebrow="Track Record"
        title="Experience"
        subtitle="A timeline of meaningful work — from building apps during a pandemic to designing visual identities for real organizations."
      />

      <div ref={containerRef} className="relative ml-3 md:ml-10">
        {/* Scroll-driven vertical line */}
        <div className="absolute left-0 top-2 bottom-2 w-px overflow-hidden" aria-hidden="true">
          <motion.div
            style={{ scaleY: lineScaleY }}
            className="w-full h-full origin-top"
          >
            <div
              className="w-full h-full"
              style={{ background: "linear-gradient(180deg, var(--cyan) 0%, var(--blue) 55%, transparent 100%)" }}
            />
          </motion.div>
        </div>

        <div className="flex flex-col">
          {experience.map((exp, i) => {
            const color = accentMap[exp.accent] || "var(--cyan)";
            return (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: -28 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: i * 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="relative pl-10 md:pl-16 pb-10 last:pb-0 group"
              >
                {/* Dot */}
                <div className="absolute left-[-5px] top-2">
                  <motion.div
                    whileHover={{ scale: 1.5 }}
                    transition={{ type: "spring", stiffness: 400 }}
                    className="w-[11px] h-[11px] rounded-full border-2"
                    style={{ borderColor: color, background: "#030507", boxShadow: `0 0 14px ${color}55` }}
                  />
                  <div
                    className="absolute inset-0 rounded-full ping-slow opacity-0 group-hover:opacity-100"
                    style={{ background: color }}
                  />
                </div>

                {/* Card */}
                <motion.div
                  whileHover={{
                    borderColor: `${color}28`,
                    boxShadow: `0 16px 48px rgba(0,0,0,0.4), 0 0 30px ${color}0e`,
                  }}
                  transition={{ duration: 0.3 }}
                  className="glass rounded-2xl p-5 md:p-6 border border-white/[0.055]"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                    <div>
                      <h3 className="text-white font-semibold text-base md:text-[1.05rem] leading-snug mb-1">
                        {exp.role}
                      </h3>
                      <p className="text-white/32 text-xs">{exp.type}</p>
                    </div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span
                        className="text-[10px] font-mono px-3 py-1 rounded-full border"
                        style={{ color, borderColor: `${color}30`, background: `${color}0c` }}
                      >
                        {exp.category}
                      </span>
                      <span className="font-mono text-[10px] text-white/20">{exp.period}</span>
                    </div>
                  </div>
                  <ul className="flex flex-col gap-2.5">
                    {exp.contributions.map((c, j) => (
                      <li key={j} className="flex items-start gap-3 text-xs md:text-sm text-white/42 group-hover:text-white/55 transition-colors duration-300">
                        <span
                          className="mt-[5px] w-1 h-1 rounded-full shrink-0"
                          style={{ background: color }}
                        />
                        {c}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
