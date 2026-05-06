"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Section, SectionHeading, GlassCard } from "@/components/ui";
import {
  education,
  achievements,
  courses,
  workshops,
  skills,
  volunteering,
} from "@/lib/data";
import { GraduationCap, Trophy, BookOpen, Wrench, Globe, Heart } from "lucide-react";

const tabs = [
  { id: "education", label: "Education", icon: <GraduationCap size={14} /> },
  { id: "skills", label: "Skills", icon: <Wrench size={14} /> },
  { id: "achievements", label: "Achievements", icon: <Trophy size={14} /> },
  { id: "courses", label: "Courses", icon: <BookOpen size={14} /> },
  { id: "languages", label: "Languages", icon: <Globe size={14} /> },
  { id: "volunteering", label: "Volunteering", icon: <Heart size={14} /> },
];

// Skill bar
function SkillBar({ name, level, delay }: { name: string; level: number; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      className="group"
    >
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-sm text-white/70 group-hover:text-white transition-colors">
          {name}
        </span>
        <span className="font-mono text-xs text-[var(--cyan)]">{level}%</span>
      </div>
      <div className="h-1 rounded-full bg-white/5 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{ delay: delay + 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="h-full rounded-full"
          style={{
            background: `linear-gradient(90deg, var(--cyan), var(--purple))`,
            boxShadow: `0 0 8px rgba(0,229,255,0.4)`,
          }}
        />
      </div>
    </motion.div>
  );
}

// Language radial badge
function LangBadge({ lang, level, code, pct }: { lang: string; level: string; code: string; pct: number }) {
  const r = 28;
  const circ = 2 * Math.PI * r;
  const dash = (pct / 100) * circ;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="flex flex-col items-center gap-2"
    >
      <div className="relative w-20 h-20">
        <svg className="absolute inset-0 -rotate-90" width="80" height="80" viewBox="0 0 80 80">
          <circle cx="40" cy="40" r={r} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="3" />
          <motion.circle
            cx="40"
            cy="40"
            r={r}
            fill="none"
            stroke="url(#langGrad)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray={`${dash} ${circ}`}
            initial={{ strokeDasharray: `0 ${circ}` }}
            whileInView={{ strokeDasharray: `${dash} ${circ}` }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          />
          <defs>
            <linearGradient id="langGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#00e5ff" />
              <stop offset="100%" stopColor="#7c3aed" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-mono font-bold text-xs text-[var(--cyan)]">{code}</span>
        </div>
      </div>
      <div className="text-center">
        <p className="text-xs font-medium text-white/80">{lang}</p>
        <p className="text-[10px] font-mono text-white/35">{level}</p>
      </div>
    </motion.div>
  );
}

export default function AboutSection() {
  const [activeTab, setActiveTab] = useState("education");

  return (
    <Section id="about" className="bg-obsidian-900/30">
      {/* Background accent */}
      <div
        className="absolute right-0 top-1/2 w-[400px] h-[400px] opacity-5 pointer-events-none"
        style={{
          background: "radial-gradient(circle, var(--purple) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      <SectionHeading
        eyebrow="Who I Am"
        title="About Me"
        subtitle="A Mechatronics Engineering student at the University of Mosul, blending engineering precision with creative design and multilingual communication."
      />

      {/* Tab navigation */}
      <div className="flex flex-wrap gap-2 mb-10">
        {tabs.map((tab) => (
          <motion.button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            whileTap={{ scale: 0.95 }}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium tracking-wide transition-all duration-300 ${
              activeTab === tab.id
                ? "bg-gradient-to-r from-cyan-400/20 to-purple-600/20 text-[var(--cyan)] border border-[var(--cyan)]/30"
                : "glass text-white/40 hover:text-white/70 border border-transparent"
            }`}
          >
            {tab.icon}
            {tab.label}
          </motion.button>
        ))}
      </div>

      {/* Tab content */}
      <AnimatePresence mode="wait">
        {/* EDUCATION */}
        {activeTab === "education" && (
          <motion.div
            key="education"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className="grid md:grid-cols-2 gap-4"
          >
            {education.map((edu, i) => (
              <GlassCard key={edu.id} className="p-6" hover glow="cyan">
                <div className="flex items-start gap-4">
                  <span className="text-3xl">{edu.icon}</span>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-white font-semibold text-sm">{edu.institution}</h3>
                      {edu.status === "ongoing" && (
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[var(--cyan)]/10 text-[var(--cyan)] border border-[var(--cyan)]/20">
                          Ongoing
                        </span>
                      )}
                    </div>
                    <p className="text-white/60 text-xs mb-2">{edu.degree}</p>
                    <p className="font-mono text-[10px] text-white/30">{edu.period} · {edu.location}</p>
                  </div>
                </div>
              </GlassCard>
            ))}
          </motion.div>
        )}

        {/* SKILLS */}
        {activeTab === "skills" && (
          <motion.div
            key="skills"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
          >
            <div className="grid md:grid-cols-2 gap-x-12 gap-y-5">
              {skills.technical.map((s, i) => (
                <SkillBar key={s.name} name={s.name} level={s.level} delay={i * 0.05} />
              ))}
            </div>
            <div className="mt-10 flex flex-wrap gap-3">
              {skills.soft.map((s) => (
                <span
                  key={s}
                  className="text-xs font-medium px-4 py-2 glass rounded-full text-white/60 border border-white/8 hover:text-[var(--cyan)] hover:border-[var(--cyan)]/30 transition-colors"
                >
                  {s}
                </span>
              ))}
            </div>
          </motion.div>
        )}

        {/* ACHIEVEMENTS */}
        {activeTab === "achievements" && (
          <motion.div
            key="achievements"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className="grid sm:grid-cols-2 md:grid-cols-3 gap-4"
          >
            {achievements.map((a, i) => (
              <motion.div
                key={a.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.08 }}
              >
                <GlassCard className="p-6 text-center" hover glow="purple">
                  <div className="text-4xl mb-3">{a.icon}</div>
                  <h3 className="text-white text-sm font-semibold mb-1 leading-snug">{a.title}</h3>
                  <p className="text-white/40 text-xs">{a.org}</p>
                  <p className="font-mono text-[10px] text-[var(--cyan)] mt-2">{a.year}</p>
                </GlassCard>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* COURSES */}
        {activeTab === "courses" && (
          <motion.div
            key="courses"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3"
          >
            {courses.map((c, i) => (
              <motion.div
                key={c.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                className="glass rounded-xl p-4 hover:border-[var(--cyan)]/20 border border-transparent transition-colors group"
              >
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 w-1.5 h-1.5 rounded-full bg-[var(--cyan)] shrink-0 group-hover:shadow-[0_0_8px_var(--cyan)] transition-shadow" />
                  <div>
                    <p className="text-xs font-medium text-white/80 leading-snug">{c.title}</p>
                    {c.org && <p className="text-[10px] text-white/35 mt-1">{c.org}</p>}
                    {c.hours && (
                      <p className="font-mono text-[10px] text-[var(--cyan)]/60 mt-1">{c.hours}</p>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Workshops */}
            <div className="sm:col-span-2 lg:col-span-3 mt-4">
              <p className="font-mono text-xs tracking-widest uppercase text-white/30 mb-3">
                — Workshops & Events
              </p>
              <div className="flex flex-wrap gap-3">
                {workshops.map((w) => (
                  <span
                    key={w.id}
                    className="text-xs glass px-3 py-1.5 rounded-full text-white/55 border border-white/5"
                  >
                    {w.title} · <span className="text-white/30">{w.org}</span>
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* LANGUAGES */}
        {activeTab === "languages" && (
          <motion.div
            key="languages"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className="flex flex-wrap gap-10 justify-center py-8"
          >
            {skills.languages.map((l) => (
              <LangBadge key={l.code} {...l} />
            ))}
          </motion.div>
        )}

        {/* VOLUNTEERING */}
        {activeTab === "volunteering" && (
          <motion.div
            key="volunteering"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
          >
            {volunteering.map((v) => (
              <GlassCard key={v.id} className="p-6 max-w-xl" hover glow="cyan">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">❤️</span>
                  <div>
                    <h3 className="text-white font-semibold text-sm">{v.role}</h3>
                    <p className="font-mono text-[10px] text-white/35">{v.platform} · {v.period}</p>
                  </div>
                </div>
                <p className="text-white/50 text-sm leading-relaxed">{v.description}</p>
              </GlassCard>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}
