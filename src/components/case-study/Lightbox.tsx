"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { MediaImage } from "@/content/types";

/**
 * Full-screen image viewer built on <dialog> (focus handling and Esc for free).
 * Controlled: `index === null` means closed. ←/→ move between images.
 */
export function Lightbox({
  images,
  index,
  onChange,
  onClose,
}: {
  images: MediaImage[];
  index: number | null;
  onChange: (index: number) => void;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const many = images.length > 1;

  // Sync the dialog's open state with `index`.
  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (index !== null && !d.open) d.showModal();
    if (index === null && d.open) d.close();
  }, [index]);

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    d.addEventListener("close", onClose);
    return () => d.removeEventListener("close", onClose);
  }, [onClose]);

  useEffect(() => {
    if (index === null || !many) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") onChange((index + 1) % images.length);
      if (e.key === "ArrowLeft") onChange((index - 1 + images.length) % images.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, many, images.length, onChange]);

  const current = index !== null ? images[index] : null;
  const close = () => ref.current?.close();

  return (
    <dialog
      ref={ref}
      aria-label="Image viewer"
      className="m-0 h-dvh max-h-none w-screen max-w-none bg-transparent p-0 text-fg"
      onClick={(e) => {
        if (e.target === e.currentTarget) close();
      }}
    >
      {current && (
        <div
          className="flex h-full flex-col items-center justify-center gap-4 p-4 sm:p-10"
          onClick={(e) => {
            if (e.target === e.currentTarget) close();
          }}
        >
          <div className="flex w-full max-w-7xl items-center justify-between">
            <p className="font-mono text-xs text-muted">{many ? `${index! + 1} / ${images.length}` : ""}</p>
            <button
              type="button"
              onClick={close}
              autoFocus
              aria-label="Close viewer"
              className="inline-flex size-10 items-center justify-center rounded-full border border-line-strong bg-surface text-fg hover:border-signal/50"
            >
              <X className="size-4" aria-hidden="true" />
            </button>
          </div>
          <figure className="relative flex max-h-[82dvh] w-full max-w-7xl flex-col items-center">
            <Image
              src={current.src}
              alt={current.alt}
              width={current.width}
              height={current.height}
              sizes="100vw"
              quality={90}
              className="h-auto max-h-[74dvh] w-auto rounded-lg border border-line object-contain"
            />
            {current.caption && <figcaption className="mt-4 text-sm text-muted">{current.caption}</figcaption>}
          </figure>
          {many && (
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => onChange((index! - 1 + images.length) % images.length)}
                aria-label="Previous image"
                className="inline-flex size-11 items-center justify-center rounded-full border border-line-strong bg-surface text-fg hover:border-signal/50"
              >
                <ChevronLeft className="size-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => onChange((index! + 1) % images.length)}
                aria-label="Next image"
                className="inline-flex size-11 items-center justify-center rounded-full border border-line-strong bg-surface text-fg hover:border-signal/50"
              >
                <ChevronRight className="size-5" aria-hidden="true" />
              </button>
            </div>
          )}
        </div>
      )}
    </dialog>
  );
}
