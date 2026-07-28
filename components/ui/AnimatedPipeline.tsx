"use client";

import {
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * A living dataflow diagram. Renders a project's pipeline steps as connected
 * nodes in a 2-row serpentine, with:
 *   - connector lines whose dashes continuously "flow" toward the next stage
 *   - glowing pulse dots that travel along each connector in a cascading wave
 *   - each node lighting up in sequence
 * Pure inline SVG + CSS (+ SMIL for the traveling dots). Loops seamlessly.
 *
 * Perf: every animation is gated on an IntersectionObserver — an off-screen
 * pipeline renders as a static diagram and costs nothing. Reduced-motion
 * users always get the static diagram.
 */

const NODE_W = 152;
const NODE_H = 50;
const GAP_X = 46;
const GAP_Y = 46;
const PAD = 18;

type Node = { x: number; y: number; cx: number; cy: number; label: string };
type Connector = { d: string };

function computeLayout(steps: string[]) {
  const n = steps.length;
  const perRow = Math.max(1, Math.ceil(n / 2));
  const stepX = NODE_W + GAP_X;
  const stepY = NODE_H + GAP_Y;
  const rows = n > perRow ? 2 : 1;

  const nodes: Node[] = steps.map((label, i) => {
    const row = i < perRow ? 0 : 1;
    const jr = i - row * perRow;
    const col = row === 0 ? jr : perRow - 1 - jr; // snake on the 2nd row
    const x = PAD + col * stepX;
    const y = PAD + row * stepY;
    return { x, y, cx: x + NODE_W / 2, cy: y + NODE_H / 2, label };
  });

  const connectors: Connector[] = [];
  for (let i = 0; i < n - 1; i++) {
    const a = nodes[i];
    const b = nodes[i + 1];
    if (a.y === b.y) {
      const rightward = b.x > a.x;
      const sx = rightward ? a.x + NODE_W : a.x;
      const ex = rightward ? b.x : b.x + NODE_W;
      connectors.push({ d: `M ${sx} ${a.cy} L ${ex} ${b.cy}` });
    } else {
      connectors.push({ d: `M ${a.cx} ${a.y + NODE_H} L ${b.cx} ${b.y}` });
    }
  }

  const width = PAD * 2 + perRow * NODE_W + (perRow - 1) * GAP_X;
  const height = PAD * 2 + rows * NODE_H + (rows - 1) * GAP_Y;
  return { nodes, connectors, width, height };
}

type Props = {
  steps: string[];
  className?: string;
  /** rgb triplet for the flow accent, e.g. "34 211 238". Defaults to --accent. */
  accent?: string;
};

export function AnimatedPipeline({ steps, className, accent }: Props) {
  const reduce = useReducedMotion();
  const svgRef = useRef<SVGSVGElement>(null);
  const [inView, setInView] = useState(false);
  const rawId = useId();
  const uid = rawId.replace(/:/g, "");
  const { nodes, connectors, width, height } = useMemo(
    () => computeLayout(steps),
    [steps]
  );

  useEffect(() => {
    const el = svgRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: "80px", threshold: 0 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const run = !reduce && inView;
  const cycle = Math.max(3.6, steps.length * 0.7); // node-glow wave period
  const accentStyle = accent
    ? ({ ["--pipe-accent"]: accent } as CSSProperties)
    : undefined;

  return (
    <svg
      ref={svgRef}
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="xMidYMid meet"
      className={cn("pipe-svg", className)}
      style={accentStyle}
      role="img"
      aria-label={`Pipeline: ${steps.join(" → ")}`}
    >
      <defs>
        <marker
          id={`arw-${uid}`}
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto-start-reverse"
        >
          <path d="M 0 1 L 9 5 L 0 9" className="pipe-arrow" />
        </marker>
      </defs>

      {/* Connectors */}
      {connectors.map((c, i) => (
        <path
          key={`c-${i}`}
          d={c.d}
          className={cn("pipe-line", run && "flow")}
          markerEnd={`url(#arw-${uid})`}
        />
      ))}

      {/* Traveling pulse dots (cascading wave) — mounted only while visible */}
      {run &&
        connectors.map((c, i) => (
          <circle key={`p-${i}`} r="3.4" className="pipe-dot">
            <animateMotion
              dur="1.15s"
              begin={`${i * 0.2}s`}
              repeatCount="indefinite"
              path={c.d}
              keyPoints="0;1"
              keyTimes="0;1"
              calcMode="linear"
            />
          </circle>
        ))}

      {/* Nodes */}
      {nodes.map((node, i) => (
        <foreignObject key={`n-${i}`} x={node.x} y={node.y} width={NODE_W} height={NODE_H}>
          <div
            className={cn("pipe-node", run && "animate")}
            style={
              {
                animationDelay: `${(i / steps.length) * cycle}s`,
                ["--pipe-cycle"]: `${cycle}s`,
              } as CSSProperties
            }
          >
            <span>{node.label}</span>
          </div>
        </foreignObject>
      ))}
    </svg>
  );
}
