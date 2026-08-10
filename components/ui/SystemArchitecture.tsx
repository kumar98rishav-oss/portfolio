"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * A real architecture diagram, not a flat chain.
 *
 * A left-to-right list of stages says "data goes in, DAX comes out", which is
 * the least interesting thing about this system. What actually matters is:
 *   - three PROCESSES on one machine, with the engine owned by Power BI, not us
 *   - traffic flows BOTH ways: the model is read, and measures are written back
 *   - there is a LOOP — write, verify on the real engine, then deploy — and the
 *     verify step is the whole point of the product
 *
 * So this draws the boundary, the two directions, and the loop. Animation is
 * gated on visibility and disabled for reduced-motion users; the static frame
 * is a complete diagram on its own.
 */

type Lane = {
  id: string;
  title: string;
  subtitle: string;
  items: string[];
  tone: "browser" | "bridge" | "engine";
};

const LANES: Lane[] = [
  {
    id: "ui",
    title: "React SPA",
    subtitle: "in the browser",
    items: ["Intent → DAX", "Optimizer", "KPI surface", "Storage / Cleanup"],
    tone: "browser",
  },
  {
    id: "bridge",
    title: ".NET 8 bridge",
    subtitle: "127.0.0.1 · loopback only",
    items: ["11 REST endpoints", "TOM metadata", "ADOMD queries", "Benchmark harness"],
    tone: "bridge",
  },
  {
    id: "engine",
    title: "Analysis Services",
    subtitle: "owned by Power BI Desktop",
    items: ["VertiPaq columnar store", "Formula engine", "Your real data"],
    tone: "engine",
  },
];

const TONES: Record<Lane["tone"], { ring: string; dot: string; text: string }> = {
  browser: { ring: "border-sky-400/35", dot: "bg-sky-400", text: "text-sky-300" },
  bridge: { ring: "border-cyan-400/35", dot: "bg-cyan-400", text: "text-cyan-300" },
  engine: { ring: "border-amber-400/35", dot: "bg-amber-400", text: "text-amber-300" },
};

/** The round trip, in the order a measure actually travels it. */
const FLOW = [
  { label: "read model", dir: "down" as const, note: "tables, columns, measures" },
  { label: "write DAX", dir: "down" as const, note: "DEFINE — never persisted" },
  { label: "real value", dir: "up" as const, note: "computed over full data" },
  { label: "deploy", dir: "down" as const, note: "only when you say so" },
];

export function SystemArchitecture({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [live, setLive] = useState(false);
  const [step, setStep] = useState(0);

  // Off-screen diagrams cost nothing.
  useEffect(() => {
    const el = ref.current;
    if (!el || reduce) return;
    const io = new IntersectionObserver(
      ([e]) => setLive(e.isIntersecting),
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduce]);

  useEffect(() => {
    if (!live) return;
    const id = setInterval(() => setStep((s) => (s + 1) % FLOW.length), 1600);
    return () => clearInterval(id);
  }, [live]);

  const active = reduce ? -1 : step;

  return (
    <div ref={ref} className={cn("flex w-full flex-col gap-2 text-left", className)}>
      {/* boundary label — the privacy claim is structural, so it belongs here */}
      <div className="mono flex items-center gap-2 text-[9px] uppercase tracking-[0.18em] text-fg-faint">
        <span className="h-px flex-1 bg-white/10" />
        one machine · nothing leaves it
        <span className="h-px flex-1 bg-white/10" />
      </div>

      {LANES.map((lane, i) => {
        const tone = TONES[lane.tone];
        return (
          <div key={lane.id}>
            <div
              className={cn(
                "rounded-xl border bg-[rgb(var(--bg)/0.72)] px-3 py-2 backdrop-blur-sm transition-colors duration-500",
                tone.ring,
              )}
            >
              <div className="flex flex-wrap items-baseline gap-x-2">
                <span className={cn("h-1.5 w-1.5 shrink-0 rounded-full", tone.dot)} />
                <span className="text-[13px] font-semibold text-fg">{lane.title}</span>
                <span className="mono text-[9px] uppercase tracking-[0.14em] text-fg-faint">
                  {lane.subtitle}
                </span>
              </div>
              <div className="mt-1.5 flex flex-wrap gap-1">
                {lane.items.map((it) => (
                  <span
                    key={it}
                    className="mono rounded border border-white/10 bg-white/[0.03] px-1.5 py-0.5 text-[9.5px] text-fg-muted"
                  >
                    {it}
                  </span>
                ))}
              </div>
            </div>

            {/* the arrows between lanes carry the actual round trip */}
            {i < LANES.length - 1 && (
              <div className="flex items-stretch gap-3 px-3 py-1.5">
                <div className="flex flex-1 flex-wrap items-center gap-1.5">
                  {FLOW.map((f, fi) => {
                    const on = fi === active;
                    return (
                      <span
                        key={f.label}
                        title={f.note}
                        className={cn(
                          "mono flex items-center gap-1 rounded-full border px-2 py-0.5 text-[9px] transition-all duration-500",
                          on
                            ? "border-accent/60 bg-accent/15 text-accent"
                            : "border-white/10 text-fg-faint",
                        )}
                      >
                        <span className={cn("transition-transform duration-500", on && "scale-125")}>
                          {f.dir === "down" ? "↓" : "↑"}
                        </span>
                        {f.label}
                      </span>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        );
      })}

      {/* the loop is the product — state it in words, not just arrows */}
      <div className="mono mt-1 flex items-center gap-2 rounded-lg border border-accent/25 bg-accent/[0.06] px-3 py-1.5 text-[9.5px] text-accent/90">
        <span className="text-[11px]">↻</span>
        write → verify on the real engine → deploy
      </div>
    </div>
  );
}
