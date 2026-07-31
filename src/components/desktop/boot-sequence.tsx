"use client";

import { gsap } from "gsap";
import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";

import { useTypingAudio } from "@/hooks/use-typing-audio";

const bootLines = [
  "Initializing SHIKHAR OS...",
  "Loading Kernel...",
  "Loading Portfolio...",
  "Connecting GitHub...",
  "Connecting AI...",
  "Loading Creativity...",
  "██████████████",
  "100%",
  "Access Granted.",
] as const;

type BootSequenceProps = {
  children: ReactNode;
  enableTypingAudio?: boolean;
};

export function BootSequence({ children, enableTypingAudio = false }: BootSequenceProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const [lines, setLines] = useState<string[]>([]);
  const [isComplete, setIsComplete] = useState(false);
  const { playKeystroke } = useTypingAudio({ enabled: enableTypingAudio });

  useEffect(() => {
    if (window.sessionStorage.getItem("shikhar-os-booted")) {
      setIsComplete(true);
      return;
    }

    const timeline = gsap.timeline({
      onComplete: () => {
        window.sessionStorage.setItem("shikhar-os-booted", "true");
        setIsComplete(true);
      },
    });

    bootLines.forEach((line, lineIndex) => {
      const writer = { count: 0 };
      const duration = line === "██████████████" ? 0.18 : Math.max(0.16, line.length * 0.014);

      timeline.to(writer, {
        count: line.length,
        duration,
        ease: "none",
        onStart: () => {
          setLines((currentLines) => [...currentLines, ""]);
        },
        onUpdate: () => {
          const typedLine = line.slice(0, Math.round(writer.count));
          setLines((currentLines) => currentLines.map((currentLine, index) => (index === lineIndex ? typedLine : currentLine)));
          playKeystroke();
        },
      });
      timeline.to({}, { duration: lineIndex === bootLines.length - 1 ? 0.22 : 0.055 });
    });

    timeline
      .to(terminalRef.current, { duration: 0.06, filter: "contrast(2.2) brightness(2.6)", x: 5 })
      .to(terminalRef.current, { duration: 0.08, filter: "contrast(0.75) brightness(0.55)", x: -4 })
      .to(terminalRef.current, { duration: 0.06, filter: "contrast(1.5) brightness(1.8)", x: 2 })
      .to(overlayRef.current, { duration: 0.45, ease: "power2.inOut", opacity: 0 })
      .set(overlayRef.current, { display: "none" });

    return () => {
      timeline.kill();
    };
  }, [playKeystroke]);

  return (
    <>
      {children}
      {!isComplete ? (
        <div ref={overlayRef} aria-label="SHIKHAR OS boot sequence" className="boot-overlay">
          <div ref={terminalRef} className="boot-terminal">
            <div className="boot-terminal__header">
              <span className="size-2 rounded-full bg-os-danger" />
              <span className="size-2 rounded-full bg-os-warning" />
              <span className="size-2 rounded-full bg-os-accent" />
              <span className="ml-2 font-mono text-[10px] text-os-muted">BOOT / SHIKHAR OS</span>
            </div>
            <div className="boot-terminal__body" aria-live="polite">
              {lines.map((line, index) => (
                <p key={`${bootLines[index]}-${index}`} className={index >= bootLines.length - 2 ? "text-os-accent" : "text-os-muted"}>
                  {line}
                </p>
              ))}
              <span aria-hidden="true" className="boot-cursor" />
            </div>
          </div>
          <div aria-hidden="true" className="boot-scanlines" />
        </div>
      ) : null}
    </>
  );
}