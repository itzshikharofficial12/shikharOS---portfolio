"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Activity, Boxes, BrainCircuit, CheckCircle2, Code2, Flame, Rocket } from "lucide-react";
import { useEffect, useState } from "react";

import { useCurrentTime } from "@/hooks/use-current-time";

const statusMessages = [
  "It works. Don't touch it.",
  "Currently converting coffee into code.",
  "Debugging reality...",
  "Running npm run dreams",
  "Searching for semicolons...",
  "Building. Learning. Shipping.",
  "Sleep process terminated.",
  "Overthinking UI since 2024.",
  "404: Motivation not found. Reloading...",
  "Fixing bugs I created five minutes ago.",
  "Deploying ideas faster than sleep.",
  "Relationship Status: Waiting for Merge Approval...",
  "Relationships: Feature Coming Soon™",
  "Relationships: No Open Issues",
] as const;

const stack = ["React", "Next.js", "Node.js", "TypeScript", "AI"] as const;
const timeFormatter = new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", hour12: false });

function useStatusMessage() {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => setMessageIndex((current) => (current + 1) % statusMessages.length), 9_000);

    return () => window.clearInterval(interval);
  }, []);

  return statusMessages[messageIndex];
}

type MonitorRowProps = {
  children: React.ReactNode;
  icon: React.ReactNode;
  label: string;
  status?: string;
};

function MonitorRow({ children, icon, label, status }: MonitorRowProps) {
  return (
    <div className="live-status-monitor__row">
      <span className="live-status-monitor__row-icon">{icon}</span>
      <span className="live-status-monitor__row-label">{label}</span>
      <span className="live-status-monitor__row-value">{children}</span>
      {status ? <span className="live-status-monitor__row-status"><i />{status}</span> : null}
    </div>
  );
}

export function LiveStatusMonitor() {
  const currentTime = useCurrentTime();
  const message = useStatusMessage();
  const time = currentTime ? timeFormatter.format(currentTime) : "--:--";
  const dateTime = currentTime?.toISOString();

  return (
    <motion.aside
      animate={{ opacity: 1, y: 0 }}
      aria-label="SHIKHAR OS live status"
      className="live-status-monitor"
      initial={{ opacity: 0, y: 16 }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
    >
      <div aria-hidden="true" className="live-status-monitor__grid" />
      <div aria-hidden="true" className="live-status-monitor__particles"><i /><i /><i /><i /></div>
      <header className="live-status-monitor__header">
        <span className="live-status-monitor__identity"><i />SHIKHAR OS <b>ONLINE</b></span>
        <time dateTime={dateTime}>{time}</time>
      </header>
      <div className="live-status-monitor__body">
        <MonitorRow icon={<Rocket size={15} />} label="CURRENT MISSION" status="ACTIVE">Building Orbit CRM</MonitorRow>
        <MonitorRow icon={<BrainCircuit size={15} />} label="CURRENT FOCUS" status="LEARNING">System Design</MonitorRow>
        <MonitorRow icon={<Boxes size={15} />} label="CURRENT STACK">
          <span className="live-status-monitor__pills">{stack.map((item) => <b key={item}>{item}</b>)}</span>
        </MonitorRow>
        <MonitorRow icon={<CheckCircle2 size={15} />} label="LAST DEPLOYMENT" status="SUCCESS"><span>Portfolio v3 <small>2 hours ago</small></span></MonitorRow>
        <MonitorRow icon={<Flame size={15} />} label="BUILD STREAK"><motion.strong animate={{ opacity: [0, 1], y: [5, 0] }} transition={{ delay: 0.35, duration: 0.5 }}>187 Days</motion.strong></MonitorRow>
        <div className="live-status-monitor__message">
          <Activity aria-hidden="true" size={15} />
          <span className="live-status-monitor__row-label">CURRENT STATUS</span>
          <AnimatePresence mode="wait">
            <motion.span key={message} animate={{ opacity: 1, y: 0 }} className="live-status-monitor__message-text" exit={{ opacity: 0, y: -5 }} initial={{ opacity: 0, y: 5 }} transition={{ duration: 0.35 }}>
              {message}<i aria-hidden="true" />
            </motion.span>
          </AnimatePresence>
        </div>
      </div>
      <footer className="live-status-monitor__footer"><Code2 aria-hidden="true" size={13} /> LIVE SYSTEM MONITOR <span>v3.0.0</span></footer>
    </motion.aside>
  );
}