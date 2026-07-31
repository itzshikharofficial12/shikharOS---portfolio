export type TerminalOutputTone = "accent" | "default" | "muted" | "secondary" | "warning";

export type TerminalAction =
  | { href: string; type: "external" }
  | { type: "orbit" }
  | { target: string; type: "scroll" }
  | { type: "download" }
  | { type: "exit" }
  | { type: "matrix" };

export type TerminalEntry = {
  action?: TerminalAction;
  command: string;
  display?: "plain" | "recruitment";
  id: string;
  lines: readonly string[];
  showCommand?: boolean;
  tone: TerminalOutputTone;
};