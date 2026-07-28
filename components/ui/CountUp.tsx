"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { easeOutExpo } from "@/lib/utils";

type Props = {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
};

/** Animates a number from 0 to `value` once it scrolls into view. */
export function CountUp({ value, prefix = "", suffix = "", duration = 1.6, className }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setDisplay(value);
      return;
    }
    let raf = 0;
    let start: number | null = null;
    const ease = (t: number) => 1 - Math.pow(1 - t, 3); // easeOutCubic-ish
    void easeOutExpo; // shared preset kept for parity across the codebase

    const tick = (now: number) => {
      if (start === null) start = now;
      const progress = Math.min((now - start) / (duration * 1000), 1);
      setDisplay(Math.round(ease(progress) * value));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, duration, reduce]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display.toLocaleString()}
      {suffix}
    </span>
  );
}
