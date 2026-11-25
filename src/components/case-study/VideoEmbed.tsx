"use client";

import Image from "next/image";
import { useState } from "react";
import { Play } from "lucide-react";

/**
 * Lightweight YouTube embed: shows the thumbnail and only loads the player
 * (via youtube-nocookie.com) after the visitor clicks play. Never autoplays
 * on page load.
 */
export function YouTubeEmbed({ id, title }: { id: string; title: string }) {
  const [active, setActive] = useState(false);

  return (
    <div className="relative aspect-video overflow-hidden rounded-[var(--radius-card)] border border-line bg-surface">
      {active ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
        />
      ) : (
        <button type="button" onClick={() => setActive(true)} className="group absolute inset-0 h-full w-full" aria-label={`Play video: ${title}`}>
          <Image
            src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
            alt=""
            fill
            sizes="(min-width: 1024px) 900px, 100vw"
            className="object-cover opacity-80 transition-opacity duration-300 group-hover:opacity-100"
          />
          <span className="absolute inset-0 bg-gradient-to-t from-canvas/80 via-canvas/10 to-transparent" />
          <span className="absolute top-1/2 left-1/2 flex size-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-signal text-canvas shadow-[0_0_0_8px_rgb(140_228_214/0.15)] transition-transform duration-300 group-hover:scale-105">
            <Play aria-hidden="true" className="ml-1 size-6 fill-current" />
          </span>
          <span className="absolute bottom-4 left-5 text-left text-sm font-medium text-fg">{title}</span>
        </button>
      )}
    </div>
  );
}

/** Local video file with native controls. Metadata only is preloaded. */
export function FileVideo({ src, poster, title }: { src: string; poster?: string; title: string }) {
  return (
    <div className="overflow-hidden rounded-[var(--radius-card)] border border-line bg-black">
      <video controls playsInline preload="metadata" poster={poster} className="aspect-video h-auto w-full" aria-label={title}>
        <source src={src} type={src.endsWith(".webm") ? "video/webm" : "video/mp4"} />
        Your browser does not support embedded video.{" "}
        <a href={src} className="underline">
          Download the video
        </a>
        .
      </video>
    </div>
  );
}
