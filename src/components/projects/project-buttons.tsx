import { ArrowUpRight, BookOpen, Github } from "lucide-react";

import type { ShowcaseProject } from "@/data/projects";

type ProjectButtonsProps = { project: ShowcaseProject };

export function ProjectButtons({ project }: ProjectButtonsProps) {
  return <div className="flex flex-wrap gap-3"><a className="project-action project-action--primary" href={project.demoHref} rel="noreferrer" target="_blank"><span>Live Demo</span><ArrowUpRight aria-hidden="true" size={15} /></a><a className="project-action" href={project.githubHref} rel="noreferrer" target="_blank"><Github aria-hidden="true" size={15} />GitHub</a><a className="project-action project-action--quiet" href={project.caseStudyHref}><BookOpen aria-hidden="true" size={15} />Case Study</a></div>;
}