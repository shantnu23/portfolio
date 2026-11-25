import { Mail } from "lucide-react";
import type { ComponentType } from "react";
import { links } from "@/content/profile";
import { DiscordIcon, GitHubIcon, LinkedInIcon } from "@/components/ui/BrandIcons";
import { cn } from "@/lib/utils";

export type Social = {
  key: "email" | "github" | "linkedin" | "discord";
  label: string;
  /** Human-readable value, e.g. the email address or handle. */
  display: string | null;
  href: string | null;
  Icon: ComponentType<{ className?: string }>;
};

const MailIcon = ({ className }: { className?: string }) => <Mail className={className} strokeWidth={1.6} aria-hidden="true" />;

function handleFrom(url: string | null) {
  if (!url) return null;
  try {
    const u = new URL(url);
    return (u.hostname.replace(/^www\./, "") + u.pathname).replace(/\/$/, "");
  } catch {
    return url;
  }
}

/** All contact channels, in display order. `href` is null when not supplied yet. */
export function getSocials(): Social[] {
  return [
    { key: "email", label: "Email", display: links.email, href: `mailto:${links.email}`, Icon: MailIcon },
    { key: "github", label: "GitHub", display: handleFrom(links.github), href: links.github, Icon: GitHubIcon },
    { key: "linkedin", label: "LinkedIn", display: handleFrom(links.linkedin), href: links.linkedin, Icon: LinkedInIcon },
    {
      key: "discord",
      label: "Discord",
      display: links.discordUsername ?? handleFrom(links.discord),
      href: links.discord,
      Icon: DiscordIcon,
    },
  ];
}

/** Compact icon row. Channels without a link are omitted. */
export function SocialIconRow({ className }: { className?: string }) {
  const items = getSocials().filter((s) => s.href);
  return (
    <ul className={cn("flex items-center gap-1", className)}>
      {items.map(({ key, label, href, Icon }) => {
        const external = !href!.startsWith("mailto:");
        return (
          <li key={key}>
            <a
              href={href!}
              aria-label={label}
              title={label}
              className="inline-flex size-10 items-center justify-center rounded-full text-muted transition-colors hover:bg-white/[0.05] hover:text-fg"
              {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            >
              <Icon className="size-[18px]" />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
