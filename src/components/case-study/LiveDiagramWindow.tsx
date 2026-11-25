"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Maximize2, MousePointerClick, Network, X } from "lucide-react";

/**
 * Embeds a live diagram (e.g. an Excalidraw link) in a framed "window".
 *
 * - Nothing heavy loads until the visitor asks for it (click-to-load).
 * - Zoom and pan happen inside the diagram tool itself.
 * - A full-screen view and an "Open in new tab" link are always available,
 *   so the diagram stays reachable even if embedding fails.
 */
export function LiveDiagramWindow({ url, title }: { url: string; title: string }) {
  const [loaded, setLoaded] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const expandRef = useRef<HTMLButtonElement>(null);
  const host = safeHost(url);

  const openFull = () => {
    setExpanded(true);
    dialogRef.current?.showModal();
  };

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const onClose = () => {
      setExpanded(false);
      setLoaded(true);
      document.documentElement.style.overflow = "";
      expandRef.current?.focus();
    };
    dialog.addEventListener("close", onClose);
    return () => dialog.removeEventListener("close", onClose);
  }, []);

  useEffect(() => {
    if (expanded) document.documentElement.style.overflow = "hidden";
  }, [expanded]);

  return (
    <>
      <div className="card overflow-hidden">
        {/* Window chrome */}
        <div className="flex items-center gap-3 border-b border-line bg-canvas/60 px-4 py-2.5">
          <div className="flex gap-1.5" aria-hidden="true">
            {[0, 1, 2].map((i) => (
              <span key={i} className="size-2.5 rounded-full bg-line-strong" />
            ))}
          </div>
          <p className="label-mono min-w-0 flex-1 truncate !text-[0.62rem] text-faint">
            <span className="text-signal">{host}</span> · live diagram
          </p>
          <button
            ref={expandRef}
            type="button"
            onClick={openFull}
            className="inline-flex h-8 items-center gap-1.5 rounded-full border border-line px-3 text-xs text-muted transition-colors hover:border-signal/50 hover:text-fg"
          >
            <Maximize2 aria-hidden="true" className="size-3.5" />
            <span className="hidden sm:inline">Full screen</span>
            <span className="sr-only sm:hidden">Open {title} full screen</span>
          </button>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-8 items-center gap-1.5 rounded-full border border-line px-3 text-xs text-muted transition-colors hover:border-signal/50 hover:text-fg"
          >
            <span className="hidden sm:inline">Open</span>
            <span className="sr-only sm:hidden">Open {title} in a new tab</span>
            <ArrowUpRight aria-hidden="true" className="size-3.5" />
          </a>
        </div>

        {/* Body */}
        <div className="relative aspect-[4/5] bg-[#f8f9fb] sm:aspect-[16/10]">
          {loaded && !expanded ? (
            <iframe
              src={url}
              title={title}
              allow="clipboard-read; clipboard-write; fullscreen"
              referrerPolicy="no-referrer"
              className="absolute inset-0 h-full w-full border-0"
            />
          ) : (
            <div className="bg-dots absolute inset-0 flex flex-col items-center justify-center gap-5 bg-surface p-6 text-center">
              <span className="flex size-12 items-center justify-center rounded-2xl border border-signal/30 bg-signal/[0.06] text-signal">
                <Network aria-hidden="true" className="size-5" strokeWidth={1.6} />
              </span>
              <div>
                <p className="font-medium text-fg">{expanded ? "Open in the full-screen view" : title}</p>
                <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-muted">
                  The complete architecture, as drawn in Excalidraw. Zoom with the on-canvas controls, Ctrl/⌘ + scroll or a pinch; drag to pan.
                </p>
              </div>
              <div className="flex flex-wrap justify-center gap-2.5">
                <button
                  type="button"
                  onClick={() => setLoaded(true)}
                  className="inline-flex h-10 items-center gap-2 rounded-full bg-signal px-4 text-sm font-medium text-canvas transition-colors hover:bg-[#a6ede2]"
                >
                  <MousePointerClick aria-hidden="true" className="size-4" />
                  Load diagram here
                </button>
                <button
                  type="button"
                  onClick={openFull}
                  className="inline-flex h-10 items-center gap-2 rounded-full border border-line-strong px-4 text-sm text-fg transition-colors hover:border-signal/50"
                >
                  <Maximize2 aria-hidden="true" className="size-4" />
                  Full screen
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <p className="mt-3 font-mono text-xs text-faint">
        Loads from {host}. If it doesn&apos;t appear,{" "}
        <a href={url} target="_blank" rel="noopener noreferrer" className="text-muted underline underline-offset-4 hover:text-signal">
          open the diagram in a new tab
        </a>
        .
      </p>

      <dialog
        ref={dialogRef}
        aria-label={`${title} — full screen`}
        className="m-0 h-dvh max-h-none w-screen max-w-none overflow-hidden bg-transparent p-0 text-fg"
      >
        {expanded && (
          <div className="flex h-full flex-col">
            <div className="flex items-center justify-between gap-3 border-b border-line bg-canvas px-4 py-3 sm:px-6">
              <p className="label-mono truncate text-muted">{title}</p>
              <div className="flex items-center gap-2">
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden h-9 items-center gap-1.5 rounded-full border border-line px-3.5 text-xs text-muted hover:border-signal/50 hover:text-fg sm:inline-flex"
                >
                  Open in new tab <ArrowUpRight aria-hidden="true" className="size-3.5" />
                </a>
                <button
                  type="button"
                  autoFocus
                  onClick={() => dialogRef.current?.close()}
                  className="inline-flex h-9 items-center gap-1.5 rounded-full border border-line-strong bg-surface px-3.5 text-xs text-fg hover:border-signal/50"
                >
                  <X aria-hidden="true" className="size-3.5" /> Close
                </button>
              </div>
            </div>
            <iframe
              src={url}
              title={title}
              allow="clipboard-read; clipboard-write; fullscreen"
              referrerPolicy="no-referrer"
              className="min-h-0 w-full flex-1 border-0 bg-white"
            />
          </div>
        )}
      </dialog>
    </>
  );
}

function safeHost(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return "external";
  }
}
