import { about } from "@/content/about";
import { RichText } from "@/components/shared/RichText";
import { cn } from "@/lib/utils";

/**
 * About copy: the first paragraph is a larger lead (bold phrases in the accent
 * colour); the rest follow as body text along a hairline rule.
 */
export function AboutCopy({ className }: { className?: string }) {
  const [lead, ...rest] = about.paragraphs;
  return (
    <div className={cn("space-y-7", className)}>
      {lead && (
        <p className="text-xl leading-relaxed tracking-[-0.01em] text-pretty text-fg/90 sm:text-[1.35rem] sm:leading-[1.6] [&_strong]:font-medium [&_strong]:text-signal">
          <RichText text={lead} />
        </p>
      )}
      {rest.length > 0 && (
        <div className="space-y-5 border-l border-line-strong pl-5 sm:pl-6">
          {rest.map((p) => (
            <p key={p.slice(0, 24)} className="prose-copy">
              <RichText text={p} />
            </p>
          ))}
        </div>
      )}
    </div>
  );
}
