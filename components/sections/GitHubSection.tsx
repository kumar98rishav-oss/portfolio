"use client";

import { Github, Star, GitFork, ArrowUpRight } from "lucide-react";
import { GITHUB } from "@/lib/data";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { ContributionGraph } from "@/components/ui/ContributionGraph";

export function GitHubSection() {
  return (
    <section id="github" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-24 md:py-28">
      <SectionHeading
        kicker="Open Source"
        title="Building in public"
        description="A live-looking snapshot — wire it to the GitHub API later, or keep the placeholders."
      />

      {/* Stats + heatmap */}
      <div className="mt-12 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Reveal className="lg:col-span-1">
          <div className="glass gradient-border grid h-full grid-cols-2 gap-px overflow-hidden rounded-3xl">
            {GITHUB.stats.map((s) => (
              <div key={s.label} className="bg-white/[0.01] p-5">
                <div className="text-2xl font-semibold tracking-tight text-gradient">{s.value}</div>
                <div className="mono mt-1 text-[11px] uppercase tracking-wide text-fg-muted">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.08} className="lg:col-span-2">
          <div className="glass gradient-border h-full rounded-3xl p-6">
            <div className="flex items-center justify-between">
              <p className="mono text-xs text-fg-muted">contribution activity</p>
              <a
                href={GITHUB.profileUrl}
                target="_blank"
                rel="noreferrer"
                className="mono flex items-center gap-1.5 text-xs text-accent hover:underline"
              >
                @{GITHUB.username} <ArrowUpRight className="h-3 w-3" />
              </a>
            </div>
            <div className="mt-5 overflow-x-auto">
              <ContributionGraph />
            </div>
          </div>
        </Reveal>
      </div>

      {/* Pinned repos */}
      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
        {GITHUB.pinned.map((repo, i) => (
          <Reveal key={repo.name} delay={i * 0.06}>
            <a
              href={GITHUB.profileUrl}
              target="_blank"
              rel="noreferrer"
              className="group glass gradient-border flex h-full flex-col rounded-2xl p-5 transition-transform duration-300 hover:-translate-y-1"
            >
              <div className="flex items-center gap-2 text-fg-muted">
                <Github className="h-4 w-4" />
                <span className="text-sm font-medium text-fg group-hover:text-accent">
                  {repo.name}
                </span>
              </div>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-fg-muted">
                {repo.description}
              </p>
              <div className="mono mt-4 flex items-center gap-4 text-xs text-fg-faint">
                <span className="flex items-center gap-1.5">
                  <span className="h-3 w-3 rounded-full" style={{ background: repo.color }} />
                  {repo.language}
                </span>
                <span className="flex items-center gap-1">
                  <Star className="h-3.5 w-3.5" /> {repo.stars.toLocaleString()}
                </span>
                <span className="flex items-center gap-1">
                  <GitFork className="h-3.5 w-3.5" /> {repo.forks}
                </span>
              </div>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
