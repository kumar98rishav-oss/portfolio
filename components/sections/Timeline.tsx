"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useInView } from "framer-motion";
import type { TimelineItem } from "@/lib/data";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";

type Props = {
  id: string;
  kicker: string;
  title: string;
  description?: string;
  items: TimelineItem[];
};

export function Timeline({ id, kicker, title, description, items }: Props) {
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start 60%", "end 60%"],
  });
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.5 });

  return (
    <section id={id} className="mx-auto max-w-5xl scroll-mt-24 px-6 py-24 md:py-28">
      <SectionHeading kicker={kicker} title={title} description={description} />

      <div ref={trackRef} className="relative mt-14 pl-2">
        {/* Rail */}
        <div className="absolute bottom-0 left-[13px] top-2 w-px bg-white/10 md:left-1/2" />
        {/* Animated glowing fill */}
        <motion.div
          style={{ scaleY: fill }}
          className="absolute bottom-0 left-[13px] top-2 w-px origin-top bg-gradient-to-b from-accent via-accent-2 to-accent-3 shadow-[0_0_12px_2px_rgb(var(--accent)/0.6)] md:left-1/2"
        />

        <div className="space-y-10 md:space-y-4">
          {items.map((item, i) => (
            <TimelineRow key={item.id} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TimelineRow({ item, index }: { item: TimelineItem; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-45% 0px -45% 0px" });
  const isLeft = index % 2 === 0;

  return (
    <div
      ref={ref}
      className={cn(
        "relative flex md:items-center",
        isLeft ? "md:flex-row" : "md:flex-row-reverse"
      )}
    >
      {/* Node */}
      <span className="absolute left-[13px] top-2 z-10 -translate-x-1/2 md:left-1/2 md:top-1/2 md:-translate-y-1/2">
        <span
          className={cn(
            "grid h-6 w-6 place-items-center rounded-full border transition-all duration-500",
            inView
              ? "border-accent bg-accent/20 shadow-[0_0_16px_3px_rgb(var(--accent)/0.55)]"
              : "border-white/20 bg-bg"
          )}
        >
          <span
            className={cn(
              "h-2 w-2 rounded-full transition-colors duration-500",
              inView ? "bg-accent" : "bg-white/30"
            )}
          />
        </span>
      </span>

      {/* Spacer for the opposite column on desktop */}
      <div className="hidden md:block md:w-1/2" />

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          "ml-10 md:ml-0 md:w-1/2",
          isLeft ? "md:pr-12 md:text-right" : "md:pl-12"
        )}
      >
        <div className="glass gradient-border rounded-2xl p-5">
          <span className="mono text-xs text-accent">{item.period}</span>
          <h3 className="mt-1.5 text-lg font-semibold tracking-tight">{item.title}</h3>
          <p className="text-sm text-fg-muted">
            {item.org}
            {item.location ? ` · ${item.location}` : ""}
          </p>
          <p className="mt-3 text-sm leading-relaxed text-fg-muted">{item.description}</p>
          <div
            className={cn(
              "mt-4 flex flex-wrap gap-1.5",
              isLeft ? "md:justify-end" : "md:justify-start"
            )}
          >
            {item.tags.map((t) => (
              <span
                key={t}
                className="mono rounded-md border border-white/10 bg-white/[0.02] px-2 py-0.5 text-[11px] text-fg-muted"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
