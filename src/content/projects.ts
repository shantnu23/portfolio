import type { Project } from "./types";

/**
 * Projects, in display order. `featured: true` puts a project on the homepage.
 * See `types.ts` for every available section block.
 */
export const projects: Project[] = [
  /* ---------------------------------------------------------------- */
  /*  SolarChain                                                       */
  /* ---------------------------------------------------------------- */
  {
    slug: "solarchain",
    name: "SolarChain",
    tagline: "Peer-to-peer solar energy trading on Algorand, with bidding-based exchange and wallet-signed transactions.",
    category: "Blockchain",
    status: { label: "Prototype · TestNet", tone: "prototype" },
    context: "Team of three · Faculty in-charge: Dr. Aparajita Pandey, Dept. of ECE, BIT Mesra",
    tech: [
      "Algorand",
      "AlgoKit",
      "Algorand Python SDK",
      "Smart contracts",
      "Pera Wallet",
      "Flask",
      "SQLAlchemy",
      "Python",
      "Pytest",
      "Docker",
      "Jinja",
      "bcrypt",
    ],
    accent: "solar",
    artwork: "solar",
    featured: true,
    links: { github: "https://github.com/shantnu23/SolarChain_", live: "https://solar-chain-delta.vercel.app" },
    overview:
      "SolarChain is a peer-to-peer energy trading prototype: solar producers and consumers take part in an energy exchange where bids, wallet signatures and smart-contract logic replace a central intermediary.",
    facts: [
      { label: "Team", value: "Three members" },
      { label: "Network", value: "Algorand TestNet" },
      { label: "Recognition", value: "Road2Impact 2024 · Runners-up" },
      { label: "Award", value: "TechX · First, 2025 & 2026" },
    ],
    sections: [
      {
        type: "callout",
        tone: "info",
        title: "Prototype scope",
        body: "SolarChain runs on Algorand TestNet. It demonstrates the trading flow and does not settle real money or trade real energy.",
      },
      {
        type: "prose",
        title: "The Problem",
        heading: "Surplus solar energy has few direct buyers.",
        body: [
          "Households with rooftop solar often produce more energy than they use, but have few ways to sell that surplus directly to the people around them. Exchange usually runs through a central intermediary that sets the terms.",
          "SolarChain explores a peer-to-peer alternative: producers and consumers trade directly, prices emerge through bidding, and every trade is backed by a blockchain transaction both sides can verify.",
        ],
      },
      {
        type: "steps",
        title: "How It Works",
        heading: "From surplus to a signed trade.",
        items: [
          { title: "Connect a wallet", description: "Participants connect a Pera Wallet on Algorand TestNet." },
          { title: "Offer energy", description: "Producers make surplus energy available on the exchange." },
          { title: "Place bids", description: "Consumers bid for the energy they want." },
          { title: "Resolve the trade", description: "Bids resolve into a trade between a producer and a consumer." },
          { title: "Record on-chain", description: "The trade is executed as a wallet-signed transaction with smart-contract logic." },
        ],
      },
      {
        type: "video",
        title: "Demo",
        heading: "Watch the demo",
        intro: "A one-minute explainer of the idea: how households with surplus rooftop solar could trade energy directly with their neighbours.",
        // Local file (H.264, faststart). To switch to YouTube instead:
        //   video: { kind: "youtube", url: "https://youtu.be/…", title: "SolarChain demo" },
        video: {
          kind: "file",
          src: "/media/projects/solarchain/demo.mp4",
          poster: "/media/projects/solarchain/poster.jpg",
          title: "SolarChain demo",
        },
      },
      {
        type: "flow",
        title: "Technology & Architecture",
        heading: "Off-chain application, on-chain settlement.",
        intro:
          "A Flask application manages the exchange and its data through SQLAlchemy, while trades are executed on Algorand: users sign transactions in Pera Wallet and smart contracts written with AlgoKit and the Algorand Python SDK provide the on-chain logic.",
        tiers: [
          {
            label: "Client",
            nodes: [
              { title: "Web interface", detail: "Listings & bids" },
              { title: "Pera Wallet", detail: "Transaction signing" },
            ],
          },
          { label: "Application", nodes: [{ title: "Flask", detail: "Exchange logic" }, { title: "SQLAlchemy", detail: "Off-chain data" }] },
          {
            label: "Algorand TestNet",
            nodes: [
              { title: "Smart contracts", detail: "AlgoKit · Python SDK" },
              { title: "Transactions", detail: "Verifiable record" },
            ],
          },
        ],
      },
      {
        type: "features",
        title: "Key Features",
        columns: 2,
        items: [
          { icon: "zap", title: "Peer-to-peer exchange", description: "Producers and consumers trade directly with each other." },
          { icon: "gavel", title: "Bidding-based pricing", description: "Prices are set through bids rather than fixed tariffs." },
          { icon: "wallet", title: "Wallet integration", description: "Pera Wallet connects users and signs their transactions." },
          { icon: "blocks", title: "Smart-contract functionality", description: "On-chain logic built with AlgoKit and the Algorand Python SDK." },
        ],
      },
      {
        type: "list",
        title: "My Contributions",
        heading: "What I worked on",
        items: [
          "**Implemented the backend architecture** with Flask and SQLAlchemy.",
          "**Integrated Algorand's Pera Wallet** for mobile-first authentication and wallet-based transactions.",
          "**Deployed the initial smart contract on TestNet** using the Algorand Python SDK and AlgoKit, setting up the framework for the energy exchange.",
        ],
      },
      {
        type: "gallery",
        title: "Recognition",
        heading: "Runners-up at the Algorand India Summit, Hyderabad.",
        intro: "SolarChain finished as runners-up in the Algorand Road2Impact Developer Challenge, presented on stage at the Algorand India Summit in Hyderabad.",
        // One photo at a time with back / forward buttons; the first one shows by default.
        layout: "carousel",
        images: [
          {
            src: "/media/about/algorand-summit-2024.jpg",
            alt: "Shantnu Saxena presenting SolarChain at a podium on stage at the Algorand India Summit.",
            width: 1000,
            height: 562,
            caption: "Presenting SolarChain at the Algorand India Summit",
          },
          {
            src: "/media/projects/solarchain/road2impact-award.jpg",
            alt: "The SolarChain team being recognised on stage at the Algorand India Summit, with SolarChain and the team members' names on the screen behind them.",
            width: 1234,
            height: 915,
            caption: "Runners-up · Algorand Road2Impact 2024",
          },
          {
            src: "/media/projects/solarchain/algorand-summit-hall.jpg",
            alt: "The main hall of the Algorand India Summit in Hyderabad, with a large audience facing the stage.",
            width: 1080,
            height: 837,
            caption: "Algorand India Summit, Hyderabad",
          },
        ],
      },
      {
        type: "achievements",
        title: "Awards",
        heading: "Awards & shortlists",
        ids: ["road2impact", "techx", "sih"],
      },
      {
        type: "links",
        title: "Links",
        heading: "Explore the project",
        links: [
          { label: "Open live demo", href: "https://solar-chain-delta.vercel.app", kind: "demo", pendingLabel: "Demo link coming soon" },
          { label: "Source on GitHub", href: "https://github.com/shantnu23/SolarChain_", kind: "github", pendingLabel: "Repository link coming soon" },
        ],
      },
      {
        type: "notes",
        title: "Learnings",
        items: [
          {
            title: "Choosing what goes on-chain",
            description:
              "Deciding which data belongs in a smart contract and which belongs in a conventional database shapes the cost, speed and trust model of the whole system.",
          },
          {
            title: "Wallets are part of the UX",
            description: "Signing a transaction is a user-facing step. The flow around it needs to explain what is being approved and why.",
          },
        ],
        pending: "Add any further lessons from building or presenting SolarChain.",
      },
    ],
    seoDescription:
      "SolarChain — a peer-to-peer solar energy trading prototype on Algorand TestNet. Runners-up at Algorand Road2Impact 2024 and first at TechX in 2025 and 2026.",
  },

  /* ---------------------------------------------------------------- */
  /*  MediFix                                                          */
  /* ---------------------------------------------------------------- */
  {
    slug: "medifix",
    name: "MediFix",
    tagline: "A multi-role hospital management system with a Vue.js frontend, Flask API, background jobs and caching.",
    category: "Full Stack",
    status: { label: "Academic project", tone: "complete" },
    context: "IIT Madras · Modern Application Development",
    tech: ["Vue.js", "Flask", "Python", "SQLAlchemy", "SQLite", "Redis", "Celery", "JWT", "Chart.js", "Bootstrap"],
    accent: "ember",
    artwork: "medical",
    featured: true,
    links: { github: "https://github.com/shantnu23/MAD-2", live: null },
    overview:
      "MediFix is a multi-role hospital management system built for the IIT Madras BS programme. A Vue.js single-page app talks to a Flask REST API, with role-based access, background processing through Celery, caching with Redis and dashboards built with Chart.js.",
    facts: [
      { label: "Type", value: "Academic project" },
      { label: "Course", value: "Modern Application Development" },
      { label: "Architecture", value: "SPA + REST API" },
    ],
    sections: [
      {
        type: "prose",
        title: "Product Overview",
        heading: "One system, several kinds of users.",
        body: [
          "Hospitals run on workflows that cross roles: the people who administer the system, the people who provide care and the people who receive it all need different views of the same data.",
          "MediFix models those workflows in a single application, with each role seeing and doing only what it should.",
        ],
      },
      {
        type: "roles",
        title: "User Roles & Workflows",
        heading: "Access shaped by role",
        intro: "Every request is authenticated with JWT and checked against the user's role before it reaches the data.",
        items: [
          // Add each role, e.g.
          // { name: "Admin", description: "…", capabilities: ["…", "…"] },
        ],
        pending: "Add the user roles and what each one can do.",
      },
      {
        type: "flow",
        title: "Architecture",
        heading: "Fast requests, heavy work in the background.",
        intro:
          "The Vue.js frontend is a separate client that calls the Flask API. Automated background tasks and asynchronous reporting run on Celery workers with Redis as the broker, and Redis also provides performance caching.",
        tiers: [
          { label: "Client", nodes: [{ title: "Vue.js", detail: "Bootstrap UI" }, { title: "Chart.js", detail: "Dashboards" }] },
          { label: "API", nodes: [{ title: "Flask", detail: "REST endpoints" }, { title: "JWT", detail: "Auth & roles" }] },
          {
            label: "Data & jobs",
            nodes: [
              { title: "SQLite", detail: "via SQLAlchemy" },
              { title: "Redis", detail: "Cache & broker" },
              { title: "Celery", detail: "Background jobs" },
            ],
          },
        ],
      },
      {
        type: "features",
        title: "Core Features",
        columns: 3,
        items: [
          { icon: "shield", title: "Role-based access", description: "Separate capabilities and views for each type of user." },
          { icon: "stethoscope", title: "Hospital workflows", description: "Core hospital management flows modelled across roles." },
          { icon: "timer", title: "Background tasks", description: "Celery drives automated background tasks and asynchronous report generation." },
          { icon: "zap", title: "Caching", description: "Redis caching for frequently requested data." },
          { icon: "dashboard", title: "Reporting dashboards", description: "Chart.js visualisations for reporting." },
          { icon: "key", title: "Token authentication", description: "Stateless JWT authentication between client and API." },
        ],
      },
      {
        type: "gallery",
        title: "Screenshots",
        images: [],
        expected: ["Dashboard", "Role-specific view", "Reports"],
      },
      {
        type: "stack",
        title: "Tech Stack",
        groups: [
          { label: "Frontend", items: ["Vue.js", "Bootstrap", "Chart.js"] },
          { label: "Backend", items: ["Python", "Flask", "JWT"] },
          { label: "Data", items: ["SQLAlchemy", "SQLite"] },
          { label: "Async & caching", items: ["Celery", "Redis"] },
        ],
      },
      {
        type: "notes",
        title: "Challenges & Learnings",
        items: [
          {
            title: "Separating client and API",
            description: "Building the frontend as its own app forces the API to be explicit about every operation it allows — and who may perform it.",
          },
          {
            title: "Keeping slow work off the request path",
            description: "Handing long-running work to Celery keeps the interface responsive and makes that work easier to retry.",
          },
          {
            title: "Caching needs an invalidation story",
            description: "A cache speeds reads up only as long as it's clear when cached data stops being true.",
          },
        ],
        pending: "Add specifics — e.g. which scheduled jobs and reports run in Celery, and which endpoints are cached.",
      },
      {
        type: "links",
        title: "Repository & Demo",
        links: [
          { label: "Source on GitHub", href: "https://github.com/shantnu23/MAD-2", kind: "github", pendingLabel: "Repository link coming soon" },
        ],
      },
    ],
    seoDescription:
      "MediFix — a multi-role hospital management system built with Vue.js, Flask, SQLAlchemy, Redis and Celery for IIT Madras.",
  },

  /* ---------------------------------------------------------------- */
  /*  Park_Here                                                        */
  /* ---------------------------------------------------------------- */
  {
    slug: "park-here",
    name: "Park_Here",
    tagline: "A parking management app for lots, spots, reservations and an admin dashboard with usage charts.",
    category: "Web Application",
    status: { label: "Academic project", tone: "complete" },
    context: "IIT Madras · Modern Application Development",
    tech: ["Python", "Flask", "Jinja2", "Chart.js"],
    accent: "pulse",
    artwork: "parking",
    featured: true,
    links: { github: "https://github.com/shantnu23/PARK_HERE", live: null },
    overview:
      "Park_Here is a parking management application built for the IIT Madras BS programme. It models parking lots, their individual spots and the users who reserve them, with an administrative dashboard on top.",
    facts: [
      { label: "Type", value: "Academic project" },
      { label: "Course", value: "Modern Application Development" },
      { label: "Rendering", value: "Server-side (Flask + Jinja)" },
    ],
    sections: [
      {
        type: "prose",
        title: "The Problem",
        heading: "Parking is a coordination problem.",
        body: [
          "Drivers need to know where space is available; operators need to know how their lots are being used. Without a shared system, both sides rely on guesswork.",
          "Park_Here gives both a single source of truth: lots and spots with live status, reservations tied to users, and a dashboard that summarises how space is used.",
        ],
      },
      {
        type: "features",
        title: "Key Features",
        columns: 3,
        items: [
          { icon: "parking", title: "Lot & spot management", description: "Create parking lots and manage the spots within them." },
          { icon: "calendar-clock", title: "Reservations", description: "Users reserve spots; reservations are tracked per user." },
          { icon: "users", title: "User management", description: "Manage the users of the system." },
          { icon: "dashboard", title: "Admin dashboard", description: "An administrative view across lots, spots and users." },
          { icon: "activity", title: "Availability tracking", description: "Track whether each spot is available or occupied." },
          { icon: "chart", title: "Data visualisation", description: "Chart.js charts summarising parking usage." },
        ],
      },
      {
        type: "gallery",
        title: "Screenshots",
        images: [],
        expected: ["Admin dashboard", "Parking lot view", "Reservation flow"],
      },
      {
        type: "stack",
        title: "Technology Stack",
        groups: [
          { label: "Backend", items: ["Python", "Flask"] },
          { label: "Templating", items: ["Jinja2"] },
          { label: "Visualisation", items: ["Chart.js"] },
        ],
        pending: "Add the database and any other libraries used.",
      },
      {
        type: "prose",
        title: "Technical Explanation",
        heading: "Server-rendered, deliberately simple.",
        body: [
          "Flask routes handle each workflow and render pages with Jinja templates, so the application stays easy to run and reason about without a separate frontend build.",
          "Chart.js renders usage summaries on the admin dashboard from data prepared on the server.",
        ],
        pending: "Add implementation detail — data model, how spot status is updated, how reservations are validated.",
      },
      {
        type: "links",
        title: "Links",
        links: [
          { label: "Source on GitHub", href: "https://github.com/shantnu23/PARK_HERE", kind: "github", pendingLabel: "Repository link coming soon" },
        ],
      },
      {
        type: "notes",
        title: "Learnings",
        items: [],
        pending: "Add two or three things building Park_Here taught you.",
      },
    ],
    seoDescription:
      "Park_Here — a Flask and Jinja parking management application with reservations, an admin dashboard and Chart.js visualisations, built for IIT Madras.",
  },

  /* ---------------------------------------------------------------- */
  /*  Fam_Sync — pre-production                                        */
  /* ---------------------------------------------------------------- */
  {
    slug: "fam-sync",
    name: "Fam_Sync",
    tagline: "A family coordination app for shared plans, trips, tasks and check-ins — currently being shaped.",
    category: "Product Concept",
    status: { label: "Coming soon · Pre-production", tone: "planned" },
    context: "Personal product · In pre-production",
    tech: ["Product design", "Problem discovery"],
    accent: "signal",
    artwork: "family",
    featured: false,
    links: { github: null, live: null },
    overview:
      "Fam_Sync is a planned family coordination and communication app, inspired by the everyday logistics of keeping a family in sync. It's meant to become a genuinely useful product — not just a technical demo.",
    facts: [
      { label: "Status", value: "Pre-production" },
      { label: "Type", value: "Personal product" },
      { label: "Inspired by", value: "Real family coordination" },
    ],
    sections: [
      {
        type: "callout",
        tone: "concept",
        title: "Nothing here is built yet",
        body: "Fam_Sync is in pre-production. Everything on this page describes proposed functionality and conceptual designs — there is no released app, demo or repository yet.",
      },
      {
        type: "prose",
        title: "The Problem",
        heading: "Family logistics live in group chats.",
        body: [
          "Families coordinate constantly — who's picking up whom, when a flight lands, whether someone got home safely, who's handling which errand. That coordination is spread across group chats, calls and memory, and the important details get lost in the scroll.",
        ],
      },
      {
        type: "prose",
        title: "Product Vision",
        heading: "One shared space for a family's day-to-day.",
        body: [
          "Fam_Sync aims to bring a family's logistics into one place: where everyone is, what's planned, what needs doing and who to call in an emergency — so staying coordinated doesn't depend on scrolling back through messages.",
        ],
        pending: "Refine the vision statement in your own words.",
      },
      {
        type: "features",
        title: "Proposed Functionality",
        columns: 3,
        items: [
          { icon: "map-pin", title: "Location awareness", description: "Know where family members are when it matters.", status: "proposed" },
          { icon: "plane", title: "Trips & itineraries", description: "Share travel plans so everyone has the same details.", status: "proposed" },
          { icon: "calendar", title: "Shared calendars", description: "One view of the family's commitments.", status: "proposed" },
          { icon: "bell", title: "Family notifications", description: "Timely alerts for the things everyone needs to know.", status: "proposed" },
          { icon: "list-checks", title: "Task coordination", description: "Split errands and see what's been done.", status: "proposed" },
          { icon: "siren", title: "Emergency contacts", description: "Critical contact information, always at hand.", status: "proposed" },
          { icon: "message", title: "Family updates", description: "Lightweight updates without the group-chat noise.", status: "proposed" },
        ],
      },
      {
        type: "concept",
        title: "Concept Interface",
        heading: "An early sketch of the experience.",
        intro: "A conceptual illustration of how the pieces might come together. It is not a screenshot of a real product.",
        variant: "fam-sync",
      },
      {
        type: "prose",
        title: "Current Status",
        heading: "Pre-production.",
        body: [
          "The focus right now is on understanding the problem and shaping the product — defining scope and the core experience before development begins.",
        ],
      },
      {
        type: "roadmap",
        title: "Roadmap",
        heading: "Broad development path",
        intro: "Phases, not dates — this will be updated as the project moves forward.",
        phases: [
          { title: "Discovery & scope", description: "Clarify the problems worth solving first and define the core features.", status: "current" },
          { title: "Product & interface design", description: "Design the main flows and interface.", status: "planned" },
          { title: "MVP development", description: "Build a first working version around the core features.", status: "planned" },
          { title: "Testing & iteration", description: "Put it in front of real users and refine.", status: "planned" },
        ],
      },
    ],
    seoDescription: "Fam_Sync — a planned family coordination and communication app, currently in pre-production.",
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
