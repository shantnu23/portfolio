import type { IconName } from "./types";

export type SkillGroup = {
  title: string;
  icon: IconName;
  items: string[];
  /**
   * Where these skills were actually used. Links point to case studies.
   * This is the evidence behind the list — no proficiency percentages.
   */
  appliedIn: { label: string; href: string }[];
};

export const skills: SkillGroup[] = [
  {
    title: "Languages",
    icon: "file-text",
    items: ["Python", "C", "C++", "Java", "JavaScript", "TypeScript", "SQL"],
    appliedIn: [],
  },
  {
    title: "AI & LLM Engineering",
    icon: "bot",
    items: ["LangChain", "LangGraph", "RAG", "LLM APIs", "FAISS", "Vector databases", "Agentic workflows", "Prompt engineering", "MCP", "NumPy", "Pandas"],
    appliedIn: [{ label: "Technology Mindz", href: "/experience/technology-mindz" }],
  },
  {
    title: "Frontend & Backend",
    icon: "layers",
    items: ["React", "Vue.js", "Flask", "Node.js", "Express", "REST APIs"],
    appliedIn: [
      { label: "Beema Ghar", href: "/experience/beema-ghar" },
      { label: "MediFix", href: "/projects/medifix" },
      { label: "Park_Here", href: "/projects/park-here" },
    ],
  },
  {
    title: "Databases & Infrastructure",
    icon: "database",
    items: ["PostgreSQL", "MongoDB", "SQLite", "Redis", "Celery", "Prisma", "SQLAlchemy", "Git", "GitHub", "Docker", "Linux shell"],
    appliedIn: [
      { label: "Beema Ghar", href: "/experience/beema-ghar" },
      { label: "MediFix", href: "/projects/medifix" },
    ],
  },
  {
    title: "Blockchain",
    icon: "blocks",
    items: ["Algorand", "AlgoKit", "Pera Wallet", "Smart contracts"],
    appliedIn: [{ label: "SolarChain", href: "/projects/solarchain" }],
  },
  {
    title: "Robotics & Simulation",
    icon: "radar",
    items: ["ROS 2", "Nav2", "Gazebo Harmonic", "ArduPilot SITL", "Autonomous navigation"],
    appliedIn: [{ label: "VigilRonyx AI", href: "/experience/vigilronyx" }],
  },
];
