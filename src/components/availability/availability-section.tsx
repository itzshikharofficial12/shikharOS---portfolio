"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  GitPullRequestArrow,
  GraduationCap,
  LaptopMinimal,
  TerminalSquare,
  type LucideIcon,
} from "lucide-react";

import { transitions } from "@/config/animations";
import { availabilityContent } from "@/data/availability";

const iconRegistry: Record<string, LucideIcon> = {
  GitPullRequestArrow,
  GraduationCap,
  LaptopMinimal,
};

function OpportunityIcon({ name }: { name: string }) {
  const Icon = iconRegistry[name];
  return <Icon aria-hidden="true" size={20} strokeWidth={1.5} />;
}

export function AvailabilitySection() {
  return (
    <section
      id="available"
      aria-label="Availability status"
      className="availability-status scroll-mt-24"
    >
      <div className="mx-auto max-w-[1500px]">
        <motion.header
          animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
          className="availability-status__header"
          initial={{ filter: "blur(8px)", opacity: 0, y: 14 }}
          transition={transitions.emphasized}
        >
          <p className="availability-status__badge">
            <span /> CURRENT STATUS
          </p>
          <h2>
            Open to Build.
            <br />
            Open to <span>Opportunities.</span>
          </h2>
          <p className="availability-status__description">
            {availabilityContent.description}
            <br />
            <small>{availabilityContent.note}</small>
          </p>
        </motion.header>

        <motion.div
          animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
          className="availability-console"
          initial={{ filter: "blur(8px)", opacity: 0, y: 18 }}
          transition={{ ...transitions.emphasized, delay: 0.1 }}
        >
          <header className="availability-console__top">
            <span>
              <TerminalSquare aria-hidden="true" size={14} /> <b>SHIKHAR OS</b>
              <span className="availability-console__path"><i>/</i> availability</span>
            </span>
            <span className="availability-console__live">
              <b /> available_for_opportunities
            </span>
          </header>
          <div className="availability-console__opportunities">
            {availabilityContent.opportunities.map((opportunity, index) => (
              <motion.article
                key={opportunity.title}
                animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
                className="availability-opportunity"
                initial={{ filter: "blur(5px)", opacity: 0, y: 10 }}
                transition={{
                  ...transitions.emphasized,
                  delay: 0.16 + index * 0.07,
                }}
                whileHover={{ scale: 1.02, y: -4 }}
              >
                <p className="availability-opportunity__badge">
                  <i /> {opportunity.status}
                </p>
                <span className="availability-opportunity__icon">
                  <OpportunityIcon name={opportunity.icon} />
                </span>
                <h3>{opportunity.title}</h3>
                <p>{opportunity.description}</p>
                <a
                  href={opportunity.href}
                  rel={opportunity.href.startsWith("http") ? "noreferrer" : undefined}
                  target={opportunity.href.startsWith("http") ? "_blank" : undefined}
                >
                  {opportunity.action}{" "}
                  <ArrowRight aria-hidden="true" size={16} />
                </a>
              </motion.article>
            ))}
          </div>
          <footer className="availability-console__terminal">
            <p>
              <span>$</span> shikhar --status
            </p>
            <div>
              {availabilityContent.terminal.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </div>
          </footer>
        </motion.div>
      </div>
    </section>
  );
}
