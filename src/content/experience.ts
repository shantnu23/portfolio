import type { Experience } from "./types";

/**
 * Internships, most recent first (this order is used everywhere).
 *
 * Each entry's `sections` array is the full case study: add, remove or
 * reorder blocks freely — numbering and the side navigation update
 * automatically. See `types.ts` for every available block type.
 */
export const experiences: Experience[] = [
  /* ---------------------------------------------------------------- */
  /*  Beema Ghar — product-engineering case study                      */
  /* ---------------------------------------------------------------- */
  {
    slug: "beema-ghar",
    company: "Beema Ghar",
    role: "SDE Intern",
    start: "2026-06",
    end: "2026-08",
    domain: "Product Engineering",
    summary:
      "Architected an API-first insurance-policy management platform — React on a Node.js/Express API, PostgreSQL schemas via Prisma, and an OCR pipeline that extracts policy data from documents.",
    tech: ["React", "Node.js", "Express", "PostgreSQL", "Prisma", "JWT", "Cloudinary", "Tesseract.js", "Groq API"],
    accent: "pulse",
    layout: "product",
    website: null,
    // Deployed application — enables "Visit live website".
    liveUrl: "https://insurance-policy-management-platform-1.onrender.com/login",
    overview:
      "An API-first insurance-policy management platform: a structured vault for a family's policies, with dependents, family-floater cover and renewals modelled explicitly, and OCR to help get policy details out of documents and into the system.",
    facts: [
      { label: "Role", value: "SDE Intern" },
      { label: "Timeline", value: "Jun – Aug 2026" },
      { label: "Programme", value: "iStart · Govt. Dept. of IT" },
      { label: "Focus", value: "Full-stack · API design · Data modelling" },
    ],
    cover: {
      src: "/media/experience/beema-ghar/dashboard.png",
      alt: "Insurance Vault dashboard showing active policies, annual premium, total coverage and policy cards",
      width: 1243,
      height: 640,
    },
    sections: [
      {
        type: "prose",
        title: "Product Overview",
        heading: "Insurance information is scattered across paper, PDFs and inboxes.",
        body: [
          "A household usually holds several policies — health, life, vehicle — each with its own documents, renewal dates and covered members. That information tends to live in paper files and email attachments, which makes simple questions surprisingly hard: who is covered, by what, and what renews next?",
          "The platform gives that information a structured home. Policies are stored in a vault organised around the family, relationships between members and policies are modelled explicitly, and renewals are tracked so they don't slip by.",
        ],
        aside: {
          title: "Built around",
          items: ["Families, not single users", "Documents as a source of data", "An API any client can use"],
        },
      },
      {
        type: "gallery",
        title: "Application Preview",
        intro: "Screens from the application. Personal details in the sample data are blurred.",
        layout: "carousel",
        images: [
          {
            src: "/media/experience/beema-ghar/dashboard.png",
            alt: "Insurance Vault dashboard: totals for active policies, annual premium, total coverage and policies expiring in 30 days, filters by insurance type, and a card for each policy with premium, coverage and next payment date.",
            width: 1243,
            height: 640,
            caption: "Policy vault — totals, filters by type and a card per policy",
          },
          {
            src: "/media/experience/beema-ghar/family.png",
            alt: "Family Management screen: a form to add a family member or business, and lists of the primary account holder, account nominee, family members and businesses.",
            width: 1000,
            height: 634,
            caption: "Family management — dependents, nominees and businesses linked to policies",
          },
          {
            src: "/media/experience/beema-ghar/upload.png",
            alt: "Upload Insurance Document screen with a drag-and-drop area, a selected PDF and a success message saying it is redirecting to verification.",
            width: 987,
            height: 574,
            caption: "Document upload — drop in a policy PDF or photo",
          },
          {
            src: "/media/experience/beema-ghar/ocr-extraction.png",
            alt: "Verification screen: the uploaded policy document on the left (blurred) and the fields extracted by OCR on the right, including policy type, owner, payment mode, nominee details, policy number, insurer and insured name.",
            width: 1077,
            height: 637,
            caption: "OCR verification — extracted fields shown beside the source document for review",
          },
        ],
      },
      {
        type: "features",
        title: "Core Features",
        columns: 3,
        items: [
          {
            icon: "folder-lock",
            title: "Policy vault",
            description: "A single, organised place for every policy and its supporting documents.",
          },
          {
            icon: "users",
            title: "Family-oriented organisation",
            description: "Policies are grouped around a family, so each member's cover is visible in context.",
          },
          {
            icon: "network",
            title: "Dependents & family floater",
            description: "Relationships where one policy covers several members are modelled directly in the data.",
          },
          {
            icon: "calendar-clock",
            title: "Renewal tracking",
            description: "Upcoming renewals are surfaced so policies don't lapse unnoticed.",
          },
          {
            icon: "scan-text",
            title: "OCR-assisted extraction",
            description: "Text is read from uploaded policy documents to help fill in policy details.",
          },
          {
            icon: "shield",
            title: "Role-based access",
            description: "JWT authentication with role checks controlling who can see and change what.",
          },
        ],
      },
      {
        type: "flow",
        title: "Technical Architecture",
        heading: "A React client on top of an API that owns the data.",
        intro:
          "The frontend talks to the backend only through REST endpoints. Authentication, authorisation and all data access live behind the API, with third-party services used for storage, OCR and LLM assistance.",
        tiers: [
          { label: "Client", nodes: [{ title: "React", detail: "Vault, family & renewal views" }] },
          {
            label: "API",
            nodes: [
              { title: "Node.js + Express", detail: "REST endpoints" },
              { title: "JWT", detail: "Auth & role checks" },
            ],
          },
          {
            label: "Data",
            nodes: [{ title: "PostgreSQL", detail: "via Prisma ORM" }],
          },
          {
            label: "Services",
            nodes: [
              { title: "Cloudinary", detail: "Document storage" },
              { title: "Tesseract.js", detail: "OCR" },
              { title: "Groq API", detail: "LLM assistance" },
            ],
          },
        ],
        note: "Simplified view — not a full deployment diagram.",
      },
      {
        type: "list",
        title: "My Contributions",
        heading: "What I worked on",
        items: [
          "**Architected the platform API-first** — a React frontend on a Node.js/Express backend, with every capability exposed through REST endpoints.",
          "**Built an automated OCR pipeline** with Tesseract.js and the Groq API for real-time document extraction and data classification.",
          "**Designed the PostgreSQL schemas with Prisma ORM** — families, dependents, family-floater policies and renewals.",
          "**Implemented JWT authentication** and role-based access control.",
          "**Integrated Cloudinary** for secure document storage.",
        ],
        pending:
          "Add detail on specific decisions — e.g. how the family-floater relationship was modelled, or how OCR output is reviewed before saving.",
      },
      {
        type: "links",
        title: "Live Application",
        heading: "See it running",
        links: [
          {
            label: "Visit live website",
            href: "https://insurance-policy-management-platform-1.onrender.com/login",
            kind: "live",
            pendingLabel: "Live link coming soon",
          },
        ],
      },
    ],
    seoDescription:
      "SDE Internship at Beema Ghar — an API-first insurance-policy management platform built with React, Express, PostgreSQL and Prisma.",
  },

  /* ---------------------------------------------------------------- */
  /*  VigilRonyx — NDA, deliberately minimal                          */
  /* ---------------------------------------------------------------- */
  {
    slug: "vigilronyx",
    company: "VigilRonyx AI",
    role: "SDE Intern",
    start: "2026-05",
    end: "2026-07",
    domain: "Robotics & Simulation",
    summary:
      "Engineered autonomous navigation and obstacle-avoidance software for simulated rovers, on a software-in-the-loop setup built with ROS 2 (Nav2), ArduPilot SITL and Gazebo Harmonic. Further detail is covered by an NDA.",
    tech: ["ROS 2", "Nav2", "ArduPilot SITL", "Gazebo Harmonic", "SITL simulation"],
    accent: "signal",
    layout: "minimal",
    confidential: true,
    website: null,
    overview:
      "As an SDE Intern at VigilRonyx AI, I engineered autonomous navigation and obstacle-avoidance software for simulated rovers, and integrated ROS 2 (Nav2) with ArduPilot SITL and Gazebo Harmonic to set up a software-in-the-loop testing environment.",
    facts: [
      { label: "Role", value: "SDE Intern" },
      { label: "Timeline", value: "May – Jul 2026" },
      { label: "Domain", value: "Autonomous rovers" },
      { label: "Testing", value: "Software-in-the-loop" },
    ],
    sections: [
      {
        type: "callout",
        tone: "confidential",
        title: "Confidentiality",
        body: "This internship is covered by a non-disclosure agreement. This page stays at the level of the problem domain and the open-source tools involved; it does not describe internal systems, algorithms, clients or results.",
      },
      {
        type: "prose",
        title: "Problem Domain",
        heading: "Robots have to move through spaces they don't control.",
        body: [
          "An autonomous robot needs to reach a goal while avoiding whatever is in its way — including obstacles that weren't there a moment ago. Getting that behaviour right takes many iterations.",
          "Simulation makes those iterations cheap and safe: environments can be rebuilt, scenarios replayed and behaviour observed long before anything runs on physical hardware.",
        ],
      },
      {
        type: "features",
        title: "Areas of Work",
        columns: 3,
        items: [
          {
            icon: "navigation",
            title: "Autonomous navigation",
            description: "Software that moves a simulated rover towards its goals, built on ROS 2 and Nav2.",
          },
          {
            icon: "radar",
            title: "Obstacle avoidance",
            description: "Detecting and steering around obstacles encountered along the way.",
          },
          {
            icon: "cpu",
            title: "Software-in-the-loop testing",
            description: "ROS 2 (Nav2), ArduPilot SITL and Gazebo Harmonic integrated into one simulation test environment.",
          },
        ],
      },
      {
        type: "stack",
        title: "Technologies",
        groups: [
          { label: "Robotics framework", items: ["ROS 2", "Nav2"] },
          { label: "Autopilot", items: ["ArduPilot SITL"] },
          { label: "Simulation", items: ["Gazebo Harmonic"] },
        ],
      },
      {
        type: "notes",
        title: "What I Learned",
        items: [
          {
            title: "Simulation-first development",
            description: "Testing behaviour in simulation before hardware changes how quickly ideas can be tried and discarded.",
          },
          {
            title: "Thinking in nodes and topics",
            description: "ROS 2 encourages decomposing a robot into small communicating processes — a useful way to reason about any system.",
          },
          {
            title: "Designing for the unexpected",
            description: "Autonomous behaviour is judged by how it handles the cases nobody planned for, not the happy path.",
          },
        ],
      },
    ],
    seoDescription:
      "SDE Internship at VigilRonyx AI — autonomous navigation and obstacle avoidance for simulated rovers, with ROS 2 (Nav2), ArduPilot SITL and Gazebo Harmonic.",
  },

  /* ---------------------------------------------------------------- */
  /*  Technology Mindz — architecture-first case study                */
  /* ---------------------------------------------------------------- */
  {
    slug: "technology-mindz",
    company: "Technology Mindz",
    role: "AI Intern",
    start: "2025-05",
    end: "2025-07",
    location: "Jaipur",
    domain: "AI Engineering",
    summary:
      "Built an AI-powered lead qualification and scheduling system with LangGraph and Groq LLMs — profiling inbound leads, nurturing warm ones with RAG-generated email, and booking meetings for hot ones.",
    tech: ["Python", "LangGraph", "LangChain", "Groq", "Llama 3.3 70B", "FAISS", "Sentence Transformers", "RAG", "MongoDB"],
    accent: "signal",
    layout: "architecture",
    website: null,
    // Repository — shows a "View source" button in the hero.
    repoUrl: "https://github.com/shantnu23/AI-Powered-Lead-Qualification-System",
    overview:
      "An AI-powered system for lead qualification, nurturing and meeting scheduling, built as a graph of specialised agents. Each lead is profiled, classified as hot or warm and routed to the stage that fits it — with retrieval grounding outreach in relevant context, and integrations handling email, WhatsApp and calendar bookings.",
    facts: [
      { label: "Role", value: "AI Intern" },
      { label: "Timeline", value: "May – Jul 2025" },
      { label: "Location", value: "Jaipur" },
      { label: "Focus", value: "Multi-agent systems · RAG" },
    ],
    sections: [
      {
        type: "prose",
        title: "The Problem",
        heading: "Qualifying leads is repetitive judgement work.",
        body: [
          "Every inbound lead needs the same early decisions: is this a real fit, how ready are they, and what should happen next? Done by hand, that triage is slow and inconsistent — and follow-ups depend on someone remembering to send them.",
          "The goal was to automate that early pipeline: **profile** each lead, **decide** on a path, then either **continue the conversation** with relevant context or **move straight to booking** a meeting.",
        ],
        aside: {
          title: "Workflow at a glance",
          items: ["Lead data enters", "Lead Profiler classifies", "Warm → Lead Nurture", "Hot → Meeting Scheduler"],
        },
      },
      {
        type: "list",
        title: "My Contributions",
        heading: "What I built",
        items: [
          "**Built the lead qualification and scheduling system** with LangGraph and Groq LLMs — estimated to automate roughly **70–80% of manual sales-workflow tasks**.",
          "**Engineered the Lead Profiler, Nurture and Meeting Scheduler agents**, with hot/warm routing logic across the multi-agent workflow — bringing lead response time down **from hours to minutes**.",
          "**Implemented RAG-based email generation** with FAISS and Sentence Transformers, using retrieved context to personalise outreach.",
          "**Integrated real-time Google Meet scheduling** with WhatsApp and email notifications, so demos could be booked and followed up without manual steps.",
        ],
      },
      {
        type: "architecture",
        title: "The Architecture",
        heading: "A graph of agents with conditional routing.",
        intro:
          "The workflow is orchestrated as a LangGraph state graph. Each agent is a node; the Lead Profiler's classification decides which edge a lead follows next.",
        // Several diagrams are shown as tabs, each opening in the zoom / full-screen viewer.
        // To update: export from Excalidraw (Export image → SVG, select the area first for
        // "Only selected"), save into /public/media/experience/technology-mindz/, and set
        // width/height to the SVG's viewBox size.
        diagrams: [
          {
            label: "Core workflow",
            src: "/media/experience/technology-mindz/architecture-core.svg",
            alt: "Hand-drawn architecture: a web app takes file or text input and returns a lead qualification report; an orchestration controller passes leads to a combined lead profiler and scoring agent (LLM and rule-based scoring into hot, warm and cold), then warm leads go to the Nurture Agent for RAG-generated emails and WhatsApp follow-ups, and hot leads go to the Meeting Scheduler Agent for scheduling and invites, with engagement tracking and a feedback loop agent.",
            width: 4047,
            height: 1742,
            surface: "paper",
            note: "Excalidraw · core workflow",
          },
          {
            label: "Detailed design",
            src: "/media/experience/technology-mindz/architecture-detailed.svg",
            alt: "Detailed hand-drawn architecture: separate Lead Profiler and Lead Scoring agents, conversion prediction with LLM-based and rule-based scoring, a dynamic threshold adjuster setting hot, warm and cold bands, a Nurture Agent running a timed email, WhatsApp, final-email and newsletter sequence, a Meeting Scheduler Agent for scheduling and booking, engagement tracking, a feedback loop agent, and CRM updates.",
            width: 3795,
            height: 1742,
            surface: "paper",
            note: "Excalidraw · detailed design",
          },
          {
            label: "Quick overview",
            src: "/media/experience/technology-mindz/architecture-overview.svg",
            alt: "Simplified workflow diagram: lead data flows into the Lead Profiler, which routes warm leads to Lead Nurture (with retrieval from FAISS) and hot leads to the Meeting Scheduler (Google Calendar and Meet), with Mailgun handling email.",
            width: 1200,
            height: 640,
            surface: "dark",
            note: "Simplified overview drawn for this page.",
          },
        ],
        live: {
          // Read-only Excalidraw link, shown as an "Open in Excalidraw" button.
          // (Set embed: true to also offer it as an in-page window.)
          url: "https://excalidraw.com/#json=Ls6fkPCQdiGG63sTpBFKJ,Ar6VIED8pE-0rdgE0qE1Vg",
          title: "Technology Mindz — full architecture",
          label: "Open in Excalidraw",
        },
        annotations: [
          { title: "Ingestion", description: "Lead data enters the workflow; MongoDB is used for persistence." },
          { title: "Profiling", description: "The Lead Profiler analyses the lead with Llama 3.3 70B via Groq and assigns a classification." },
          { title: "Routing", description: "A conditional edge sends the lead to the stage that matches its classification." },
          { title: "Nurture", description: "Warm leads get personalised outreach grounded in retrieved case studies." },
          { title: "Scheduling", description: "Hot leads go straight to booking a meeting through Google Calendar and Meet." },
          { title: "Communication", description: "Emails go out through Mailgun, and WhatsApp messages through Twilio, for follow-ups and bookings." },
        ],
      },
      {
        type: "agents",
        title: "How the Agents Work",
        heading: "Three agents, each with one job.",
        items: [
          {
            name: "Lead Profiler",
            role: "Classify",
            description:
              "Reads incoming lead information and produces a structured profile with a classification — such as warm or hot — that decides the lead's next stage.",
            responsibilities: ["Analyse lead information", "Classify readiness", "Hand a structured profile to the graph"],
            tools: ["Groq", "Llama 3.3 70B", "LangChain"],
          },
          {
            name: "Lead Nurture",
            role: "Engage",
            route: "warm",
            description:
              "For warm leads, retrieves the most relevant case studies and drafts personalised outreach that references comparable work instead of generic claims.",
            responsibilities: ["Retrieve relevant case studies", "Draft personalised messages", "Send through the email workflow"],
            tools: ["FAISS", "Sentence Transformers", "Mailgun", "Twilio"],
          },
          {
            name: "Meeting Scheduler",
            role: "Convert",
            route: "hot",
            description:
              "For hot leads, skips nurturing and moves to booking: creating a calendar event with a Google Meet link and sending the invitation.",
            responsibilities: ["Create calendar events", "Attach a Meet link", "Notify by email and WhatsApp"],
            tools: ["Google Calendar", "Google Meet", "Mailgun", "Twilio"],
          },
        ],
      },
      {
        type: "features",
        title: "RAG & Integrations",
        heading: "Retrieval for context, integrations for action.",
        intro:
          "Reference material — case studies and historical lead data — is embedded with Sentence Transformers and indexed in FAISS. When the nurture agent prepares an email, it retrieves the context closest to the lead's profile and passes it to the LLM, so outreach is grounded rather than generic. External services sit at the edges of the graph: agents decide, services act.",
        columns: 3,
        items: [
          { icon: "search", title: "FAISS + Sentence Transformers", description: "Vector index over case studies for similarity search." },
          { icon: "sparkles", title: "Groq · Llama 3.3 70B", description: "Fast LLM inference for profiling and message drafting." },
          { icon: "database", title: "MongoDB", description: "Persistence for lead data." },
          { icon: "calendar", title: "Google Calendar & Meet", description: "Event creation and meeting links for hot leads." },
          { icon: "mail", title: "Mailgun", description: "Delivery for nurture emails and invitations." },
          { icon: "message", title: "Twilio · WhatsApp", description: "WhatsApp follow-ups and notifications alongside email." },
          { icon: "workflow", title: "LangGraph", description: "State graph orchestrating agents and conditional edges." },
        ],
      },
      {
        type: "notes",
        title: "Decisions & Learnings",
        heading: "What building it taught me",
        items: [
          {
            title: "Orchestrate as a graph, not a chain",
            description:
              "Modelling stages as nodes with explicit edges makes the workflow readable, and makes adding a new path a local change rather than a rewrite.",
          },
          {
            title: "Routing is only as good as classification",
            description:
              "Conditional edges are deterministic; the classification feeding them isn't. Structured, constrained outputs make routing dependable.",
          },
          {
            title: "Ground generation in retrieval",
            description:
              "Personalised outreach is far more convincing when it points at real, comparable work. Retrieval quality directly shapes message quality.",
          },
          {
            title: "Keep integrations at the edges",
            description:
              "Wrapping email and calendar services behind small interfaces keeps agents focused on decisions and makes each piece easier to test or replace.",
          },
        ],
      },
      {
        type: "notes",
        title: "Potential Extensions",
        heading: "Where it could go next",
        tone: "proposed",
        intro: "These are ideas explored or proposed during the internship — not deployed features.",
        items: [
          {
            title: "Feedback-driven prompt improvement",
            description: "A feedback node that uses outcomes of past outreach to refine prompts over time. Explored conceptually.",
          },
          {
            title: "Extending the knowledge base",
            description: "Broadening the retrieval corpus beyond case studies so nurture messages can draw on more context.",
          },
        ],
      },
    ],
    seoDescription:
      "AI Internship at Technology Mindz — a LangGraph multi-agent system for lead qualification, RAG-grounded nurturing and meeting scheduling.",
  },
];

export const getExperience = (slug: string) => experiences.find((e) => e.slug === slug);
