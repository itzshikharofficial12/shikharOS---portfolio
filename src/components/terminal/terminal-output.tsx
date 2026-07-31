"use client";

import { motion } from "framer-motion";

import type { TerminalEntry } from "@/types/terminal";

const toneClasses = {
  accent: "border-os-accent/30 bg-os-accent/[0.06]",
  default: "border-os-border bg-white/[0.025]",
  muted: "border-os-border bg-white/[0.02]",
  secondary: "border-os-secondary/30 bg-os-secondary/[0.06]",
  warning: "border-os-warning/30 bg-os-warning/[0.06]",
} as const;

const leadingLineClasses = {
  accent: "text-os-accent",
  default: "text-os-text",
  muted: "text-os-text",
  secondary: "text-os-secondary",
  warning: "text-os-warning",
} as const;

type TerminalOutputProps = {
  entry: TerminalEntry;
};

export function TerminalOutput({ entry }: TerminalOutputProps) {
  const shouldShowCommand = entry.showCommand !== false;

  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      className={entry.display === "recruitment" ? "terminal-output" : "terminal-output space-y-2"}
      initial={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
    >
      {shouldShowCommand ? <p><span className="text-os-accent">visitor@shikhar-os</span><span className="text-os-muted">:~$ </span><span className="text-os-text">{entry.command}</span></p> : null}
      {entry.display === "recruitment" ? (
        <pre className="terminal-recruitment-output">{entry.lines.join("\n")}</pre>
      ) : (
        <div className={`terminal-output__result whitespace-pre-wrap border px-3.5 py-3 leading-6 ${toneClasses[entry.tone]}`}>
          {entry.lines.map((line, index) => <p key={`${entry.id}-${index}`} className={index === 0 ? `font-medium ${leadingLineClasses[entry.tone]}` : "text-os-muted"}>{line || "\u00A0"}</p>)}
        </div>
      )}
    </motion.div>
  );
}