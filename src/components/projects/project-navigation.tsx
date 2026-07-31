"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

import { transitions } from "@/config/animations";

type ProjectNavigationProps = { onNext: () => void; onPrevious: () => void };

export function ProjectNavigation({ onNext, onPrevious }: ProjectNavigationProps) {
  return <div className="flex items-center gap-3"><motion.button aria-label="Previous project" className="project-nav-button" onClick={onPrevious} transition={transitions.interaction} type="button" whileHover={{ x: -2 }} whileTap={{ scale: 0.95 }}><ArrowLeft aria-hidden="true" size={18} /></motion.button><motion.button aria-label="Next project" className="project-nav-button" onClick={onNext} transition={transitions.interaction} type="button" whileHover={{ x: 2 }} whileTap={{ scale: 0.95 }}><ArrowRight aria-hidden="true" size={18} /></motion.button></div>;
}