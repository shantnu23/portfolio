"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { ExternalLink, Maximize2, Minus, Plus, RotateCcw, X } from "lucide-react";
import type { ArchitectureDiagram } from "@/content/types";
import { cn } from "@/lib/utils";

type Diagram = ArchitectureDiagram;

const MIN = 1;
const MAX = 6;
const STEP = 0.5;

/**
 * Displays a large architecture diagram (e.g. an Excalidraw SVG/PNG export)
 * inline, with an accessible full-screen viewer that supports zoom and pan.
 */
export function ArchitectureViewer({ diagram, title }: { diagram: Diagram; title: string }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const drag = useRef<{ x: number; y: number; left: number; top: number } | null>(null);
  const [zoom, setZoom] = useState(1);
  const [open, setOpen] = useState(false);
  const paper = diagram.surface !== "dark";
  const isSvg = diagram.src.toLowerCase().endsWith(".svg");

  const openViewer = () => {
    setZoom(1);
    dialogRef.current?.showModal();
    setOpen(true);
  };
  const closeViewer = useCallback(() => dialogRef.current?.close(), []);

  const zoomTo = useCallback((next: number) => {
    const el = scrollRef.current;
    const clamped = Math.min(MAX, Math.max(MIN, next));
    if (el) {
      // Keep the visual centre stable while zooming.
      const cx = (el.scrollLeft + el.clientWidth / 2) / el.scrollWidth;
      const cy = (el.scrollTop + el.clientHeight / 2) / el.scrollHeight;
      requestAnimationFrame(() => {
        el.scrollLeft = cx * el.scrollWidth - el.clientWidth / 2;
        el.scrollTop = cy * el.scrollHeight - el.clientHeight / 2;
      });
    }
    setZoom(clamped);
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const onClose = () => {
      setOpen(false);
      document.documentElement.style.overflow = "";
      triggerRef.current?.focus();
    };
    dialog.addEventListener("close", onClose);
    return () => dialog.removeEventListener("close", onClose);
  }, []);

  useEffect(() => {
    if (!open) return;
    document.documentElement.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "+" || e.key === "=") zoomTo(zoom + STEP);
      else if (e.key === "-" || e.key === "_") zoomTo(zoom - STEP);
      else if (e.key === "0") zoomTo(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, zoom, zoomTo]);

  return (
    <>
      <figure>
        <div
          className={cn(
            "group relative overflow-hidden rounded-[var(--radius-card)] border border-line",
            paper ? "bg-[#f8f9fb] p-3 sm:p-6" : "bg-dots bg-canvas p-3 sm:p-6",
          )}
        >
          <button
            ref={triggerRef}
            type="button"
            onClick={openViewer}
            className="block w-full cursor-zoom-in rounded-lg"
            aria-label={`Expand diagram: ${title}`}
          >
            <Image
              src={diagram.src}
              alt={diagram.alt}
              width={diagram.width}
              height={diagram.height}
              unoptimized={isSvg}
              sizes="(min-width: 1280px) 960px, 100vw"
              className="h-auto w-full"
            />
          </button>
          <span className="pointer-events-none absolute right-3 bottom-3 inline-flex items-center gap-2 rounded-full border border-line-strong bg-canvas/90 px-3 py-1.5 text-xs text-fg backdrop-blur transition-colors group-hover:border-signal/50">
            <Maximize2 aria-hidden="true" className="size-3.5 text-signal" />
            <span className="sm:hidden">Tap to expand</span>
            <span className="hidden sm:inline">Expand diagram</span>
          </span>
        </div>
        {(diagram.caption || diagram.note) && (
          <figcaption className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs">
            {diagram.caption && <span className="text-muted">{diagram.caption}</span>}
            {diagram.note && <span className="font-mono text-faint">{diagram.note}</span>}
          </figcaption>
        )}
      </figure>

      <dialog
        ref={dialogRef}
        aria-label={`${title} — diagram viewer`}
        className="m-0 h-dvh max-h-none w-screen max-w-none overflow-hidden bg-transparent p-0 text-fg backdrop:bg-canvas/90"
        onClick={(e) => {
          if (e.target === e.currentTarget) closeViewer();
        }}
      >
        {open && (
          <div className="flex h-full flex-col">
            <div className="flex items-center justify-between gap-3 border-b border-line bg-canvas/95 px-4 py-3 backdrop-blur sm:px-6">
              <p className="label-mono truncate text-muted">{title}</p>
              <div className="flex items-center gap-1">
                <ToolButton label="Zoom out" onClick={() => zoomTo(zoom - STEP)} disabled={zoom <= MIN}>
                  <Minus className="size-4" />
                </ToolButton>
                <span className="w-12 text-center font-mono text-xs text-muted" aria-live="polite">
                  {Math.round(zoom * 100)}%
                </span>
                <ToolButton label="Zoom in" onClick={() => zoomTo(zoom + STEP)} disabled={zoom >= MAX}>
                  <Plus className="size-4" />
                </ToolButton>
                <ToolButton label="Reset zoom" onClick={() => zoomTo(1)} disabled={zoom === 1}>
                  <RotateCcw className="size-4" />
                </ToolButton>
                <a
                  href={diagram.src}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Open original file in a new tab"
                  title="Open original"
                  className="hidden size-9 items-center justify-center rounded-full text-muted hover:bg-white/[0.06] hover:text-fg sm:inline-flex"
                >
                  <ExternalLink className="size-4" aria-hidden="true" />
                </a>
                <span aria-hidden="true" className="mx-1 h-5 w-px bg-line-strong" />
                <ToolButton label="Close viewer" onClick={closeViewer} autoFocus>
                  <X className="size-4" />
                </ToolButton>
              </div>
            </div>

            <div
              ref={scrollRef}
              className={cn("relative min-h-0 flex-1 overflow-auto overscroll-contain", zoom > 1 ? "cursor-grab active:cursor-grabbing" : "")}
              onClick={(e) => {
                if (e.target === e.currentTarget) closeViewer();
              }}
              onPointerDown={(e) => {
                if (zoom <= 1 || e.pointerType !== "mouse") return;
                const el = scrollRef.current!;
                drag.current = { x: e.clientX, y: e.clientY, left: el.scrollLeft, top: el.scrollTop };
                el.setPointerCapture(e.pointerId);
              }}
              onPointerMove={(e) => {
                const d = drag.current;
                if (!d) return;
                const el = scrollRef.current!;
                el.scrollLeft = d.left - (e.clientX - d.x);
                el.scrollTop = d.top - (e.clientY - d.y);
              }}
              onPointerUp={() => (drag.current = null)}
              onPointerCancel={() => (drag.current = null)}
            >
              <div
                className="mx-auto flex min-h-full items-center justify-center p-4 sm:p-10"
                style={{ width: `${zoom * 100}%`, maxWidth: zoom === 1 ? 1600 : undefined }}
              >
                <div className={cn("w-full rounded-xl", paper ? "bg-[#f8f9fb] p-4" : "")}>
                  {/* eslint-disable-next-line @next/next/no-img-element -- full-resolution original, no optimisation wanted */}
                  <img src={diagram.src} alt={diagram.alt} draggable={false} className="h-auto w-full select-none" />
                </div>
              </div>
            </div>

            <p className="border-t border-line bg-canvas/95 px-4 py-2 text-center font-mono text-[0.68rem] text-faint sm:px-6">
              <span className="hidden sm:inline">+ / − to zoom · 0 to reset · drag to pan · </span>Esc to close
            </p>
          </div>
        )}
      </dialog>
    </>
  );
}

function ToolButton({
  label,
  onClick,
  disabled,
  children,
  autoFocus,
}: {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
  autoFocus?: boolean;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={onClick}
      disabled={disabled}
      autoFocus={autoFocus}
      className="inline-flex size-9 items-center justify-center rounded-full text-muted transition-colors hover:bg-white/[0.06] hover:text-fg disabled:pointer-events-none disabled:opacity-35"
    >
      {children}
    </button>
  );
}
