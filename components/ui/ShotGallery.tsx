"use client";

import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, X, Maximize2 } from "lucide-react";
import { cn } from "@/lib/utils";

export type Shot = {
  src: string;
  /** What the visitor is looking at — the screenshot alone rarely explains itself. */
  title: string;
  caption: string;
};

/**
 * A paged screenshot viewer.
 *
 * A portfolio claim like "it previews measures on the real engine" is abstract
 * until you can see the interface doing it, so this exists to let a visitor
 * page through the actual UI. Each shot carries a caption, because a raw
 * screenshot of a dense tool means nothing to someone who has never used it.
 *
 * Keyboard: ←/→ to page, Escape to leave the lightbox. Missing files hide
 * themselves rather than leaving a broken-image box, so the gallery degrades
 * to whatever is actually present.
 */
export function ShotGallery({ shots, className }: { shots: Shot[]; className?: string }) {
  const [i, setI] = useState(0);
  const [zoom, setZoom] = useState(false);
  const [broken, setBroken] = useState<Set<string>>(new Set());

  const usable = shots.filter((s) => !broken.has(s.src));
  const idx = Math.min(i, Math.max(0, usable.length - 1));
  const current = usable[idx];

  const go = useCallback(
    (d: number) => {
      if (usable.length === 0) return;
      setI((v) => (v + d + usable.length) % usable.length);
    },
    [usable.length],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
      else if (e.key === "Escape") setZoom(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  if (usable.length === 0 || !current) return null;

  return (
    <div className={cn("select-none", className)}>
      {/* stage */}
      <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-black/30">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        {/* The visible slide loads EAGERLY — lazy-loading the thing the user is
            looking at makes every page-turn feel broken for a beat. */}
        <img
          key={current.src}
          src={current.src}
          alt={current.title}
          loading="eager"
          decoding="async"
          onError={() => setBroken((s) => new Set(s).add(current.src))}
          className="block w-full animate-[fadeIn_.35s_ease] bg-black/20"
        />
        {/* Warm the neighbours so paging is instant, without rendering them. */}
        <div aria-hidden className="hidden">
          {[usable[(idx + 1) % usable.length], usable[(idx - 1 + usable.length) % usable.length]]
            .filter((s) => s && s.src !== current.src)
            .map((s) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={s.src} src={s.src} alt="" aria-hidden />
            ))}
        </div>

        {usable.length > 1 && (
          <>
            <button
              onClick={() => go(-1)}
              aria-label="Previous screenshot"
              className="absolute left-2 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full border border-white/15 bg-black/70 text-white/80 opacity-0 transition-opacity hover:text-white group-hover:opacity-100 focus-visible:opacity-100"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={() => go(1)}
              aria-label="Next screenshot"
              className="absolute right-2 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full border border-white/15 bg-black/70 text-white/80 opacity-0 transition-opacity hover:text-white group-hover:opacity-100 focus-visible:opacity-100"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </>
        )}

        <button
          onClick={() => setZoom(true)}
          aria-label="View full size"
          className="absolute right-2 top-2 grid h-8 w-8 place-items-center rounded-lg border border-white/15 bg-black/70 text-white/70 opacity-0 transition-opacity hover:text-white group-hover:opacity-100 focus-visible:opacity-100"
        >
          <Maximize2 className="h-3.5 w-3.5" />
        </button>

        <span className="mono absolute bottom-2 right-2 rounded-full border border-white/15 bg-black/70 px-2 py-0.5 text-[10px] text-white/70">
          {idx + 1} / {usable.length}
        </span>
      </div>

      {/* caption — the screenshot is the evidence, this is the claim */}
      <div className="mt-3">
        <div className="text-sm font-semibold text-white/90">{current.title}</div>
        <p className="mt-1 text-[13px] leading-relaxed text-fg-muted">{current.caption}</p>
      </div>

      {/* pager */}
      {usable.length > 1 && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {usable.map((s, n) => (
            <button
              key={s.src}
              onClick={() => setI(n)}
              aria-label={`Show ${s.title}`}
              aria-current={n === idx}
              className={cn(
                "mono rounded-full border px-2.5 py-1 text-[10px] transition-colors",
                n === idx
                  ? "border-accent/60 bg-accent/15 text-accent"
                  : "border-white/10 text-fg-faint hover:border-white/25 hover:text-white/70",
              )}
            >
              {s.title}
            </button>
          ))}
        </div>
      )}

      {/* lightbox — dense tool UI is unreadable at card width */}
      {zoom && (
        <div
          onClick={() => setZoom(false)}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
        >
          <button
            aria-label="Close"
            className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full border border-white/15 bg-black/70 text-white/80 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={current.src}
            alt={current.title}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[90vh] max-w-[95vw] rounded-lg border border-white/10"
          />
        </div>
      )}
    </div>
  );
}
