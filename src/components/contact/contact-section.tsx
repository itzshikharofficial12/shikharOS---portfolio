"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Check, Copy, FileText, Github, Linkedin, MapPin, Send, TerminalSquare } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { transitions } from "@/config/animations";

const deploymentSteps = ["Initializing...", "Uploading...", "Deploying...", "Connected...", "Message Delivered."];

const quickLinks = [
  { label: "GitHub", detail: "github.com/itzshikharofficial12", href: "https://github.com/itzshikharofficial12", icon: Github },
  { label: "LinkedIn", detail: "linkedin.com/in/itzshikhar12", href: "https://www.linkedin.com/in/itzshikhar12", icon: Linkedin },
  { label: "Email", detail: "Open a direct message", href: "mailto:itzshikharofficial@gmail.com", icon: Send },
  { label: "Resume", detail: "Available on request", href: "mailto:itzshikharofficial@gmail.com?subject=Resume%20request", icon: FileText },
] as const;

export function ContactSection() {
  const [message, setMessage] = useState("");
  const [deploymentStep, setDeploymentStep] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);
  const timerRef = useRef<number | null>(null);

  useEffect(() => () => {
    if (timerRef.current) window.clearTimeout(timerRef.current);
  }, []);

  function deployMessage() {
    if (deploymentStep !== null) return;

    setDeploymentStep(0);
    deploymentSteps.forEach((_, index) => {
      window.setTimeout(() => setDeploymentStep(index), index * 620);
    });
    timerRef.current = window.setTimeout(() => {
      setDeploymentStep(null);
      setMessage("");
    }, deploymentSteps.length * 620 + 2400);
  }

  async function copyEmail() {
    await navigator.clipboard?.writeText("hello@shikhar.dev");
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  return (
    <section id="contact" aria-label="Contact deployment" className="contact-deployment scroll-mt-24">
      <div className="mx-auto max-w-[1600px]">
        <header className="max-w-3xl">
          <p className="font-mono text-xs font-medium tracking-[0.2em] text-os-accent">[ / CONTACT ]</p>
          <h2 className="mt-4 text-4xl font-semibold leading-[0.98] text-os-text sm:text-5xl lg:text-6xl">Let&apos;s Build<br />Something <span className="text-os-accent">Amazing.</span></h2>
          <p className="mt-5 max-w-xl text-base leading-7 text-os-muted">If you&apos;re building something ambitious, let&apos;s make it happen together.</p>
        </header>

        <div className="contact-layout mt-12 lg:mt-14">
          <motion.section animate={{ filter: "blur(0px)", opacity: 1, y: 0 }} className="contact-terminal" initial={{ filter: "blur(8px)", opacity: 0, y: 14 }} transition={transitions.emphasized}>
            <header className="contact-terminal__bar"><div className="flex items-center gap-2"><span className="contact-terminal__dot bg-os-danger" /><span className="contact-terminal__dot bg-os-warning" /><span className="contact-terminal__dot bg-os-accent" /></div><span><TerminalSquare aria-hidden="true" size={14} /> deployment-channel</span></header>
            <div className="contact-terminal__body">
              <p className="text-os-muted">Ready to receive your next idea.</p>
              <p className="mt-7 text-os-text"><span className="text-os-accent">visitor@shikhar</span><span className="text-os-muted">:~$</span> <span className="text-white/80">git commit -m &quot;Let&apos;s build together&quot;</span></p>
              <label className="contact-message mt-5"><span className="sr-only">Message to deploy</span><span className="text-os-accent">$</span><textarea aria-label="Message to deploy" onChange={(event) => setMessage(event.target.value)} placeholder="Type your message..." rows={4} value={message} /></label>
              <button aria-label="Deploy message" className="contact-deploy-button mt-5" disabled={deploymentStep !== null} onClick={deployMessage} type="button"><Send aria-hidden="true" size={16} /> {deploymentStep === null ? "Deploy Message" : "Deploying"}</button>
              <AnimatePresence mode="wait">
                {deploymentStep !== null ? <motion.ol animate={{ opacity: 1, height: "auto" }} className="contact-deploy-log" exit={{ opacity: 0, height: 0 }} initial={{ opacity: 0, height: 0 }}><li className="text-os-muted">$ git push origin together</li>{deploymentSteps.slice(0, deploymentStep + 1).map((step, index) => <motion.li key={step} animate={{ opacity: 1, x: 0 }} className={index === deploymentSteps.length - 1 ? "contact-deploy-log__success" : ""} initial={{ opacity: 0, x: -6 }}>{index === deploymentSteps.length - 1 ? <Check aria-hidden="true" size={15} /> : <span className="contact-log-pulse" />}{step}</motion.li>)}</motion.ol> : null}
              </AnimatePresence>
            </div>
          </motion.section>

          <aside aria-label="Quick contact links" className="contact-links">
            <p className="font-mono text-xs tracking-[0.16em] text-os-muted">QUICK LINKS</p>
            <div className="mt-5">{quickLinks.map(({ detail, href, icon: Icon, label }) => <a key={label} className="contact-link" href={href} rel={href.startsWith("http") ? "noreferrer" : undefined} target={href.startsWith("http") ? "_blank" : undefined}><span className="contact-link__icon"><Icon aria-hidden="true" size={17} /></span><span><strong>{label}</strong><small>{detail}</small></span><ArrowUpRight aria-hidden="true" className="ml-auto text-os-muted" size={16} /></a>)}</div>
            <div className="contact-status"><MapPin aria-hidden="true" size={17} /><div><strong>India, Remote worldwide</strong><span>Open to meaningful collaborations</span></div><span className="contact-status__signal" /></div>
            <button aria-label="Copy email address" className="contact-copy" onClick={copyEmail} type="button">{copied ? <Check aria-hidden="true" size={15} /> : <Copy aria-hidden="true" size={15} />}{copied ? "Email copied" : "Copy email"}</button>
          </aside>
        </div>

        <footer className="contact-signoff"><p><span className="text-os-accent">$</span> Connection Established.</p><p>Thanks for visiting SHIKHAR OS.</p><p>System shutting down...</p><p className="text-os-text">Goodbye.<span aria-hidden="true" className="contact-cursor" /></p></footer>
      </div>
    </section>
  );
}