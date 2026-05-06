"use client";

import { motion } from "framer-motion";
import { Section, SectionHeading } from "@/components/ui";
import { experience } from "@/lib/data";

const accentMap: Record<string, string> = {
  cyan: "var(--cyan)",
  purple: "var(--purple)",
  teal: "var(--teal)",
  blue: "var(--blue)",
};

export default function ExperienceSection() {
  return (
    <Section id="experience">
      {/* BG glow */}
      <div
        className="absolute left-0 top-1/3 w-[300px] h-[300px] opacity-5 pointer-events-none"
        style={{
          background: "radial-gradient(circle, var(--cyan) 0%, transparent 70%)",
          filter: "blur(50px)",
        }}
      />

      <SectionHeading
        eyebrow="Track Record"
        title="Experience"
        subtitle="A timeline of meaningful work — from building apps during a pandemic to designing visual identities for real organizations."
      />

      {/* Timeline */}
      <div className="relative ml-3 md:ml-8">
        {/* Vertical line */}
        <motion.div
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="absolute left-0 top-2 bottom-2 w-px origin-top"
          style={{ background: "linear-gradient(180deg, var(--cyan), var(--purple), transparent)" }}
        />

        <div className="flex flex-col gap-0">
          {experience.map((exp, i) => {
            const color = accentMap[exp.accent] || "var(--cyan)";
            return (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  delay: i * 0.12,
                  duration: 0.7,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="relative pl-10 md:pl-16 pb-12 last:pb-0 group"
              >
                {/* Dot */}
                <div className="absolute left-[-5px] top-1.5">
                  <div
                    className="w-[11px] h-[11px] rounded-full border-2 transition-all duration-300 group-hover:scale-125"
                    style={{
                      borderColor: color,
                      background: "var(--obsidian-950, #020408)",
                      boxShadow: `0 0 12px ${color}66`,
                    }}
                  />
                  {/* Ping */}
                  <div
                    className="absolute inset-0 rounded-full ping-slow opacity-0 group-hover:opacity-100"
                    style={{ background: color }}
                  />
                </div>

                {/* Card */}
                <div
                  className="glass rounded-2xl p-5 md:p-6 border transition-all duration-300 group-hover:border-opacity-40"
                  style={{
                    borderColor: `${color}1a`,
                    "--hover-shadow": `0 0 30px ${color}18`,
                  } as React.CSSProperties}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.boxShadow = `0 0 30px ${color}18`;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.boxShadow = "";
                  }}
                >
                  {/* Header */}
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                    <div>
                      <h3
                        className="text-white font-semibold text-base md:text-lg leading-snug"
                      >
                        {exp.role}
                      </h3>
                      <p className="text-white/45 text-xs mt-0.5">{exp.type}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className="text-[10px] font-mono px-3 py-1 rounded-full border"
                        style={{
                          color: color,
                          borderColor: `${color}40`,
                          background: `${color}10`,
                        }}
                      >
                        {exp.category}
                      </span>
                      <span className="font-mono text-[10px] text-white/25">
                        {exp.period}
                      </span>
                    </div>
                  </div>

                  {/* Contributions */}
                  <ul className="flex flex-col gap-2">
                    {exp.contributions.map((c, j) => (
                      <li key={j} className="flex items-start gap-2.5 text-xs md:text-sm text-white/50">
                        <span
                          className="mt-1.5 w-1 h-1 rounded-full shrink-0"
                          style={{ background: color }}
                        />
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
