"use client";

import { MapPin } from "lucide-react";
import { EXPERIENCE } from "@/lib/data";
import { Reveal } from "@/components/ui/Reveal";

/** Career history as detailed, bulleted entries (reference-site style). */
export function ExperienceList() {
  return (
    <section id="experience" className="scroll-mt-20">
      <Reveal>
        <p className="kicker">Career</p>
        <h2 className="mt-2 font-display text-2xl font-semibold tracking-tight sm:text-3xl">Experience</h2>
      </Reveal>

      <div className="mt-6 flex flex-col gap-4">
        {EXPERIENCE.map((job, i) => (
          <Reveal key={job.id} delay={i * 0.05}>
            <article className="card p-6 sm:p-7">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className="font-display text-lg font-semibold tracking-tight">
                  {job.title}
                  <span className="text-accent"> · {job.org}</span>
                </h3>
                <span className="mono shrink-0 text-xs text-fg-faint">{job.period}</span>
              </div>

              {job.location && (
                <p className="mono mt-1 flex items-center gap-1.5 text-xs text-fg-muted">
                  <MapPin className="h-3.5 w-3.5 text-fg-faint" /> {job.location}
                </p>
              )}

              {job.bullets && (
                <ul className="mt-4 space-y-2.5">
                  {job.bullets.map((b) => (
                    <li key={b.slice(0, 24)} className="flex gap-3 text-[14.5px] leading-relaxed text-fg-muted">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent/70" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              )}

              <div className="mt-4 flex flex-wrap gap-2">
                {job.tags.map((t) => (
                  <span key={t} className="chip">
                    {t}
                  </span>
                ))}
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
