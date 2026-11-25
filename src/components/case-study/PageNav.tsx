import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

/** "← Back to projects" style link shown above detail-page heroes. */
export function BackLink({ href, label }: { href: string; label: string }) {
  return (
    <Link href={href} className="group inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-fg">
      <ArrowLeft aria-hidden="true" className="size-4 transition-transform group-hover:-translate-x-1" />
      {label}
    </Link>
  );
}

type NavItem = { href: string; title: string; subtitle: string };

/** Previous / next navigation at the end of a case study. */
export function NextNavigation({ prev, next, label }: { prev?: NavItem; next?: NavItem; label: string }) {
  return (
    <nav aria-label={label} className="mt-10 grid gap-4 border-t border-line pt-10 sm:grid-cols-2">
      {prev ? <NavCard item={prev} dir="prev" /> : <span className="hidden sm:block" />}
      {next && <NavCard item={next} dir="next" />}
    </nav>
  );
}

function NavCard({ item, dir }: { item: NavItem; dir: "prev" | "next" }) {
  return (
    <Link
      href={item.href}
      className={cn(
        "card group flex flex-col p-6 transition-colors hover:border-line-strong",
        dir === "next" && "sm:items-end sm:text-right",
      )}
    >
      <span className="label-mono flex items-center gap-2 text-faint">
        {dir === "prev" && <ArrowLeft aria-hidden="true" className="size-3.5 transition-transform group-hover:-translate-x-1" />}
        {dir === "prev" ? "Previous" : "Next"}
        {dir === "next" && <ArrowRight aria-hidden="true" className="size-3.5 transition-transform group-hover:translate-x-1" />}
      </span>
      <span className="mt-3 text-xl font-semibold tracking-tight text-fg">{item.title}</span>
      <span className="mt-1 text-sm text-muted">{item.subtitle}</span>
    </Link>
  );
}
