"use client";

import { ArrowUpRight, Github } from "lucide-react";
import { PROJECTS } from "@/lib/data";
import { Reveal } from "@/components/ui/Reveal";

// Show the MSP dashboard first, then the medical-legal one.
const REPORT_ORDER = ["msp-management-accounts", "medlegal-analytics"];
const REPORTS = PROJECTS.filter((p) => p.kind === "report").sort(
  (a, b) => REPORT_ORDER.indexOf(a.id) - REPORT_ORDER.indexOf(b.id)
);

/** BI / dashboard work — the "Selected Work" section. */
export function Work() {
  if (REPORTS.length === 0) return null;
  return (
    <section id="work" className="scroll-mt-20">
      <Reveal>
        <p className="kicker">Selected work</p>
        <h2 className="mt-2 font-display text-2xl font-semibold tracking-tight sm:text-3xl">Projects</h2>
        <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-fg-muted">
          End-to-end Power BI solutions — from source data and modelling to secured, published reporting.
        </p>
      </Reveal>

      <div className="mt-6 flex flex-col gap-4">
        {REPORTS.map((p, i) => (
          <Reveal key={p.id} delay={i * 0.05}>
            <article className="card flex h-full flex-col p-6 sm:p-7">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/[0.03]">
                  <p.icon className="h-5 w-5 text-accent" strokeWidth={1.6} />
                </span>
                <div className="min-w-0">
                  <h3 className="font-display text-lg font-semibold tracking-tight">{p.title}</h3>
                  <p className="mono text-[11px] text-fg-faint">{p.category} · {p.year}</p>
                </div>
              </div>

              <p className="mt-4 text-sm font-medium text-fg">{p.summary}</p>
              <p className="mt-2 text-[13.5px] leading-relaxed text-fg-muted">{p.description}</p>

              {/* Screenshots */}
              {p.images && (
                <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {p.images.map((img) => (
                    <a
                      key={img.src}
                      href={img.src}
                      target="_blank"
                      rel="noreferrer"
                      className="group block overflow-hidden rounded-xl border border-white/10 bg-white/[0.02]"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={img.src}
                        alt={`${p.title} — ${img.label}`}
                        loading="lazy"
                        className="aspect-[16/10] w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                        onError={(e) => {
                          (e.currentTarget.closest("a") as HTMLElement).style.display = "none";
                        }}
                      />
                      <span className="mono block border-t border-white/10 px-3 py-2 text-[11px] text-fg-muted">
                        {img.label}
                      </span>
                    </a>
                  ))}
                </div>
              )}

              <div className="mt-5 flex flex-wrap gap-1.5">
                {p.stack.slice(0, 6).map((s) => (
                  <span key={s} className="chip">{s}</span>
                ))}
              </div>

              {(p.links.demo || (p.links.github && p.links.github !== "#")) && (
                <div className="mt-5 flex flex-wrap gap-2.5">
                  {p.links.demo && (
                    <a href={p.links.demo} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 rounded-full bg-accent px-4 py-2 text-xs font-medium text-white transition-transform hover:scale-[0.98]">
                      {p.demoLabel ?? "Live demo"} <ArrowUpRight className="h-3.5 w-3.5" />
                    </a>
                  )}
                  {p.links.github && p.links.github !== "#" && (
                    <a href={p.links.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 rounded-full border border-white/12 bg-white/[0.03] px-4 py-2 text-xs font-medium text-fg-muted transition-colors hover:text-fg">
                      <Github className="h-3.5 w-3.5" /> Source
                    </a>
                  )}
                </div>
              )}
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
