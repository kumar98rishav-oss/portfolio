"use client";

import { cn } from "@/lib/utils";

/**
 * Slow-moving mesh-gradient aurora. Three large blurred blobs in the accent
 * trio rotate/drift on a long loop. Pure CSS (keyframe `aurora`), GPU-friendly.
 */
export function AuroraMesh({ className }: { className?: string }) {
  return (
    <div className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)} aria-hidden>
      <div
        className="absolute left-1/2 top-[-10%] h-[60vmax] w-[60vmax] -translate-x-1/2 rounded-full opacity-[0.22] blur-[100px]"
        style={{
          background:
            "conic-gradient(from 90deg, rgb(var(--accent)), rgb(var(--accent-2)), rgb(var(--accent-3)), rgb(var(--accent)))",
          animation: "aurora 26s linear infinite",
          willChange: "transform",
        }}
      />
      <div
        className="absolute right-[-10%] top-[20%] h-[40vmax] w-[40vmax] rounded-full opacity-[0.16] blur-[90px]"
        style={{
          background: "radial-gradient(circle, rgb(var(--accent-3)), transparent 60%)",
          animation: "aurora 34s linear infinite reverse",
          willChange: "transform",
        }}
      />
      <div
        className="absolute left-[-5%] top-[35%] h-[36vmax] w-[36vmax] rounded-full opacity-[0.14] blur-[90px]"
        style={{
          background: "radial-gradient(circle, rgb(var(--accent-2)), transparent 60%)",
          animation: "aurora 30s linear infinite",
          willChange: "transform",
        }}
      />
    </div>
  );
}
