"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";
import { cn, r2 } from "@/lib/utils";

type Interest = { key: string; label: string; detail: string; where: string };

/** Node geometry in a 480×460 viewBox. `path` is the orthogonal connector from the core chip to the node. */
const LAYOUT = [
  { x: 22, y: 62, w: 136, path: "M222 196 V81 H158" },
  { x: 318, y: 90, w: 140, path: "M258 196 V109 H318" },
  { x: 330, y: 284, w: 146, path: "M276 252 H306 V303 H330" },
  { x: 172, y: 392, w: 136, path: "M240 276 V392" },
  { x: 4, y: 290, w: 146, path: "M204 252 H176 V309 H150" },
];

export function HeroSystem({ interests }: { interests: Interest[] }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();
  const nodes = interests.slice(0, LAYOUT.length);

  useEffect(() => {
    if (paused || reduce) return;
    const t = setInterval(() => setActive((a) => (a + 1) % nodes.length), 3600);
    return () => clearInterval(t);
  }, [paused, reduce, nodes.length]);

  const current = nodes[active];

  return (
    <div
      className="relative"
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <svg viewBox="0 0 480 460" className="w-full" aria-hidden="true">
        {/* Rings */}
        <circle cx="240" cy="236" r="150" fill="none" stroke="rgb(232 238 244 / 0.06)" />
        <circle cx="240" cy="236" r="104" fill="none" stroke="rgb(232 238 244 / 0.07)" strokeDasharray="2 7" />
        {Array.from({ length: 36 }, (_, i) => {
          const t = (i / 36) * Math.PI * 2;
          const long = i % 9 === 0;
          return (
            <line
              key={i}
              x1={r2(240 + Math.cos(t) * 150)}
              y1={r2(236 + Math.sin(t) * 150)}
              x2={r2(240 + Math.cos(t) * (long ? 141 : 146))}
              y2={r2(236 + Math.sin(t) * (long ? 141 : 146))}
              stroke={long ? "rgb(140 228 214 / 0.45)" : "rgb(232 238 244 / 0.12)"}
            />
          );
        })}

        {/* Connectors */}
        {nodes.map((n, i) => (
          <g key={n.key}>
            <path d={LAYOUT[i].path} fill="none" stroke="rgb(232 238 244 / 0.12)" strokeWidth="1" />
            <path
              d={LAYOUT[i].path}
              fill="none"
              stroke="var(--color-signal)"
              strokeWidth="1.5"
              className={cn("flow-line transition-opacity duration-500", i === active ? "animate-dash opacity-100" : "opacity-0")}
            />
          </g>
        ))}

        {/* Core */}
        <g>
          <rect x="196" y="196" width="88" height="80" rx="14" fill="#0e151e" stroke="rgb(140 228 214 / 0.45)" />
          <rect x="190" y="190" width="100" height="92" rx="18" fill="none" stroke="rgb(140 228 214 / 0.12)" />
          <g transform="translate(220 216) scale(1)">
            <path d="M18 11H8.5v9H18v9H8.5" fill="none" stroke="var(--color-signal)" strokeWidth="2.4" strokeLinecap="square" />
            <path d="M31.5 11H22v9h9.5v9H22" fill="none" stroke="var(--color-signal)" strokeWidth="2.4" strokeLinecap="square" />
          </g>
          {[
            [196, 216],
            [196, 256],
            [284, 216],
            [284, 256],
          ].map(([x, y]) => (
            <line key={`${x}-${y}`} x1={x === 196 ? x - 6 : x} y1={y} x2={x === 196 ? x : x + 6} y2={y} stroke="rgb(232 238 244 / 0.25)" />
          ))}
        </g>

        {/* Nodes */}
        {nodes.map((n, i) => {
          const g = LAYOUT[i];
          const on = i === active;
          return (
            <g
              key={n.key}
              onPointerEnter={() => setActive(i)}
              className="cursor-pointer"
              style={{ transition: "opacity 300ms" }}
            >
              <rect
                x={g.x}
                y={g.y}
                width={g.w}
                height="38"
                rx="9"
                fill={on ? "rgb(140 228 214 / 0.08)" : "#0e151e"}
                stroke={on ? "rgb(140 228 214 / 0.7)" : "rgb(232 238 244 / 0.13)"}
                style={{ transition: "all 300ms" }}
              />
              <text x={g.x + 12} y={g.y + 23.5} fontFamily="var(--font-mono)" fontSize="11" fill={on ? "#8ce4d6" : "#74849a"}>
                {String(i + 1).padStart(2, "0")}
              </text>
              <text
                x={g.x + 34}
                y={g.y + 24}
                fontFamily="var(--font-mono)"
                fontSize="12.5"
                letterSpacing="0.06em"
                fill={on ? "#e8eef4" : "#91a0b2"}
                style={{ textTransform: "uppercase", transition: "fill 300ms" }}
              >
                {n.label}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Caption + accessible selector */}
      <div className="mt-2 rounded-xl border border-line bg-surface/70 p-4 backdrop-blur">
        <div className="flex items-center justify-between gap-3">
          <p className="label-mono text-faint">
            <span className="text-signal">{String(active + 1).padStart(2, "0")}</span> / Area of work
          </p>
          <div role="group" aria-label="Areas of work" className="flex gap-1">
            {nodes.map((n, i) => (
              <button
                key={n.key}
                type="button"
                aria-label={n.label}
                aria-pressed={i === active}
                onClick={() => setActive(i)}
                className="group/dot flex size-6 items-center justify-center rounded-full"
              >
                <span
                  className={cn(
                    "h-1.5 rounded-full transition-all duration-300",
                    i === active ? "w-4 bg-signal" : "w-1.5 bg-line-strong group-hover/dot:bg-muted",
                  )}
                />
              </button>
            ))}
          </div>
        </div>
        <p className="mt-3 text-[0.95rem] font-medium text-fg">{current.detail}</p>
        <p className="mt-1 font-mono text-xs text-muted">
          <span className="text-faint">↳ </span>
          {current.where}
        </p>
      </div>
    </div>
  );
}
