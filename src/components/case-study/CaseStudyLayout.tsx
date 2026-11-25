import type { ReactNode } from "react";
import type { Accent, Block } from "@/content/types";
import { BlockRenderer, buildToc, type TocEntry } from "./BlockRenderer";
import { SectionNav } from "./SectionNav";

/**
 * Case-study page body: sticky section navigation on the left (desktop),
 * numbered sections on the right, followed by an optional footer slot.
 */
export function CaseStudyLayout({
  blocks,
  accent,
  footer,
  showNav = true,
}: {
  blocks: Block[];
  accent: Accent;
  footer?: ReactNode;
  showNav?: boolean;
}) {
  const toc = buildToc(blocks).filter((e): e is TocEntry => e !== null);
  const nav = showNav && toc.length > 3;

  return (
    <div className="container-page">
      <div className={nav ? "lg:grid lg:grid-cols-[13rem_minmax(0,1fr)] lg:gap-16" : ""}>
        {nav && (
          <div className="hidden lg:block">
            <SectionNav entries={toc} />
          </div>
        )}
        <div className="min-w-0 pt-14 sm:pt-20">
          <BlockRenderer blocks={blocks} accent={accent} />
        </div>
      </div>
      {footer}
    </div>
  );
}
