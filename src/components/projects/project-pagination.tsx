"use client";

import { motion } from "framer-motion";

import { transitions } from "@/config/animations";

type ProjectPaginationProps = { activeIndex: number; onSelect: (index: number) => void; total: number };

export function ProjectPagination({ activeIndex, onSelect, total }: ProjectPaginationProps) {
  return <div aria-label="Project pagination" className="project-pagination">{Array.from({ length: total }, (_, index) => <button key={index} aria-current={index === activeIndex ? "true" : undefined} aria-label={`Show project ${index + 1}`} className="project-pagination-button" onClick={() => onSelect(index)} type="button"><motion.span animate={{ opacity: index === activeIndex ? 1 : 0.45, scaleX: index === activeIndex ? 1 : 0.62 }} className="block h-1 rounded-full bg-os-accent" transition={{ ...transitions.standard, duration: 0.52 }} /></button>)}</div>;
}