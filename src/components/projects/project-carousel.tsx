"use client";

import { motion } from "framer-motion";
import { type WheelEvent, useRef } from "react";

import type { ShowcaseProject } from "@/data/projects";

import { ProjectCard } from "@/components/projects/project-card";
import { ProjectNavigation } from "@/components/projects/project-navigation";

type ProjectCarouselProps = { activeIndex: number; onChange: (index: number) => void; projects: readonly ShowcaseProject[] };

export function ProjectCarousel({ activeIndex, onChange, projects }: ProjectCarouselProps) {
  const previousIndex = (activeIndex - 1 + projects.length) % projects.length;
  const nextIndex = (activeIndex + 1) % projects.length;
  const lastTrackpadChangeRef = useRef(0);

  function onDragEnd(_: MouseEvent | TouchEvent | PointerEvent, info: { offset: { x: number } }) {
    if (info.offset.x > 56) onChange(previousIndex);
    if (info.offset.x < -56) onChange(nextIndex);
  }

  function handleWheel(event: WheelEvent<HTMLDivElement>) {
    if (Math.abs(event.deltaX) <= Math.abs(event.deltaY) || Math.abs(event.deltaX) < 32) return;

    const now = performance.now();
    if (now - lastTrackpadChangeRef.current < 620) return;

    event.preventDefault();
    lastTrackpadChangeRef.current = now;
    onChange(event.deltaX > 0 ? nextIndex : previousIndex);
  }

  return (
    <div aria-label="Featured projects" aria-roledescription="carousel" className="project-carousel" onWheel={handleWheel}>
      <ProjectCard index={previousIndex} onSelect={() => onChange(previousIndex)} position="previous" project={projects[previousIndex]} />
      <motion.div className="project-carousel__active" drag="x" dragConstraints={{ left: 0, right: 0 }} dragElastic={0.08} onDragEnd={onDragEnd}><ProjectCard index={activeIndex} isActive onSelect={() => undefined} position="active" project={projects[activeIndex]} /></motion.div>
      <ProjectCard index={nextIndex} onSelect={() => onChange(nextIndex)} position="next" project={projects[nextIndex]} />
      <div className="project-carousel__controls"><ProjectNavigation onNext={() => onChange(nextIndex)} onPrevious={() => onChange(previousIndex)} /></div>
    </div>
  );
}