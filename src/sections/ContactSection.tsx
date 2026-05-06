"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Section, SectionHeading, Button, FadeIn } from "@/components/ui";
import { personal } from "@/lib/data";
import { Send, Mail, MapPin, Phone, Github, Linkedin, CircleCheck as CheckCircle2 } from "lucide-react";

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
    `w-full glass rounded-xl px-4 py-3.5 text-sm text-white placeholder-white/22 outline-none transition-all duration-300 focus:border-[var(--cyan)]/40 focus:shadow-[0_0_20px_rgba(0,229,255,0.08)] ${
      hasError ? "border border-red-400/35" : "border border-white/[0.07] hover:border-white/12"
    }`;

  const contactItems = [
    { icon: <Mail size={14} />, label: "Email", value: personal.email, href: `mailto:${personal.email}` },
    { icon: <Phone size={14} />, label: "Phone", value: personal.phone, href: `tel:${personal.phone}` },
    { icon: <MapPin size={14} />, label: "Location", value: personal.location, href: null },
  ];

  return (
    <Section id="contact" className="bg-obsidian-900/40">
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] opacity-[0.04] pointer-events-none"
        style={{ background: "radial-gradient(ellipse, var(--cyan) 0%, transparent 70%)", filter: "blur(60px)" }}
      />

      <div className="max-w-5xl mx-auto">
        <SectionHeading
          eyebrow="Let's Connect"
          title="Get in Touch"
          subtitle="Have a project in mind, or just want to say hello? I'd love to hear from you."
          align="center"
        />

        <div className="grid md:grid-cols-5 gap-7">
          {/* Contact info */}
          <FadeIn direction="left" className="md:col-span-2 flex flex-col gap-4">
            <div className="glass rounded-2xl p-6 flex flex-col gap-5 border border-white/[0.06]">
              {contactItems.map((item) => (
                <div key={item.label} className="flex items-start gap-3 group">
                  <div className="mt-0.5 w-8 h-8 glass rounded-xl flex items-center justify-center text-[var(--cyan)] shrink-0 border border-white/[0.06] group-hover:border-[var(--cyan)]/25 transition-colors duration-300">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-white/25 text-[10px] font-mono uppercase tracking-wider mb-0.5">{item.label}</p>
                    {item.href ? (
                      <a href={item.href} className="text-white/60 text-xs hover:text-[var(--cyan)] transition-colors link-underline">
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-white/60 text-xs">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="glass rounded-2xl p-5 border border-white/[0.06]">
              <p className="text-white/22 text-[10px] font-mono uppercase tracking-widest mb-4">Find me on</p>
              <div className="flex gap-3">
                {[
                  { href: personal.github, icon: <Github size={13} />, label: "GitHub" },
                  { href: personal.linkedin, icon: <Linkedin size={13} />, label: "LinkedIn" },
                ].map((s) => (
                  <motion.a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    whileHover={{ y: -2 }}
                    className="flex items-center gap-2 glass px-3 py-2 rounded-xl text-white/38 hover:text-[var(--cyan)] text-xs transition-all duration-300 border border-transparent hover:border-[var(--cyan)]/18"
                  >
                    {s.icon}
                    <span>{s.label}</span>
                  </motion.a>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* Form */}
          <FadeIn direction="right" delay={0.1} className="md:col-span-3">
            <div className="glass-heavy rounded-3xl p-7 md:p-8 border border-white/[0.07] shadow-glass-lg">
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col items-center justify-center gap-5 py-14"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 280, damping: 22, delay: 0.1 }}
                    >
                      <CheckCircle2 size={52} className="text-[var(--cyan)]" />
                    </motion.div>
                    <div className="text-center">
                      <h3 className="text-white font-semibold text-lg mb-2">Message received!</h3>
                      <p className="text-white/40 text-sm">I'll get back to you as soon as possible.</p>
                    </div>
                    <Button variant="ghost" onClick={() => setSubmitted(false)}>
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
                          <p className="text-red-400/65 text-[10px] mt-1.5 ml-1">{errors.name.message}</p>
                        )}
                      </div>
                      <div>
                        <input
                          {...register("email", {
                            required: "Email is required",
                            pattern: { value: /^\S+@\S+\.\S+$/, message: "Enter a valid email" },
                          })}
                          placeholder="Your Email"
                          type="email"
                          className={inputClass(!!errors.email)}
                          autoComplete="email"
                        />
                        {errors.email && (
                          <p className="text-red-400/65 text-[10px] mt-1.5 ml-1">{errors.email.message}</p>
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
                        <p className="text-red-400/65 text-[10px] mt-1.5 ml-1">{errors.subject.message}</p>
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
                        <p className="text-red-400/65 text-[10px] mt-1.5 ml-1">{errors.message.message}</p>
                      )}
                    </div>

                    <Button
                      type="submit"
                      variant="primary"
                      loading={loading}
                      disabled={loading}
                      icon={<Send size={13} />}
                      className="self-start mt-1"
                    >
                      {loading ? "Sending..." : "Send Message"}
                    </Button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </FadeIn>
        </div>
      </div>
    </Section>
  );
}
