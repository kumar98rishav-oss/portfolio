"use client";

import { useEffect, useRef } from "react";

/**
 * Interactive node-connection canvas — the "data / AI" motif.
 * Nodes drift slowly and link when close; the cursor gently attracts
 * nearby nodes and brightens their links.
 *
 * Perf notes: colors are read from CSS ONCE per setup (never per frame),
 * pair distances compare squared values and only sqrt for linked pairs,
 * per-node cursor distance is computed once per frame, and the rAF loop
 * pauses entirely when the canvas is off-screen or reduced-motion is set.
 */
export function ParticleField({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const el = canvasRef.current;
    if (!el) return;
    const context = el.getContext("2d");
    if (!context) return;
    // Non-null-typed bindings so hoisted inner functions keep the narrowing.
    const canvas: HTMLCanvasElement = el;
    const ctx: CanvasRenderingContext2D = context;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Read the accent token once — it is identical in both themes.
    const accentRaw = getComputedStyle(document.documentElement)
      .getPropertyValue("--accent")
      .trim()
      .split(/\s+/)
      .join(",");
    const DOT_FILL = `rgba(${accentRaw},0.9)`;
    const LINE_STROKE = `rgb(${accentRaw})`;

    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    const mouse = { x: -9999, y: -9999 };

    type Node = { x: number; y: number; vx: number; vy: number };
    let nodes: Node[] = [];
    let nearMouse: boolean[] = [];

    const LINK_DIST = 130;
    const LINK_DIST2 = LINK_DIST * LINK_DIST;
    const MOUSE_DIST = 160;

    function resize() {
      const parent = canvas.parentElement;
      if (!parent) return;
      width = parent.clientWidth;
      height = parent.clientHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Density scales with area but stays capped for performance.
      const count = Math.min(90, Math.floor((width * height) / 16000));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
      }));
      nearMouse = new Array(count).fill(false);
    }

    function frame() {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = DOT_FILL;
      ctx.strokeStyle = LINE_STROKE;

      // Pass 1: integrate motion + cursor proximity, draw dots.
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        const dxm = mouse.x - n.x;
        const dym = mouse.y - n.y;
        const distM = Math.hypot(dxm, dym);
        nearMouse[i] = distM < MOUSE_DIST;
        if (nearMouse[i] && distM > 0.001) {
          n.vx += (dxm / distM) * 0.015;
          n.vy += (dym / distM) * 0.015;
        }

        n.x += n.vx;
        n.y += n.vy;
        n.vx *= 0.99;
        n.vy *= 0.99;

        if (n.x < 0) n.x = width;
        if (n.x > width) n.x = 0;
        if (n.y < 0) n.y = height;
        if (n.y > height) n.y = 0;

        ctx.beginPath();
        ctx.arc(n.x, n.y, 1.6, 0, Math.PI * 2);
        ctx.fill();
      }

      // Pass 2: links (squared-distance early exit; sqrt only when linked).
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const m = nodes[j];
          const dx = n.x - m.x;
          const dy = n.y - m.y;
          const d2 = dx * dx + dy * dy;
          if (d2 >= LINK_DIST2) continue;
          const dist = Math.sqrt(d2);
          const near = nearMouse[i] || nearMouse[j];
          ctx.beginPath();
          ctx.moveTo(n.x, n.y);
          ctx.lineTo(m.x, m.y);
          ctx.globalAlpha = (1 - dist / LINK_DIST) * (near ? 0.5 : 0.16);
          ctx.lineWidth = near ? 0.9 : 0.6;
          ctx.stroke();
        }
      }
      ctx.globalAlpha = 1;

      raf = requestAnimationFrame(frame);
    }

    let raf = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        cancelAnimationFrame(raf);
        if (entry.isIntersecting && !reduce) {
          raf = requestAnimationFrame(frame);
        }
      },
      { threshold: 0 }
    );

    function onMove(e: PointerEvent) {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    }
    function onLeave() {
      mouse.x = -9999;
      mouse.y = -9999;
    }

    resize();
    io.observe(canvas);
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerleave", onLeave);

    if (reduce) {
      // Draw a single static frame.
      frame();
      cancelAnimationFrame(raf);
    }

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return <canvas ref={canvasRef} className={className} aria-hidden />;
}
