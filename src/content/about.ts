/**
 * About copy — used on the homepage (short) and /about (full).
 * Supports **bold** for emphasis.
 */
export const about = {
  heading: "Studying computer science. Learning it by building.",
  /** Shown on the homepage and /about. The first paragraph is styled as a lead. */
  paragraphs: [
    "I'm a final-year Computer Science student at BIT Mesra, Jaipur, and much of what I know comes from building things — **multi-agent AI systems, full-stack applications, robotics simulations, and blockchain projects.**",
    "I'm naturally curious about how things work under the hood. Whether it's understanding how AI agents make decisions, how different parts of a system communicate, or how an idea becomes something functional, I enjoy figuring out the details rather than just getting things to work.",
    "What excites me most is finding ways to **leverage AI to solve real-world problems, automate repetitive work, and make everyday processes faster and more efficient.** Lately, I've also been exploring AI-assisted development — learning how to work effectively with AI while staying in control of what I build.",
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
