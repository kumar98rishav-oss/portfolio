"use client";

import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { useRef, type ReactNode, type MouseEvent } from "react";
import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "ghost";
  className?: string;
  strength?: number;
};

/**
 * Magnetic button — the whole element drifts toward the cursor, with a
 * glowing drop-shadow. Falls back to a static button when reduced-motion is on.
 */
export function MagneticButton({
  children,
  href,
  onClick,
  variant = "primary",
  className,
  strength = 0.35,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 16, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 16, mass: 0.4 });

  function handleMove(e: MouseEvent<HTMLDivElement>) {
    if (reduce || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    x.set(relX * strength);
    y.set(relY * strength);
  }
  function reset() {
    x.set(0);
    y.set(0);
  }

  const base =
    "relative inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-colors duration-300 select-none";
  const styles =
    variant === "primary"
      ? "text-black bg-white hover:shadow-[0_10px_40px_-6px_rgb(var(--accent)/0.7)]"
      : "text-fg border border-white/12 bg-white/[0.03] hover:bg-white/[0.06] hover:border-white/20";

  const inner = (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{ x: sx, y: sy }}
      whileTap={{ scale: 0.97 }}
      className="inline-flex"
    >
      <span className={cn(base, styles, className)}>
        {variant === "primary" && (
          <span className="pointer-events-none absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-accent/0 via-accent/20 to-accent-2/0 opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100" />
        )}
        {children}
      </span>
    </motion.div>
  );

  if (href) {
    return (
      <a href={href} className="group inline-flex" target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
        {inner}
      </a>
    );
  }
  return (
    <button type="button" onClick={onClick} className="group inline-flex">
      {inner}
    </button>
  );
}
