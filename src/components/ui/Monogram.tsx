import { cn } from "@/lib/utils";

/**
 * "SS" monogram: two angular S-traces inside a chip outline with a cut corner,
 * terminated by small nodes — like a routed circuit trace.
 */
export function Monogram({ className, title }: { className?: string; title?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      className={cn("shrink-0", className)}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      <path d="M1 7.5 7.5 1H39v31.5L32.5 39H1V7.5Z" stroke="currentColor" strokeOpacity="0.28" strokeWidth="1.25" />
      <g stroke="var(--color-signal)" strokeWidth="2.4" strokeLinecap="square" strokeLinejoin="miter">
        <path d="M18 11H8.5v9H18v9H8.5" />
        <path d="M31.5 11H22v9h9.5v9H22" />
      </g>
      <circle cx="18" cy="11" r="1.9" fill="var(--color-canvas)" stroke="var(--color-signal)" strokeWidth="1.4" />
      <circle cx="22" cy="29" r="1.9" fill="var(--color-canvas)" stroke="var(--color-pulse)" strokeWidth="1.4" />
    </svg>
  );
}
