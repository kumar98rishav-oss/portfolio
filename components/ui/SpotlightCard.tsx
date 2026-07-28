"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { useRef, type ReactNode, type MouseEvent } from "react";
import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  className?: string;
  /** Enable the 3D hover tilt on top of the spotlight. */
  tilt?: boolean;
  tiltStrength?: number;
  spotlightColor?: string; // rgb triplet var name, e.g. "var(--accent)"
  as?: "div" | "article";
};

/**
 * Glass card with a spotlight that follows the cursor and an optional
 * subtle 3D tilt. The spotlight is a radial gradient driven by pointer
 * position; the tilt maps pointer offset to rotateX / rotateY.
 */
export function SpotlightCard({
  children,
  className,
  tilt = false,
  tiltStrength = 6,
  spotlightColor = "var(--accent)",
  as = "div",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  // Pointer position (0..1) for spotlight, centered offset for tilt.
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rx = useSpring(useMotionValue(0), { stiffness: 150, damping: 18 });
  const ry = useSpring(useMotionValue(0), { stiffness: 150, damping: 18 });

  const spotlightX = useTransform(px, (v) => `${v * 100}%`);
  const spotlightY = useTransform(py, (v) => `${v * 100}%`);

  function handleMove(e: MouseEvent<HTMLDivElement>) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width;
    const ny = (e.clientY - rect.top) / rect.height;
    px.set(nx);
    py.set(ny);
    if (tilt && !reduce) {
      ry.set((nx - 0.5) * tiltStrength * 2);
      rx.set(-(ny - 0.5) * tiltStrength * 2);
    }
  }
  function reset() {
    rx.set(0);
    ry.set(0);
    px.set(0.5);
    py.set(0.5);
  }

  const MotionTag = as === "article" ? motion.article : motion.div;

  return (
    <MotionTag
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={
        tilt && !reduce
          ? { rotateX: rx, rotateY: ry, transformPerspective: 1000 }
          : undefined
      }
      className={cn(
        "group/spot relative overflow-hidden rounded-3xl glass gradient-border",
        "transition-shadow duration-500 will-change-transform",
        className
      )}
    >
      {/* Cursor spotlight / glare */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-300 group-hover/spot:opacity-100"
        style={{
          background: useTransform(
            [spotlightX, spotlightY],
            ([sx, sy]) =>
              `radial-gradient(360px circle at ${sx} ${sy}, rgb(${spotlightColor} / 0.14), transparent 60%)`
          ),
        }}
      />
      <div className="relative z-10 h-full">{children}</div>
    </MotionTag>
  );
}
