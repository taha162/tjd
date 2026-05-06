"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Section, SectionHeading, StaggerContainer, StaggerItem } from "@/components/ui";
import { gallery } from "@/lib/data";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";

const PLACEHOLDER_CATS = ["All", "Print", "Social Media", "UI/UX", "Photography"];

export default function GallerySection() {
  const [filter, setFilter] = useState("All");
  const [lightbox, setLightbox] = useState<number | null>(null);

  const filtered = filter === "All" ? gallery : gallery.filter((g) => g.category === filter);
  const hasImages = filtered.length > 0;

  const prev = () => { if (lightbox === null) return; setLightbox((lightbox - 1 + filtered.length) % filtered.length); };
  const next = () => { if (lightbox === null) return; setLightbox((lightbox + 1) % filtered.length); };

  return (
    <Section id="gallery">
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 50%, rgba(0,229,255,1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(0,102,255,1) 0%, transparent 50%)",
        }}
      />

      <SectionHeading
        eyebrow="Visual Archive"
        title="Gallery"
        subtitle="A curated exhibition of creative work — from magazine spreads to digital art. Images will be added progressively."
      />

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-10">
        {PLACEHOLDER_CATS.map((cat) => (
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
                layoutId="gallery-filter"
                className="absolute inset-0 rounded-full"
                style={{ background: "rgba(0,229,255,0.07)", border: "1px solid rgba(0,229,255,0.2)" }}
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
            <span className="relative z-10">{cat}</span>
          </motion.button>
        ))}
      </div>

      {hasImages ? (
        <motion.div layout className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((img, i) => (
              <motion.div
                key={img.id}
                layout
                initial={{ opacity: 0, scale: 0.92 }}
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
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <div className="flex items-center justify-between w-full">
                    <div>
                      <p className="text-white text-xs font-medium">{img.alt}</p>
                      <p className="text-white/45 text-[10px]">{img.category}</p>
                    </div>
                    <ZoomIn size={15} className="text-white/55" />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        /* Empty state */
        <div className="min-h-[420px] flex flex-col items-center justify-center gap-8">
          <StaggerContainer className="grid grid-cols-3 md:grid-cols-4 gap-3 w-full max-w-2xl opacity-35" stagger={0.07}>
            {Array.from({ length: 8 }).map((_, i) => (
              <StaggerItem key={i}>
                <motion.div
                  whileHover={{ scale: 1.04, borderColor: "rgba(0,229,255,0.15)" }}
                  className="rounded-xl border border-white/[0.06] flex items-center justify-center transition-all duration-300"
                  style={{
                    height: `${80 + (i % 3) * 30}px`,
                    background: `linear-gradient(135deg, rgba(0,229,255,${0.015 + (i % 3) * 0.008}), rgba(0,102,255,${0.015 + (i % 3) * 0.008}))`,
                  }}
                >
                  <span className="text-white/12 text-xl">{["🖼️", "📷", "🎨", "✏️"][i % 4]}</span>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-center"
          >
            <p className="font-display text-2xl font-light text-white/25 mb-2">The exhibition opens soon</p>
            <p className="text-white/18 text-sm font-mono tracking-wide">— Gallery images will be added progressively —</p>
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
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/92 backdrop-blur-xl p-4"
            onClick={() => setLightbox(null)}
          >
            <button onClick={() => setLightbox(null)} className="absolute top-6 right-6 w-10 h-10 glass rounded-full flex items-center justify-center text-white/45 hover:text-white border border-white/[0.07]">
              <X size={15} />
            </button>
            <div className="absolute top-6 left-6 font-mono text-[11px] text-white/25">
              {lightbox + 1} / {filtered.length}
            </div>
            <button onClick={(e) => { e.stopPropagation(); prev(); }} className="absolute left-4 w-10 h-10 glass rounded-full flex items-center justify-center text-white/45 hover:text-white border border-white/[0.07]">
              <ChevronLeft size={18} />
            </button>
            <button onClick={(e) => { e.stopPropagation(); next(); }} className="absolute right-4 w-10 h-10 glass rounded-full flex items-center justify-center text-white/45 hover:text-white border border-white/[0.07]">
              <ChevronRight size={18} />
            </button>
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
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center">
              <p className="text-white/50 text-xs">{filtered[lightbox].alt}</p>
              <p className="text-white/25 text-[10px] font-mono mt-0.5">{filtered[lightbox].category}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}
