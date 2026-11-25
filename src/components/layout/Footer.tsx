import Link from "next/link";
import { experiences } from "@/content/experience";
import { profile, site } from "@/content/profile";
import { projects } from "@/content/projects";
import { Monogram } from "@/components/ui/Monogram";
import { SocialIconRow } from "@/components/shared/socials";
import { NAV_ITEMS } from "./nav";

export function Footer() {
  const year = new Date().getFullYear();
  const columns = [
    { title: "Site", items: NAV_ITEMS.map((n) => ({ label: n.label, href: n.href })) },
    { title: "Experience", items: experiences.map((e) => ({ label: e.company, href: `/experience/${e.slug}` })) },
    { title: "Projects", items: projects.map((p) => ({ label: p.name, href: `/projects/${p.slug}` })) },
  ];

  return (
    <footer className="relative mt-24 border-t border-line">
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-signal/40 to-transparent" />
      <div className="container-page grid gap-12 py-16 md:grid-cols-[1.4fr_repeat(3,1fr)]">
        <div className="max-w-xs">
          <Link href="/" className="inline-flex items-center gap-3 rounded-md">
            <Monogram className="size-9 text-fg" />
            <span className="font-medium tracking-tight">{profile.name}</span>
          </Link>
          <p className="mt-4 text-sm leading-relaxed text-muted">{profile.headline}</p>
          <SocialIconRow className="mt-5 -ml-2.5" />
        </div>
        {columns.map((col) => (
          <nav key={col.title} aria-label={`Footer — ${col.title}`}>
            <p className="label-mono text-faint">{col.title}</p>
            <ul className="mt-4 space-y-2.5">
              {col.items.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-muted transition-colors hover:text-fg">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <div className="border-t border-line">
        <div className="container-page flex flex-col gap-2 py-6 text-xs text-faint sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {profile.name}. All rights reserved.
          </p>
          <p className="font-mono tracking-wide">
            <span className="mr-2 inline-block size-1.5 rounded-full bg-signal/70 align-middle" aria-hidden="true" />
            Last updated {site.lastUpdated}
          </p>
        </div>
      </div>
    </footer>
  );
}
