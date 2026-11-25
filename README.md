# Shantnu Saxena — Portfolio

Personal portfolio built with **Next.js 16 (App Router)**, **React 19**, **TypeScript**, **Tailwind CSS v4**, **Motion** and **Lucide**.
Every page is statically generated. There is no database, no backend and no CMS.

All content lives in typed files in `src/content/`. You can change any text, link, image, tech stack or project status there without touching component code.

---

## 1. Install and run

Requires Node.js 20.9+ (22 LTS recommended).

```bash
npm install
npm run dev          # http://localhost:3000
```

## 2. Build for production

```bash
npm run typecheck    # TypeScript
npm run lint         # ESLint
npm run build        # production build (all pages are pre-rendered)
npm run start        # serve the build locally
```

## 3. Deploy to Vercel

1. Push this folder to a GitHub repository.
2. In Vercel, choose **Add New → Project**, import the repository and keep the defaults (it detects Next.js).
3. Click **Deploy**.
4. Optional: add a custom domain, then set `site.url` in `src/content/profile.ts` (e.g. `"https://shantnu.dev"`). This turns on canonical URLs and makes the sitemap and Open Graph links use your domain. Until then, the Vercel production URL is used automatically.

> Media files (screenshots, diagrams, resume) are checked **at build time**. After adding a file, redeploy, or let Vercel rebuild on push, for it to appear.

---

## Project structure

```text
src/
  app/                       Routes (App Router)
    page.tsx                 Home
    about/                   /about
    experience/              /experience and /experience/[slug]
    projects/                /projects and /projects/[slug]
    sitemap.ts robots.ts     SEO
    opengraph-image.tsx      Social sharing image (generated)
    icon.svg                 Favicon (SS monogram)
    globals.css              Design tokens — colours, fonts, utilities
  content/                   ← everything you will normally edit
    profile.ts               Name, intro, status pill, links, resume, "currently" panel
    about.ts                 About copy and "how I work" principles
    education.ts             Education cards
    experience.ts            Internships + their full case studies
    projects.ts              Projects + their full case studies
    skills.ts                Skills groups
    achievements.ts          Awards / recognition
    types.ts                 The content model (documented)
  components/
    layout/                  Navbar, Footer, BackToTop, motion provider
    home/                    Homepage sections
    case-study/              Block renderer, ArchitectureViewer, VideoEmbed,
                             ScreenshotGallery, FlowDiagram, FeatureGrid, …
    experience/ projects/    Cards, heroes, timeline, artwork
    shared/ ui/              Buttons, badges, icons, copy button, …
  lib/                       Small helpers (asset checks, URLs, formatting)
public/
  media/experience/<slug>/   Diagrams and screenshots per internship
  media/projects/<slug>/     Screenshots and videos per project
  resume/                    Your resume PDF
```

---

## 4. Update personal details

Edit `src/content/profile.ts`:

- `profile.intro`, `profile.headlineParts`: the hero text.
- `profile.status`: the small pill above your name. Set `enabled: false` to hide it, or change `label`, e.g. `"Open to SDE & AI engineering roles"`.
- `profile.currentFocus`: the "currently" panel.
- `profile.interests`: the five nodes in the hero diagram.

For other details, edit `education.ts` (CGPA and programmes), `about.ts` (about copy) and `achievements.ts`.

Content strings support `**bold**` for emphasis.

## 5. Add social links

In `src/content/profile.ts` → `links`, replace `null` with full URLs:

```ts
github: "https://github.com/your-handle",
linkedin: "https://www.linkedin.com/in/your-handle",
discord: "https://discord.com/users/123456789012345678", // or leave null…
discordUsername: "your.username",                       // …and show a copyable username
```

A link left as `null` is hidden in the hero and footer, and shows as "Link coming soon" in the contact section. The site never renders `href="#"`.

## 6. Upload your resume

Save your PDF as `public/resume/Shantnu_Saxena_Resume.pdf`.
The **Download resume** buttons (hero, navbar, mobile menu) appear automatically on the next build. To use a different filename, update `resume.href` in `profile.ts`.

## 7. Architecture diagrams (Technology Mindz)

The `type: "architecture"` block in `src/content/experience.ts` takes a `diagrams` list. Several diagrams are shown as tabs. Each opens in the built-in viewer, which supports full-screen, zoom up to 600% (buttons or `+` / `−` / `0`), drag-to-pan and `Esc` to close.

To update a diagram from Excalidraw:

1. Select the part of the canvas you want, then choose **Export image → SVG** (keep "Only selected" on and "Embed scene" off).
2. Save it to `public/media/experience/technology-mindz/`, e.g. `architecture-core.svg`.
3. Set `width` / `height` in the diagram entry to the SVG's `viewBox` size, and use `surface: "paper"` for light-background exports.

`live.url` adds an **Open in Excalidraw** button. Use a read-only link (Export → *Export to link*, `#json=…`). Collaboration-room links (`#room=…`) let anyone edit your drawing.

`live.embed: true` also adds a "Live" tab that loads excalidraw.com in an in-page window. It's off by default because excalidraw.com asks returning visitors whether to replace their local drawing.

## 8. Embed the SolarChain video

In `src/content/projects.ts`, find the `type: "video"` block under SolarChain and set one of these:

```ts
// YouTube (any URL format works; unlisted videos are fine)
video: { kind: "youtube", url: "https://youtu.be/XXXXXXXXXXX", title: "SolarChain demo" },

// or a local file
video: {
  kind: "file",
  src: "/media/projects/solarchain/demo.mp4",
  poster: "/media/projects/solarchain/poster.jpg", // optional
  title: "SolarChain demo",
},
```

YouTube embeds load only a thumbnail until the visitor presses play (using `youtube-nocookie.com`). Local videos use native controls and never autoplay. For local files, keep videos under roughly 50 MB, or prefer YouTube.

## 9. Add screenshots

1. Save images to `public/media/projects/<slug>/` or `public/media/experience/<slug>/`. PNG or WebP at about 1600px wide works well.
2. Add them to the relevant `type: "gallery"` block:

   ```ts
   images: [
     { src: "/media/projects/medifix/dashboard.png", alt: "Admin dashboard showing …", width: 1600, height: 1000, caption: "Admin dashboard" },
   ],
   ```

Placeholder frames listed in `expected` disappear as real screenshots are added. Images are optimised automatically and open in an accessible lightbox.

For Beema Ghar, the hero cover image is `public/media/experience/beema-ghar/cover.png` (1600×1000). It appears automatically once the file exists.

## 10. Add a new experience or project

Copy an existing entry in `experience.ts` or `projects.ts`, give it a new `slug`, and edit its fields. That's all you need: the route, cards, footer links, sitemap and previous/next navigation update automatically.

A case study is the `sections` array: an ordered list of blocks that are numbered automatically and listed in the "On this page" navigation. Available blocks (see `src/content/types.ts`):

| Block          | Use for                                                       |
| -------------- | ------------------------------------------------------------- |
| `prose`        | Paragraphs, optional "at a glance" aside                      |
| `features`     | Icon feature grid (`status: "proposed"` for planned features) |
| `steps`        | Numbered "how it works" flow                                  |
| `architecture` | Large diagram with zoom viewer and annotations                |
| `agents`       | Agent / component cards                                       |
| `flow`         | Layered architecture (Client → API → Data → Services)         |
| `gallery`      | Screenshots with lightbox                                     |
| `video`        | YouTube or local video                                        |
| `stack`        | Grouped technology list                                       |
| `notes`        | Decisions, learnings, challenges (`tone: "proposed"` = future) |
| `list`         | Contributions                                                 |
| `roles`        | User roles                                                    |
| `roadmap`      | Phases with done / current / planned                          |
| `achievements` | References IDs from `achievements.ts`                         |
| `links`        | Live / GitHub / demo buttons (`null` = "coming soon")         |
| `callout`      | Notes such as NDA, prototype scope, concept disclaimers       |

Any block can have a `pending: "…"` note, which renders as a clearly marked "Content pending" box until you remove it.

Icons are referenced by name (e.g. `icon: "database"`). The available names are listed in `IconName` in `types.ts`.

---

## Design system

- Colours, fonts, radii and animations are defined once in `src/app/globals.css` (`@theme`).
- Fonts: **Geist** (sans) and **JetBrains Mono** (labels and metadata), self-hosted via `next/font`.
- Every animation respects `prefers-reduced-motion`. Scroll reveals never hide content that is already on screen, or content when JavaScript is unavailable.
