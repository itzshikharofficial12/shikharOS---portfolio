"use client";

import type { ProjectFile, WorkspaceProject } from "@/data/projects";

type CodeSnippetProps = {
  file: ProjectFile;
  project: WorkspaceProject;
};

type CodeLineProps = {
  children: React.ReactNode;
  number: number;
};

function CodeLine({ children, number }: CodeLineProps) {
  return (
    <div className="grid grid-cols-[2.5rem_1fr] gap-4">
      <span className="select-none text-right text-os-muted/55">{number}</span>
      <code>{children}</code>
    </div>
  );
}

function ArchitectureCode({ project }: { project: WorkspaceProject }) {
  return (
    <>
      <CodeLine number={1}><span className="text-[#c084fc]">import</span> <span className="text-os-text">&#123; createWorkspace &#125;</span> <span className="text-[#c084fc]">from</span> <span className="text-os-warning">&quot;@/core&quot;</span>;</CodeLine>
      <CodeLine number={2}>&nbsp;</CodeLine>
      <CodeLine number={3}><span className="text-[#c084fc]">export const</span> <span className="text-os-secondary">workspace</span> <span className="text-os-text">= createWorkspace(&#123;</span></CodeLine>
      <CodeLine number={4}><span className="pl-4 text-os-secondary">name</span><span className="text-os-text">: </span><span className="text-os-warning">&quot;{project.name}&quot;</span><span className="text-os-text">,</span></CodeLine>
      <CodeLine number={5}><span className="pl-4 text-os-secondary">systems</span><span className="text-os-text">: [</span><span className="text-os-warning">&quot;web&quot;</span><span className="text-os-text">, </span><span className="text-os-warning">&quot;ai&quot;</span><span className="text-os-text">],</span></CodeLine>
      <CodeLine number={6}><span className="pl-4 text-os-secondary">intent</span><span className="text-os-text">: </span><span className="text-os-warning">&quot;make complex work feel calm&quot;</span><span className="text-os-text">,</span></CodeLine>
      <CodeLine number={7}><span className="text-os-text">&#125;);</span></CodeLine>
    </>
  );
}

function TechStackCode() {
  return (
    <>
      <CodeLine number={1}><span className="text-os-text">&#123;</span></CodeLine>
      <CodeLine number={2}><span className="pl-4 text-os-secondary">&quot;frontend&quot;</span><span className="text-os-text">: [</span><span className="text-os-warning">&quot;Next.js&quot;</span><span className="text-os-text">, </span><span className="text-os-warning">&quot;TypeScript&quot;</span><span className="text-os-text">],</span></CodeLine>
      <CodeLine number={3}><span className="pl-4 text-os-secondary">&quot;motion&quot;</span><span className="text-os-text">: [</span><span className="text-os-warning">&quot;Framer Motion&quot;</span><span className="text-os-text">, </span><span className="text-os-warning">&quot;GSAP&quot;</span><span className="text-os-text">],</span></CodeLine>
      <CodeLine number={4}><span className="pl-4 text-os-secondary">&quot;systems&quot;</span><span className="text-os-text">: [</span><span className="text-os-warning">&quot;Node.js&quot;</span><span className="text-os-text">, </span><span className="text-os-warning">&quot;AI&quot;</span><span className="text-os-text">],</span></CodeLine>
      <CodeLine number={5}><span className="pl-4 text-os-secondary">&quot;shipping&quot;</span><span className="text-os-text">: </span><span className="text-os-accent">true</span></CodeLine>
      <CodeLine number={6}><span className="text-os-text">&#125;</span></CodeLine>
    </>
  );
}

export function CodeSnippet({ file, project }: CodeSnippetProps) {
  if (file === "tech-stack.json") {
    return <TechStackCode />;
  }

  return <ArchitectureCode project={project} />;
}