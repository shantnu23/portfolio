import { cn } from "@/lib/utils";

export function TechBadge({ children, className }: { children: string; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border border-line bg-white/[0.025] px-2 py-1 font-mono text-[0.7rem] leading-none text-muted",
        className,
      )}
    >
      {children}
    </span>
  );
}

export function TechList({ items, max, className }: { items: string[]; max?: number; className?: string }) {
  const shown = max ? items.slice(0, max) : items;
  const rest = items.length - shown.length;
  return (
    <ul className={cn("flex flex-wrap gap-1.5", className)} aria-label="Technologies">
      {shown.map((t) => (
        <li key={t}>
          <TechBadge>{t}</TechBadge>
        </li>
      ))}
      {rest > 0 && (
        <li>
          <TechBadge className="text-faint">{`+${rest} more`}</TechBadge>
        </li>
      )}
    </ul>
  );
}
