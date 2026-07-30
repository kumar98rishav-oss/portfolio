"use client";

import { motion } from "framer-motion";
import { MapPin, Terminal } from "lucide-react";
import { ABOUT, PROFILE, SKILL_GROUPS } from "@/lib/data";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

const accentToken: Record<string, string> = {
  accent: "var(--accent)",
  "accent-2": "var(--accent-2)",
  "accent-3": "var(--accent-3)",
};

export function BentoGrid() {
  return (
    <section id="about" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-24 md:py-32">
      <SectionHeading
        kicker={ABOUT.kicker}
        title={ABOUT.heading}
        description="How I got here, how I work, and the toolkit I reach for."
      />

      {/* Identity band */}
      <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-6 md:auto-rows-[minmax(150px,auto)]">
        {/* Intro (large) */}
        <Reveal className="md:col-span-4 md:row-span-2">
          <SpotlightCard tilt className="h-full p-8">
            <div className="flex h-full flex-col justify-between gap-6">
              <div className="space-y-4">
                {ABOUT.intro.map((para) => (
                  <p key={para.slice(0, 24)} className="text-base leading-relaxed text-fg-muted sm:text-lg">
                    {para}
                  </p>
                ))}
              </div>
              <ul className="flex flex-wrap gap-2">
                {ABOUT.highlights.map((h) => (
                  <li
                    key={h}
                    className="mono rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-fg-muted"
                  >
                    {h}
                  </li>
                ))}
              </ul>
            </div>
          </SpotlightCard>
        </Reveal>

        {/* Identity card */}
        <Reveal delay={0.06} className="md:col-span-2">
          <SpotlightCard tilt className="h-full p-6">
            <div className="flex h-full flex-col justify-between">
              <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-accent to-accent-2 text-lg font-bold text-black">
                {PROFILE.firstName[0]}
                {PROFILE.lastName[0]}
              </div>
              <div>
                <p className="text-lg font-semibold">{PROFILE.name}</p>
                <p className="mono mt-1 flex items-center gap-1.5 text-xs text-fg-muted">
                  <MapPin className="h-3.5 w-3.5" /> {PROFILE.location}
                </p>
              </div>
            </div>
          </SpotlightCard>
        </Reveal>

        {/* Now learning — terminal card */}
        <Reveal delay={0.12} className="md:col-span-2">
          <SpotlightCard className="h-full p-6" spotlightColor="var(--accent-3)">
            <p className="mono flex items-center gap-2 text-xs text-fg-faint">
              <Terminal className="h-3.5 w-3.5 text-accent" /> currently_learning
            </p>
            <div className="mono mt-3 space-y-1.5 text-sm">
              {ABOUT.nowLearning.map((item, i) => (
                <div key={item} className="flex items-center gap-2 text-fg-muted">
                  <span className="text-accent">➜</span>
                  <span className="text-fg">{item}</span>
                  {i === ABOUT.nowLearning.length - 1 && <span className="caret" />}
                </div>
              ))}
            </div>
          </SpotlightCard>
        </Reveal>
      </div>

      {/* Skills bento */}
      <div className="mt-16 flex items-center gap-3">
        <h3 className="text-sm font-medium uppercase tracking-[0.2em] text-fg-faint">Skills</h3>
        <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-6 md:auto-rows-[minmax(150px,auto)]">
        {SKILL_GROUPS.map((group, i) => (
          <Reveal key={group.key} delay={i * 0.05} className={group.span}>
            <SpotlightCard
              tilt
              className="h-full p-6"
              spotlightColor={accentToken[group.accent]}
            >
              <div className="flex h-full flex-col">
                <div className="flex items-center gap-3">
                  <span
                    className="grid h-11 w-11 place-items-center rounded-xl border border-white/10"
                    style={{
                      background: `radial-gradient(circle at 30% 30%, rgb(${accentToken[group.accent]} / 0.25), transparent)`,
                    }}
                  >
                    <group.icon
                      className="h-5 w-5"
                      style={{ color: `rgb(${accentToken[group.accent]})` }}
                    />
                  </span>
                  <h4 className="text-lg font-semibold tracking-tight">{group.title}</h4>
                </div>

                <p className="mt-3 text-sm leading-relaxed text-fg-muted">{group.blurb}</p>

                <div className="mt-auto flex flex-wrap gap-2 pt-5">
                  {group.skills.map((s) => (
                    <span
                      key={s}
                      className={cn(
                        "mono rounded-md border border-white/10 bg-white/[0.02] px-2.5 py-1 text-xs text-fg-muted",
                        "transition-colors hover:border-white/25 hover:text-fg"
                      )}
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </SpotlightCard>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
