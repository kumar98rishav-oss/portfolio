"use client";

import { Reveal } from "./Reveal";
import { cn } from "@/lib/utils";

type Props = {
  kicker: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeading({ kicker, title, description, align = "left", className }: Props) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" && "items-center text-center",
        className
      )}
    >
      <Reveal>
        <span className="mono inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs uppercase tracking-[0.2em] text-fg-muted">
          <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_10px_2px_rgb(var(--accent))]" />
          {kicker}
        </span>
      </Reveal>
      <Reveal delay={0.05}>
        <h2 className="max-w-3xl text-balance text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
          {title}
        </h2>
      </Reveal>
      {description && (
        <Reveal delay={0.1}>
          <p className={cn("max-w-2xl text-base leading-relaxed text-fg-muted", align === "center" && "mx-auto")}>
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
}
