"use client";

import { m, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Fades content up the first time it scrolls into view.
 *
 * Fail-safe by design: content is fully visible in the server-rendered HTML
 * and is only hidden for the animation after hydration, and only if it is
 * still below the fold. Without JavaScript (or with reduced motion), nothing
 * is ever hidden.
 */
export function Reveal({
  children,
  delay = 0,
  className,
  y = 14,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  y?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const inView = useInView(ref, { once: true, margin: "0px 0px -40px 0px" });
  const [armed, setArmed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || reduce) return;
    // Only animate elements that start below the viewport.
    const below = el.getBoundingClientRect().top > window.innerHeight;
    if (below) setArmed(true);
  }, [reduce]);

  const hidden = armed && !inView;

  return (
    <m.div
      ref={ref}
      className={className}
      initial={false}
      animate={hidden ? { opacity: 0, y } : { opacity: 1, y: 0 }}
      transition={hidden ? { duration: 0 } : { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </m.div>
  );
}
