"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Github, ArrowUpRight, ChevronDown } from "lucide-react";
import { PROJECTS, FLAGSHIP_PROJECT_ID, type Project } from "@/lib/data";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectCard } from "./ProjectCard";
import { FeaturedProject } from "./FeaturedProject";
import { Reveal } from "@/components/ui/Reveal";
import { AnimatedPipeline } from "@/components/ui/AnimatedPipeline";

const FLAGSHIP = PROJECTS.find((p) => p.id === FLAGSHIP_PROJECT_ID) ?? PROJECTS[0];
const OTHERS = PROJECTS.filter((p) => p.id !== FLAGSHIP.id);

export function Projects() {
  const [selected, setSelected] = useState<Project | null>(null);
  const [showOthers, setShowOthers] = useState(false);

  // Lock scroll + Escape-to-close while the modal is open.
  useEffect(() => {
    if (!selected) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setSelected(null);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [selected]);

  return (
    <section id="projects" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-24 md:py-32">
      <SectionHeading
        kicker="Selected Work"
        title="Featured project"
        description="The flagship build. Every diagram below is a live workflow — open any project for the full case study."
      />

      {/* Flagship */}
      <Reveal>
        <div className="mt-12">
          <FeaturedProject project={FLAGSHIP} onOpen={setSelected} />
        </div>
      </Reveal>

      {/* Everything else, collapsed by default */}
      {OTHERS.length > 0 && (
        <div className="mt-14">
          <div className="flex items-center gap-4">
            <span className="h-px flex-1 bg-white/10" />
            <button
              onClick={() => setShowOthers((v) => !v)}
              aria-expanded={showOthers}
              aria-controls="other-projects"
              className="mono inline-flex shrink-0 items-center gap-2 rounded-full border border-white/12 bg-white/[0.03] px-5 py-2.5 text-xs uppercase tracking-[0.14em] text-fg-muted transition-colors hover:bg-white/[0.07] hover:text-fg"
            >
              {showOthers ? "Hide" : "Other projects"}
              <span className="text-accent">({OTHERS.length})</span>
              <ChevronDown
                className={`h-4 w-4 transition-transform duration-300 ${showOthers ? "rotate-180" : ""}`}
              />
            </button>
            <span className="h-px flex-1 bg-white/10" />
          </div>

          <AnimatePresence initial={false}>
            {showOthers && (
              <motion.div
                id="other-projects"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2"
              >
                {OTHERS.map((p) => (
                  <ProjectCard key={p.id} project={p} onOpen={setSelected} />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* Expanded modal */}
      <AnimatePresence>
        {selected && (
          <div className="fixed inset-0 z-[70] grid place-items-center p-4 sm:p-6">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelected(null)}
              className="absolute inset-0 bg-black/70 backdrop-blur-md"
            />

            {/* Morphing card */}
            <motion.div
              layoutId={`card-${selected.id}`}
              className="glass-strong relative z-10 flex max-h-[88vh] w-full max-w-3xl flex-col overflow-hidden rounded-3xl"
            >
              <div className="overflow-y-auto">
                {/* Hero — animated live-workflow pipeline */}
                <motion.div
                  layoutId={`thumb-${selected.id}`}
                  className={`relative aspect-[16/9] w-full overflow-hidden bg-gradient-to-br ${selected.gradient}`}
                >
                  <div className="bg-grid absolute inset-0 opacity-20" />
                  <div className="absolute inset-0 flex items-center justify-center p-6 sm:p-10">
                    <AnimatedPipeline steps={selected.architecture} className="h-full w-full" />
                  </div>
                  <span className="mono absolute left-4 top-4 flex items-center gap-2 rounded-full border border-white/15 bg-black/55 px-3 py-1 text-[11px] text-white/80">
                    <selected.icon className="h-3.5 w-3.5" /> Live workflow
                  </span>
                </motion.div>

                <button
                  onClick={() => setSelected(null)}
                  aria-label="Close"
                  className="absolute right-4 top-4 z-20 grid h-10 w-10 place-items-center rounded-full border border-white/15 bg-black/40 text-white backdrop-blur transition-colors hover:bg-black/60"
                >
                  <X className="h-5 w-5" />
                </button>

                {/* Content — fades in after the morph */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15, duration: 0.4 }}
                  className="p-6 sm:p-8"
                >
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="mono rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-accent">
                      {selected.category}
                    </span>
                    <span className="mono text-xs text-fg-faint">{selected.year}</span>
                  </div>

                  <motion.h3
                    layoutId={`title-${selected.id}`}
                    className="mt-4 text-2xl font-semibold tracking-tight sm:text-3xl"
                  >
                    {selected.title}
                  </motion.h3>

                  <p className="mt-4 leading-relaxed text-fg-muted">{selected.description}</p>

                  {/* Metrics */}
                  <div className="mt-6 grid grid-cols-3 gap-2 sm:gap-3">
                    {selected.metrics.map((m) => (
                      <div
                        key={m.label}
                        className="rounded-2xl border border-white/8 bg-white/[0.02] p-3 text-center sm:p-4"
                      >
                        <div className="break-words text-sm font-semibold leading-snug text-gradient sm:text-xl md:text-2xl">
                          {m.value}
                        </div>
                        <div className="mono mt-1 text-[10px] uppercase tracking-wide text-fg-muted sm:text-[11px]">
                          {m.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Real UI preview (from the repo README) */}
                  {selected.previewImage && (
                    <div className="mt-8">
                      <h4 className="mono text-xs uppercase tracking-[0.2em] text-fg-faint">
                        Preview
                      </h4>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={selected.previewImage}
                        alt={`${selected.title} interface preview`}
                        loading="lazy"
                        onError={(e) => {
                          (e.currentTarget.parentElement as HTMLElement).style.display = "none";
                        }}
                        className="mt-3 w-full rounded-2xl border border-white/10 bg-black/20"
                      />
                    </div>
                  )}

                  {/* Stack */}
                  <div className="mt-8">
                    <h4 className="mono text-xs uppercase tracking-[0.2em] text-fg-faint">
                      Tech stack
                    </h4>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {selected.stack.map((s) => (
                        <span
                          key={s}
                          className="mono rounded-md border border-white/10 bg-white/[0.02] px-3 py-1 text-xs text-fg-muted"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Links */}
                  <div className="mt-8 flex flex-wrap gap-3">
                    {selected.links.demo && (
                      <a
                        href={selected.links.demo}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-medium text-black transition-transform hover:scale-[0.98]"
                      >
                        Live demo <ArrowUpRight className="h-4 w-4" />
                      </a>
                    )}
                    {selected.links.github && (
                      <a
                        href={selected.links.github}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.03] px-5 py-2.5 text-sm font-medium transition-colors hover:bg-white/[0.06]"
                      >
                        <Github className="h-4 w-4" /> Source
                      </a>
                    )}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
