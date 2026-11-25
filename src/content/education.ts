export type Education = {
  institution: string;
  campus?: string;
  short: string;
  program: string;
  mode: string;
  /** Status line — avoid inventing dates. */
  status: string;
  details: { label: string; value: string }[];
  note?: string;
};

export const education: Education[] = [
  {
    institution: "Birla Institute of Technology, Mesra",
    short: "BIT Mesra",
    program: "B.Tech in Computer Science and Engineering",
    mode: "Full-time",
    status: "Final-year undergraduate",
    // Update the CGPA here when you have a newer figure.
    details: [
      { label: "CGPA", value: "9" },
      { label: "Graduating", value: "2027" },
    ],
  },
  {
    institution: "Indian Institute of Technology Madras",
    short: "IIT Madras",
    program: "BS in Data Science and Applications",
    mode: "Online · self-paced",
    status: "Pursuing · foundation level completed",
    details: [{ label: "Milestone", value: "Foundation ✓" }],
    note: "Park_Here and MediFix were built for the programme's Modern Application Development courses.",
  },
];
