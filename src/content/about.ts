/**
 * About copy — used on the homepage (short) and /about (full).
 * Supports **bold** for emphasis.
 */
export const about = {
  heading: "Studying computer science. Learning it by building.",
  /** First paragraph is shown on the homepage; all are shown on /about. */
  paragraphs: [
    "I'm in the final year of a B.Tech in Computer Science at BIT Mesra, and most of what I know has come from building alongside it — a **multi-agent AI workflow**, an **insurance-policy platform**, **robotics simulations**, and a **blockchain prototype** that finished runners-up at Algorand Road2Impact.",
    "What I enjoy most is understanding how a system works underneath: how an agent decides what to do next, how data should be modelled before the first endpoint is written, how a robot reacts to the obstacle in front of it. That understanding is what turns an idea into an implementation.",
    "Alongside the B.Tech, I'm pursuing IIT Madras's BS in Data Science and Applications — the programme behind Park_Here and MediFix.",
  ],

  /** Optional photo on /about. Set to null to show the monogram card instead. */
  photo: {
    src: "/media/about/algorand-summit-2024.jpg",
    alt: "Shantnu Saxena speaking at a podium on stage at the Algorand India Summit",
    width: 1000,
    height: 562,
    caption: "Presenting at the Algorand India Summit, Hyderabad · 2024",
  } as { src: string; alt: string; width: number; height: number; caption?: string } | null,

  /** Positions of responsibility on /about. */
  leadership: [
    {
      role: "Student Coordinator, Tech Team",
      org: "Cyber Security Club — Student Branch, BIT Mesra",
      period: "Mar 2025 – Present",
      detail: "Focus areas: blockchain security, ethical hacking, network security, and blockchain mining & sustainability.",
    },
    {
      role: "Internship Coordinator",
      org: "Institute Innovation Council, BIT Mesra",
      period: "Sep 2025 – Present",
      detail: null as string | null,
    },
  ],

  /** "How I work" principles on /about. */
  principles: [
    {
      title: "Understand the system first",
      description: "Before writing code I want to know where the data comes from, where it goes, and what can fail along the way.",
    },
    {
      title: "Get to a working version",
      description: "A modest system that runs end to end teaches more than an ambitious one that only exists as a diagram.",
    },
    {
      title: "Be honest about the state of things",
      description: "Prototype, academic project or shipped product — I'd rather describe work as what it is. You'll see that throughout this site.",
    },
  ],
};
