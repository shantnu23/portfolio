"use client";

import Image from "next/image";
import { useCallback, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Expand } from "lucide-react";
import type { MediaImage } from "@/content/types";
import { cn } from "@/lib/utils";
import { Lightbox } from "./Lightbox";

/**
 * One large image at a time with back / forward controls — so the first image
 * can be shown on its own, and the rest revealed only if the visitor wants.
 *
 * - Buttons, ←/→ keys (when focused), dots and touch swipe all navigate.
 * - Clicking the image opens it full screen.
 */
export function ImageCarousel({ images, label }: { images: MediaImage[]; label: string }) {
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [announce, setAnnounce] = useState(false);
  const stageRef = useRef<HTMLButtonElement>(null);
  const touchX = useRef<number | null>(null);
  const many = images.length > 1;
  const current = images[active];

  const go = useCallback(
    (i: number) => {
      setAnnounce(true);
      setActive((i + images.length) % images.length);
    },
    [images.length],
  );

  const onLightboxChange = useCallback((i: number) => {
    setLightbox(i);
    setActive(i);
  }, []);
  const onLightboxClose = useCallback(() => {
    setLightbox(null);
    stageRef.current?.focus();
  }, []);

  return (
    <section
      aria-roledescription="carousel"
      aria-label={label}
      onKeyDown={(e) => {
        if (!many) return;
        if (e.key === "ArrowRight") go(active + 1);
        if (e.key === "ArrowLeft") go(active - 1);
      }}
    >
      <div
        className="group relative overflow-hidden rounded-[var(--radius-card)] border border-line bg-surface"
        onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
        onTouchEnd={(e) => {
          if (touchX.current === null || !many) return;
          const dx = e.changedTouches[0].clientX - touchX.current;
          if (Math.abs(dx) > 45) go(active + (dx < 0 ? 1 : -1));
          touchX.current = null;
        }}
      >
        {/* Stage: all slides stacked; the active one is visible. */}
        <button
          ref={stageRef}
          type="button"
          onClick={() => setLightbox(active)}
          aria-label={`View full screen: ${current.caption ?? current.alt}`}
          style={{ aspectRatio: `${current.width} / ${current.height}` }}
          className="relative block w-full cursor-zoom-in bg-canvas"
        >
          {images.map((img, i) => (
            <div
              key={img.src}
              aria-hidden={i !== active}
              className={cn(
                "absolute inset-0 transition-opacity duration-500 motion-reduce:transition-none",
                i === active ? "opacity-100" : "pointer-events-none opacity-0",
              )}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                priority={i === 0}
                sizes="(min-width: 1280px) 960px, 100vw"
                quality={90}
                className="object-contain"
              />
            </div>
          ))}
          <span className="absolute top-3 right-3 inline-flex items-center gap-1.5 rounded-full border border-line-strong bg-canvas/85 p-1.5 text-xs sm:px-2.5 sm:py-1 text-fg backdrop-blur transition-opacity sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-within:opacity-100">
            <Expand aria-hidden="true" className="size-3.5" />
            <span className="hidden sm:inline">Full screen</span>
          </span>
        </button>

      </div>

      {/* Caption, counter and dots */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
        <p className="min-w-0 text-sm text-muted" aria-live={announce ? "polite" : "off"}>
          {current.caption ?? ""}
        </p>
        {many && (
          <div className="flex items-center gap-3">
            <ArrowButton dir="prev" onClick={() => go(active - 1)} />
            <div className="flex gap-1" role="group" aria-label="Choose image">
              {images.map((img, i) => (
                <button
                  key={img.src}
                  type="button"
                  aria-label={`Show image ${i + 1}${img.caption ? `: ${img.caption}` : ""}`}
                  aria-current={i === active ? "true" : undefined}
                  onClick={() => go(i)}
                  className="group/dot flex size-6 items-center justify-center rounded-full"
                >
                  <span
                    className={cn(
                      "h-1.5 rounded-full transition-all duration-300",
                      i === active ? "w-5 bg-signal" : "w-1.5 bg-line-strong group-hover/dot:bg-muted",
                    )}
                  />
                </button>
              ))}
            </div>
            <p className="w-10 text-center font-mono text-xs text-faint">
              {active + 1} / {images.length}
            </p>
            <ArrowButton dir="next" onClick={() => go(active + 1)} />
          </div>
        )}
      </div>

      <Lightbox images={images} index={lightbox} onChange={onLightboxChange} onClose={onLightboxClose} />
    </section>
  );
}

function ArrowButton({ dir, onClick }: { dir: "prev" | "next"; onClick: () => void }) {
  const Icon = dir === "prev" ? ChevronLeft : ChevronRight;
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={dir === "prev" ? "Previous image" : "Next image"}
      className="inline-flex size-11 items-center justify-center rounded-full border border-line-strong bg-surface text-fg transition-colors hover:border-signal/60 hover:text-signal active:translate-y-px"
    >
      <Icon aria-hidden="true" className="size-5" />
    </button>
  );
}
