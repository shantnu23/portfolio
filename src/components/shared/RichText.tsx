import { parseInline } from "@/lib/utils";

/** Renders a content string, turning **bold** markers into <strong>. */
export function RichText({ text }: { text: string }) {
  return (
    <>
      {parseInline(text).map((seg, i) => (seg.strong ? <strong key={i}>{seg.text}</strong> : <span key={i}>{seg.text}</span>))}
    </>
  );
}
