"use client";

/**
 * A GitHub-style contribution heatmap with a DETERMINISTIC pattern
 * (seeded, no Math.random) so server and client render identically —
 * no hydration mismatch. Swap for real API data whenever you like.
 */
const WEEKS = 52;
const DAYS = 7;

// Simple deterministic hash → 0..4 intensity bucket.
function level(week: number, day: number) {
  const seed = (week * 7 + day) * 2654435761;
  const v = ((seed ^ (seed >>> 15)) >>> 0) % 100;
  if (v < 45) return 0;
  if (v < 65) return 1;
  if (v < 82) return 2;
  if (v < 94) return 3;
  return 4;
}

const INTENSITY = [
  "bg-white/[0.04]",
  "bg-accent/25",
  "bg-accent/45",
  "bg-accent/70",
  "bg-accent",
];

export function ContributionGraph() {
  return (
    <div className="inline-flex flex-col gap-2">
      <div className="flex gap-[3px]">
        {Array.from({ length: WEEKS }).map((_, w) => (
          <div key={w} className="flex flex-col gap-[3px]">
            {Array.from({ length: DAYS }).map((_, d) => (
              <span
                key={d}
                className={`h-[10px] w-[10px] rounded-[2px] ${INTENSITY[level(w, d)]}`}
                title={`${level(w, d) * 3} contributions`}
              />
            ))}
          </div>
        ))}
      </div>
      <div className="mono flex items-center gap-1.5 self-end text-[10px] text-fg-faint">
        Less
        {INTENSITY.map((c, i) => (
          <span key={i} className={`h-[10px] w-[10px] rounded-[2px] ${c}`} />
        ))}
        More
      </div>
    </div>
  );
}
