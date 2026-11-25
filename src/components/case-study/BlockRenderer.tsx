import { ArrowUpRight, Clapperboard, Network, PenTool } from "lucide-react";
import { getAchievements } from "@/content/achievements";
import type { Accent, Block } from "@/content/types";
import { AchievementList } from "@/components/home/AchievementsSection";
import { assetExists } from "@/lib/assets";
import { pad } from "@/lib/utils";
import { youTubeId } from "@/lib/video";
import { ArchitectureViewer } from "./ArchitectureViewer";
import { CaseStudySection } from "./CaseStudySection";
import { FamSyncConcept } from "./FamSyncConcept";
import { FeatureGrid } from "./FeatureGrid";
import { FlowDiagram } from "./FlowDiagram";
import { ImageCarousel } from "./ImageCarousel";
import { LiveDiagramLink } from "./LiveDiagramLink";
import { LiveDiagramWindow } from "./LiveDiagramWindow";
import { Tabs } from "@/components/ui/Tabs";
import { MediaPlaceholder } from "./MediaPlaceholder";
import { ScreenshotGallery } from "./ScreenshotGallery";
import { FileVideo, YouTubeEmbed } from "./VideoEmbed";
import { AgentCards, BulletList, Callout, LinksRow, Notes, Prose, Roadmap, Roles, Stack, Steps } from "./blocks";

export type TocEntry = { id: string; number: string; title: string };

const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

/** Assigns ids and numbers to every section block (callouts are not numbered). */
export function buildToc(blocks: Block[]): (TocEntry | null)[] {
  let n = 0;
  const seen = new Set<string>();
  return blocks.map((b) => {
    if (b.type === "callout") return null;
    n += 1;
    let id = slugify(b.title) || `section-${n}`;
    while (seen.has(id)) id += "-x";
    seen.add(id);
    return { id, number: pad(n), title: b.title };
  });
}

export function BlockRenderer({ blocks, accent }: { blocks: Block[]; accent: Accent }) {
  const toc = buildToc(blocks);
  return (
    <>
      {blocks.map((block, i) => {
        if (block.type === "callout") {
          return (
            <div key={`callout-${i}`} className="pb-12">
              <Callout block={block} />
            </div>
          );
        }
        const entry = toc[i]!;
        const wide = ["architecture", "gallery", "flow", "video", "concept", "agents", "roadmap", "steps", "features"].includes(block.type);
        return (
          <CaseStudySection
            key={entry.id}
            id={entry.id}
            number={entry.number}
            title={block.title}
            heading={block.heading}
            intro={block.intro}
            pending={block.pending}
            accent={accent}
            wide={wide}
          >
            <BlockBody block={block} accent={accent} />
          </CaseStudySection>
        );
      })}
    </>
  );
}

function BlockBody({ block, accent }: { block: Exclude<Block, { type: "callout" }>; accent: Accent }) {
  switch (block.type) {
    case "prose":
      return <Prose block={block} />;
    case "features":
      return <FeatureGrid items={block.items} columns={block.columns} accent={accent} />;
    case "steps":
      return <Steps block={block} accent={accent} />;
    case "agents":
      return <AgentCards block={block} accent={accent} />;
    case "flow":
      return <FlowDiagram tiers={block.tiers} note={block.note} accent={accent} />;
    case "stack":
      return <Stack block={block} />;
    case "notes":
      return block.items.length ? <Notes block={block} accent={accent} /> : null;
    case "list":
      return <BulletList items={block.items} accent={accent} />;
    case "roles":
      return block.items.length ? <Roles block={block} accent={accent} /> : null;
    case "roadmap":
      return <Roadmap block={block} />;
    case "links":
      return <LinksRow block={block} />;
    case "concept":
      return <FamSyncConcept />;
    case "achievements":
      // Inside a case study the awards already belong to this project, so no self-links.
      return <AchievementList items={getAchievements(block.ids)} showProjectLinks={false} />;

    case "architecture": {
      const live = block.live;
      const liveTitle = live?.title ?? block.title;
      // Excalidraw disables collaboration rooms (#room=…) inside iframes, so those can only be linked.
      const embed = live?.embed && !/#room=/.test(live.url);

      const tabs = block.diagrams
        .filter((d) => assetExists(d.src))
        .map((d, i) => ({
          label: d.label ?? `Diagram ${i + 1}`,
          content: <ArchitectureViewer diagram={d} title={d.label ? `${block.title} — ${d.label}` : block.title} />,
        }));
      if (live && embed) tabs.push({ label: "Live", content: <LiveDiagramWindow url={live.url} title={liveTitle} /> });

      const openButton = live ? (
        <a
          href={live.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex h-9 items-center gap-2 rounded-full border border-line-strong px-4 text-sm text-fg transition-colors hover:border-signal/50"
        >
          <PenTool aria-hidden="true" className="size-3.5 text-signal" strokeWidth={1.7} />
          {live.label ?? "Open original"}
          <ArrowUpRight aria-hidden="true" className="size-3.5 text-muted transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      ) : null;

      return (
        <div className="space-y-10">
          {tabs.length === 0 ? (
            live ? (
              <LiveDiagramLink url={live.url} title={liveTitle} />
            ) : (
              <MediaPlaceholder
                label="Architecture diagram coming soon"
                hint="Add an SVG or PNG under /public/media"
                icon={<Network aria-hidden="true" className="size-4" strokeWidth={1.6} />}
                aspect="aspect-[16/9]"
              />
            )
          ) : tabs.length === 1 ? (
            <div>
              {openButton && <div className="mb-5 flex justify-end">{openButton}</div>}
              {tabs[0].content}
            </div>
          ) : (
            <Tabs label="Diagram view" tabs={tabs} actions={openButton} />
          )}
          {block.annotations.length > 0 && (
            <ol className="grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
              {block.annotations.map((a, i) => (
                <li key={a.title} className="border-l border-line pl-4">
                  <p className="label-mono text-faint">
                    <span className="text-signal">{pad(i + 1)}</span> · {a.title}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{a.description}</p>
                </li>
              ))}
            </ol>
          )}
        </div>
      );
    }

    case "gallery": {
      const images = block.images.filter((img) => assetExists(img.src));
      const missing = (block.expected ?? []).slice(images.length);
      if (images.length === 0 && missing.length === 0) return null;
      const placeholders = missing.map((label) => (
        <li key={label}>
          <MediaPlaceholder label={label} hint="Screenshot coming soon" />
        </li>
      ));
      if (images.length && block.layout === "carousel") {
        return <ImageCarousel images={images} label={block.heading ?? block.title} />;
      }
      return images.length ? (
        <ScreenshotGallery images={images} crop={block.crop}>
          {placeholders}
        </ScreenshotGallery>
      ) : (
        <ul className="grid gap-5 sm:grid-cols-2">{placeholders}</ul>
      );
    }

    case "video": {
      const v = block.video;
      if (v?.kind === "youtube") {
        const id = youTubeId(v.url);
        if (id) return <YouTubeEmbed id={id} title={v.title} />;
      }
      if (v?.kind === "file" && assetExists(v.src)) {
        return <FileVideo src={v.src} poster={v.poster && assetExists(v.poster) ? v.poster : undefined} title={v.title} />;
      }
      return (
        <MediaPlaceholder
          label="Demo video coming soon"
          hint="YouTube link or /public video file"
          icon={<Clapperboard aria-hidden="true" className="size-4" strokeWidth={1.6} />}
          aspect="aspect-video"
        />
      );
    }
  }
}
