export type JourneyCommit = {
  hash: string;
  id: string;
  message: string;
  status?: "HEAD";
  summary: string;
  tech: readonly string[];
  year: string;
};

export const journeyCommits: readonly JourneyCommit[] = [
  {
    hash: "4e5b2fd",
    id: "started-programming",
    message: "Started Programming",
    summary: "Learned HTML, CSS and JavaScript, then began turning small ideas into working interfaces.",
    tech: ["HTML", "CSS", "JavaScript"],
    year: "2022",
  },
  {
    hash: "9a0c8e1",
    id: "first-full-stack-app",
    message: "Built First Full Stack App",
    summary: "Connected a thoughtful React experience to a Node.js backend and learned what it takes to ship end to end.",
    tech: ["React", "Node.js", "MongoDB"],
    year: "2024",
  },
  {
    hash: "c7d14ab",
    id: "won-hackathon",
    message: "Won Hackathon",
    summary: "Built under pressure at DCODE, validating that strong collaboration and clear product choices create momentum.",
    tech: ["DCODE", "React", "Product"],
    year: "2025",
  },
  {
    hash: "e2f9b36",
    id: "started-celestia",
    message: "Started Celestia Studios",
    summary: "Began building brand systems and software that help ambitious businesses move with more clarity.",
    tech: ["Brand", "Next.js", "Systems"],
    year: "2026",
  },
  {
    hash: "HEAD",
    id: "building-the-future",
    message: "Building the Future",
    status: "HEAD",
    summary: "Current mission: shape Orbit CRM into an operating system for client relationships, projects and purposeful growth.",
    tech: ["Orbit CRM", "AI", "In Progress"],
    year: "2026",
  },
];