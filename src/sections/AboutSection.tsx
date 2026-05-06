"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Section, SectionHeading, GlassCard, StaggerContainer, StaggerItem } from "@/components/ui";
import {
  education, achievements, courses, workshops, skills, volunteering,
} from "@/lib/data";
import { GraduationCap, Trophy, BookOpen, Wrench, Globe, Heart } from "lucide-react";

const tabs = [
  { id: "education", label: "Education", icon: <GraduationCap size={13} /> },
  { id: "skills", label: "Skills", icon: <Wrench size={13} /> },
  { id: "achievements", label: "Achievements", icon: <Trophy size={13} /> },
  { id: "courses", label: "Courses", icon: <BookOpen size={13} /> },
  { id: "languages", label: "Languages", icon: <Globe size={13} /> },
  { id: "volunteering", label: "Volunteering", icon: <Heart size={13} /> },
];

function SkillBar({ name, level, delay }: { name: string; level: number; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      className="group"
    >
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs text-white/50 group-hover:text-white/80 transition-colors duration-300">{name}</span>
        <span className="font-mono text-[11px] text-[var(--cyan)] opacity-60 group-hover:opacity-100 transition-opacity">{level}%</span>
      </div>
      <div className="h-[3px] rounded-full bg-white/[0.05] overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{ delay: delay + 0.2, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="h-full rounded-full relative"
          style={{ background: "linear-gradient(90deg, var(--cyan), var(--blue))" }}
        >
          <span
            className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            style={{ background: "var(--cyan)", boxShadow: "0 0 6px var(--cyan)" }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
}

function LangBadge({ lang, level, code, pct }: { lang: string; level: string; code: string; pct: number }) {
  const r = 28;
  const circ = 2 * Math.PI * r;
  const dash = (pct / 100) * circ;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col items-center gap-2.5"
    >
      <div className="relative w-[76px] h-[76px]">
        <svg className="absolute inset-0 -rotate-90" width="76" height="76" viewBox="0 0 76 76">
          <circle cx="38" cy="38" r={r} fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="3" />
          <motion.circle
            cx="38" cy="38" r={r} fill="none" stroke="url(#lg2)"
            strokeWidth="3" strokeLinecap="round"
            initial={{ strokeDasharray: `0 ${circ}` }}
            whileInView={{ strokeDasharray: `${dash} ${circ}` }}
            viewport={{ once: true }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          />
          <defs>
            <linearGradient id="lg2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#00e5ff" />
              <stop offset="100%" stopColor="#0066ff" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-mono font-bold text-[11px] text-[var(--cyan)]">{code}</span>
        </div>
      </div>
      <div className="text-center">
        <p className="text-xs font-medium text-white/70">{lang}</p>
        <p className="text-[10px] font-mono text-white/28 mt-0.5">{level}</p>
      </div>
    </motion.div>
  );
}

const tabAnim = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.42, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.18 } },
};

export default function AboutSection() {
  const [activeTab, setActiveTab] = useState("education");

  return (
    <Section id="about" className="bg-obsidian-900/40">
      <div
        className="absolute right-0 top-1/3 w-[500px] h-[500px] opacity-[0.04] pointer-events-none orb"
        style={{ background: "radial-gradient(circle, var(--blue) 0%, transparent 70%)" }}
      />

      <SectionHeading
        eyebrow="Who I Am"
        title="About Me"
        subtitle="A Mechatronics Engineering student at the University of Mosul, blending engineering precision with creative design and multilingual communication."
      />

      {/* Tab bar */}
      <div className="flex flex-wrap gap-2 mb-10">
        {tabs.map((tab) => (
          <motion.button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.96 }}
            className={`relative flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium tracking-wide transition-colors duration-300 overflow-hidden ${
              activeTab === tab.id ? "text-[var(--cyan)]" : "glass text-white/38 hover:text-white/65"
            }`}
          >
            {activeTab === tab.id && (
              <motion.span
                layoutId="about-tab-pill"
                className="absolute inset-0 rounded-full"
                style={{ background: "rgba(0,229,255,0.07)", border: "1px solid rgba(0,229,255,0.18)" }}
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-2">{tab.icon}{tab.label}</span>
          </motion.button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {activeTab === "education" && (
          <motion.div key="edu" variants={tabAnim} initial="hidden" animate="visible" exit="exit">
            <StaggerContainer className="grid md:grid-cols-2 gap-4" stagger={0.1}>
              {education.map((edu) => (
                <StaggerItem key={edu.id}>
                  <GlassCard className="p-6 h-full" hover glow="cyan">
                    <div className="flex items-start gap-4">
                      <span className="text-3xl">{edu.icon}</span>
                      <div>
                        <div className="flex items-center flex-wrap gap-2 mb-1.5">
                          <h3 className="text-white font-semibold text-sm">{edu.institution}</h3>
                          {edu.status === "ongoing" && (
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[var(--cyan)]/8 text-[var(--cyan)] border border-[var(--cyan)]/18">
                              Ongoing
                            </span>
                          )}
                        </div>
                        <p className="text-white/50 text-xs mb-2">{edu.degree}</p>
                        <p className="font-mono text-[10px] text-white/22">{edu.period} · {edu.location}</p>
                      </div>
                    </div>
                  </GlassCard>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </motion.div>
        )}

        {activeTab === "skills" && (
          <motion.div key="skills" variants={tabAnim} initial="hidden" animate="visible" exit="exit">
            <div className="grid md:grid-cols-2 gap-x-14 gap-y-6 mb-10">
              {skills.technical.map((s, i) => (
                <SkillBar key={s.name} name={s.name} level={s.level} delay={i * 0.04} />
              ))}
            </div>
            <div className="pt-6 border-t border-white/[0.05]">
              <p className="font-mono text-[10px] tracking-widest uppercase text-white/22 mb-4">Soft Skills</p>
              <div className="flex flex-wrap gap-2.5">
                {skills.soft.map((s) => (
                  <motion.span
                    key={s}
                    whileHover={{ scale: 1.05, borderColor: "rgba(0,229,255,0.3)" }}
                    className="text-xs font-medium px-4 py-2 glass rounded-full text-white/50 border border-white/[0.06] cursor-default transition-colors"
                  >
                    {s}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === "achievements" && (
          <motion.div key="ach" variants={tabAnim} initial="hidden" animate="visible" exit="exit">
            <StaggerContainer className="grid sm:grid-cols-2 md:grid-cols-3 gap-4" stagger={0.09}>
              {achievements.map((a) => (
                <StaggerItem key={a.id}>
                  <GlassCard className="p-6 text-center h-full" hover glow="cyan">
                    <motion.div className="text-4xl mb-3" whileHover={{ scale: 1.2, rotate: 5 }} transition={{ type: "spring", stiffness: 300 }}>
                      {a.icon}
                    </motion.div>
                    <h3 className="text-white text-sm font-semibold mb-2 leading-snug">{a.title}</h3>
                    <p className="text-white/38 text-[11px] mb-2.5">{a.org}</p>
                    <span className="inline-block font-mono text-[10px] text-[var(--cyan)] px-2.5 py-1 rounded-full bg-[var(--cyan)]/6 border border-[var(--cyan)]/14">
                      {a.year}
                    </span>
                  </GlassCard>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </motion.div>
        )}

        {activeTab === "courses" && (
          <motion.div key="courses" variants={tabAnim} initial="hidden" animate="visible" exit="exit">
            <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3" stagger={0.04}>
              {courses.map((c) => (
                <StaggerItem key={c.id}>
                  <motion.div
                    whileHover={{ borderColor: "rgba(0,229,255,0.18)", x: 2 }}
                    className="glass rounded-xl p-4 border border-white/[0.055] transition-all duration-300 group h-full"
                  >
                    <div className="flex items-start gap-3">
                      <span className="mt-1 w-1.5 h-1.5 rounded-full bg-[var(--cyan)] shrink-0 opacity-50 group-hover:opacity-100 transition-opacity" />
                      <div>
                        <p className="text-xs font-medium text-white/70 leading-snug group-hover:text-white/90 transition-colors">{c.title}</p>
                        {c.org && <p className="text-[10px] text-white/28 mt-1">{c.org}</p>}
                        {c.hours && <p className="font-mono text-[10px] text-[var(--cyan)]/45 mt-1">{c.hours}</p>}
                      </div>
                    </div>
                  </motion.div>
                </StaggerItem>
              ))}
            </StaggerContainer>
            <div className="mt-8 pt-6 border-t border-white/[0.055]">
              <p className="font-mono text-[10px] tracking-widest uppercase text-white/22 mb-4">Workshops & Events</p>
              <div className="flex flex-wrap gap-2.5">
                {workshops.map((w) => (
                  <span key={w.id} className="text-xs glass px-3 py-1.5 rounded-full text-white/45 border border-white/[0.055]">
                    {w.title}{w.org && <span className="text-white/22"> · {w.org}</span>}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === "languages" && (
          <motion.div key="lang" variants={tabAnim} initial="hidden" animate="visible" exit="exit">
            <div className="flex flex-wrap gap-10 justify-center py-10">
              {skills.languages.map((l) => <LangBadge key={l.code} {...l} />)}
            </div>
          </motion.div>
        )}

        {activeTab === "volunteering" && (
          <motion.div key="vol" variants={tabAnim} initial="hidden" animate="visible" exit="exit">
            {volunteering.map((v) => (
              <GlassCard key={v.id} className="p-6 max-w-xl" hover glow="cyan">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl glass flex items-center justify-center text-lg border border-white/[0.06]">
                    ❤️
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-sm">{v.role}</h3>
                    <p className="font-mono text-[10px] text-white/28 mt-0.5">{v.platform} · {v.period}</p>
                  </div>
                </div>
                <p className="text-white/42 text-sm leading-[1.8]">{v.description}</p>
              </GlassCard>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}
