"use client";

import { GALLERY } from "@/lib/data";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export function Gallery() {
  return (
    <section id="gallery" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-24 md:py-28">
      <SectionHeading
        kicker="Gallery"
        title="Visual work"
        description="Masonry layout with zoom-on-hover. Drop real screenshots into lib/data.ts (add a src)."
      />

      <div className="masonry mt-12 columns-1 sm:columns-2 lg:columns-3">
        {GALLERY.map((shot, i) => (
          <Reveal key={shot.id} delay={(i % 3) * 0.06}>
            <figure
              className="group glass gradient-border relative overflow-hidden rounded-2xl"
              style={{ height: shot.height }}
            >
              {/* Placeholder tile — replace with <img src={shot.src} /> */}
              <div
                className={`skeleton absolute inset-0 bg-gradient-to-br ${shot.gradient} transition-transform duration-500 group-hover:scale-105`}
              />
              <div className="bg-grid absolute inset-0 opacity-30" />

              {/* Caption slides up on hover */}
              <figcaption className="absolute inset-x-0 bottom-0 translate-y-full bg-gradient-to-t from-black/80 to-transparent p-4 text-sm font-medium text-white transition-transform duration-300 group-hover:translate-y-0">
                {shot.caption}
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
