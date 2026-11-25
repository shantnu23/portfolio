import Link from "next/link";
import type { ReactNode } from "react";
import { cn, isExternal } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";

const base =
  "group/btn inline-flex items-center justify-center gap-2 rounded-full text-sm font-medium transition-[background-color,border-color,color,transform] duration-200 select-none whitespace-nowrap";

const variants: Record<Variant, string> = {
  primary:
    "h-11 px-5 bg-signal text-canvas hover:bg-[#a6ede2] active:translate-y-px shadow-[0_0_0_1px_rgb(140_228_214/0.4),0_8px_30px_-12px_rgb(140_228_214/0.6)]",
  secondary:
    "h-11 px-5 border border-line-strong bg-white/[0.03] text-fg hover:border-signal/50 hover:bg-white/[0.06] active:translate-y-px",
  ghost: "h-10 px-3 text-muted hover:text-fg hover:bg-white/[0.04]",
};

type LinkButtonProps = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  icon?: ReactNode;
  iconRight?: ReactNode;
  className?: string;
  /** Set to a filename to force download. */
  download?: string;
  ariaLabel?: string;
};

/** A link styled as a button. External URLs open in a new tab with safe rel attributes. */
export function LinkButton({ href, children, variant = "secondary", icon, iconRight, className, download, ariaLabel }: LinkButtonProps) {
  const classes = cn(base, variants[variant], className);
  const content = (
    <>
      {icon}
      <span>{children}</span>
      {iconRight}
    </>
  );

  if (download) {
    return (
      <a href={href} download={download} className={classes} aria-label={ariaLabel}>
        {content}
      </a>
    );
  }
  if (isExternal(href)) {
    const isMail = href.startsWith("mailto:");
    return (
      <a href={href} className={classes} aria-label={ariaLabel} {...(isMail ? {} : { target: "_blank", rel: "noopener noreferrer" })}>
        {content}
      </a>
    );
  }
  return (
    <Link href={href} className={classes} aria-label={ariaLabel}>
      {content}
    </Link>
  );
}

/** Non-interactive stand-in for a button whose destination hasn't been supplied yet. */
export function PendingButton({ children, icon, className }: { children: ReactNode; icon?: ReactNode; className?: string }) {
  return (
    <span
      aria-disabled="true"
      className={cn(base, "h-11 cursor-default border border-dashed border-line-strong px-5 text-faint", className)}
    >
      {icon}
      <span>{children}</span>
    </span>
  );
}
