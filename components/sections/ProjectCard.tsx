"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useRef, type MouseEvent } from "react";
import type { Project } from "@/lib/data";
import { cn } from "@/lib/utils";
import { AnimatedPipeline } from "@/components/ui/AnimatedPipeline";

type Props = {
  project: Project;
  onOpen: (p: Project) => void;
};

/**
 * Grid card that morphs into the modal via shared `layoutId`s.
 * A cursor-tracking spotlight adds a glare without transforms (which would
 * fight the layout animation), and the thumbnail / title carry layoutIds so
 * they fly smoothly into the expanded view.
 */
export function ProjectCard({ project, onOpen }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  function handleMove(e: MouseEvent<HTMLElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  }

  return (
    <motion.article
      layoutId={`card-${project.id}`}
      onClick={() => onOpen(project)}
      onMouseMove={handleMove}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.99 }}
      transition={{ type: "spring", stiffness: 400, damping: 32 }}
      className="group relative cursor-pointer"
    >
      <div
        ref={ref}
        className="glass gradient-border relative flex h-full flex-col overflow-hidden rounded-3xl p-3"
      >
        {/* Spotlight glare */}
        <div
          className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(320px circle at var(--mx) var(--my), rgb(var(--accent) / 0.12), transparent 60%)",
          }}
        />

        {/* Thumbnail — animated live-workflow pipeline */}
        <motion.div
          layoutId={`thumb-${project.id}`}
          className={cn(
            "relative z-10 aspect-[16/10] overflow-hidden rounded-2xl bg-gradient-to-br",
            project.gradient
          )}
        >
          <div className="bg-grid absolute inset-0 opacity-25" />
          <div className="absolute inset-0 flex items-center justify-center p-4">
            <AnimatedPipeline steps={project.architecture} className="h-full w-full" />
          </div>
          <span className="mono absolute left-3 top-3 rounded-full border border-white/15 bg-black/55 px-2.5 py-1 text-[11px] text-white/80">
            {project.category}
          </span>
          <span className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-lg border border-white/15 bg-black/55">
            <project.icon className="h-4 w-4 text-white/80" strokeWidth={1.5} />
          </span>
        </motion.div>

        {/* Body */}
        <div className="relative z-10 flex flex-1 flex-col p-4">
          <div className="flex items-start justify-between gap-3">
            <motion.h3
              layoutId={`title-${project.id}`}
              className="text-lg font-semibold tracking-tight"
            >
              {project.title}
            </motion.h3>
            <span className="mono mt-1 shrink-0 text-xs text-fg-faint">{project.year}</span>
          </div>

          <p className="mt-2 text-sm leading-relaxed text-fg-muted">{project.summary}</p>

          <div className="mt-4 flex flex-wrap gap-1.5">
            {project.stack.slice(0, 4).map((s) => (
              <span
                key={s}
                className="mono rounded-md border border-white/10 bg-white/[0.02] px-2 py-0.5 text-[11px] text-fg-muted"
              >
                {s}
              </span>
            ))}
            {project.stack.length > 4 && (
              <span className="mono px-1 py-0.5 text-[11px] text-fg-faint">
                +{project.stack.length - 4}
              </span>
            )}
          </div>

          <div className="mt-5 flex items-center gap-1.5 text-sm font-medium text-accent">
            View case study
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
        </div>
      </div>
    </motion.article>
  );
}
