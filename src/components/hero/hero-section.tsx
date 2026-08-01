"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Layers2 } from "lucide-react";

import { LiveStatusMonitor } from "@/components/hero/live-status-monitor";
import { transitions } from "@/config/animations";

const reveal = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0 },
};

export function HeroSection() {
  return (
    <section
      id="universe"
      aria-labelledby="hero-heading"
      className="relative flex h-auto min-h-0 items-start overflow-visible px-4 py-8 sm:px-9 md:h-[calc(100dvh-4rem)] md:min-h-[calc(100dvh-4rem)] md:items-center md:overflow-hidden md:px-6 md:pb-28 md:pt-10 lg:px-14 lg:pb-24"
    >
      <div className="relative z-10 mx-auto grid w-full max-w-[1280px] items-center gap-5 text-center md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] md:gap-5 md:text-left lg:grid-cols-[minmax(0,0.92fr)_minmax(360px,0.88fr)] lg:gap-6">
        <motion.div
          animate="visible"
          className="mx-auto w-full max-w-[580px] md:mx-0"
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
            className="mx-auto mt-5 max-w-[430px] text-[15px] leading-6 text-os-muted md:mx-0 md:mt-6 md:text-base md:leading-7"
            transition={transitions.emphasized}
            variants={reveal}
          >
            I build digital products,
            <br />
            AI systems,
            <br />
            and premium experiences.
          </motion.p>

          <motion.a
            className="mx-auto mt-4 w-fit font-mono text-[13px] text-os-secondary transition-colors hover:text-os-accent focus-visible:shadow-[var(--shadow-focus)] focus-visible:outline-none md:mx-0 md:mt-5"
            href="https://celestiastudios.in"
            rel="noopener noreferrer"
            target="_blank"
            transition={transitions.emphasized}
            variants={reveal}
          >
            Co-Founder @ Celestia Studios
          </motion.a>

          <motion.div
            className="mt-6 flex flex-col items-stretch gap-3 sm:flex-row sm:justify-center md:mt-7 md:justify-start"
            transition={transitions.emphasized}
            variants={reveal}
          >
            <motion.a href="#terminal" className="command-button min-h-11 justify-center" transition={transitions.interaction} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              Explore Universe
              <ArrowUpRight aria-hidden="true" size={16} strokeWidth={1.75} />
            </motion.a>
            <motion.a
              href="#projects"
              className="sidebar-button min-h-11 justify-center border border-os-border bg-os-surface px-3 py-1.5 text-sm text-os-text"
              transition={transitions.interaction}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <Layers2 aria-hidden="true" size={16} strokeWidth={1.75} />
              View Projects
            </motion.a>
          </motion.div>
        </motion.div>

        <LiveStatusMonitor />
      </div>
    </section>
  );
}