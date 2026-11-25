"use client";

import { useRef, type CSSProperties, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Wraps a card and feeds the pointer position into CSS (--mx / --my) so the
 * `.spotlight` pseudo-element can draw a soft highlight under the cursor.
 * CSS does the drawing; this only updates two custom properties.
 */
export function Spotlight({ children, className, rgb }: { children: ReactNode; className?: string; rgb?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div
      ref={ref}
      className={cn("spotlight", className)}
      style={rgb ? ({ "--spot": rgb } as CSSProperties) : undefined}
      onPointerMove={(e) => {
        const el = ref.current;
        if (!el || e.pointerType !== "mouse") return;
        const r = el.getBoundingClientRect();
        el.style.setProperty("--mx", `${e.clientX - r.left}px`);
        el.style.setProperty("--my", `${e.clientY - r.top}px`);
      }}
    >
      {children}
    </div>
  );
}
