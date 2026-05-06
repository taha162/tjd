"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Section, SectionHeading, TiltCard, Button, StaggerContainer, StaggerItem } from "@/components/ui";
import { projects } from "@/lib/data";
import { X, ExternalLink, Tag } from "lucide-react";

const categoryColors: Record<string, string> = {
  Design: "var(--cyan)",
  Development: "var(--blue)",
  Engineering: "var(--teal)",
  Productivity: "var(--blue)",
};

type Project = (typeof projects)[0];

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const color = categoryColors[project.category] || "var(--cyan)";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0 }}
        transition={{ duration: 0.2 }}
        className="absolute inset-0 bg-black/75 backdrop-blur-md"
      />

      <motion.div
        initial={{ scale: 0.88, y: 30, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.88, y: 20, opacity: 0 }}
        transition={{ type: "spring", stiffness: 320, damping: 28 }}
        className="relative glass-heavy rounded-3xl p-8 max-w-xl w-full shadow-elevation-4"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 glass rounded-full flex items-center justify-center text-white/40 hover:text-white hover:bg-white/8 transition-all"
        >
          <X size={13} />
        </button>

        {/* Preview */}
        <div
          className="w-full h-52 rounded-2xl mb-6 overflow-hidden flex items-center justify-center"
          style={{ background: `linear-gradient(135deg, ${color}10, ${color}04)`, border: `1px solid ${color}1a` }}
        >
          {project.image ? (
            <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
          ) : (
            <span className="text-5xl opacity-20">
              {project.category === "Design" ? "🎨" : project.category === "Development" ? "💻" : "⚙️"}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2 mb-3">
          <span
            className="text-[10px] font-mono px-3 py-1 rounded-full"
            style={{ color, background: `${color}10`, border: `1px solid ${color}25` }}
          >
            {project.category}
          </span>
        </div>

        <h3 className="font-display text-2xl font-semibold text-white mb-2">{project.title}</h3>
        <p className="text-white/45 text-sm leading-[1.75] mb-5">{project.description}</p>

        <div className="flex flex-wrap gap-2 mb-5">
          {project.tags.map((tag) => (
            <span key={tag} className="flex items-center gap-1.5 text-[10px] glass px-2.5 py-1 rounded-full text-white/38 border border-white/[0.06]">
              <Tag size={9} className="opacity-60" />
              {tag}
            </span>
          ))}
        </div>

        {project.link ? (
          <Button variant="secondary" href={project.link} icon={<ExternalLink size={13} />}>View Project</Button>
        ) : (
          <p className="text-[10px] font-mono text-white/18 tracking-wide">— Project media will be added soon</p>
        )}
      </motion.div>
    </motion.div>
  );
}

export default function WorksSection() {
  const [selected, setSelected] = useState<Project | null>(null);
  const [filter, setFilter] = useState<string>("All");

  const categories = ["All", ...Array.from(new Set(projects.map((p) => p.category)))];
  const filtered = filter === "All" ? projects : projects.filter((p) => p.category === filter);

  return (
    <Section id="works" className="bg-obsidian-900/30">
      <div
        className="absolute right-10 bottom-20 w-[400px] h-[400px] opacity-[0.04] pointer-events-none orb"
        style={{ background: "radial-gradient(circle, var(--teal) 0%, transparent 70%)" }}
      />

      <SectionHeading
        eyebrow="Portfolio"
        title="My Works"
        subtitle="A curated selection of projects spanning graphic design, mobile development, and UI/UX — each built with purpose."
      />

      {/* Filter tabs */}
      <div className="flex flex-wrap gap-2 mb-10">
        {categories.map((cat) => (
          <motion.button
            key={cat}
            onClick={() => setFilter(cat)}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className={`relative px-4 py-1.5 rounded-full text-xs font-medium tracking-wide overflow-hidden transition-colors duration-300 ${
              filter === cat ? "text-[var(--cyan)]" : "glass text-white/35 hover:text-white/60"
            }`}
          >
            {filter === cat && (
              <motion.span
                layoutId="works-filter-pill"
                className="absolute inset-0 rounded-full"
                style={{ background: "rgba(0,229,255,0.07)", border: "1px solid rgba(0,229,255,0.2)" }}
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
            <span className="relative z-10">{cat}</span>
          </motion.button>
        ))}
      </div>

      {/* Grid */}
      <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <AnimatePresence mode="popLayout">
          {filtered.map((project, i) => {
            const color = categoryColors[project.category] || "var(--cyan)";
            return (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85 }}
                transition={{ delay: i * 0.06, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              >
                <TiltCard
                  onClick={() => setSelected(project)}
                  glowColor={`${color}18`}
                  intensity={7}
                  className="glass rounded-2xl overflow-hidden h-full border border-white/[0.055]"
                >
                  {/* Image */}
                  <div
                    className="relative h-44 flex items-center justify-center overflow-hidden"
                    style={{ background: `linear-gradient(135deg, ${color}0c, ${color}04)` }}
                  >
                    {project.image ? (
                      <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-5xl opacity-15">
                        {project.category === "Design" ? "🎨" : project.category === "Development" ? "💻" : "⚙️"}
                      </span>
                    )}
                    {/* Overlay on hover */}
                    <div
                      className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                      style={{ background: `${color}12` }}
                    >
                      <span className="text-xs font-mono tracking-[0.2em] uppercase text-white/55 bg-black/30 px-3 py-1.5 rounded-full">
                        View Details
                      </span>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-5">
                    <div className="mb-2">
                      <span className="text-[10px] font-mono uppercase tracking-widest" style={{ color }}>
                        {project.category}
                      </span>
                    </div>
                    <h3 className="text-white font-semibold text-sm mb-1.5">{project.title}</h3>
                    <p className="text-white/36 text-xs leading-[1.65] line-clamp-2">{project.description}</p>
                    <div className="flex flex-wrap gap-1.5 mt-3.5">
                      {project.tags.slice(0, 2).map((tag) => (
                        <span key={tag} className="text-[10px] glass px-2 py-0.5 rounded-full text-white/28 border border-white/[0.05]">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {filtered.length === 0 && (
        <p className="text-white/18 text-sm text-center py-20 font-mono">— No projects in this category yet</p>
      )}

      <AnimatePresence>
        {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </Section>
  );
}
