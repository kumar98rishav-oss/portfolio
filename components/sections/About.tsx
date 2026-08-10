"use client";

import { SUMMARY, SKILL_GROUPS } from "@/lib/data";
import { Reveal } from "@/components/ui/Reveal";

/** Profile summary + grouped skill lists — the top of the main column. */
export function About() {
  return (
    <section id="about" className="scroll-mt-20">
      <Reveal>
        <p className="kicker">Profile</p>
        <h2 className="mt-2 font-display text-2xl font-semibold tracking-tight sm:text-3xl">
          {/* short, human title rather than a restatement of the summary */}
          Data analyst who ships the reporting — and the tools behind it
        </h2>
        <p className="mt-4 max-w-3xl text-[15px] leading-relaxed text-fg-muted sm:text-base">
          {SUMMARY}
        </p>
      </Reveal>

      <Reveal delay={0.06}>
        <div className="mt-8 card p-6 sm:p-7">
          <p className="kicker">Skills</p>
          <div className="mt-4 grid gap-6 sm:grid-cols-2">
            {SKILL_GROUPS.map((group) => (
              <div key={group.key}>
                <div className="flex items-center gap-2">
                  <group.icon className="h-4 w-4 text-accent" />
                  <h3 className="font-display text-sm font-semibold">{group.title}</h3>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {group.skills.map((s) => (
                    <span key={s} className="chip">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
