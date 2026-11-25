"use client";

import Image from "next/image";
import { useCallback, useRef, useState } from "react";
import { Expand } from "lucide-react";
import type { MediaImage } from "@/content/types";
import { cn } from "@/lib/utils";
import { Lightbox } from "./Lightbox";

/**
 * Responsive screenshot grid with an accessible lightbox (←/→ to move, Esc to close).
 * Only receives images that exist; placeholders are rendered by the server wrapper.
 */
export function ScreenshotGallery({
  images,
  children,
  crop,
}: {
  images: MediaImage[];
  children?: React.ReactNode;
  /** Optional CSS aspect ratio (e.g. "16/10") applied to grid thumbnails. */
  crop?: string;
}) {
  const triggers = useRef<(HTMLButtonElement | null)[]>([]);
  const [index, setIndex] = useState<number | null>(null);
  const lastIndex = useRef(0);
  const single = images.length === 1;

  const onClose = useCallback(() => {
    triggers.current[lastIndex.current]?.focus();
    setIndex(null);
  }, []);
  const onChange = useCallback((i: number) => {
    lastIndex.current = i;
    setIndex(i);
  }, []);

  return (
    <>
      <ul className={cn("grid gap-5", !single && "sm:grid-cols-2")}>
        {images.map((img, i) => (
          <li
            key={img.src}
            className={cn(
              !single && images.length % 2 === 1 && i === 0 && "sm:col-span-2",
              single && img.height / img.width > 0.8 && "max-w-xl",
            )}
          >
            <figure>
              <button
                ref={(el) => {
                  triggers.current[i] = el;
                }}
                type="button"
                onClick={() => onChange(i)}
                aria-label={`Enlarge image: ${img.caption ?? img.alt}`}
                className="group relative block w-full cursor-zoom-in overflow-hidden rounded-xl border border-line bg-surface"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={img.width}
                  height={img.height}
                  sizes={single ? "(min-width: 1024px) 900px, 100vw" : "(min-width: 1024px) 50vw, 100vw"}
                  style={crop ? { aspectRatio: crop } : undefined}
                  className={cn(
                    "h-auto w-full transition-transform duration-500 group-hover:scale-[1.015]",
                    crop && "object-cover",
                  )}
                />
                <span className="absolute right-3 bottom-3 inline-flex size-8 items-center justify-center rounded-full border border-line-strong bg-canvas/85 text-fg opacity-0 backdrop-blur transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                  <Expand aria-hidden="true" className="size-3.5" />
                </span>
              </button>
              {img.caption && <figcaption className="mt-3 text-sm text-muted">{img.caption}</figcaption>}
            </figure>
          </li>
        ))}
        {children}
      </ul>

      <Lightbox images={images} index={index} onChange={onChange} onClose={onClose} />
    </>
  );
}
