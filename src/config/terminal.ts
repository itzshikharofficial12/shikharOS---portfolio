import type { TerminalAction, TerminalOutputTone } from "@/types/terminal";

export const terminalCommands = [
  "help",
  "about",
  "whoami",
  "projects",
  "open orbit",
  "journey",
  "skills",
  "github",
  "linkedin",
  "contact",
  "resume",
  "clear",
  "coffee",
  "fortune",
  "matrix",
  "ascii",
  "theme",
  "exit",
] as const;

export type TerminalCommand = (typeof terminalCommands)[number];

export type CommandResult = {
  action?: TerminalAction;
  lines: readonly string[];
  tone: TerminalOutputTone;
};

const commandResults: Record<Exclude<TerminalCommand, "clear">, CommandResult> = {
  help: {
    lines: [
      "NAVIGATE    projects    open orbit    journey    skills    contact",
      "PROFILE     about       whoami        resume    github    linkedin",
      "PLAY        coffee      fortune       matrix    ascii     theme",
      "SYSTEM      help        clear         exit      theme",
    ],
    tone: "muted",
  },
  about: {
    lines: ["Shikhar is a product-minded engineer who turns ambitious ideas into useful, polished software.", "Focused on full-stack systems, AI workflows, and interfaces people enjoy returning to."],
    tone: "default",
  },
  whoami: {
    lines: ["shikhar", "role: Full Stack Developer / AI Engineer", "location: India, available worldwide", "status: building thoughtful digital products"],
    tone: "accent",
  },
  projects: {
    action: { target: "projects", type: "scroll" },
    lines: ["PROJECT INDEX", "01  Orbit CRM        Client management platform", "02  Celestia Studios Creative operations suite", "03  Streamify        Intentional music discovery", "04  Signal AI        AI automation control plane"],
    tone: "secondary",
  },
  "open orbit": {
    action: { type: "orbit" },
    lines: ["Opening Orbit CRM in the Projects workspace...", "Focus moved to project 01."],
    tone: "accent",
  },
  journey: {
    action: { target: "journey", type: "scroll" },
    lines: ["Timeline ready. Scrolling to the Developer Journey workspace..."],
    tone: "secondary",
  },
  skills: {
    action: { target: "toolkit", type: "scroll" },
    lines: ["TOOLKIT", "React · Next.js · TypeScript · Node.js · Python", "AI systems · APIs · cloud · product design", "Opening the engineering toolkit..."],
    tone: "default",
  },
  github: {
    action: { href: "https://github.com/itzshikharofficial12", type: "external" },
    lines: ["Opening github.com/itzshikharofficial12 in a new tab..."],
    tone: "secondary",
  },
  linkedin: {
    action: { href: "https://www.linkedin.com/in/itzshikhar12", type: "external" },
    lines: ["Opening linkedin.com/in/itzshikhar12 in a new tab..."],
    tone: "secondary",
  },
  contact: {
    action: { target: "contact", type: "scroll" },
    lines: ["Contact channel ready. Moving to the deployment terminal..."],
    tone: "default",
  },
  resume: {
    action: { type: "download" },
    lines: ["Preparing Shikhar's developer profile download...", "Download started."],
    tone: "default",
  },
  coffee: {
    lines: ["Coffee detected.", "Developer performance increased by 20%."],
    tone: "warning",
  },
  fortune: {
    lines: ["First, solve the problem. Then, write the code."],
    tone: "secondary",
  },
  matrix: {
    action: { type: "matrix" },
    lines: ["Matrix protocol started. Signal stream active for 5 seconds."],
    tone: "accent",
  },
  ascii: {
    lines: ["  SSSS  H   H  III  K  K  H   H   A   RRRR", " S      H   H   I   K K   H   H  A A  R   R", "  SSS   HHHHH   I   KK    HHHHH AAAAA RRRR", "     S  H   H   I   K K   H   H A   A R R", " SSSS   H   H  III  K  K  H   H A   A R  RR", "", "                    SHIKHAR OS"],
    tone: "accent",
  },
  theme: {
    lines: ["Theme: SHIKHAR OS Midnight", "Surface: matte black · accent: signal green · motion: premium"],
    tone: "muted",
  },
  exit: {
    action: { type: "exit" },
    lines: ["Connection Closed.", "Thanks for visiting SHIKHAR OS."],
    tone: "warning",
  },
};

const fortunes = [
  "First, solve the problem. Then, write the code.",
  "Make it work, make it right, make it fast.",
  "The details are not the details. They make the design.",
] as const;

export function resolveTerminalCommand(command: string): CommandResult {
  const normalizedCommand = command.trim().toLowerCase().replace(/\s+/g, " ");

  if (normalizedCommand === "fortune") {
    return { lines: [fortunes[Math.floor(Math.random() * fortunes.length)]], tone: "secondary" };
  }

  if (normalizedCommand in commandResults) {
    return commandResults[normalizedCommand as Exclude<TerminalCommand, "clear">];
  }

  return {
    lines: [`Unknown command: ${command.trim()}`, "Did you mean: help"],
    tone: "warning",
  };
}