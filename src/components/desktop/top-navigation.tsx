"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Menu, Power, X } from "lucide-react";
import { useEffect, useState } from "react";

import { transitions } from "@/config/animations";

const navigationItems = [
  { href: "#projects", label: "Projects" },
  { href: "#journey", label: "Journey" },
  { href: "#terminal", label: "Terminal" },
  { href: "#toolkit", label: "Toolkit" },
  { href: "#availability", label: "Availability" },
  { href: "#contact", label: "Contact" },
] as const;

export function TopNavigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("projects");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries.find((entry) => entry.isIntersecting);

        if (visibleEntry) {
          setActiveSection(visibleEntry.target.id);
        }
      },
      { rootMargin: "-32% 0px -55%" },
    );

    navigationItems.forEach(({ href }) => {
      const section = document.querySelector(href);

      if (section) {
        observer.observe(section);
      }
    });

    return () => observer.disconnect();
  }, []);

  return (
    <header className="sticky top-0 z-30 h-16 border-b border-os-border bg-os-background/72 px-4 backdrop-blur-[var(--blur-glass)] md:px-6">
      <div className="relative mx-auto flex h-full max-w-[1440px] items-center justify-between">
        <div className="flex min-w-0 items-center gap-2.5">
          <motion.div
            animate={{ opacity: [0.78, 1, 0.78] }}
            className="flex size-8 shrink-0 items-center justify-center rounded-os border border-os-border bg-os-surface text-os-accent"
            transition={{ duration: 2.6, ease: "easeInOut", repeat: Infinity }}
          >
            <Power aria-hidden="true" size={14} strokeWidth={1.75} />
          </motion.div>
          <span className="truncate text-[13px] font-semibold tracking-[0.12em] text-os-text">SHIKHAR OS</span>
          <span className="flex items-center gap-2 text-xs text-os-muted">
            <span className="size-2 rounded-full bg-os-accent shadow-[0_0_14px_rgba(74,222,128,0.8)]" />
            <span className="hidden sm:inline">ONLINE</span>
          </span>
        </div>

        <nav aria-label="Primary navigation" className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-0.5 xl:flex">
          {navigationItems.map((item) => (
            <motion.a
              key={item.href}
              aria-current={activeSection === item.href.slice(1) ? "page" : undefined}
              href={item.href}
              className="rounded-os px-2.5 py-1.5 text-[13px] text-os-muted transition-colors hover:bg-os-surface hover:text-os-text aria-[current=page]:bg-os-surface aria-[current=page]:text-os-text focus-visible:shadow-[var(--shadow-focus)] focus-visible:outline-none"
              transition={transitions.interaction}
              whileHover={{ scale: 1.03, y: -1 }}
              whileTap={{ scale: 0.98 }}
            >
              {item.label}
            </motion.a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <motion.a
            className="group inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-os-accent/60 bg-os-surface/45 px-3 py-1.5 text-[12px] font-semibold leading-5 text-white shadow-[0_0_0_rgba(74,222,128,0)] transition-[background-color,border-color,box-shadow] duration-[250ms] hover:border-os-accent hover:bg-[rgba(74,222,128,0.07)] hover:shadow-[0_0_20px_rgba(74,222,128,0.3)] focus-visible:shadow-[var(--shadow-focus)] focus-visible:outline-none"
            href="https://cal.com/shikhar-srivastava/let-s-build-something"
            rel="noopener noreferrer"
            target="_blank"
            transition={{ duration: 0.25, ease: "easeOut" }}
            whileHover={{ scale: 1.02, y: -1 }}
            whileTap={{ scale: 0.98 }}
          >
            <span aria-hidden="true" className="font-mono text-os-accent">&gt;</span>
            Book a Call
            <ArrowUpRight aria-hidden="true" className="text-os-accent transition-transform duration-[250ms] group-hover:translate-x-1" size={14} strokeWidth={2} />
          </motion.a>
          <motion.button
            aria-expanded={isMenuOpen}
            aria-label="Toggle navigation menu"
            className="flex size-8 items-center justify-center rounded-os border border-os-border bg-os-surface text-os-text focus-visible:shadow-[var(--shadow-focus)] focus-visible:outline-none xl:hidden"
            onClick={() => setIsMenuOpen((isOpen) => !isOpen)}
            transition={transitions.interaction}
            type="button"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            {isMenuOpen ? <X aria-hidden="true" size={15} /> : <Menu aria-hidden="true" size={15} />}
          </motion.button>
        </div>
        <AnimatePresence>
          {isMenuOpen ? (
            <motion.nav
              animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
              aria-label="Mobile primary navigation"
              className="absolute left-0 right-0 top-[calc(100%+0.5rem)] grid grid-cols-2 gap-1 rounded-os border border-os-border bg-os-background/95 p-2 shadow-[var(--shadow-soft)] backdrop-blur-[var(--blur-glass)] sm:grid-cols-3 xl:hidden"
              exit={{ filter: "blur(6px)", opacity: 0, y: -8 }}
              initial={{ filter: "blur(6px)", opacity: 0, y: -8 }}
              transition={transitions.standard}
            >
              {navigationItems.map((item) => (
                <motion.a
                  key={item.href}
                  aria-current={activeSection === item.href.slice(1) ? "page" : undefined}
                  href={item.href}
                  className="rounded-md px-3 py-3 text-sm text-os-muted transition-colors hover:bg-os-surface hover:text-os-text aria-[current=page]:bg-os-surface aria-[current=page]:text-os-text focus-visible:shadow-[var(--shadow-focus)] focus-visible:outline-none"
                  onClick={() => setIsMenuOpen(false)}
                  transition={transitions.interaction}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {item.label}
                </motion.a>
              ))}
            </motion.nav>
          ) : null}
        </AnimatePresence>
      </div>
    </header>
  );
}