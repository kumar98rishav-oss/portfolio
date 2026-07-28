"use client";

import { motion } from "framer-motion";
import { ArrowDown, ArrowUpRight, Sparkles } from "lucide-react";
import { PROFILE, SOCIALS } from "@/lib/data";
import { ParticleField } from "@/components/backgrounds/ParticleField";
import { AuroraMesh } from "@/components/backgrounds/AuroraMesh";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { TypingEffect } from "@/components/ui/TypingEffect";
import { easeOutExpo } from "@/lib/utils";

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.35 } },
};
const child = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: easeOutExpo } },
};

export function Hero() {
  const name = PROFILE.name;

  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-6 pt-28"
    >
      {/* Backdrops */}
      <AuroraMesh />
      <ParticleField className="absolute inset-0 z-0 h-full w-full opacity-70" />
      <div className="bg-grid absolute inset-0 z-0" />
      {/* Vignette to sink the backdrop behind content */}
      <div className="absolute inset-0 z-[1] bg-[radial-gradient(ellipse_60%_50%_at_50%_45%,transparent,rgb(var(--bg))_78%)]" />

      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="relative z-10 flex flex-col items-center text-center"
      >
        {/* Availability badge */}
        <motion.div variants={child}>
          <span className="mono inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 text-xs text-fg-muted">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            {PROFILE.availability}
          </span>
        </motion.div>

        {/* Kinetic name — per-letter reveal */}
        <h1 className="mt-8 text-balance text-5xl font-semibold leading-[0.95] tracking-tight sm:text-7xl md:text-8xl">
          <span className="sr-only">{name}</span>
          <span aria-hidden className="flex flex-wrap justify-center">
            {name.split("").map((ch, i) => (
              <motion.span
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 40, rotateX: -40 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    rotateX: 0,
                    transition: { duration: 0.8, ease: easeOutExpo, delay: i * 0.03 },
                  },
                }}
                className={ch === " " ? "w-4 sm:w-6" : "text-gradient inline-block"}
                style={{ transformPerspective: 600 }}
              >
                {ch === " " ? " " : ch}
              </motion.span>
            ))}
          </span>
        </h1>

        {/* Terminal role line */}
        <motion.div
          variants={child}
          className="mono mt-6 flex max-w-full flex-wrap items-center justify-center gap-2 rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-xs text-fg-muted sm:px-4 sm:text-sm"
        >
          <span className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-green-400/70" />
          </span>
          <span className="ml-2 text-fg-faint">~/role</span>
          <span className="text-accent">$</span>
          <TypingEffect words={[...PROFILE.roles]} className="text-fg" />
        </motion.div>

        {/* Tagline */}
        <motion.p
          variants={child}
          className="mt-8 max-w-xl text-balance text-base leading-relaxed text-fg-muted sm:text-lg"
        >
          {PROFILE.tagline}
        </motion.p>

        {/* CTAs */}
        <motion.div variants={child} className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <MagneticButton href="#projects">
            <Sparkles className="h-4 w-4" />
            View Work
          </MagneticButton>
          <MagneticButton href="#contact" variant="ghost">
            Get in touch
            <ArrowUpRight className="h-4 w-4" />
          </MagneticButton>
        </motion.div>

        {/* Socials */}
        <motion.div variants={child} className="mt-10 flex items-center gap-4">
          {SOCIALS.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              aria-label={s.label}
              className="text-fg-faint transition-colors hover:text-fg"
            >
              <s.icon className="h-5 w-5" />
            </a>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.a
        href="#about"
        aria-label="Scroll down"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
      >
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="flex h-10 w-6 items-start justify-center rounded-full border border-white/15 p-1.5"
        >
          <ArrowDown className="h-3 w-3 text-fg-muted" />
        </motion.span>
      </motion.a>
    </section>
  );
}
