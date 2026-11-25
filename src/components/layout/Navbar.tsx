"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { FileDown, Menu, X } from "lucide-react";
import { Monogram } from "@/components/ui/Monogram";
import { cn } from "@/lib/utils";
import { NAV_ITEMS, isActive } from "./nav";

export function Navbar({ name, resumeHref }: { name: string; resumeHref: string | null }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [lastPath, setLastPath] = useState(pathname);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Close the mobile menu whenever the route changes.
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    const mq = window.matchMedia("(min-width: 768px)");
    const onResize = () => mq.matches && setOpen(false);
    document.addEventListener("keydown", onKey);
    mq.addEventListener("change", onResize);
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onResize);
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300",
        scrolled || open ? "border-b border-line bg-canvas/80 backdrop-blur-xl" : "border-b border-transparent",
      )}
    >
      <nav aria-label="Primary" className="container-page flex h-16 items-center justify-between">
        <Link href="/" className="group flex items-center gap-3 rounded-md" aria-label={`${name} — home`}>
          <Monogram className="size-8 text-fg transition-transform duration-300 group-hover:rotate-[-4deg]" />
          <span className="hidden text-sm font-medium tracking-tight text-fg sm:inline">{name}</span>
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {NAV_ITEMS.map((item) => {
            const active = isActive(pathname, item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "relative rounded-full px-3.5 py-2 text-sm transition-colors",
                    active ? "bg-white/[0.06] text-fg" : "text-muted hover:text-fg",
                  )}
                >
                  {item.label}
                  {active && (
                    <span aria-hidden="true" className="absolute inset-x-3.5 -bottom-[13px] h-px bg-signal/80" />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          {resumeHref && (
            <a
              href={resumeHref}
              download
              className="hidden h-9 items-center gap-2 rounded-full border border-line-strong px-4 text-sm text-fg transition-colors hover:border-signal/50 md:inline-flex"
            >
              <FileDown aria-hidden="true" className="size-4 text-signal" strokeWidth={1.6} />
              Resume
            </a>
          )}
          <button
            ref={toggleRef}
            type="button"
            className="inline-flex size-10 items-center justify-center rounded-full border border-line text-fg md:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" strokeWidth={1.6} /> : <Menu className="size-5" strokeWidth={1.6} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        id="mobile-nav"
        hidden={!open}
        className="h-[calc(100dvh-4rem)] overflow-y-auto border-t border-line bg-canvas/95 md:hidden"
      >
        <ul className="container-page flex flex-col py-6">
          {NAV_ITEMS.map((item, i) => {
            const active = isActive(pathname, item.href);
            return (
              <li key={item.href} className="border-b border-line">
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  aria-current={active ? "page" : undefined}
                  className="flex items-center justify-between py-4"
                >
                  <span className={cn("text-2xl font-medium tracking-tight", active ? "text-fg" : "text-muted")}>
                    {item.label}
                  </span>
                  <span className={cn("label-mono", active ? "text-signal" : "text-faint")}>{`0${i + 1}`}</span>
                </Link>
              </li>
            );
          })}
        </ul>
        {resumeHref && (
          <div className="container-page">
            <a
              href={resumeHref}
              download
              className="inline-flex h-11 items-center gap-2 rounded-full border border-line-strong px-5 text-sm text-fg"
            >
              <FileDown aria-hidden="true" className="size-4 text-signal" strokeWidth={1.6} />
              Download resume
            </a>
          </div>
        )}
      </div>
    </header>
  );
}
