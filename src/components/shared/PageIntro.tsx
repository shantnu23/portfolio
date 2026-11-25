import type { ReactNode } from "react";

/** Header used by listing pages (/experience, /projects, /about). */
export function PageIntro({ label, title, lead, children }: { label: string; title: ReactNode; lead?: ReactNode; children?: ReactNode }) {
  return (
    <header className="relative isolate overflow-hidden border-b border-line pt-32 pb-14 sm:pt-40 sm:pb-20">
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div className="bg-grid mask-fade-b absolute inset-0 opacity-80" />
        <div className="absolute -top-40 left-[15%] h-[380px] w-[560px] rounded-full bg-signal/[0.06] blur-[120px]" />
      </div>
      <div className="container-page">
        <p className="label-mono flex items-center gap-3 text-signal">
          {label}
          <span aria-hidden="true" className="h-px w-12 bg-signal/40" />
        </p>
        <h1 className="mt-5 max-w-3xl text-4xl font-semibold tracking-[-0.035em] text-balance text-fg sm:text-6xl">{title}</h1>
        {lead && <p className="mt-6 max-w-2xl text-lg leading-relaxed text-pretty text-muted">{lead}</p>}
        {children}
      </div>
    </header>
  );
}
