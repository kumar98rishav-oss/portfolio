"use client";

import { ArrowUp } from "lucide-react";
import { FOOTER, PROFILE, SOCIALS } from "@/lib/data";

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/8 px-6 pt-20">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="col-span-2 md:col-span-2">
            <div className="flex items-center gap-2">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-accent to-accent-2 text-xs font-bold text-black">
                {PROFILE.firstName[0]}
                {PROFILE.lastName[0]}
              </span>
              <span className="font-semibold">{PROFILE.name}</span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-fg-muted">{PROFILE.tagline}</p>
            <div className="mt-5 flex gap-3">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  className="text-fg-faint transition-colors hover:text-fg"
                >
                  <s.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {FOOTER.columns.map((col) => (
            <div key={col.title}>
              <h4 className="mono text-xs uppercase tracking-[0.2em] text-fg-faint">{col.title}</h4>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-fg-muted transition-colors hover:text-fg"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/8 py-8 sm:flex-row">
          <p className="mono text-xs text-fg-faint">
            © {PROFILE.name}. {FOOTER.note}
          </p>
          <a
            href="#home"
            className="mono inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs text-fg-muted transition-colors hover:text-fg"
          >
            Back to top <ArrowUp className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>

      {/* Giant watermark type */}
      <div
        aria-hidden
        className="pointer-events-none select-none text-center text-[22vw] font-bold leading-[0.8] tracking-tighter text-white/[0.02]"
      >
        {PROFILE.lastName.toUpperCase()}
      </div>
    </footer>
  );
}
