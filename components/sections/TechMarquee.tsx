"use client";

import { TECH_TICKER } from "@/lib/data";

/** Infinite, edge-faded marquee of tools. Pauses on hover. */
export function TechMarquee() {
  const items = [...TECH_TICKER, ...TECH_TICKER]; // duplicate for seamless loop

  return (
    <section aria-label="Technologies" className="relative border-y border-white/5 py-6">
      <div className="marquee-pause group relative flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_10%,#000_90%,transparent)]">
        <div className="animate-marquee flex shrink-0 items-center gap-10 pr-10 [will-change:transform]">
          {items.map((t, i) => (
            <span
              key={i}
              className="mono flex items-center gap-3 whitespace-nowrap text-sm text-fg-faint transition-colors hover:text-fg"
            >
              {t}
              <span className="h-1 w-1 rounded-full bg-accent/50" />
            </span>
          ))}
        </div>
        <div className="animate-marquee flex shrink-0 items-center gap-10 pr-10 [will-change:transform]" aria-hidden>
          {items.map((t, i) => (
            <span
              key={i}
              className="mono flex items-center gap-3 whitespace-nowrap text-sm text-fg-faint transition-colors hover:text-fg"
            >
              {t}
              <span className="h-1 w-1 rounded-full bg-accent/50" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
