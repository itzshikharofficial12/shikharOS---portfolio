"use client";

import { motion } from "framer-motion";
import { ArrowLeft, CircleDollarSign, Coffee, Code2, CreditCard, Github, HeartHandshake, Lightbulb, MoonStar, Rocket, Sparkles, UsersRound, WalletCards } from "lucide-react";
import Link from "next/link";

import { supportMethods } from "@/config/support";
import { transitions } from "@/config/animations";

const supportReasons = [
  { description: "Keeps the coffee flowing through the next late-night build.", icon: Coffee, title: "Coffee" },
  { description: "Helps more useful projects stay open and accessible.", icon: Code2, title: "Open Source" },
  { description: "Makes room for experiments and future products.", icon: Rocket, title: "Future Projects" },
] as const;

const contributionOptions = ["₹100", "₹250", "₹500", "Custom"] as const;

const providerIcons = {
  "Buy Me a Coffee": Coffee,
  "GitHub Sponsors": Github,
  PayPal: CircleDollarSign,
  Stripe: CreditCard,
  UPI: WalletCards,
} as const;

const reveal = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};

export function SupportModule() {
  return (
    <main className="support-module">
      <div aria-hidden="true" className="support-module__grid" />
      <div className="support-module__content">
        <motion.header animate="visible" className="support-module__hero" initial="hidden" transition={{ delayChildren: 0.05, staggerChildren: 0.08 }} variants={{ visible: { transition: { delayChildren: 0.05, staggerChildren: 0.08 } } }}>
          <motion.div transition={transitions.emphasized} variants={reveal}>
            <Link className="support-module__back" href="/">
              <ArrowLeft aria-hidden="true" size={15} /> Back to SHIKHAR OS
            </Link>
          </motion.div>
          <motion.p className="support-module__eyebrow" transition={transitions.emphasized} variants={reveal}>[ / SUPPORT ]</motion.p>
          <motion.h1 transition={transitions.cinematic} variants={reveal}>Support <span>SHIKHAR OS</span></motion.h1>
          <motion.p className="support-module__intro" transition={transitions.emphasized} variants={reveal}>If this portfolio inspired you, taught you something, or simply made you smile, consider supporting future builds.</motion.p>
        </motion.header>

        <motion.section animate={{ opacity: 1, y: 0 }} className="support-module__support-card" initial={{ opacity: 0, y: 18 }} transition={{ ...transitions.emphasized, delay: 0.16 }}>
          <div className="support-module__support-icon"><Coffee aria-hidden="true" size={24} /></div>
          <div className="support-module__support-copy">
            <p>[ FUEL THE NEXT BUILD ]</p>
            <h2>Fuel the Next Build</h2>
            <span>Support the projects, experiments, late-night coding sessions and open-source work.</span>
          </div>
          <div className="support-module__contributions" aria-label="Contribution amount placeholders">
            {contributionOptions.map((amount) => <motion.button key={amount} transition={transitions.interaction} type="button" whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.98 }}>{amount}</motion.button>)}
          </div>
        </motion.section>

        <section className="support-module__section">
          <div className="support-module__section-heading">
            <p>[ PAYMENT METHODS ]</p>
            <h2>Choose a support method.</h2>
          </div>
          <div className="support-module__methods">
            {supportMethods.map(({ enabled, label, provider, url }) => {
              const Icon = providerIcons[provider];
              const content = <><Icon aria-hidden="true" size={18} /><span><strong>{provider}</strong><small>{enabled ? label : "COMING SOON"}</small></span>{enabled ? <Sparkles aria-hidden="true" size={16} /> : <i>LOCKED</i>}</>;

              return enabled && url ? <motion.a className="support-module__method support-module__method--enabled" href={url} initial={{ opacity: 0, y: 12 }} key={provider} transition={transitions.emphasized} viewport={{ amount: 0.3, once: true }} whileInView={{ opacity: 1, y: 0 }}>{content}</motion.a> : <motion.div aria-disabled="true" className="support-module__method" initial={{ opacity: 0, y: 12 }} key={provider} transition={transitions.emphasized} viewport={{ amount: 0.3, once: true }} whileInView={{ opacity: 1, y: 0 }}>{content}</motion.div>;
            })}
          </div>
        </section>

        <section className="support-module__section support-module__section--why">
          <div className="support-module__section-heading">
            <p>[ WHY SUPPORT ]</p>
            <h2>Support what comes next.</h2>
          </div>
          <div className="support-module__reasons">
            {supportReasons.map(({ description, icon: Icon, title }) => (
              <motion.article key={title} className="support-module__reason" initial={{ opacity: 0, y: 14 }} transition={transitions.emphasized} viewport={{ amount: 0.3, once: true }} whileHover={{ scale: 1.015, y: -3 }} whileInView={{ opacity: 1, y: 0 }}>
                <Icon aria-hidden="true" size={20} />
                <h3>{title}</h3>
                <p>{description}</p>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="support-module__section support-module__supporters">
          <div className="support-module__section-heading">
            <p>[ RECENT SUPPORTERS ]</p>
            <h2>Recent Supporters</h2>
            <span>Coming Soon. Future supporters will appear here.</span>
          </div>
          <div className="support-module__supporter-skeletons" aria-label="Recent supporters coming soon">
            {[0, 1, 2].map((index) => <div className="support-module__supporter-skeleton" key={index}><UsersRound aria-hidden="true" size={16} /><span /><i /></div>)}
          </div>
        </section>

        <section className="support-module__terminal-note" aria-label="Thank you message">
          <div><span>visitor@shikhar-os</span><b>:~$</b> echo &quot;thank you&quot;</div>
          <p>Every contribution helps build something meaningful.<i aria-hidden="true" /></p>
        </section>

        <footer className="support-module__footer">
          <span>Made with</span><MoonStar aria-hidden="true" size={14} /><span>Late Nights</span><Lightbulb aria-hidden="true" size={14} /><span>Curiosity</span><Coffee aria-hidden="true" size={14} /><span>Coffee</span><HeartHandshake aria-hidden="true" size={14} /><span>Code</span>
        </footer>
      </div>
    </main>
  );
}