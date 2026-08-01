"use client";

import { motion } from "framer-motion";

import { transitions } from "@/config/animations";
import { AvailabilitySection } from "@/components/availability/availability-section";
import { ContactSection } from "@/components/contact/contact-section";
import { TopNavigation } from "@/components/desktop/top-navigation";
import { SystemStatusBar } from "@/components/desktop/system-status-bar";
import { WorkspaceParticles } from "@/components/desktop/workspace-particles";
import { HeroSection } from "@/components/hero/hero-section";
import { DeveloperJourney } from "@/components/journey/developer-journey";
import { ProjectWorkspace } from "@/components/projects/project-workspace";
import { DeveloperToolkit } from "@/components/skills/developer-toolkit";
import { TerminalWindow } from "@/components/terminal/terminal-window";

export function DesktopShell() {
  return (
    <main className="relative isolate flex min-h-dvh overflow-x-hidden bg-os-background">
      <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:64px_64px]" />
      <WorkspaceParticles />
      <motion.div
        animate={{ filter: "blur(0px)", opacity: 1, scale: 1 }}
        className="relative z-10 flex min-h-dvh w-full flex-col"
        initial={{ filter: "blur(14px)", opacity: 0, scale: 1.015 }}
        transition={transitions.cinematic}
      >
        <TopNavigation />
        <section aria-label="Desktop workspace" className="relative flex-1">
          <section id="home" aria-label="Introduction workspace" className="scroll-mt-24">
            <HeroSection />
          </section>
          <section id="projects" aria-label="Projects workspace" className="scroll-mt-24 px-6 py-16 sm:px-9 lg:py-20 lg:px-14">
            <ProjectWorkspace />
          </section>
          <section id="journey" aria-label="Journey workspace" className="scroll-mt-24 px-6 py-16 sm:px-9 lg:py-20 lg:px-14">
            <DeveloperJourney />
          </section>
          <section id="terminal" aria-label="Terminal workspace" className="scroll-mt-24 px-6 py-16 sm:px-9 lg:py-20 lg:px-14">
            <TerminalWindow />
          </section>
          <section id="toolkit" aria-label="Technology workspace" className="scroll-mt-24 px-6 py-16 sm:px-9 lg:py-20 lg:px-14">
            <DeveloperToolkit />
          </section>
          <section id="availability" aria-label="Availability workspace" className="scroll-mt-24 px-6 py-16 sm:px-9 lg:py-20 lg:px-14">
            <AvailabilitySection />
          </section>
          <section id="contact" aria-label="Contact workspace" className="scroll-mt-24 px-6 pb-40 pt-16 sm:px-9 lg:pb-44 lg:pt-20 lg:px-14">
            <ContactSection />
          </section>
        </section>
      </motion.div>
      <SystemStatusBar />
    </main>
  );
}