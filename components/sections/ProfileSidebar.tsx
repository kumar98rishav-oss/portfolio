"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Download, GraduationCap, Award, BadgeCheck } from "lucide-react";
import { PROFILE, SOCIALS, STATS, EDUCATION_FORMAL, CERTIFICATIONS } from "@/lib/data";

/**
 * Résumé-style identity sidebar (reference-site structure):
 * snapshot → stat chips → Education → Certifications & Awards.
 */
export function ProfileSidebar() {
  const [avatarOk, setAvatarOk] = useState(true);
  return (
    <motion.aside
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col gap-5 lg:sticky lg:top-20 lg:self-start"
    >
      {/* Snapshot */}
      <div className="card p-6">
        {/* Large portrait */}
        {PROFILE.avatarUrl && avatarOk ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={PROFILE.avatarUrl}
            alt={PROFILE.name}
            onError={() => setAvatarOk(false)}
            className="aspect-[4/5] w-full rounded-2xl object-cover object-top ring-1 ring-[rgb(var(--border)/0.12)] shadow-sm"
          />
        ) : (
          <div className="grid aspect-[4/5] w-full place-items-center rounded-2xl bg-gradient-to-br from-accent to-accent-2 text-5xl font-bold text-white">
            {PROFILE.firstName[0]}
            {PROFILE.lastName[0]}
          </div>
        )}

        <h1 className="mt-4 font-display text-xl font-semibold tracking-tight">{PROFILE.name}</h1>
        <p className="mono mt-1.5 flex items-center gap-1.5 text-[11px] text-accent">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent/70" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
          </span>
          Available
        </p>

        <p className="mt-3 text-sm leading-relaxed text-fg-muted">{PROFILE.headline}</p>

        <p className="mono mt-4 flex items-center gap-1.5 text-xs text-fg-muted">
          <MapPin className="h-3.5 w-3.5 text-fg-faint" /> {PROFILE.location}
        </p>
        <p className="mt-1 text-xs text-fg-faint">{PROFILE.availability}</p>

        {/* Contact + résumé */}
        <div className="mt-5 flex flex-wrap items-center gap-2">
          <a
            href={PROFILE.resumeUrl}
            target="_blank"
            rel="noreferrer"
            download={`${PROFILE.name.replace(/\s+/g, "_")}_Resume.pdf`}
            className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-accent px-3 py-2 text-xs font-medium text-white transition-transform hover:scale-[0.98]"
          >
            <Download className="h-3.5 w-3.5" /> Résumé
          </a>
          {SOCIALS.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target={s.href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              aria-label={s.label}
              className="grid h-9 w-9 place-items-center rounded-lg border border-white/10 bg-white/[0.03] text-fg-muted transition-colors hover:border-accent/40 hover:text-accent"
            >
              <s.icon className="h-4 w-4" />
            </a>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        {STATS.map((s) => (
          <div key={s.label} className="card px-2 py-4 text-center">
            <div className="font-display text-lg font-semibold text-accent">{s.value}</div>
            <div className="mt-1 text-[10px] leading-tight text-fg-muted">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Education */}
      <div className="card p-6">
        <p className="kicker flex items-center gap-2">
          <GraduationCap className="h-3.5 w-3.5" /> Education
        </p>
        <ul className="mt-4 space-y-4">
          {EDUCATION_FORMAL.map((e) => (
            <li key={e.degree}>
              <p className="text-sm font-semibold leading-snug">{e.degree}</p>
              <p className="mt-0.5 text-xs text-fg-muted">{e.org}</p>
              <p className="mono mt-0.5 text-[11px] text-fg-faint">{e.period}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* Certifications & Awards */}
      <div className="card p-6">
        <p className="kicker flex items-center gap-2">
          <Award className="h-3.5 w-3.5" /> Certifications &amp; Awards
        </p>
        <ul className="mt-4 space-y-3.5">
          {CERTIFICATIONS.map((c) => (
            <li key={c.id} className="flex gap-2.5">
              <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              <div className="min-w-0">
                <p className="text-sm font-medium leading-snug">{c.name}</p>
                <p className="mono mt-0.5 text-[11px] text-fg-faint">
                  {c.issuer}
                  {c.year ? ` · ${c.year}` : ""}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </motion.aside>
  );
}
