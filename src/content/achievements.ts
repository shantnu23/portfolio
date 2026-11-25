export type Achievement = {
  id: string;
  title: string;
  event: string;
  year?: string;
  description: string;
  /** Slug of a related project, if any. */
  project?: string;
  /** Optional certificate / announcement link. */
  href?: string | null;
};

/** Most recent first. */
export const achievements: Achievement[] = [
  {
    id: "gate-2026",
    title: "Qualified · 95+ percentile",
    event: "GATE 2026 (Computer Science)",
    year: "2026",
    description: "Qualified the Graduate Aptitude Test in Engineering in Computer Science with a 95+ percentile.",
    href: null,
  },
  {
    id: "battle-of-bytes",
    title: "First Position",
    event: "Battle of Bytes, BIT Mesra",
    year: "2025",
    description: "Secured first position at Battle of Bytes 2025.",
    href: null,
  },
  {
    id: "techx",
    title: "First Position · two years running",
    event: "TechX Project Exhibition, BIT Mesra",
    year: "2025–26",
    description: "SolarChain took first position at the TechX project exhibition in 2025, and again in 2026.",
    project: "solarchain",
    href: null,
  },
  {
    id: "road2impact",
    title: "Runners-up",
    event: "Algorand Road2Impact · Algorand India Summit, Hyderabad",
    year: "2024",
    description: "SolarChain finished as runners-up in the Road2Impact Developer Challenge, presented on stage at the Algorand India Summit.",
    project: "solarchain",
    href: null,
  },
  {
    id: "sih",
    title: "College Shortlist",
    event: "Smart India Hackathon",
    // Add the year if you'd like it shown, e.g. "2024".
    description: "SolarChain was shortlisted at the college level for Smart India Hackathon.",
    project: "solarchain",
    href: null,
  },
];

export const getAchievements = (ids: string[]) =>
  ids.map((id) => achievements.find((a) => a.id === id)).filter((a): a is Achievement => Boolean(a));
