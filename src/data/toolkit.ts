export type ToolkitFilter = "All" | "Frontend" | "Backend" | "Database" | "DevOps" | "AI & Tools" | "Others";

export type ToolkitTool = {
  description: string;
  experience: string;
  icon: string;
  name: string;
  projects: string;
  website: string;
  years: string;
};

export type ToolkitCategory = {
  description: string;
  filter: Exclude<ToolkitFilter, "All">;
  icon: string;
  id: string;
  title: string;
  tools: readonly ToolkitTool[];
};

export const toolkitFilters: readonly ToolkitFilter[] = ["All", "Frontend", "Backend", "Database", "DevOps", "AI & Tools", "Others"];

export const toolkitCategories: readonly ToolkitCategory[] = [
  { id: "frontend", filter: "Frontend", icon: "Layers3", title: "Frontend", description: "Crafting responsive, accessible and delightful user experiences.", tools: [
    { name: "React", icon: "Atom", experience: "Advanced", projects: "14 shipped", years: "3 years", description: "Component systems for expressive product interfaces.", website: "https://react.dev" },
    { name: "Next.js", icon: "Triangle", experience: "Advanced", projects: "11 shipped", years: "3 years", description: "Production React with a fast, scalable application foundation.", website: "https://nextjs.org" },
    { name: "TypeScript", icon: "Type", experience: "Advanced", projects: "16 shipped", years: "3 years", description: "Reliable interfaces through clear, maintainable types.", website: "https://www.typescriptlang.org" },
    { name: "Tailwind", icon: "Wind", experience: "Advanced", projects: "15 interfaces", years: "3 years", description: "Purposeful design systems built at product speed.", website: "https://tailwindcss.com" },
    { name: "Framer Motion", icon: "Sparkles", experience: "Advanced", projects: "10 interfaces", years: "2 years", description: "Quiet motion that helps people orient and act.", website: "https://motion.dev" },
  ] },
  { id: "backend", filter: "Backend", icon: "Server", title: "Backend", description: "Designing dependable systems, APIs and product infrastructure.", tools: [
    { name: "Node.js", icon: "Hexagon", experience: "Advanced", projects: "12 shipped", years: "3 years", description: "Fast application services for modern product teams.", website: "https://nodejs.org" },
    { name: "Express", icon: "Route", experience: "Proficient", projects: "8 shipped", years: "2 years", description: "Small, focused HTTP services and API layers.", website: "https://expressjs.com" },
    { name: "REST APIs", icon: "Network", experience: "Advanced", projects: "12 APIs", years: "3 years", description: "Clear contracts that make systems easy to integrate.", website: "https://developer.mozilla.org" },
    { name: "Authentication", icon: "KeyRound", experience: "Advanced", projects: "8 systems", years: "2 years", description: "Safe, thoughtful access flows for real users.", website: "https://authjs.dev" },
  ] },
  { id: "database", filter: "Database", icon: "Database", title: "Database", description: "Modeling the product data that keeps every workflow coherent.", tools: [
    { name: "Prisma", icon: "Triangle", experience: "Advanced", projects: "7 shipped", years: "2 years", description: "Type-safe data access that stays easy to evolve.", website: "https://www.prisma.io" },
    { name: "PostgreSQL", icon: "Database", experience: "Advanced", projects: "8 shipped", years: "2 years", description: "Durable relational data for complex product logic.", website: "https://www.postgresql.org" },
    { name: "MongoDB", icon: "Cylinder", experience: "Proficient", projects: "5 shipped", years: "2 years", description: "Flexible documents for fast-moving product domains.", website: "https://www.mongodb.com" },
  ] },
  { id: "devops", filter: "DevOps", icon: "Container", title: "DevOps", description: "Shipping reliable environments from local development to production.", tools: [
    { name: "Docker", icon: "Container", experience: "Proficient", projects: "6 deployed", years: "2 years", description: "Repeatable environments that simplify delivery.", website: "https://www.docker.com" },
    { name: "AWS", icon: "Cloud", experience: "Working knowledge", projects: "4 deployed", years: "1 year", description: "Cloud infrastructure shaped around practical product needs.", website: "https://aws.amazon.com" },
    { name: "Vercel", icon: "Triangle", experience: "Advanced", projects: "10 deployed", years: "2 years", description: "Fast deployments and excellent web performance.", website: "https://vercel.com" },
  ] },
  { id: "ai-tools", filter: "AI & Tools", icon: "Bot", title: "AI & Tools", description: "Turning intelligent models into useful, inspectable workflows.", tools: [
    { name: "Python", icon: "TerminalSquare", experience: "Advanced", projects: "9 shipped", years: "3 years", description: "Automation and AI systems with real operational value.", website: "https://www.python.org" },
    { name: "OpenAI", icon: "BrainCircuit", experience: "Advanced", projects: "5 AI systems", years: "2 years", description: "Product-focused AI experiences with human judgment built in.", website: "https://openai.com" },
    { name: "Three.js", icon: "Box", experience: "Proficient", projects: "3 experiences", years: "1 year", description: "Immersive 3D moments when a flat interface is not enough.", website: "https://threejs.org" },
  ] },
  { id: "others", filter: "Others", icon: "Wrench", title: "Others", description: "The daily engineering tools that keep craft and collaboration sharp.", tools: [
    { name: "Git", icon: "GitBranch", experience: "Advanced", projects: "Every build", years: "4 years", description: "A disciplined history for collaborative product work.", website: "https://git-scm.com" },
    { name: "VS Code", icon: "Code2", experience: "Advanced", projects: "Daily driver", years: "4 years", description: "A tuned workspace for focused engineering.", website: "https://code.visualstudio.com" },
    { name: "Figma", icon: "PenTool", experience: "Advanced", projects: "12 systems", years: "3 years", description: "Design decisions made visible before they become code.", website: "https://www.figma.com" },
  ] },
];

export const toolkitMetrics = [
  { icon: "Boxes", label: "Technology Count", value: 20, suffix: "+" },
  { icon: "Rocket", label: "Projects Built", value: 15, suffix: "+" },
  { icon: "CalendarClock", label: "Years Learning", value: 2, suffix: "+" },
  { icon: "Clock3", label: "Coding Hours", value: 1000, suffix: "+" },
  { icon: "GitCommitHorizontal", label: "Git Commits", value: 1200, suffix: "+" },
] as const;