import { Box, Code2, Database, Feather, Layers3, Server, Sparkles } from "lucide-react";

const iconByTag = { Docker: Box, Motion: Sparkles, "Next.js": Layers3, "Node.js": Server, PostgreSQL: Database, Prisma: Database, React: Code2, Tailwind: Feather, "Three.js": Box, TypeScript: Code2 } as const;

type ProjectTagsProps = { tags: readonly string[] };

export function ProjectTags({ tags }: ProjectTagsProps) {
  return <div className="flex flex-wrap gap-2">{tags.map((tag) => { const Icon = iconByTag[tag as keyof typeof iconByTag] ?? Code2; return <span key={tag} className="project-tag"><Icon aria-hidden="true" size={12} />{tag}</span>; })}</div>;
}