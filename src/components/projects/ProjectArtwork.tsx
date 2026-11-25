import type { Accent, Project } from "@/content/types";
import { accentRgb, cn, r2 } from "@/lib/utils";

/**
 * Abstract, per-project artwork. Pure SVG — no images to load. Each motif
 * hints at the project's domain without pretending to be a screenshot.
 */
export function ProjectArtwork({
  variant,
  accent,
  className,
  animated = true,
}: {
  variant: Project["artwork"];
  accent: Accent;
  className?: string;
  animated?: boolean;
}) {
  const rgb = accentRgb[accent];
  const a = (o: number) => `rgb(${rgb} / ${o})`;
  const flow = animated ? "flow-line animate-dash" : "flow-line";

  return (
    <svg viewBox="0 0 400 260" className={cn("h-full w-full", className)} aria-hidden="true" preserveAspectRatio="xMidYMid slice">
      <defs>
        <radialGradient id={`glow-${variant}`} cx="30%" cy="30%" r="80%">
          <stop offset="0" stopColor={a(0.16)} />
          <stop offset="1" stopColor={a(0)} />
        </radialGradient>
        <pattern id={`grid-${variant}`} width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M20 0H0V20" fill="none" stroke="rgb(232 238 244 / 0.05)" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="400" height="260" fill={`url(#grid-${variant})`} />
      <rect width="400" height="260" fill={`url(#glow-${variant})`} />

      {variant === "solar" && (
        <g fill="none">
          <circle cx="112" cy="96" r="78" stroke={a(0.1)} />
          <circle cx="112" cy="96" r="56" stroke={a(0.22)} strokeDasharray="2 6" />
          <circle cx="112" cy="96" r="32" fill={a(0.14)} stroke={a(0.85)} strokeWidth="1.5" />
          <circle cx="112" cy="96" r="12" fill={a(0.55)} />
          {Array.from({ length: 12 }, (_, i) => {
            const t = (i / 12) * Math.PI * 2;
            return (
              <line
                key={i}
                x1={r2(112 + Math.cos(t) * 39)}
                y1={r2(96 + Math.sin(t) * 39)}
                x2={r2(112 + Math.cos(t) * 46)}
                y2={r2(96 + Math.sin(t) * 46)}
                stroke={a(0.7)}
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            );
          })}
          <path d="M138 118 C 160 150, 178 160, 186 186" stroke={a(0.8)} strokeWidth="1.5" className={flow} />
          <path d="M150 100 C 230 104, 290 130, 318 186" stroke={a(0.35)} strokeWidth="1.25" className={flow} />
          {[172, 218, 264, 310, 356].map((x, i) => (
            <g key={x}>
              {i > 0 && <line x1={x - 18} y1="200" x2={x - 14} y2="200" stroke={a(0.6)} strokeWidth="1.5" />}
              <rect
                x={x - 14}
                y="186"
                width="28"
                height="28"
                rx="5"
                fill={i === 0 || i === 3 ? a(0.22) : "rgb(14 21 30)"}
                stroke={a(i === 0 || i === 3 ? 0.9 : 0.45)}
                strokeWidth="1.25"
              />
              <rect x={x - 6} y="194" width="12" height="12" rx="2" stroke={a(0.35)} />
            </g>
          ))}
        </g>
      )}

      {variant === "parking" && (
        <g fill="none">
          {[0, 1].map((row) =>
            Array.from({ length: 7 }, (_, i) => {
              const x = 46 + i * 46;
              const y = row === 0 ? 34 : 160;
              const occupied = (row === 0 && [0, 2, 3, 6].includes(i)) || (row === 1 && [1, 2, 5].includes(i));
              const target = row === 1 && i === 4;
              return (
                <g key={`${row}-${i}`}>
                  <line x1={x} y1={y} x2={x} y2={y + 66} stroke="rgb(232 238 244 / 0.16)" />
                  {i === 6 && <line x1={x + 46} y1={y} x2={x + 46} y2={y + 66} stroke="rgb(232 238 244 / 0.16)" />}
                  {occupied && <rect x={x + 10} y={y + 12} width="26" height="42" rx="6" fill={a(0.16)} stroke={a(0.5)} />}
                  {target && (
                    <>
                      <rect x={x + 5} y={y + 5} width="36" height="56" rx="5" stroke={a(0.95)} strokeDasharray="3 4" strokeWidth="1.5" />
                      <text
                        x={x + 23}
                        y={y + 39}
                        textAnchor="middle"
                        fill={a(0.95)}
                        fontFamily="ui-monospace, monospace"
                        fontSize="16"
                        fontWeight="600"
                      >
                        P
                      </text>
                    </>
                  )}
                </g>
              );
            }),
          )}
          <line x1="30" y1="130" x2="370" y2="130" stroke="rgb(232 238 244 / 0.08)" strokeDasharray="10 8" />
          <path d="M20 128 H 222 Q 230 128 230 140 V 168" stroke={a(0.85)} strokeWidth="1.5" className={flow} />
          <circle cx="20" cy="128" r="4" fill={a(0.9)} />
        </g>
      )}

      {variant === "medical" && (
        <g fill="none">
          <rect x="40" y="34" width="320" height="192" rx="12" fill="rgb(14 21 30 / 0.7)" stroke="rgb(232 238 244 / 0.12)" />
          <line x1="40" y1="62" x2="360" y2="62" stroke="rgb(232 238 244 / 0.08)" />
          {[56, 68, 80].map((x) => (
            <circle key={x} cx={x} cy="48" r="3" fill="rgb(232 238 244 / 0.14)" />
          ))}
          <rect x="60" y="80" width="40" height="40" rx="9" fill={a(0.14)} stroke={a(0.7)} />
          <path d="M80 89v22M69 100h22" stroke={a(0.95)} strokeWidth="3" strokeLinecap="round" />
          {[0, 1, 2].map((i) => (
            <rect key={i} x="114" y={84 + i * 12} width={[120, 84, 100][i]} height="5" rx="2.5" fill="rgb(232 238 244 / 0.1)" />
          ))}
          <path
            d="M60 166 H128 L140 140 L154 194 L168 120 L182 166 H226 L234 154 L242 166 H340"
            stroke={a(0.85)}
            strokeWidth="1.75"
            strokeLinejoin="round"
          />
          {[0, 1, 2, 3, 4].map((i) => (
            <rect key={i} x={262 + i * 16} y={210 - [22, 36, 28, 46, 32][i]} width="9" height={[22, 36, 28, 46, 32][i]} rx="2" fill={a(i === 3 ? 0.6 : 0.22)} />
          ))}
          <line x1="256" y1="210" x2="340" y2="210" stroke="rgb(232 238 244 / 0.12)" />
        </g>
      )}

      {variant === "family" && (
        <g fill="none">
          <ellipse cx="200" cy="132" rx="150" ry="78" stroke="rgb(232 238 244 / 0.1)" />
          <ellipse cx="200" cy="132" rx="100" ry="50" stroke={a(0.2)} strokeDasharray="2 6" />
          {[
            [62, 118, "pulse"],
            [150, 60, "signal"],
            [292, 70, "pulse"],
            [336, 160, "signal"],
            [176, 206, "pulse"],
          ].map(([x, y, tone], i) => {
            const col = tone === "pulse" ? "168 154 247" : "140 228 214";
            return (
              <g key={i}>
                <line x1="200" y1="132" x2={x as number} y2={y as number} stroke={`rgb(${col} / 0.35)`} strokeDasharray="3 5" className={animated ? "animate-dash" : undefined} />
                <circle cx={x as number} cy={y as number} r="13" fill="rgb(14 21 30)" stroke={`rgb(${col} / 0.8)`} strokeWidth="1.25" />
                <circle cx={x as number} cy={(y as number) - 3} r="3.5" fill={`rgb(${col} / 0.8)`} />
                <path d={`M${(x as number) - 6} ${(y as number) + 7} q6 -8 12 0`} stroke={`rgb(${col} / 0.8)`} strokeWidth="1.25" />
              </g>
            );
          })}
          <rect x="174" y="106" width="52" height="52" rx="12" fill={a(0.12)} stroke={a(0.85)} strokeWidth="1.25" />
          <path d="M186 136 L200 122 L214 136 M190 133 V146 H210 V133" stroke={a(0.95)} strokeWidth="1.75" strokeLinejoin="round" strokeLinecap="round" />
        </g>
      )}
    </svg>
  );
}
