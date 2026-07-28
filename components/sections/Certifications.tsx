"use client";

import { ExternalLink, BadgeCheck } from "lucide-react";
import { CERTIFICATIONS } from "@/lib/data";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export function Certifications() {
  return (
    <section id="certifications" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-24 md:py-28">
      <SectionHeading
        kicker="Credentials"
        title="Certifications"
        description="Hover a card to verify. Swap issuers and links in lib/data.ts."
      />

      <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {CERTIFICATIONS.map((c, i) => (
          <Reveal key={c.id} delay={i * 0.05}>
            <a
              href={c.credentialUrl}
              target="_blank"
              rel="noreferrer"
              className="group glass gradient-border relative flex items-center gap-4 overflow-hidden rounded-2xl p-5 transition-transform duration-300 hover:-translate-y-1"
            >
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/[0.03]">
                <c.icon className="h-5 w-5 text-accent" />
              </span>
              <div className="min-w-0 flex-1">
                <h3 className="truncate text-sm font-semibold">{c.name}</h3>
                <p className="mono mt-0.5 truncate text-xs text-fg-muted">
                  {c.issuer} · {c.year}
                </p>
              </div>
              <BadgeCheck className="h-5 w-5 shrink-0 text-fg-faint transition-colors group-hover:text-accent" />

              {/* Hover-reveal verify strip */}
              <span className="mono absolute inset-x-0 bottom-0 flex translate-y-full items-center justify-center gap-1.5 bg-accent/10 py-1.5 text-[11px] text-accent transition-transform duration-300 group-hover:translate-y-0">
                Verify credential <ExternalLink className="h-3 w-3" />
              </span>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
