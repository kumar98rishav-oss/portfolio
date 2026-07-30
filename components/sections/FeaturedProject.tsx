"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Github, Maximize2 } from "lucide-react";
import type { Project } from "@/lib/data";
import { AnimatedPipeline } from "@/components/ui/AnimatedPipeline";

/**
 * The flagship showcase — one project given the full-width treatment:
 * a large live-workflow diagram, the case-study summary, headline metrics,
 * the stack, and direct calls to action.
 *
 * Shares `layoutId`s with the modal so opening the full case study morphs
 * out of this card rather than cutting to it.
 */
export function FeaturedProject({
  project,
  onOpen,
}: {
  project: Project;
  onOpen: (p: Project) => void;
}) {
  return (
    <motion.article
      layoutId={`card-${project.id}`}
      className="gradient-border glass relative overflow-hidden rounded-3xl"
    >
      {/* Live workflow diagram */}
      <motion.div
        layoutId={`thumb-${project.id}`}
        className={`relative aspect-[16/10] w-full overflow-hidden bg-gradient-to-br sm:aspect-[16/6] ${project.gradient}`}
      >
        <div className="bg-grid absolute inset-0 opacity-25" />
        <div className="absolute inset-0 flex items-center justify-center p-5 sm:p-8">
          <AnimatedPipeline steps={project.architecture} className="h-full w-full" />
        </div>

        <span className="mono absolute left-4 top-4 flex items-center gap-1.5 rounded-full border border-accent/40 bg-black/60 px-3 py-1 text-[10px] uppercase tracking-[0.16em] text-accent">
          Flagship
        </span>
        <span className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-lg border border-white/15 bg-black/55">
          <project.icon className="h-4 w-4 text-white/80" strokeWidth={1.5} />
        </span>
      </motion.div>

      {/* Case-study summary */}
      <div className="p-6 sm:p-8">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <span className="mono rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-accent">
            {project.category}
          </span>
          <span className="mono text-xs text-fg-faint">{project.year}</span>
        </div>

        <motion.h3
          layoutId={`title-${project.id}`}
          className="mt-4 text-2xl font-semibold tracking-tight sm:text-3xl md:text-4xl"
        >
          {project.title}
        </motion.h3>

        <p className="mt-3 max-w-2xl text-base leading-relaxed text-fg-muted sm:text-lg">
          {project.summary}
        </p>

        {/* Headline metrics */}
        <div className="mt-7 grid grid-cols-3 gap-2 sm:gap-4">
          {project.metrics.map((m) => (
            <div
              key={m.label}
              className="rounded-2xl border border-white/8 bg-white/[0.02] p-3 text-center sm:p-4"
            >
              <div className="text-gradient break-words text-sm font-semibold leading-snug sm:text-xl md:text-2xl">
                {m.value}
              </div>
              <div className="mono mt-1 text-[10px] uppercase tracking-wide text-fg-muted sm:text-[11px]">
                {m.label}
              </div>
            </div>
          ))}
        </div>

        {/* Stack */}
        <div className="mt-7 flex flex-wrap gap-2">
          {project.stack.map((s) => (
            <span
              key={s}
              className="mono rounded-md border border-white/10 bg-white/[0.02] px-2.5 py-1 text-[11px] text-fg-muted"
            >
              {s}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div className="mt-8 flex flex-wrap gap-3">
          {project.links.demo && (
            <a
              href={project.links.demo}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-medium text-black transition-transform hover:scale-[0.98]"
            >
              Live demo <ArrowUpRight className="h-4 w-4" />
            </a>
          )}
          {project.links.github && (
            <a
              href={project.links.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.03] px-5 py-2.5 text-sm font-medium transition-colors hover:bg-white/[0.06]"
            >
              <Github className="h-4 w-4" /> Source
            </a>
          )}
          <button
            onClick={() => onOpen(project)}
            className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.03] px-5 py-2.5 text-sm font-medium transition-colors hover:bg-white/[0.06]"
          >
            <Maximize2 className="h-4 w-4" /> Full case study
          </button>
        </div>
      </div>
    </motion.article>
  );
}
