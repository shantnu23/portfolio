import { Bell, CalendarDays, Check, MapPin, Phone as PhoneIcon, Plane } from "lucide-react";
import type { ReactNode } from "react";

/**
 * Conceptual interface sketch for Fam_Sync. Deliberately low-fidelity and
 * clearly labelled — it illustrates an idea, not a built product.
 */
export function FamSyncConcept() {
  return (
    <figure>
      <p className="sr-only">
        Concept sketch of two app screens: a “Today” view with family check-ins, a shared trip, a task list and reminders; and a
        “Family” view with shared locations, a shared calendar and emergency contacts.
      </p>
      <div className="card bg-dots relative overflow-hidden px-4 pt-14 pb-10 sm:px-10">
        <span className="label-mono absolute top-4 left-4 rounded-full border border-pulse/40 bg-canvas/90 px-2.5 py-1 !text-[0.6rem] text-pulse">
          Concept · not a product screenshot
        </span>
        <div className="flex flex-col items-center justify-center gap-8 sm:flex-row sm:items-start">
          <PhoneFrame title="Today">
            <Row icon={<Check className="size-3.5" />} tone="signal" title="Dad checked in" meta="Reached office" />
            <Row icon={<Plane className="size-3.5" />} tone="pulse" title="Trip · Saturday" meta="Itinerary shared with family" />
            <div className="rounded-lg border border-line bg-surface-2 p-3">
              <p className="label-mono !text-[0.55rem] text-faint">Tasks</p>
              {["Pick up groceries", "Book train tickets", "Pay electricity bill"].map((t, i) => (
                <p key={t} className="mt-2 flex items-center gap-2 text-[0.7rem] text-muted">
                  <span
                    className={`flex size-3.5 items-center justify-center rounded border ${
                      i === 0 ? "border-signal/60 bg-signal/15 text-signal" : "border-line-strong"
                    }`}
                  >
                    {i === 0 && <Check className="size-2.5" strokeWidth={3} />}
                  </span>
                  <span className={i === 0 ? "line-through opacity-60" : ""}>{t}</span>
                </p>
              ))}
            </div>
            <Row icon={<Bell className="size-3.5" />} tone="muted" title="Reminder" meta="Family dinner tonight" />
          </PhoneFrame>

          <PhoneFrame title="Family" className="sm:mt-12">
            <div className="relative h-36 overflow-hidden rounded-lg border border-line bg-surface-2">
              <svg viewBox="0 0 200 140" className="absolute inset-0 h-full w-full">
                <path d="M0 90 Q 50 70 100 85 T 200 70" stroke="rgb(232 238 244 / 0.08)" strokeWidth="10" fill="none" />
                <path d="M60 0 V140 M140 0 V140" stroke="rgb(232 238 244 / 0.05)" strokeWidth="6" />
                {(
                  [
                    [48, 52, "140 228 214"],
                    [128, 96, "168 154 247"],
                    [156, 40, "140 228 214"],
                  ] as const
                ).map(([x, y, c]) => (
                  <g key={x}>
                    <circle cx={x} cy={y} r="11" fill={`rgb(${c} / 0.12)`} />
                    <circle cx={x} cy={y} r="4.5" fill={`rgb(${c})`} />
                  </g>
                ))}
              </svg>
              <span className="absolute right-2 bottom-2 inline-flex items-center gap-1 rounded-full bg-canvas/80 px-2 py-0.5 text-[0.6rem] text-muted">
                <MapPin className="size-2.5" /> Shared locations
              </span>
            </div>
            <Row icon={<CalendarDays className="size-3.5" />} tone="signal" title="Shared calendar" meta="This week's plans" />
            <div className="rounded-lg border border-ember/30 bg-ember/[0.06] p-3">
              <p className="flex items-center gap-2 text-[0.7rem] font-medium text-fg">
                <PhoneIcon className="size-3.5 text-ember" /> Emergency contacts
              </p>
              <p className="mt-1 text-[0.65rem] text-muted">Always one tap away</p>
            </div>
          </PhoneFrame>
        </div>
      </div>
      <figcaption className="mt-3 font-mono text-xs text-faint">
        Illustrative concept only. Names, content and layout are placeholders for the idea.
      </figcaption>
    </figure>
  );
}

function PhoneFrame({ title, children, className = "" }: { title: string; children: ReactNode; className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`w-[220px] shrink-0 rounded-[2rem] border border-line-strong bg-canvas p-2.5 shadow-2xl shadow-black/50 ${className}`}
    >
      <div className="rounded-[1.5rem] border border-line bg-surface px-3.5 pt-3 pb-5">
        <div className="mx-auto h-1.5 w-14 rounded-full bg-line-strong" />
        <div className="mt-4 flex items-center justify-between">
          <p className="text-sm font-semibold text-fg">{title}</p>
          <div className="flex -space-x-1.5">
            {["140 228 214", "168 154 247", "233 196 138", "240 163 163"].map((c) => (
              <span key={c} className="size-5 rounded-full border-2 border-surface" style={{ background: `rgb(${c} / 0.7)` }} />
            ))}
          </div>
        </div>
        <div className="mt-4 space-y-2.5">{children}</div>
      </div>
    </div>
  );
}

function Row({ icon, title, meta, tone }: { icon: ReactNode; title: string; meta: string; tone: "signal" | "pulse" | "muted" }) {
  const toneCls = { signal: "text-signal bg-signal/10", pulse: "text-pulse bg-pulse/10", muted: "text-muted bg-white/5" }[tone];
  return (
    <div className="flex items-center gap-2.5 rounded-lg border border-line bg-surface-2 p-2.5">
      <span className={`flex size-7 shrink-0 items-center justify-center rounded-md ${toneCls}`}>{icon}</span>
      <span className="min-w-0">
        <span className="block truncate text-[0.72rem] font-medium text-fg">{title}</span>
        <span className="block truncate text-[0.62rem] text-muted">{meta}</span>
      </span>
    </div>
  );
}
