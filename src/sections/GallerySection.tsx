"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Section, SectionHeading } from "@/components/ui";
import { gallery } from "@/lib/data";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";

const PLACEHOLDER_CATS = ["All", "Print", "Social Media", "UI/UX", "Photography"];

export default function GallerySection() {
  const [filter, setFilter] = useState("All");
  const [lightbox, setLightbox] = useState<number | null>(null);

  const filtered =
    filter === "All" ? gallery : gallery.filter((g) => g.category === filter);

  const hasImages = filtered.length > 0;

  const prev = () => {
    if (lightbox === null) return;
    setLightbox((lightbox - 1 + filtered.length) % filtered.length);
  };
  const next = () => {
    if (lightbox === null) return;
    setLightbox((lightbox + 1) % filtered.length);
  };

  return (
    <Section id="gallery">
      {/* Atmospheric BG */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 50%, rgba(0,229,255,1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(124,58,237,1) 0%, transparent 50%)",
        }}
      />

      <SectionHeading
        eyebrow="Visual Archive"
        title="Gallery"
        subtitle="A curated exhibition of creative work — from magazine spreads to digital art. Images will be added progressively."
      />

      {/* Category filters */}
      <div className="flex flex-wrap gap-2 mb-10">
        {PLACEHOLDER_CATS.map((cat) => (
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

      {/* Gallery grid */}
      {hasImages ? (
        <motion.div
          layout
          className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((img, i) => (
              <motion.div
                key={img.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85 }}
                transition={{ delay: i * 0.04 }}
                className="break-inside-avoid relative group cursor-pointer overflow-hidden rounded-2xl"
                style={{ aspectRatio: `${img.width}/${img.height}` }}
                onClick={() => setLightbox(i)}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <div className="flex items-center justify-between w-full">
                    <div>
                      <p className="text-white text-xs font-medium">{img.alt}</p>
                      <p className="text-white/50 text-[10px]">{img.category}</p>
                    </div>
                    <ZoomIn size={16} className="text-white/60" />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        /* Empty state — art exhibition placeholder */
        <div className="min-h-[400px] flex flex-col items-center justify-center gap-6">
          {/* Decorative grid of placeholder frames */}
          <div className="grid grid-cols-3 md:grid-cols-4 gap-3 w-full max-w-2xl opacity-40">
            {Array.from({ length: 8 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
                className="rounded-xl border border-white/8 flex items-center justify-center"
                style={{
                  height: `${80 + (i % 3) * 30}px`,
                  background: `linear-gradient(135deg, rgba(0,229,255,${0.02 + (i % 3) * 0.01}), rgba(124,58,237,${0.02 + (i % 3) * 0.01}))`,
                }}
              >
                <span className="text-white/15 text-xl">
                  {["🖼️", "📷", "🎨", "✏️"][i % 4]}
                </span>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-center"
          >
            <p className="font-display text-2xl font-light text-white/30 mb-2">
              The exhibition opens soon
            </p>
            <p className="text-white/20 text-sm font-mono">
              — Gallery images will be added progressively —
            </p>
          </motion.div>
        </div>
      )}

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && filtered[lightbox] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4"
            onClick={() => setLightbox(null)}
          >
            {/* Close */}
            <button
              onClick={() => setLightbox(null)}
              className="absolute top-6 right-6 w-10 h-10 glass rounded-full flex items-center justify-center text-white/50 hover:text-white"
            >
              <X size={16} />
            </button>

            {/* Counter */}
            <div className="absolute top-6 left-6 font-mono text-xs text-white/30">
              {lightbox + 1} / {filtered.length}
            </div>

            {/* Nav */}
            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              className="absolute left-4 w-10 h-10 glass rounded-full flex items-center justify-center text-white/50 hover:text-white"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              className="absolute right-4 w-10 h-10 glass rounded-full flex items-center justify-center text-white/50 hover:text-white"
            >
              <ChevronRight size={18} />
            </button>

            {/* Image */}
            <motion.img
              key={lightbox}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              src={filtered[lightbox].src}
              alt={filtered[lightbox].alt}
              className="max-h-[85vh] max-w-[90vw] object-contain rounded-2xl"
              onClick={(e) => e.stopPropagation()}
            />

            {/* Caption */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center">
              <p className="text-white/60 text-xs">{filtered[lightbox].alt}</p>
              <p className="text-white/30 text-[10px] font-mono mt-0.5">{filtered[lightbox].category}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}
