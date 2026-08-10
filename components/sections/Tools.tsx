"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Github, Check, ChevronDown } from "lucide-react";
import { PROJECTS, FLAGSHIP_PROJECT_ID, type Project } from "@/lib/data";
import { Reveal } from "@/components/ui/Reveal";

// AI-Powered Tools: DAX Workbench flagship, rest behind "Show more".
const TOOLS = PROJECTS.filter((p) => p.kind !== "report");
const FLAGSHIP = TOOLS.find((p) => p.id === FLAGSHIP_PROJECT_ID) ?? TOOLS[0];
const REST = TOOLS.filter((p) => p.id !== FLAGSHIP.id);

function Links({ project }: { project: Project }) {
  return (
    <div className="mt-5 flex flex-wrap gap-2.5">
      {project.links.demo && (
        <a
          href={project.links.demo}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 rounded-full bg-accent px-4 py-2 text-xs font-medium text-white transition-transform hover:scale-[0.98]"
        >
          {project.demoLabel ?? "Live demo"} <ArrowUpRight className="h-3.5 w-3.5" />
        </a>
      )}
      {project.links.github && project.links.github !== "#" && (
        <a
          href={project.links.github}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 rounded-full border border-white/12 bg-white/[0.03] px-4 py-2 text-xs font-medium text-fg-muted transition-colors hover:text-fg"
        >
          <Github className="h-3.5 w-3.5" /> Source
        </a>
      )}
    </div>
  );
}

export function Tools() {
  const [showAll, setShowAll] = useState(false);
  return (
    <section id="tools" className="scroll-mt-20">
      <Reveal>
        <p className="kicker">Not just dashboards</p>
        <h2 className="mt-2 font-display text-2xl font-semibold tracking-tight sm:text-3xl">
          AI-Powered Tools
        </h2>
        <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-fg-muted">
          Developer tools I built for other BI developers — because I needed them and use them on real work.
        </p>
      </Reveal>

      {/* Flagship */}
      <Reveal delay={0.05}>
        <article className="mt-6 card p-6 sm:p-8">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <span className="rounded-full bg-accent/12 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-accent">
              Flagship tool
            </span>
            <span className="mono text-xs text-fg-faint">{FLAGSHIP.category} · {FLAGSHIP.year}</span>
          </div>

          <h3 className="mt-4 font-display text-2xl font-semibold tracking-tight sm:text-3xl">
            {FLAGSHIP.title}
          </h3>
          <p className="mt-2 text-[15px] font-medium text-fg sm:text-lg">{FLAGSHIP.summary}</p>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-fg-muted">{FLAGSHIP.description}</p>

          {FLAGSHIP.whatItDoes && (
            <div className="mt-6">
              <p className="kicker">What it does</p>
              <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
                {FLAGSHIP.whatItDoes.map((b) => (
                  <li key={b.slice(0, 20)} className="flex gap-2.5 text-sm leading-relaxed text-fg-muted">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-6 flex flex-wrap gap-2">
            {FLAGSHIP.stack.map((s) => (
              <span key={s} className="chip">{s}</span>
            ))}
          </div>

          <Links project={FLAGSHIP} />
        </article>
      </Reveal>

      {/* The rest — collapsed behind Show more */}
      {REST.length > 0 && (
        <div className="mt-5 flex items-center gap-4">
          <span className="h-px flex-1 bg-[rgb(var(--border)/0.12)]" />
          <button
            onClick={() => setShowAll((v) => !v)}
            aria-expanded={showAll}
            aria-controls="more-tools"
            className="mono inline-flex shrink-0 items-center gap-2 rounded-full border border-white/12 bg-white/[0.03] px-5 py-2.5 text-xs uppercase tracking-[0.12em] text-fg-muted transition-colors hover:text-fg"
          >
            {showAll ? "Show less" : "Show more tools"}
            <span className="text-accent">({REST.length})</span>
            <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${showAll ? "rotate-180" : ""}`} />
          </button>
          <span className="h-px flex-1 bg-[rgb(var(--border)/0.12)]" />
        </div>
      )}

      <AnimatePresence initial={false}>
        {showAll && (
          <motion.div
            id="more-tools"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="mt-5 grid gap-4 sm:grid-cols-2"
          >
            {REST.map((p) => (
              <article key={p.id} className="card card-hover flex h-full flex-col p-6">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/[0.03]">
                  <p.icon className="h-5 w-5 text-accent" strokeWidth={1.6} />
                </span>
                <div className="min-w-0">
                  <h3 className="font-display text-base font-semibold tracking-tight">{p.title}</h3>
                  <p className="mono text-[11px] text-fg-faint">{p.category}</p>
                </div>
              </div>

              <p className="mt-4 text-sm font-medium text-fg">{p.summary}</p>
              <p className="mt-2 flex-1 text-[13.5px] leading-relaxed text-fg-muted">{p.description}</p>

              <div className="mt-4 flex flex-wrap gap-1.5">
                {p.stack.slice(0, 5).map((s) => (
                  <span key={s} className="chip">{s}</span>
                ))}
              </div>

              <Links project={p} />
              </article>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
