"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { GitCommitHorizontal } from "lucide-react";
import { useRef } from "react";

import { transitions } from "@/config/animations";
import { journeyCommits } from "@/data/journey";
import { cn } from "@/lib/utils";

export function DeveloperJourney() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ offset: ["start 72%", "end 65%"], target: timelineRef });
  const lineProgress = useSpring(scrollYProgress, { damping: 30, mass: 0.4, stiffness: 120 });

  return (
    <section id="timeline" aria-label="Developer journey" className="developer-journey scroll-mt-24">
      <div className="mx-auto max-w-[1440px]">
        <header className="grid gap-8 pb-16 lg:grid-cols-[minmax(0,1fr)_310px] lg:items-end lg:pb-20">
          <div>
            <p className="font-mono text-xs font-medium tracking-[0.2em] text-os-accent">[ / JOURNEY ]</p>
            <h2 className="mt-4 max-w-4xl text-4xl font-semibold leading-[0.98] text-os-text sm:text-5xl lg:text-6xl">Every Commit<br />Built The <span className="text-os-accent">Developer</span><br />I Am Today.</h2>
          </div>
          <p className="max-w-sm text-[15px] leading-6 text-os-muted">My journey isn&apos;t measured by years. It&apos;s measured by products shipped, lessons learned and problems solved.</p>
        </header>

        <div ref={timelineRef} className="journey-timeline">
          <div aria-hidden="true" className="journey-timeline__rail" />
          <motion.div aria-hidden="true" className="journey-timeline__progress" style={{ scaleY: lineProgress }} />
          {journeyCommits.map((commit, index) => <JourneyCommitCard key={commit.id} commit={commit} index={index} />)}
        </div>
      </div>
    </section>
  );
}

type JourneyCommitCardProps = { commit: (typeof journeyCommits)[number]; index: number };

function JourneyCommitCard({ commit, index }: JourneyCommitCardProps) {
  const isHead = commit.status === "HEAD";

  return (
    <motion.article
      animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
      className={cn("journey-commit", index % 2 === 0 ? "journey-commit--left" : "journey-commit--right", isHead && "journey-commit--head")}
      initial={{ filter: "blur(5px)", opacity: 0, y: 18 }}
      transition={{ ...transitions.emphasized, delay: Math.min(index * 0.08, 0.32) }}
      whileHover={{ y: -5 }}
    >
      <span aria-hidden="true" className="journey-commit__connector" />
      <motion.span animate={isHead ? { boxShadow: ["0 0 0 0 rgba(74,222,128,0.34)", "0 0 0 11px rgba(74,222,128,0)"] } : {}} className="journey-commit__dot" transition={{ duration: 2.4, ease: "easeOut", repeat: Infinity }} />
      <div className="journey-commit__card">
        <div className="flex items-center justify-between gap-4 font-mono text-[11px]">
          <span className="flex items-center gap-2 text-os-muted"><GitCommitHorizontal aria-hidden="true" size={14} />{isHead ? "HEAD →" : `commit ${String(index + 1).padStart(2, "0")}`}</span>
          <span className="journey-commit__year">{commit.year}</span>
        </div>
        <p className="journey-commit__hash mt-7 font-mono text-xs text-os-secondary">{commit.hash}</p>
        <h3 className="mt-2 text-2xl font-semibold leading-tight text-os-text">{commit.message}</h3>
        <p className="journey-commit__summary mt-3 max-w-md text-sm leading-7 text-os-muted">{commit.summary}</p>
        <div className="journey-commit__tech-list mt-6 flex flex-wrap gap-2">{commit.tech.map((item) => <span key={item} className="journey-commit__tech">{item}</span>)}</div>
      </div>
    </motion.article>
  );
}