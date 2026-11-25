import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <section className="relative isolate flex min-h-[80dvh] items-center overflow-hidden pt-24">
      <div aria-hidden="true" className="bg-grid mask-radial absolute inset-0 -z-10" />
      <div className="container-page">
        <p className="label-mono text-signal">Error 404</p>
        <h1 className="mt-5 text-5xl font-semibold tracking-[-0.035em] text-fg sm:text-6xl">This route doesn&apos;t exist.</h1>
        <p className="mt-5 max-w-md text-lg text-muted">The page may have moved, or the link may be mistyped.</p>
        <div className="mt-9 flex flex-wrap gap-3">
          <Link
            href="/"
            className="inline-flex h-11 items-center gap-2 rounded-full bg-signal px-5 text-sm font-medium text-canvas hover:bg-[#a6ede2]"
          >
            <ArrowLeft aria-hidden="true" className="size-4" /> Back home
          </Link>
          <Link
            href="/projects"
            className="inline-flex h-11 items-center rounded-full border border-line-strong px-5 text-sm text-fg hover:border-signal/50"
          >
            Browse projects
          </Link>
        </div>
      </div>
    </section>
  );
}
