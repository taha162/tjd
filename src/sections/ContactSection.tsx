"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Section, SectionHeading, Button } from "@/components/ui";
import { personal } from "@/lib/data";
import { Send, Mail, MapPin, Phone, Github, Linkedin, CheckCircle2 } from "lucide-react";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default function ContactSection() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      await addDoc(collection(db, "messages"), {
        ...data,
        createdAt: serverTimestamp(),
        read: false,
      });
      setSubmitted(true);
      reset();
      toast.success("Message sent successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const inputClass = (hasError?: boolean) =>
    `w-full glass rounded-xl px-4 py-3 text-sm text-white placeholder-white/25 outline-none transition-all duration-300 focus:border-[var(--cyan)]/50 focus:shadow-[0_0_15px_rgba(0,229,255,0.1)] ${
      hasError
        ? "border border-red-400/40"
        : "border border-white/8 hover:border-white/15"
    }`;

  return (
    <Section id="contact" className="bg-obsidian-900/40">
      {/* BG */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] opacity-5 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, var(--cyan) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      <div className="max-w-5xl mx-auto">
        <SectionHeading
          eyebrow="Let's Connect"
          title="Get in Touch"
          subtitle="Have a project in mind, or just want to say hello? I'd love to hear from you."
          align="center"
        />

        <div className="grid md:grid-cols-5 gap-8">
          {/* Contact info panel */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="md:col-span-2 flex flex-col gap-5"
          >
            <div className="glass rounded-2xl p-6 flex flex-col gap-5">
              {[
                { icon: <Mail size={14} />, label: "Email", value: personal.email, href: `mailto:${personal.email}` },
                { icon: <Phone size={14} />, label: "Phone", value: personal.phone, href: `tel:${personal.phone}` },
                { icon: <MapPin size={14} />, label: "Location", value: personal.location, href: null },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-3">
                  <div className="mt-0.5 w-8 h-8 glass rounded-lg flex items-center justify-center text-[var(--cyan)] shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-white/30 text-[10px] font-mono uppercase tracking-wide">{item.label}</p>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="text-white/70 text-xs hover:text-[var(--cyan)] transition-colors"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-white/70 text-xs">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Social links */}
            <div className="glass rounded-2xl p-5">
              <p className="text-white/25 text-[10px] font-mono uppercase tracking-widest mb-4">
                Find me on
              </p>
              <div className="flex gap-3">
                {[
                  { href: personal.github, icon: <Github size={14} />, label: "GitHub" },
                  { href: personal.linkedin, icon: <Linkedin size={14} />, label: "LinkedIn" },
                ].map((s) => (
                  <motion.a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    whileHover={{ y: -2 }}
                    className="flex items-center gap-2 glass px-3 py-2 rounded-xl text-white/40 hover:text-[var(--cyan)] text-xs transition-colors border border-transparent hover:border-[var(--cyan)]/20"
                  >
                    {s.icon}
                    <span>{s.label}</span>
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Form panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="md:col-span-3"
          >
            <div className="glass-heavy rounded-3xl p-7 md:p-8">
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center gap-4 py-12"
                  >
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 0.5 }}
                    >
                      <CheckCircle2 size={52} className="text-[var(--cyan)]" />
                    </motion.div>
                    <div className="text-center">
                      <h3 className="text-white font-semibold text-lg mb-1">Message received!</h3>
                      <p className="text-white/45 text-sm">I'll get back to you as soon as possible.</p>
                    </div>
                    <Button
                      variant="ghost"
                      onClick={() => setSubmitted(false)}
                    >
                      Send another message
                    </Button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col gap-4"
                    noValidate
                  >
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <input
                          {...register("name", { required: "Name is required" })}
                          placeholder="Your Name"
                          className={inputClass(!!errors.name)}
                          autoComplete="name"
                        />
                        {errors.name && (
                          <p className="text-red-400/70 text-[10px] mt-1 ml-1">{errors.name.message}</p>
                        )}
                      </div>
                      <div>
                        <input
                          {...register("email", {
                            required: "Email is required",
                            pattern: {
                              value: /^\S+@\S+\.\S+$/,
                              message: "Enter a valid email",
                            },
                          })}
                          placeholder="Your Email"
                          type="email"
                          className={inputClass(!!errors.email)}
                          autoComplete="email"
                        />
                        {errors.email && (
                          <p className="text-red-400/70 text-[10px] mt-1 ml-1">{errors.email.message}</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <input
                        {...register("subject", { required: "Subject is required" })}
                        placeholder="Subject"
                        className={inputClass(!!errors.subject)}
                      />
                      {errors.subject && (
                        <p className="text-red-400/70 text-[10px] mt-1 ml-1">{errors.subject.message}</p>
                      )}
                    </div>

                    <div>
                      <textarea
                        {...register("message", {
                          required: "Message is required",
                          minLength: { value: 10, message: "At least 10 characters" },
                        })}
                        placeholder="Your message..."
                        rows={5}
                        className={`${inputClass(!!errors.message)} resize-none`}
                      />
                      {errors.message && (
                        <p className="text-red-400/70 text-[10px] mt-1 ml-1">{errors.message.message}</p>
                      )}
                    </div>

                    <Button
                      type="submit"
                      variant="primary"
                      loading={loading}
                      disabled={loading}
                      icon={<Send size={14} />}
                      className="self-start"
                    >
                      {loading ? "Sending..." : "Send Message"}
                    </Button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </Section>
  );
}
