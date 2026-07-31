"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Layers2 } from "lucide-react";
import { useState, type PointerEvent as ReactPointerEvent } from "react";

import { HeroPlanet } from "@/components/hero/hero-planet";
import { transitions } from "@/config/animations";

const technologies = [
  { label: "React", position: "left-1/2 top-0 -translate-x-1/2 -translate-y-1/2" },
  { label: "Node", position: "right-[7%] top-[10%]" },
  { label: "Next", position: "right-0 top-1/2 -translate-y-1/2" },
  { label: "Docker", position: "bottom-[10%] right-[7%]" },
  { label: "AI", position: "bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2" },
  { label: "Prisma", position: "bottom-[10%] left-[7%]" },
  { label: "TypeScript", position: "left-0 top-1/2 -translate-y-1/2" },
  { label: "Python", position: "left-[7%] top-[10%]" },
] as const;

const reveal = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0 },
};

export function HeroSection() {
  const [orbitOffset, setOrbitOffset] = useState({ x: 0, y: 0 });

  function handlePointerMove(event: ReactPointerEvent<HTMLDivElement>) {
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;

    setOrbitOffset({ x: x * 18, y: y * 18 });
  }

  return (
    <section
      id="universe"
      aria-labelledby="hero-heading"
      className="relative flex min-h-[calc(84dvh-64px)] items-center overflow-hidden px-6 pb-28 pt-10 sm:px-9 lg:px-14 lg:pb-24"
    >
      <div className="relative z-10 mx-auto grid w-full max-w-[1280px] items-center gap-8 lg:grid-cols-[minmax(0,0.92fr)_minmax(360px,0.88fr)] lg:gap-6">
        <motion.div
          animate="visible"
          className="max-w-[580px]"
          initial="hidden"
          transition={{ delayChildren: 0.1, staggerChildren: 0.1 }}
          variants={{ visible: { transition: { delayChildren: 0.1, staggerChildren: 0.1 } } }}
        >
          <motion.p
            className="mb-4 inline-flex items-center gap-2 rounded-os border border-os-border bg-os-surface px-2.5 py-1.5 font-mono text-[11px] text-os-muted"
            transition={transitions.emphasized}
            variants={reveal}
          >
            <span className="size-2 rounded-full bg-os-accent shadow-[0_0_14px_rgba(74,222,128,0.8)]" />
            [NODE : HOME]
          </motion.p>

          <motion.h1
            id="hero-heading"
            className="font-sans text-4xl font-semibold leading-[0.9] tracking-normal text-os-text sm:text-5xl md:text-6xl xl:text-[4.4rem]"
            transition={transitions.cinematic}
            variants={reveal}
          >
            <span className="block">Namaste,</span>
            <span className="block text-os-accent">I&apos;m Shikhar.</span>
          </motion.h1>

          <motion.p
            className="mt-6 max-w-[430px] text-base leading-7 text-os-muted"
            transition={transitions.emphasized}
            variants={reveal}
          >
            I build digital products,
            <br />
            AI systems,
            <br />
            and premium experiences.
          </motion.p>

          <motion.p
            className="mt-5 font-mono text-[13px] text-os-secondary"
            transition={transitions.emphasized}
            variants={reveal}
          >
            Co-Founder @ Celestia Studios
          </motion.p>

          <motion.div
            className="mt-7 flex flex-wrap items-center gap-2"
            transition={transitions.emphasized}
            variants={reveal}
          >
            <motion.a href="#universe" className="command-button" transition={transitions.interaction} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              Explore Universe
              <ArrowUpRight aria-hidden="true" size={16} strokeWidth={1.75} />
            </motion.a>
            <motion.a
              href="#projects"
              className="sidebar-button border border-os-border bg-os-surface px-3 py-1.5 text-sm text-os-text"
              transition={transitions.interaction}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <Layers2 aria-hidden="true" size={16} strokeWidth={1.75} />
              View Projects
            </motion.a>
          </motion.div>
        </motion.div>

        <div
          className="relative mx-auto aspect-square w-full max-w-[470px]"
          onPointerLeave={() => setOrbitOffset({ x: 0, y: 0 })}
          onPointerMove={handlePointerMove}
        >
          <motion.div
            animate={orbitOffset}
            className="absolute inset-[14%] rounded-full border border-os-border"
            transition={{ ...transitions.standard, duration: 0.34 }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              className="absolute inset-0"
              transition={{ duration: 36, ease: "linear", repeat: Infinity }}
            >
              {technologies.map(({ label, position }) => (
                <motion.div
                  key={label}
                  animate={{ rotate: -360 }}
                  className={`absolute ${position}`}
                  transition={{ duration: 36, ease: "linear", repeat: Infinity }}
                >
                  <span className="inline-flex whitespace-nowrap rounded-os border border-os-border bg-os-background/72 px-3 py-1.5 font-mono text-[11px] text-os-muted shadow-[var(--shadow-soft)] backdrop-blur-[var(--blur-glass)]">
                    {label}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
          <div aria-hidden="true" className="absolute inset-[25%] rounded-full border border-os-border/60" />
          <div className="absolute inset-[30%]">
            <HeroPlanet />
          </div>
        </div>
      </div>
    </section>
  );
}