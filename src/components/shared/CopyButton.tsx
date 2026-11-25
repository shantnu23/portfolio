"use client";

import { Check, Copy } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

/** Copies text to the clipboard and confirms with an accessible status message. */
export function CopyButton({
  value,
  label = "Copy email",
  copiedLabel = "Copied",
  className,
  variant = "secondary",
}: {
  value: string;
  label?: string;
  copiedLabel?: string;
  className?: string;
  variant?: "primary" | "secondary" | "compact";
}) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 2200);
    return () => clearTimeout(t);
  }, [copied]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      // Fallback for browsers without the async clipboard API.
      const ta = document.createElement("textarea");
      ta.value = value;
      ta.setAttribute("readonly", "");
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      ta.remove();
    }
    setCopied(true);
  }

  const styles = {
    primary:
      "h-12 px-6 bg-signal text-canvas hover:bg-[#a6ede2] shadow-[0_0_0_1px_rgb(140_228_214/0.4),0_8px_30px_-12px_rgb(140_228_214/0.6)]",
    secondary: "h-11 px-5 border border-line-strong bg-white/[0.03] text-fg hover:border-signal/50 hover:bg-white/[0.06]",
    compact: "h-8 px-3 border border-line text-muted hover:text-fg hover:border-line-strong text-xs",
  }[variant];

  return (
    <button
      type="button"
      onClick={copy}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors active:translate-y-px",
        styles,
        className,
      )}
    >
      {copied ? (
        <Check aria-hidden="true" className="size-4" strokeWidth={2} />
      ) : (
        <Copy aria-hidden="true" className="size-4" strokeWidth={1.7} />
      )}
      <span>{copied ? copiedLabel : label}</span>
      <span className="sr-only" role="status" aria-live="polite">
        {copied ? `${value} copied to clipboard` : ""}
      </span>
    </button>
  );
}
