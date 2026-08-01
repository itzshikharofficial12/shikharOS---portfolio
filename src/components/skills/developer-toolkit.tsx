"use client";

import { ArrowRight, ArrowUpRight, Atom, Bot, Box, Boxes, BrainCircuit, CalendarClock, Check, Clock3, Cloud, Code2, Container, Copy, Cylinder, Database, GitBranch, GitCommitHorizontal, Hexagon, KeyRound, Layers3, Network, PenTool, Rocket, Route, Server, Sparkles, TerminalSquare, Triangle, Type, Wind, Wrench, X, type LucideIcon } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

import { transitions } from "@/config/animations";
import { type ToolkitCategory, type ToolkitFilter, type ToolkitTool, toolkitCategories, toolkitFilters, toolkitMetrics } from "@/data/toolkit";

const iconRegistry: Record<string, LucideIcon> = { ArrowRight, ArrowUpRight, Atom, Bot, Box, Boxes, BrainCircuit, CalendarClock, Check, Clock3, Cloud, Code2, Container, Copy, Cylinder, Database, GitBranch, GitCommitHorizontal, Hexagon, KeyRound, Layers3, Network, PenTool, Rocket, Route, Server, Sparkles, TerminalSquare, Triangle, Type, Wind, Wrench, X };

function ToolkitIcon({ name, size = 18 }: { name: string; size?: number }) {
  const Icon = iconRegistry[name] ?? Code2;
  return <Icon aria-hidden="true" size={size} strokeWidth={1.65} />;
}

function useCountUp(value: number) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const start = performance.now();
    const duration = 1100;
    let frame = 0;

    function update(now: number) {
      const progress = Math.min((now - start) / duration, 1);
      setCount(Math.round(value * (1 - (1 - progress) ** 3)));
      if (progress < 1) frame = requestAnimationFrame(update);
    }

    frame = requestAnimationFrame(update);
    return () => cancelAnimationFrame(frame);
  }, [value]);

  return count;
}

function ToolkitMetric({ icon, label, suffix, value }: (typeof toolkitMetrics)[number]) {
  const count = useCountUp(value);
  return <div className="toolkit-metric"><ToolkitIcon name={icon} size={16} /><strong>{count.toLocaleString()}{suffix}</strong><span>{label}</span></div>;
}

type ToolDetailProps = { onClose: () => void; tool: ToolkitTool };

function ToolDetail({ onClose, tool }: ToolDetailProps) {
  return createPortal(
    <motion.div animate={{ opacity: 1 }} className="toolkit-dialog-backdrop" exit={{ opacity: 0 }} initial={{ opacity: 0 }} onClick={onClose} role="presentation">
      <motion.article animate={{ opacity: 1, scale: 1, y: 0 }} aria-modal="true" className="toolkit-dialog" exit={{ opacity: 0, scale: 0.98, y: 8 }} initial={{ opacity: 0, scale: 0.98, y: 8 }} onClick={(event) => event.stopPropagation()} role="dialog" transition={transitions.emphasized}>
        <div className="flex items-start justify-between gap-5"><div className="toolkit-tool-icon toolkit-tool-icon--dialog"><ToolkitIcon name={tool.icon} size={24} /></div><button aria-label="Close tool details" className="toolkit-close" onClick={onClose} type="button"><X aria-hidden="true" size={17} /></button></div>
        <p className="mt-6 font-mono text-[11px] text-os-accent">{tool.experience}</p><h3 className="mt-2 text-2xl font-semibold text-os-text">{tool.name}</h3><p className="mt-3 text-[13px] leading-6 text-os-muted">{tool.description}</p>
        <dl className="mt-6 grid grid-cols-2 gap-3"><div><dt>Projects</dt><dd>{tool.projects}</dd></div><div><dt>Experience</dt><dd>{tool.years}</dd></div></dl>
        <a className="toolkit-dialog-link" href={tool.website} rel="noreferrer" target="_blank">Visit technology <ArrowUpRight aria-hidden="true" size={15} /></a>
      </motion.article>
    </motion.div>,
    document.body,
  );
}

type ToolkitCardProps = { category: ToolkitCategory; onSelect: (tool: ToolkitTool) => void };

function ToolkitCard({ category, onSelect }: ToolkitCardProps) {
  const remainingTools = category.tools.length - 4;

  return (
    <motion.article animate={{ filter: "blur(0px)", opacity: 1, y: 0 }} className="toolkit-card" initial={{ filter: "blur(6px)", opacity: 0, y: 16 }} transition={transitions.emphasized} whileHover={{ y: -4 }}>
      <div className="flex items-start justify-between gap-5"><div className="flex items-center gap-3"><span className="toolkit-category-icon"><ToolkitIcon name={category.icon} /></span><h3 className="text-lg font-semibold text-os-text">{category.title}</h3></div><span className="toolkit-count">{category.tools.length} tools</span></div>
      <p className="mt-5 max-w-sm text-[13px] leading-6 text-os-muted">{category.description}</p>
      <div className="mt-auto flex items-end justify-between gap-3"><div className="toolkit-tool-list flex flex-wrap gap-2">{category.tools.map((tool) => <button key={tool.name} aria-label={`Inspect ${tool.name}`} className="toolkit-tool-icon" onClick={() => onSelect(tool)} title={`${tool.name} · ${tool.years} · ${tool.projects}`} type="button"><ToolkitIcon name={tool.icon} /></button>)}{remainingTools > 0 ? <span className="toolkit-tool-more">+{remainingTools}</span> : null}</div><button aria-label={`View all ${category.title} tools`} className="toolkit-view-all" onClick={() => onSelect(category.tools[0])} type="button">View All <ArrowRight aria-hidden="true" size={15} /></button></div>
    </motion.article>
  );
}

export function DeveloperToolkit() {
  const [filter, setFilter] = useState<ToolkitFilter>("All");
  const [selectedTool, setSelectedTool] = useState<ToolkitTool | null>(null);
  const [copied, setCopied] = useState(false);
  const visibleCategories = filter === "All" ? toolkitCategories : toolkitCategories.filter((category) => category.filter === filter);

  async function copyCommand() {
    await navigator.clipboard?.writeText("shikhar@os:~$ npx whoami --stack");
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  return (
    <section id="skills" aria-label="Developer toolkit" className="developer-toolkit scroll-mt-24">
      <div className="mx-auto max-w-[1600px]">
        <header className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_350px] lg:items-end">
          <div><p className="font-mono text-[11px] font-medium tracking-[0.2em] text-os-accent">[ / TOOLKIT ]</p><h2 className="mt-4 text-4xl font-semibold leading-[0.98] text-os-text sm:text-5xl lg:text-6xl">The Stack<br />That Powers My <span className="text-os-accent">Builds.</span></h2></div>
          <div><p className="max-w-sm text-[15px] leading-6 text-os-muted">I choose my tools intentionally. Every technology here helps me build scalable, performant and delightful products.</p><div className="toolkit-command mt-6"><code>shikhar@os:~$ npx whoami --stack</code><button aria-label="Copy toolkit command" onClick={copyCommand} type="button">{copied ? <Check aria-hidden="true" size={14} /> : <Copy aria-hidden="true" size={14} />}</button></div></div>
        </header>

        <div aria-label="Toolkit filters" className="toolkit-filters" role="tablist">{toolkitFilters.map((item) => <button key={item} aria-selected={filter === item} className={filter === item ? "toolkit-filter toolkit-filter--active" : "toolkit-filter"} onClick={() => setFilter(item)} role="tab" type="button">{item}</button>)}</div>

        <motion.div layout className="toolkit-grid">{visibleCategories.map((category) => <ToolkitCard key={category.id} category={category} onSelect={setSelectedTool} />)}</motion.div>
        <div aria-label="Toolkit summary" className="toolkit-summary">{toolkitMetrics.map((metric) => <ToolkitMetric key={metric.label} {...metric} />)}</div>
      </div>
      <AnimatePresence>{selectedTool ? <ToolDetail onClose={() => setSelectedTool(null)} tool={selectedTool} /> : null}</AnimatePresence>
    </section>
  );
}