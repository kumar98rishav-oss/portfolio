"use client";

import { useState } from "react";
import { Copy, Check, Mail, ArrowUpRight, Download } from "lucide-react";
import { CONTACT, SOCIALS, PROFILE } from "@/lib/data";
import { Reveal } from "@/components/ui/Reveal";

export function Contact() {
  const [copied, setCopied] = useState(false);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(CONTACT.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard blocked — no-op */
    }
  }

  return (
    <section id="contact" className="mx-auto max-w-6xl scroll-mt-20 px-4 pb-20 pt-6 sm:px-6">
      <Reveal>
        <div className="card relative overflow-hidden p-8 text-center sm:p-12">
          {/* Ambient accent glow */}
          <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-accent/10 blur-[90px]" />

          <p className="kicker">{CONTACT.kicker}</p>
          <h2 className="mx-auto mt-3 max-w-xl font-display text-2xl font-semibold tracking-tight sm:text-3xl">
            {CONTACT.heading}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-fg-muted">
            {CONTACT.blurb}
          </p>

          {/* Primary actions */}
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href={`mailto:${CONTACT.email}`}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-medium text-white transition-transform hover:scale-[0.98] sm:w-auto"
            >
              <Mail className="h-4 w-4" /> Email me
            </a>
            <button
              onClick={copyEmail}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/12 bg-white/[0.03] px-6 py-3 text-sm font-medium text-fg-muted transition-colors hover:text-fg sm:w-auto"
            >
              {copied ? (
                <><Check className="h-4 w-4 text-emerald-500" /> Copied!</>
              ) : (
                <><Copy className="h-4 w-4" /> {CONTACT.email}</>
              )}
            </button>
          </div>

          {/* Socials + résumé */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target={s.href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                aria-label={s.label}
                className="grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/[0.03] text-fg-muted transition-all hover:-translate-y-0.5 hover:border-accent/40 hover:text-accent"
              >
                <s.icon className="h-5 w-5" />
              </a>
            ))}
            <a
              href={PROFILE.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              download={`${PROFILE.name.replace(/\s+/g, "_")}_Resume.pdf`}
              className="mono inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm text-fg-muted transition-colors hover:text-fg"
            >
              <Download className="h-4 w-4" /> Résumé <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
