"use client";

import { useState } from "react";
import { Copy, Check, Send, ArrowUpRight } from "lucide-react";
import { CONTACT, SOCIALS, PROFILE } from "@/lib/data";
import { SectionHeading } from "@/components/ui/SectionHeading";
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
    <section id="contact" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-24 md:py-32">
      <div className="glass-strong gradient-border relative overflow-hidden rounded-[32px] p-8 sm:p-12">
        {/* Ambient glow */}
        <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-accent/20 blur-[100px]" />
        <div className="pointer-events-none absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-accent-2/20 blur-[100px]" />

        <div className="relative grid grid-cols-1 gap-10 lg:grid-cols-2">
          {/* Left — invite */}
          <div>
            <SectionHeading kicker={CONTACT.kicker} title={CONTACT.heading} description={CONTACT.blurb} />

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <button
                onClick={copyEmail}
                className="group inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.03] px-5 py-2.5 text-sm font-medium transition-colors hover:bg-white/[0.06]"
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4 text-emerald-400" /> Copied!
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" /> {CONTACT.email}
                  </>
                )}
              </button>
            </div>

            <div className="mt-8 flex items-center gap-3">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  className="grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/[0.03] text-fg-muted transition-all hover:-translate-y-0.5 hover:text-fg hover:border-white/25"
                >
                  <s.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Right — form (visual only; wire up your handler later) */}
          <Reveal delay={0.1}>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex flex-col gap-4 rounded-3xl border border-white/8 bg-black/20 p-6"
            >
              <Field label="Name" htmlFor="name">
                <input id="name" name="name" placeholder="Jane Doe" className={inputCls} />
              </Field>
              <Field label="Email" htmlFor="email">
                <input id="email" name="email" type="email" placeholder="jane@company.com" className={inputCls} />
              </Field>
              <Field label="Message" htmlFor="message">
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  placeholder="Tell me about your project…"
                  className={`${inputCls} resize-none`}
                />
              </Field>
              <button
                type="submit"
                className="mt-1 inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-medium text-black transition-transform hover:scale-[0.99]"
              >
                {CONTACT.cta} <Send className="h-4 w-4" />
              </button>
              <p className="mono text-center text-[11px] text-fg-faint">
                Demo form — connect it to your email service or an API route.
              </p>
            </form>
          </Reveal>
        </div>
      </div>

      {/* Resume nudge */}
      <div className="mt-6 flex justify-center">
        <a
          href={PROFILE.resumeUrl}
          target="_blank"
          rel="noopener noreferrer"
          download={`${PROFILE.name.replace(/\s+/g, "_")}_Resume.pdf`}
          className="mono inline-flex items-center gap-1.5 text-sm text-fg-muted transition-colors hover:text-fg"
        >
          Or grab my resume <ArrowUpRight className="h-3.5 w-3.5" />
        </a>
      </div>
    </section>
  );
}

const inputCls =
  "w-full rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 text-sm text-fg placeholder:text-fg-faint outline-none transition-all focus:border-accent/50 focus:bg-white/[0.04] focus:shadow-[0_0_0_3px_rgb(var(--accent)/0.12)]";

function Field({ label, htmlFor, children }: { label: string; htmlFor: string; children: React.ReactNode }) {
  return (
    <label htmlFor={htmlFor} className="flex flex-col gap-1.5">
      <span className="mono text-xs uppercase tracking-wide text-fg-muted">{label}</span>
      {children}
    </label>
  );
}
