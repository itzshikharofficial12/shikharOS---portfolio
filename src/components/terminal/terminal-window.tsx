"use client";

import { AnimatePresence, motion } from "framer-motion";
import { CircleDot, Command, TerminalSquare } from "lucide-react";
import { type KeyboardEvent, type WheelEvent as ReactWheelEvent, useEffect, useRef, useState } from "react";

import { terminalCommands, resolveTerminalCommand } from "@/config/terminal";
import { transitions } from "@/config/animations";
import { cn } from "@/lib/utils";
import { useTerminalStore } from "@/store/terminal-store";

import { TerminalOutput } from "@/components/terminal/terminal-output";
type TerminalWindowProps = {
  className?: string;
};

type RecruitmentState = "awaiting-option" | "idle" | "running";

const matrixColumns = ["010011", "101101", "001101", "110010", "011011", "101010", "001110", "111001", "010101", "100110", "011001", "110101", "001011", "101110", "010010", "111010", "001101", "100011"] as const;

const recruitmentInterface = [
  "╭──────────────────────────────────────────────────────────────╮",
  "│                 RECRUITMENT PROTOCOL ACTIVE                  │",
  "├──────────────────────────────────────────────────────────────┤",
  "│                                                              │",
  "│  Candidate        Shikhar Srivastava                         │",
  "│  Role             Full Stack Engineer                        │",
  "│  Specialization   AI • Web • Product Engineering             │",
  "│  Status           AVAILABLE                                  │",
  "│  Response Time    < 24 Hours                                 │",
  "│  Timezone         IST (UTC +05:30)                           │",
  "│                                                              │",
  "├──────────────────────────────────────────────────────────────┤",
  "│                      AVAILABLE ACTIONS                       │",
  "│                                                              │",
  "│  [1] Download Resume                                         │",
  "│  [2] Schedule Meeting                                        │",
  "│  [3] Open GitHub                                             │",
  "│  [4] Open LinkedIn                                           │",
  "│  [5] Send Email                                              │",
  "│  [6] View Featured Projects                                  │",
  "│                                                              │",
  "├──────────────────────────────────────────────────────────────┤",
  "│  System Status                                               │",
  "│                                                              │",
  "│  Availability      ONLINE                                    │",
  "│  Open For          Internships • Freelance                   │",
  "│  Current Mission   Building Orbit CRM                        │",
  "│                                                              │",
  "╰──────────────────────────────────────────────────────────────╯",
  "",
  "Select an option [1-6]:",
] as const;

const recruitmentWorkflow = [
  "Initializing recruitment protocol...",
  "Fetching candidate profile...",
  "Connecting GitHub...",
  "Preparing contact channels...",
  "Loading assets...",
  "Done.",
] as const;

function MatrixRain() {
  return (
    <div aria-hidden="true" className="matrix-rain">
      {matrixColumns.map((column, index) => (
        <motion.span
          key={`${column}-${index}`}
          animate={{ opacity: [0, 0.82, 0], y: ["-18%", "118%"] }}
          className="matrix-rain__column"
          initial={{ opacity: 0, y: "-18%" }}
          style={{ left: `${(index / matrixColumns.length) * 100 + 2}%` }}
          transition={{ delay: (index % 6) * 0.12, duration: 1.8 + (index % 4) * 0.28, ease: "linear", repeat: Infinity }}
        >
          {column}
        </motion.span>
      ))}
    </div>
  );
}

export function TerminalWindow({ className }: TerminalWindowProps) {
  const { clear, entries, history, pushEntry } = useTerminalStore();
  const [input, setInput] = useState("");
  const [historyIndex, setHistoryIndex] = useState<number | null>(null);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMatrixActive, setIsMatrixActive] = useState(false);
  const [isSessionClosed, setIsSessionClosed] = useState(false);
  const [recruitmentState, setRecruitmentState] = useState<RecruitmentState>("idle");
  const inputRef = useRef<HTMLInputElement>(null);
  const historyScrollRef = useRef<HTMLDivElement>(null);
  const matrixTimeoutRef = useRef<number | null>(null);
  const recruitmentTimeoutsRef = useRef<number[]>([]);

  useEffect(() => {
    const historyPanel = historyScrollRef.current;

    if (historyPanel) {
      historyPanel.scrollTop = historyPanel.scrollHeight;
    }
  }, [entries]);

  useEffect(() => () => {
    if (matrixTimeoutRef.current) window.clearTimeout(matrixTimeoutRef.current);
    recruitmentTimeoutsRef.current.forEach((timeout) => window.clearTimeout(timeout));
  }, []);

  function focusInput() {
    inputRef.current?.focus({ preventScroll: true });
  }

  function blurInput() {
    inputRef.current?.blur();
  }

  function cancelRecruitmentProtocol() {
    recruitmentTimeoutsRef.current.forEach((timeout) => window.clearTimeout(timeout));
    recruitmentTimeoutsRef.current = [];
  }

  function addTerminalEntry(entry: Omit<Parameters<typeof pushEntry>[0], "id">) {
    pushEntry({ ...entry, id: `${Date.now()}-${crypto.randomUUID()}` });
  }

  function scheduleRecruitmentEntry(delay: number, entry: Omit<Parameters<typeof pushEntry>[0], "id">, onComplete?: () => void) {
    const timeout = window.setTimeout(() => {
      addTerminalEntry(entry);
      onComplete?.();
    }, delay);
    recruitmentTimeoutsRef.current.push(timeout);
  }

  function handleTerminalWheel(event: ReactWheelEvent<HTMLDivElement>) {
    const historyPanel = historyScrollRef.current;

    if (!historyPanel || event.deltaY === 0) return;

    const isScrollingUp = event.deltaY < 0;
    const isAtTop = historyPanel.scrollTop <= 0;
    const isAtBottom = historyPanel.scrollTop + historyPanel.clientHeight >= historyPanel.scrollHeight - 1;
    const canScrollHistory = (isScrollingUp && !isAtTop) || (!isScrollingUp && !isAtBottom);

    if (canScrollHistory) {
      event.preventDefault();
      historyPanel.scrollTop += event.deltaY;
    }
  }

  function clearTerminal() {
    cancelRecruitmentProtocol();
    clear();
    setInput("");
    setHistoryIndex(null);
    setIsSessionClosed(false);
    setIsMatrixActive(false);
    setRecruitmentState("idle");
    if (matrixTimeoutRef.current) window.clearTimeout(matrixTimeoutRef.current);
    window.requestAnimationFrame(focusInput);
  }

  function downloadProfile() {
    const profile = ["SHIKHAR", "Full Stack Developer / AI Engineer", "", "Product-minded engineer building thoughtful digital products.", "", "GitHub: https://github.com/itzshikharofficial12", "LinkedIn: https://www.linkedin.com/in/itzshikhar12", "Email: itzshikharofficial@gmail.com"].join("\n");
    const blob = new Blob([profile], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = "shikhar-developer-profile.txt";
    link.href = url;
    link.click();
    URL.revokeObjectURL(url);
  }

  function runAction(action: ReturnType<typeof resolveTerminalCommand>["action"]) {
    if (!action) return;

    if (action.type === "scroll" || action.type === "orbit") {
      return;
    }

    if (action.type === "external") {
      window.open(action.href, "_blank", "noopener,noreferrer");
      return;
    }

    if (action.type === "download") {
      downloadProfile();
      return;
    }

    if (action.type === "matrix") {
      setIsMatrixActive(true);
      if (matrixTimeoutRef.current) window.clearTimeout(matrixTimeoutRef.current);
      matrixTimeoutRef.current = window.setTimeout(() => setIsMatrixActive(false), 5000);
      return;
    }

    setIsSessionClosed(true);
  }

  function scrollToWorkspace(target: string) {
    document.getElementById(target)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function startRecruitmentProtocol(command: string) {
    cancelRecruitmentProtocol();
    setRecruitmentState("running");
    addTerminalEntry({ command, lines: ["Authenticating..."], tone: "accent" });
    scheduleRecruitmentEntry(520, { command: "", lines: ["████████████████████████ 100%", "Access Level: ROOT", "Permission Granted."], showCommand: false, tone: "accent" });

    recruitmentWorkflow.forEach((line, index) => {
      scheduleRecruitmentEntry(1080 + index * 440, { command: "", lines: [line], showCommand: false, tone: index === recruitmentWorkflow.length - 1 ? "accent" : "muted" });
    });

    scheduleRecruitmentEntry(1080 + recruitmentWorkflow.length * 440 + 320, { command: "", display: "recruitment", lines: recruitmentInterface, showCommand: false, tone: "accent" }, () => {
      setRecruitmentState("awaiting-option");
      window.requestAnimationFrame(focusInput);
    });
  }

  function handleRelationshipProtocol() {
    addTerminalEntry({ command: "69", lines: ["Accessing relationship protocol..."], tone: "warning" });
    scheduleRecruitmentEntry(420, { command: "", lines: ["Checking compatibility..."], showCommand: false, tone: "muted" });
    scheduleRecruitmentEntry(860, { command: "", lines: ["████████████████████████ 100%", "Pull Request received.", "Status: Awaiting code review..."], showCommand: false, tone: "accent" });
  }

  function handleRecruitmentOption(option: string) {
    if (option === "69") {
      handleRelationshipProtocol();
      return;
    }

    const result = {
      "1": { action: downloadProfile, lines: ["Resume package prepared.", "Download started."] },
      "2": { action: () => scrollToWorkspace("contact"), lines: ["Scheduling channel selected.", "Opening contact workspace..."] },
      "3": { action: () => window.open("https://github.com/itzshikharofficial12", "_blank", "noopener,noreferrer"), lines: ["Opening GitHub profile in a new tab..."] },
      "4": { action: () => window.open("https://www.linkedin.com/in/itzshikhar12", "_blank", "noopener,noreferrer"), lines: ["Opening LinkedIn profile in a new tab..."] },
      "5": { action: () => { window.location.href = "mailto:itzshikharofficial@gmail.com?subject=Recruitment%20Inquiry"; }, lines: ["Preparing a direct email to Shikhar..."] },
      "6": { action: () => scrollToWorkspace("projects"), lines: ["Opening featured projects..."] },
    }[option];

    if (!result) {
      addTerminalEntry({ command: option, lines: ["Unknown option.", "Type a number between 1 and 6."], tone: "warning" });
      return;
    }

    addTerminalEntry({ command: option, lines: result.lines, tone: "accent" });
    result.action();
  }

  function submitCommand(commandOverride?: string) {
    const command = (commandOverride ?? input).trim();

    if (!command || isSessionClosed || recruitmentState === "running") {
      return;
    }

    if (command.toLowerCase() === "clear") {
      clearTerminal();
      return;
    }

    if (recruitmentState === "awaiting-option") {
      handleRecruitmentOption(command);
      setInput("");
      setHistoryIndex(null);
      window.requestAnimationFrame(focusInput);
      return;
    }

    if (command.toLowerCase().replace(/\s+/g, " ") === "sudo hire shikhar") {
      startRecruitmentProtocol(command);
      setInput("");
      setHistoryIndex(null);
      window.requestAnimationFrame(focusInput);
      return;
    }

    const result = resolveTerminalCommand(command);
    pushEntry({
      action: result.action,
      command,
      id: `${Date.now()}-${command}`,
      lines: result.lines,
      tone: result.tone,
    });
    runAction(result.action);
    setInput("");
    setHistoryIndex(null);
    window.requestAnimationFrame(focusInput);
  }

  function navigateHistory(direction: "next" | "previous") {
    if (!history.length) {
      return;
    }

    if (direction === "previous") {
      const nextIndex = historyIndex === null ? history.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIndex);
      setInput(history[nextIndex]);
      return;
    }

    if (historyIndex === null || historyIndex >= history.length - 1) {
      setHistoryIndex(null);
      setInput("");
      return;
    }

    const nextIndex = historyIndex + 1;
    setHistoryIndex(nextIndex);
    setInput(history[nextIndex]);
  }

  function autocomplete() {
    const match = terminalCommands.find((command) => command.startsWith(input.toLowerCase()));

    if (match) {
      setInput(match);
    }
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.ctrlKey && event.key.toLowerCase() === "l") {
      event.preventDefault();
      clearTerminal();
      return;
    }

    if (event.key === "Escape") {
      event.preventDefault();
      blurInput();
      return;
    }

    if (event.key === "Enter") {
      event.preventDefault();
      submitCommand();
      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      navigateHistory("previous");
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      navigateHistory("next");
    }

    if (event.key === "Tab") {
      event.preventDefault();
      autocomplete();
    }
  }

  return (
    <motion.section
      animate={{ filter: "blur(0px)", opacity: 1, scale: 1, y: 0 }}
      aria-label="SHIKHAR OS command center"
      className={cn("terminal-command-center mx-auto w-full max-w-[1280px]", className)}
      initial={{ filter: "blur(10px)", opacity: 0, scale: 0.985, y: 18 }}
      transition={transitions.emphasized}
    >
      <header className="grid gap-6 pb-10 lg:grid-cols-[minmax(0,1fr)_280px] lg:items-end lg:pb-12">
        <div>
          <p className="font-mono text-xs font-medium tracking-[0.2em] text-os-accent">[ / COMMAND CENTER ]</p>
          <h2 className="mt-3 text-3xl font-semibold leading-[0.98] text-os-text sm:text-4xl lg:text-5xl">Explore<br /><span className="text-os-accent">SHIKHAR OS</span></h2>
        </div>
        <p className="max-w-sm text-[15px] leading-6 text-os-muted">This portfolio is interactive.<br />Type a command and explore.</p>
      </header>

      <motion.div className={cn("terminal-window terminal-command-center__window", isExpanded ? "max-w-[1280px]" : "max-w-[1160px]")} layout onClick={focusInput} transition={transitions.emphasized}>
        <header className="relative z-10 flex h-10 items-center justify-between border-b border-os-border bg-black/20 px-4 sm:px-5">
          <div className="flex items-center gap-2">
            <button aria-label="Clear and reconnect terminal" className="size-3 rounded-full bg-os-danger transition-transform hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-os-danger" onClick={clearTerminal} title="Clear and reconnect" type="button" />
            <button aria-label="Minimize terminal" className="size-3 rounded-full bg-os-warning transition-transform hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-os-warning" onClick={() => setIsMinimized((current) => !current)} title="Minimize" type="button" />
            <button aria-label="Expand terminal" className="size-3 rounded-full bg-os-accent transition-transform hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-os-accent" onClick={() => setIsExpanded((current) => !current)} title="Expand" type="button" />
          </div>
          <div className="flex min-w-0 items-center gap-2 font-mono text-xs text-os-muted"><TerminalSquare aria-hidden="true" size={14} className="shrink-0 text-os-accent" /><span className="truncate">visitor@shikhar-os</span></div>
          <div className="flex items-center gap-1.5 font-mono text-[11px] text-os-accent"><CircleDot aria-hidden="true" size={13} /><span className="hidden sm:inline">ONLINE</span></div>
        </header>

      <AnimatePresence initial={false}>
        {!isMinimized ? (
          <motion.div
            animate={{ height: "auto", opacity: 1 }}
            className="relative z-10 overflow-hidden"
            exit={{ height: 0, opacity: 0 }}
            initial={{ height: 0, opacity: 0 }}
            transition={transitions.standard}
          >
            <div className="relative flex h-[468px] flex-col font-mono text-[13px] sm:h-[530px] lg:h-[576px]" onWheel={handleTerminalWheel}>
              <div ref={historyScrollRef} className="terminal-history relative min-h-0 flex-1 overflow-y-auto px-4 py-4 sm:px-5">
                <AnimatePresence>{isMatrixActive ? <MatrixRain /> : null}</AnimatePresence>
                <div className="relative z-10">
                <div className="terminal-welcome mb-6 border border-os-accent/20 bg-os-accent/[0.035] px-4 py-4">
                  <p className="text-base font-medium text-os-text">Welcome to <span className="text-os-accent">SHIKHAR OS</span></p>
                  <p className="mt-1 text-os-muted">Version 4.0 <span className="mx-2 text-os-border-strong">/</span> Type <span className="text-os-accent">help</span> to see available commands.</p>
                  <div className="mt-4 flex flex-wrap gap-2">{["help", "whoami", "projects", "coffee"].map((command) => <button key={command} className="terminal-command-chip" onClick={() => submitCommand(command)} type="button">{command}</button>)}</div>
                </div>
                <div className="space-y-5">{entries.map((entry) => <TerminalOutput key={entry.id} entry={entry} />)}</div>
                </div>
              </div>
              <div className="relative z-10 flex min-w-0 items-center gap-2 border-t border-os-border px-4 py-4 sm:px-5" onClick={focusInput}>
                <span className="shrink-0 text-os-accent">visitor@shikhar-os</span><span className="shrink-0 text-os-muted">:~$</span>
                <input ref={inputRef} aria-label="Terminal command" autoCapitalize="none" autoComplete="off" autoCorrect="off" className="min-w-0 flex-1 bg-transparent text-os-text caret-os-accent outline-none disabled:cursor-not-allowed" disabled={isSessionClosed || recruitmentState === "running"} onChange={(event) => { setInput(event.target.value); setHistoryIndex(null); }} onKeyDown={handleKeyDown} placeholder={isSessionClosed ? "Connection closed. Use the red control to reconnect." : recruitmentState === "running" ? "Recruitment protocol initializing..." : recruitmentState === "awaiting-option" ? "Select an option [1-6]..." : "Type a command..."} spellCheck={false} value={input} />
                {!isSessionClosed ? <span aria-hidden="true" className="terminal-caret h-4 w-1.5 shrink-0 bg-os-accent" /> : null}
              </div>
            </div>
            <footer className="relative z-10 flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-t border-os-border px-4 py-3 font-mono text-[10px] text-os-muted sm:px-6"><span><Command aria-hidden="true" className="mr-1 inline text-os-accent" size={12} />Ctrl + L clear</span><span>Tab autocomplete</span><span>Up/Down history</span><span>Esc blur</span></footer>
          </motion.div>
        ) : null}
      </AnimatePresence>
      </motion.div>
    </motion.section>
  );
}