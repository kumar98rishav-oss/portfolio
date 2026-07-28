"use client";

import { METRICS } from "@/lib/data";
import { CountUp } from "@/components/ui/CountUp";
import { Reveal } from "@/components/ui/Reveal";

export function Metrics() {
  return (
    <section aria-label="Key metrics" className="mx-auto max-w-6xl px-6 py-12">
      <div className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-white/8 bg-white/[0.02] md:grid-cols-4">
        {METRICS.map((m, i) => (
          <Reveal key={m.label} delay={i * 0.08}>
            <div className="group relative flex flex-col items-center gap-2 bg-bg/40 px-6 py-10 text-center transition-colors hover:bg-white/[0.02]">
              <span className="text-4xl font-semibold tracking-tight text-gradient sm:text-5xl">
                <CountUp value={m.value} prefix={m.prefix} suffix={m.suffix} />
              </span>
              <span className="mono text-xs uppercase tracking-wider text-fg-muted">
                {m.label}
              </span>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
