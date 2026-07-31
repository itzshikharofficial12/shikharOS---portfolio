"use client";

import { motion } from "framer-motion";
import { Expand, MousePointer2 } from "lucide-react";

import type { ShowcaseProject } from "@/data/projects";
import { transitions } from "@/config/animations";

type ProjectPreviewProps = { isActive: boolean; project: ShowcaseProject };

export function ProjectPreview({ isActive, project }: ProjectPreviewProps) {
  return (
    <div aria-hidden={!isActive} className="project-preview">
      <div className="project-preview__glow" />
      <motion.div animate={{ rotateX: isActive ? 1 : 4, rotateY: isActive ? -3 : -6, y: isActive ? 0 : 14 }} className="project-preview__device" transition={transitions.cinematic} whileHover={isActive ? { rotateX: -1, rotateY: -6, y: -7 } : undefined}>
        <motion.div key={project.id} animate={{ filter: "blur(0px)", opacity: 1, scale: 1 }} className="relative h-full w-full" initial={{ filter: "blur(7px)", opacity: 0, scale: 0.97 }} transition={transitions.emphasized}><div className="project-dashboard"><div className="project-dashboard__top"><span>{project.title}</span><span className="project-dashboard__online">Live</span></div><div className="project-dashboard__content"><div className="project-dashboard__summary"><span>Revenue overview</span><strong>$84,240</strong><i /></div><div className="project-dashboard__chart"><i /><i /><i /><i /><i /><i /><i /></div><div className="project-dashboard__rows"><span /><span /><span /></div></div><motion.div animate={{ x: [0, 22, 4, 0], y: [0, 10, 18, 0] }} className="project-dashboard__cursor" transition={{ duration: 6, ease: "easeInOut", repeat: Infinity }}><MousePointer2 size={13} /></motion.div><motion.div animate={{ opacity: [0, 1, 1, 0], y: [8, 0, 0, -3] }} className="project-dashboard__notification" transition={{ delay: 1.2, duration: 3.6, ease: "easeInOut", repeat: Infinity }}>New client added</motion.div></div></motion.div>
      </motion.div>
      {isActive ? <motion.div animate={{ opacity: 1, x: 0, y: 0 }} className="project-phone" initial={{ opacity: 0, x: 20, y: 20 }} transition={{ delay: 0.22, duration: 0.52, ease: [0.16, 1, 0.3, 1] }} whileHover={{ rotate: 2, y: -7 }}><div className="project-phone__top" /><div className="project-phone__screen"><span>Today</span><strong>12</strong><i /><i /><i /></div></motion.div> : null}
      {isActive ? <><Expand aria-hidden="true" className="project-preview__expand" size={16} /><span className="project-preview__version">{project.version}</span><span className="project-preview__built">Built with <b>{project.builtWith}</b></span></> : null}
      <div className="project-preview__reflection" />
    </div>
  );
}