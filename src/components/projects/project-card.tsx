"use client";

import { motion } from "framer-motion";

import type { ShowcaseProject } from "@/data/projects";
import { cn } from "@/lib/utils";

import { ProjectButtons } from "@/components/projects/project-buttons";
import { ProjectPreview } from "@/components/projects/project-preview";
import { ProjectTags } from "@/components/projects/project-tags";

type ProjectCardProps = { index: number; isActive?: boolean; onSelect: () => void; position: "previous" | "active" | "next"; project: ShowcaseProject };

const accentClasses = { blue: "project-accent-blue", green: "project-accent-green", red: "project-accent-red", violet: "project-accent-violet", yellow: "project-accent-yellow" };

const carouselTransition = { damping: 32, mass: 0.72, stiffness: 210, type: "spring" } as const;

export function ProjectCard({ index, isActive = false, onSelect, position, project }: ProjectCardProps) {
  return (
    <motion.article animate={{ filter: isActive ? "blur(0px)" : "blur(1.5px)", opacity: isActive ? 1 : 0.52, rotateY: position === "previous" ? 7 : position === "next" ? -7 : 0, scale: isActive ? 1 : 0.92, x: 0 }} aria-current={isActive ? "true" : undefined} className={cn("project-card", accentClasses[project.accentColor], `project-card--${position}`)} initial={false} onClick={onSelect} role={isActive ? undefined : "button"} tabIndex={isActive ? undefined : 0} transition={carouselTransition} whileHover={isActive ? { y: -4 } : { filter: "blur(0.5px)", opacity: 0.76, scale: 0.94, y: -3 }}>
      {isActive ? <><div className="project-card__content">
        <div>
          <div className="flex items-center justify-between gap-4"><span className="font-mono text-xs tracking-[0.18em] text-os-muted">{String(index + 1).padStart(2, "0")} / 05 · {project.year}</span><span className="project-status"><i aria-hidden="true" />{project.status}</span></div>
          <p className="mt-9 text-sm font-medium text-os-secondary">{project.subtitle}</p>
          <h3 className="project-card__title mt-3 text-os-text">{project.title}</h3>
          <p className="project-card__statement mt-5">{isActive ? (project.id === "orbit-crm" ? "An all-in-one workspace for managing clients, projects and business operations." : project.description) : project.description}</p>
          {isActive ? <div className="project-metrics">{project.metrics.map((metric, metricIndex) => <motion.div key={metric.label} animate={{ opacity: 1, y: 0 }} className="project-metric" initial={{ opacity: 0, y: 8 }} transition={{ delay: 0.12 + metricIndex * 0.06, duration: 0.38, ease: [0.16, 1, 0.3, 1] }}><strong>{metric.value}</strong><span>{metric.label}</span></motion.div>)}</div> : null}
        </div>
        <div className="project-card__metadata mt-auto space-y-5"><ProjectTags tags={project.techStack} /><div className="project-card__desktop-actions"><ProjectButtons project={project} /></div></div>
      </div>
      <ProjectPreview isActive project={project} />
      <div className="project-card__mobile-actions"><ProjectButtons project={project} /></div></> : <div className="project-card__side-content">
        <div className="flex items-center justify-between gap-2"><span className="font-mono text-[10px] text-os-muted">{String(index + 1).padStart(2, "0")} / 05</span><span className="project-status"><i aria-hidden="true" />{project.status}</span></div>
        <div className="project-card__side-thumbnail" style={{ backgroundImage: `url(${project.image})` }} />
        <p className="mt-5 text-xs text-os-secondary">{project.subtitle}</p>
        <h3>{project.title}</h3>
        <p>{project.description}</p>
      </div>}
    </motion.article>
  );
}