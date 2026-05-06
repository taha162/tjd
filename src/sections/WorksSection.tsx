"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Section, SectionHeading, GlassCard, Button } from "@/components/ui";
import { projects } from "@/lib/data";
import { X, ExternalLink, Tag } from "lucide-react";

const categoryColors: Record<string, string> = {
  Design: "var(--cyan)",
  Development: "var(--purple)",
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
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      <motion.div
        initial={{ scale: 0.9, y: 20, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.9, y: 20, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="relative glass-heavy rounded-3xl p-8 max-w-xl w-full"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 glass rounded-full flex items-center justify-center text-white/40 hover:text-white transition-colors"
        >
          <X size={14} />
        </button>

        {/* Image placeholder */}
        <div
          className="w-full h-48 rounded-2xl mb-6 flex items-center justify-center"
          style={{
            background: `linear-gradient(135deg, ${color}15, ${color}05)`,
            border: `1px solid ${color}20`,
          }}
        >
          {project.image ? (
            <img src={project.image} alt={project.title} className="w-full h-full object-cover rounded-2xl" />
          ) : (
            <span className="text-4xl opacity-30">
              {project.category === "Design" ? "🎨" : project.category === "Development" ? "💻" : "⚙️"}
            </span>
          )}
        </div>

        {/* Category badge */}
        <div className="flex items-center gap-2 mb-3">
          <span
            className="text-[10px] font-mono px-3 py-1 rounded-full"
            style={{
              color,
              background: `${color}15`,
              border: `1px solid ${color}30`,
            }}
          >
            {project.category}
          </span>
        </div>

        <h3 className="font-display text-2xl font-semibold text-white mb-2">{project.title}</h3>
        <p className="text-white/55 text-sm leading-relaxed mb-5">{project.description}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="flex items-center gap-1 text-[10px] glass px-2.5 py-1 rounded-full text-white/40"
            >
              <Tag size={9} />
              {tag}
            </span>
          ))}
        </div>

        {project.link && (
          <Button variant="secondary" href={project.link} icon={<ExternalLink size={14} />}>
            View Project
          </Button>
        )}

        {!project.link && (
          <p className="text-[10px] font-mono text-white/20 tracking-wide">
            — Project media will be added soon
          </p>
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
      {/* BG glow */}
      <div
        className="absolute right-10 bottom-20 w-[350px] h-[350px] opacity-6 pointer-events-none"
        style={{
          background: "radial-gradient(circle, var(--teal) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
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
            whileTap={{ scale: 0.95 }}
            className={`px-4 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all duration-300 ${
              filter === cat
                ? "bg-gradient-to-r from-cyan-400/20 to-purple-600/20 text-[var(--cyan)] border border-[var(--cyan)]/30"
                : "glass text-white/35 hover:text-white/60"
            }`}
          >
            {cat}
          </motion.button>
        ))}
      </div>

      {/* Project grid */}
      <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <AnimatePresence mode="popLayout">
          {filtered.map((project, i) => {
            const color = categoryColors[project.category] || "var(--cyan)";
            return (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.88 }}
                transition={{ delay: i * 0.06, duration: 0.4 }}
              >
                <GlassCard
                  className="p-0 overflow-hidden"
                  hover
                  glow={project.accent as "cyan" | "purple" | "none"}
                  onClick={() => setSelected(project)}
                >
                  {/* Card image area */}
                  <div
                    className="relative h-44 flex items-center justify-center overflow-hidden"
                    style={{
                      background: `linear-gradient(135deg, ${color}10, ${color}04)`,
                    }}
                  >
                    {project.image ? (
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <motion.span
                        className="text-5xl opacity-20"
                        whileHover={{ scale: 1.2, opacity: 0.4 }}
                        transition={{ duration: 0.3 }}
                      >
                        {project.category === "Design" ? "🎨" : project.category === "Development" ? "💻" : "⚙️"}
                      </motion.span>
                    )}
                    {/* Hover overlay */}
                    <div
                      className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                      style={{ background: `${color}15` }}
                    >
                      <span className="text-xs font-mono tracking-widest uppercase text-white/60">
                        View Details
                      </span>
                    </div>
                  </div>

                  {/* Card body */}
                  <div className="p-5">
                    <div className="flex items-center justify-between mb-2">
                      <span
                        className="text-[10px] font-mono uppercase tracking-widest"
                        style={{ color }}
                      >
                        {project.category}
                      </span>
                    </div>
                    <h3 className="text-white font-semibold text-sm mb-1.5">{project.title}</h3>
                    <p className="text-white/40 text-xs leading-relaxed line-clamp-2">
                      {project.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {project.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] glass px-2 py-0.5 rounded-full text-white/30"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {/* Empty state */}
      {filtered.length === 0 && (
        <p className="text-white/20 text-sm text-center py-20 font-mono">
          — No projects in this category yet
        </p>
      )}

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <ProjectModal project={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </Section>
  );
}
