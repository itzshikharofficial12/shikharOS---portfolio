export const projectFiles = ["README.md", "architecture.ts", "gallery.ts", "tech-stack.json"] as const;

export type ProjectFile = (typeof projectFiles)[number];

export type WorkspaceProject = {
  description: string;
  galleryImage: string;
  githubHref: string;
  id: string;
  liveHref: string;
  name: string;
  status: string;
};

export const workspaceProjects: readonly WorkspaceProject[] = [
  {
    description: "Spatial workflow infrastructure for creative teams.",
    galleryImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1600&q=85",
    githubHref: "https://github.com/itzshikharofficial12",
    id: "celestia-os",
    liveHref: "https://celestiastudios.in",
    name: "celestia-os",
    status: "building",
  },
//   {
//     description: "A focused interface for shipping product experiments with clarity.",
//     galleryImage: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1600&q=85",
//     githubHref: "https://github.com/itzshikharofficial12",
//     id: "aether-labs",
//     liveHref: "https://github.com/itzshikharofficial12",
//     name: "aether-labs",
//     status: "released",
//   },
];

export type ShowcaseProject = {
  accentColor: "green" | "blue" | "yellow" | "red" | "violet";
  builtWith: string;
  caseStudyHref: string;
  demoHref: string;
  description: string;
  githubHref: string;
  id: string;
  image: string;
  imageAlt: string;
  live: boolean;
  metrics: readonly { label: string; value: string }[];
  status: "In Progress" | "Live" | "Shipped";
  subtitle: string;
  techStack: readonly string[];
  title: string;
  version: string;
  year: string;
};

export const showcaseProjects: readonly ShowcaseProject[] = [
  {
    accentColor: "green",
    builtWith: "Next.js + React",
    caseStudyHref: "#contact",
    demoHref: "https://orbit.celestiastudios.in",
    description: "A client management system that turns fragmented conversations, deals, and delivery signals into one calm, visible operating picture for growing teams.",
    githubHref: "https://github.com/itzshikharofficial12/",
    id: "orbit-crm",
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1800&q=88",
    imageAlt: "Orbit CRM application dashboard on a laptop display",
    live: true,
    metrics: [{ label: "Clients", value: "24+" }, { label: "Projects managed", value: "120+" }, { label: "Uptime", value: "99.9%" }],
    status: "In Progress",
    subtitle: "Client Management Platform",
    techStack: ["Next.js", "React", "TypeScript", "Prisma", "PostgreSQL", "Motion"],
    title: "Orbit CRM (PVT)",
    version: "v2.3",
    year: "2026",
  },
  {
    accentColor: "blue",
    builtWith: "Next.js + TypeScript",
    caseStudyHref: "#contact",
    demoHref: "https://celestiastudios.in",
    description: "A spatial studio environment designed to help creative teams keep ideas, reviews, assets, and project momentum connected without adding operational noise.",
    githubHref: "https://github.com/itzshikharofficial12",
    id: "celestia-studios",
    image: "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=1800&q=88",
    imageAlt: "Celestia Studios visual collaboration interface on a tablet",
    live: true,
    metrics: [{ label: "Studios", value: "18" }, { label: "Assets tracked", value: "8.4k" }, { label: "Review time", value: "-42%" }],
    status: "Live",
    subtitle: "Creative Operations Suite",
    techStack: ["Next.js", "TypeScript", "Tailwind", "Node.js", "Docker"],
    title: "Celestia Studios",
    version: "v1.8",
    year: "2025",
  },
  {
    accentColor: "violet",
    builtWith: "React + Node.js",
    caseStudyHref: "#contact",
    demoHref: "https://streamify-taupe.vercel.app/",
    description: "A deliberate streaming experience that puts discovery and listening first, with a responsive recommendation system shaped around moments instead of metrics.",
    githubHref: "https://github.com/itzshikharofficial12/streamify",
    id: "streamify",
    image: "https://images.unsplash.com/photo-1619983081563-430f63602796?auto=format&fit=crop&w=1800&q=88",
    imageAlt: "Streamify music application on a phone and desktop screen",
    live: false,
    metrics: [{ label: "Curated mixes", value: "340+" }, { label: "Daily listeners", value: "12k" }, { label: "Skip rate", value: "4.8%" }],
    status: "Shipped",
    subtitle: "Intentional Music Discovery",
    techStack: ["React", "TypeScript", "Node.js", "PostgreSQL", "Motion"],
    title: "Streamify",
    version: "v1.4",
    year: "2025",
  },
//   {
//     accentColor: "yellow",
//     builtWith: "Next.js + Node.js",
//     caseStudyHref: "#contact",
//     demoHref: "https://github.com/itzshikharofficial12",
//     description: "An automation control plane that makes complex AI workflows inspectable, letting teams move from one-off prompts to reliable systems with human judgment built in.",
//     githubHref: "https://github.com/itzshikharofficial12",
//     id: "signal-ai",
//     image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1800&q=88",
//     imageAlt: "Signal AI workflow analytics dashboard on a laptop",
//     live: false,
//     metrics: [{ label: "Workflows", value: "68" }, { label: "Tasks automated", value: "1.2m" }, { label: "Review rate", value: "100%" }],
//     status: "In Progress",
//     subtitle: "AI Automation Control Plane",
//     techStack: ["Next.js", "TypeScript", "Node.js", "Prisma", "Docker"],
//     title: "Signal AI",
//     version: "v0.9",
//     year: "2026",
//   },
  {
    accentColor: "red",
    builtWith: "Next.js + Three.js",
    caseStudyHref: "#contact",
    demoHref: "https://shikhars-portfolio-six.vercel.app/",
    description: "An expressive personal operating system for presenting meaningful work, combining narrative, interaction, and technical detail in one continuously evolving space.",
    githubHref: "https://github.com/itzshikharofficial12/shikharOS---portfolio",
    id: "shikhar-os",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1800&q=88",
    imageAlt: "SHIKHAR OS portfolio interface displayed in a modern workspace",
    live: true,
    metrics: [{ label: "Projects", value: "05" }, { label: "Lighthouse", value: "100" }, { label: "Interfaces", value: "24" }],
    status: "Live",
    subtitle: "Personal Product Portfolio",
    techStack: ["Next.js", "React", "Tailwind", "Three.js", "Motion"],
    title: "SHIKHAR OS",
    version: "v2.0",
    year: "2026",
  },
];