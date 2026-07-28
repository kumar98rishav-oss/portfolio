"use client";

import { Quote } from "lucide-react";
import { TESTIMONIALS, type Testimonial } from "@/lib/data";
import { SectionHeading } from "@/components/ui/SectionHeading";

/** Two counter-scrolling marquee rows of quote cards; both pause on hover. */
export function Testimonials() {
  const rowA = [...TESTIMONIALS, ...TESTIMONIALS];
  const rowB = [...TESTIMONIALS.slice().reverse(), ...TESTIMONIALS.slice().reverse()];

  return (
    <section aria-label="Testimonials" className="scroll-mt-24 py-24 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          kicker="Kind Words"
          title="What people say"
          align="center"
          description="Placeholder quotes — replace names and words in lib/data.ts."
        />
      </div>

      <div className="marquee-pause group relative mt-14 flex flex-col gap-4 overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_8%,#000_92%,transparent)]">
        <div className="flex w-max animate-marquee gap-4 [will-change:transform]">
          {rowA.map((t, i) => (
            <Card key={`a-${i}`} t={t} />
          ))}
        </div>
        <div className="flex w-max animate-marquee-reverse gap-4 [will-change:transform]">
          {rowB.map((t, i) => (
            <Card key={`b-${i}`} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Card({ t }: { t: Testimonial }) {
  return (
    <figure className="gradient-border w-[340px] shrink-0 rounded-2xl border border-white/10 bg-[rgb(var(--surface)/0.05)] p-6 sm:w-[420px]">
      <Quote className="h-6 w-6 text-accent/60" />
      <blockquote className="mt-3 text-sm leading-relaxed text-fg">{t.quote}</blockquote>
      <figcaption className="mt-5 flex items-center gap-3">
        <span className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-accent/30 to-accent-2/30 text-xs font-semibold">
          {t.name.split(" ").map((n) => n[0]).join("")}
        </span>
        <div>
          <div className="text-sm font-medium">{t.name}</div>
          <div className="mono text-xs text-fg-muted">{t.role}</div>
        </div>
      </figcaption>
    </figure>
  );
}
