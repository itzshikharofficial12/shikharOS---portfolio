"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

import { transitions } from "@/config/animations";
import { showcaseProjects } from "@/data/projects";

import { ProjectCarousel } from "@/components/projects/project-carousel";
import { ProjectPagination } from "@/components/projects/project-pagination";

export function ProjectWorkspace() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeProject = showcaseProjects[activeIndex];

  function selectProject(index: number) {
    setActiveIndex((index + showcaseProjects.length) % showcaseProjects.length);
  }

  function changeProject(direction: "next" | "previous") {
    selectProject(activeIndex + (direction === "next" ? 1 : -1));
  }

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "ArrowLeft") changeProject("previous");
      if (event.key === "ArrowRight") changeProject("next");
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  });

  useEffect(() => {
    function openOrbit() {
      const orbitIndex = showcaseProjects.findIndex((project) => project.id === "orbit-crm");

      if (orbitIndex >= 0) setActiveIndex(orbitIndex);
      document.getElementById("projects")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    window.addEventListener("shikhar-os:open-orbit", openOrbit);
    return () => window.removeEventListener("shikhar-os:open-orbit", openOrbit);
  }, []);

  return (
    <motion.section id="projects" animate={{ filter: "blur(0px)", opacity: 1, y: 0 }} aria-label="Projects" className="project-showcase scroll-mt-24" initial={{ filter: "blur(12px)", opacity: 0, y: 24 }} transition={transitions.cinematic}>
      <div className="mx-auto w-full max-w-[1600px]">
        <header className="grid gap-8 px-1 pb-12 lg:grid-cols-[minmax(0,1fr)_310px] lg:items-end lg:pb-16">
          <div>
            <p className="font-mono text-xs font-medium tracking-[0.2em] text-os-accent">[ / PROJECTS ]</p>
            <h2 className="mt-4 max-w-4xl text-4xl font-semibold leading-[0.98] tracking-normal text-os-text sm:text-5xl lg:text-6xl">My Creations,<br />Built with <span className="text-os-accent">Purpose.</span></h2>
          </div>
          <p className="max-w-sm text-[15px] leading-6 text-os-muted lg:pb-1">Every project is built to solve a real problem through thoughtful engineering, intuitive design and attention to detail.</p>
        </header>

        <div className="project-carousel__indicator"><ProjectPagination activeIndex={activeIndex} onSelect={selectProject} total={showcaseProjects.length} /></div>
        <ProjectCarousel activeIndex={activeIndex} onChange={selectProject} projects={showcaseProjects} />

        <div className="mt-6 flex justify-end px-1"><p className="font-mono text-xs text-os-muted">{String(activeIndex + 1).padStart(2, "0")} / {String(showcaseProjects.length).padStart(2, "0")} · {activeProject.year}</p></div>

        <footer className="project-terminal-bar mt-7 grid gap-3 px-4 py-3 font-mono text-[11px] sm:grid-cols-[1fr_auto] sm:items-center sm:px-5">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-os-muted"><span className="text-os-accent">visitor@shikhar-os</span><span className="hidden text-os-border-strong sm:inline">|</span><span>Tip: Use ← → to explore projects.</span></div>
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-os-muted"><span><strong className="font-medium text-os-text">{showcaseProjects.length}</strong> total</span><span><strong className="font-medium text-os-accent">{showcaseProjects.filter((project) => project.live).length}</strong> live</span><span><strong className="font-medium text-os-text">{showcaseProjects.filter((project) => project.status === "Shipped").length}</strong> shipped</span><span className="text-os-secondary">{activeProject.status}</span></div>
        </footer>
      </div>
    </motion.section>
  );
}