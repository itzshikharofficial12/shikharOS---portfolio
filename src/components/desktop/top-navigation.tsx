"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Menu, Power, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

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
  const mobileMenuRef = useRef<HTMLElement>(null);

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

  useEffect(() => {
    if (!isMenuOpen) return;

    const previousOverflow = document.body.style.overflow;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const menu = mobileMenuRef.current;
    const focusableSelector = 'a[href], button:not([disabled])';

    document.body.style.overflow = "hidden";
    menu?.querySelector<HTMLElement>(focusableSelector)?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
        return;
      }

      if (event.key !== "Tab" || !menu) return;

      const focusableItems = Array.from(menu.querySelectorAll<HTMLElement>(focusableSelector));
      const firstItem = focusableItems[0];
      const lastItem = focusableItems.at(-1);

      if (!firstItem || !lastItem) return;

      if (event.shiftKey && document.activeElement === firstItem) {
        event.preventDefault();
        lastItem.focus();
      } else if (!event.shiftKey && document.activeElement === lastItem) {
        event.preventDefault();
        firstItem.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      previouslyFocused?.focus();
    };
  }, [isMenuOpen]);

  return (
    <header className="sticky top-0 z-30 h-[60px] border-b border-os-border bg-os-background/72 px-3 backdrop-blur-[var(--blur-glass)] md:h-16 md:px-6">
      <div className="relative mx-auto flex h-full max-w-[1440px] items-center justify-between">
        <div className="flex min-w-0 items-center gap-2 md:gap-2.5">
          <motion.div
            animate={{ opacity: [0.78, 1, 0.78] }}
            className="flex size-7 shrink-0 items-center justify-center rounded-os border border-os-border bg-os-surface text-os-accent md:size-8"
            transition={{ duration: 2.6, ease: "easeInOut", repeat: Infinity }}
          >
            <Power aria-hidden="true" size={14} strokeWidth={1.75} />
          </motion.div>
          <span className="truncate text-[11px] font-semibold tracking-[0.1em] text-os-text md:text-[13px] md:tracking-[0.12em]">SHIKHAR OS</span>
          <span className="hidden items-center gap-2 text-xs text-os-muted xl:flex">
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
            className="inline-flex min-h-11 items-center gap-1.5 rounded-os border border-os-accent/60 bg-os-surface px-2.5 font-mono text-xs text-os-text xl:hidden"
            href="https://cal.com/shikhar-srivastava/let-s-build-something"
            rel="noopener noreferrer"
            target="_blank"
            whileTap={{ scale: 0.98 }}
          >
            <span aria-hidden="true" className="text-os-accent">&gt;</span>
            Call
            <ArrowUpRight aria-hidden="true" className="text-os-accent" size={14} />
          </motion.a>
          <motion.a
            className="group hidden cursor-pointer items-center gap-1.5 rounded-full border border-os-accent/60 bg-os-surface/45 px-3 py-1.5 text-[12px] font-semibold leading-5 text-white shadow-[0_0_0_rgba(74,222,128,0)] transition-[background-color,border-color,box-shadow] duration-[250ms] hover:border-os-accent hover:bg-[rgba(74,222,128,0.07)] hover:shadow-[0_0_20px_rgba(74,222,128,0.3)] focus-visible:shadow-[var(--shadow-focus)] focus-visible:outline-none xl:inline-flex"
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
            className="flex size-11 items-center justify-center rounded-os border border-os-border bg-os-surface text-os-text focus-visible:shadow-[var(--shadow-focus)] focus-visible:outline-none xl:hidden"
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
              ref={mobileMenuRef}
              animate={{ opacity: 1, x: 0 }}
              aria-label="Mobile primary navigation"
              className="fixed inset-0 z-[100] flex h-dvh w-screen flex-col overflow-hidden bg-os-background px-5 pb-6 pt-5 xl:hidden"
              exit={{ opacity: 0, x: "100%" }}
              initial={{ opacity: 1, x: "100%" }}
              onKeyDown={(event) => {
                if (event.key === "Escape") setIsMenuOpen(false);
              }}
              transition={{ duration: 0.28, ease: "easeOut" }}
            >
              <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:72px_72px]" />
              <header className="relative z-10 flex min-h-11 items-center justify-between border-b border-os-border pb-4">
                <span className="text-sm font-semibold tracking-[0.1em] text-os-text">SHIKHAR OS</span>
                <button aria-label="Close navigation menu" className="flex size-11 items-center justify-center rounded-os border border-os-border bg-os-surface text-os-text focus-visible:shadow-[var(--shadow-focus)] focus-visible:outline-none" onClick={() => setIsMenuOpen(false)} type="button"><X aria-hidden="true" size={18} /></button>
              </header>
              <div className="relative z-10 mt-6 grid gap-2">
                {navigationItems.map((item) => (
                  <motion.a
                    key={item.href}
                    aria-current={activeSection === item.href.slice(1) ? "page" : undefined}
                    href={item.href}
                    className="flex min-h-14 items-center rounded-os border border-transparent border-l-2 px-4 text-lg font-medium text-os-muted transition-colors hover:border-os-accent/40 hover:bg-os-accent/[0.06] hover:text-os-text aria-[current=page]:border-os-accent aria-[current=page]:bg-os-accent/[0.07] aria-[current=page]:text-os-text focus-visible:shadow-[var(--shadow-focus)] focus-visible:outline-none"
                    onClick={() => setIsMenuOpen(false)}
                    transition={transitions.interaction}
                    whileTap={{ scale: 0.98 }}
                  >
                    {item.label}
                  </motion.a>
                ))}
              </div>
              <footer className="relative z-10 mt-auto border-t border-os-border pt-5">
                <div className="mb-4 flex items-center justify-between font-mono text-xs"><span className="text-os-muted">SYSTEM STATUS</span><span className="inline-flex items-center gap-2 text-os-accent"><i className="size-2 rounded-full bg-os-accent shadow-[0_0_12px_rgba(74,222,128,0.75)]" />ONLINE</span></div>
                <motion.a className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-os border border-os-accent/60 bg-os-surface px-4 text-sm font-medium text-os-text" href="https://cal.com/shikhar-srivastava/let-s-build-something" rel="noopener noreferrer" target="_blank" whileTap={{ scale: 0.98 }}><span className="font-mono text-os-accent">&gt;</span> Book a Call <ArrowUpRight aria-hidden="true" className="text-os-accent" size={16} /></motion.a>
              </footer>
            </motion.nav>
          ) : null}
        </AnimatePresence>
      </div>
    </header>
  );
}