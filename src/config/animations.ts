import type { Transition, Variants } from "framer-motion";

export const transitions = {
  interaction: {
    duration: 0.18,
    ease: [0.16, 1, 0.3, 1],
  },
  standard: {
    duration: 0.3,
    ease: [0.16, 1, 0.3, 1],
  },
  emphasized: {
    duration: 0.46,
    ease: [0.16, 1, 0.3, 1],
  },
  cinematic: {
    duration: 0.72,
    ease: [0.16, 1, 0.3, 1],
  },
} satisfies Record<string, Transition>;

export const fadeIn: Variants = {
  hidden: { filter: "blur(8px)", opacity: 0, y: 12 },
  visible: { filter: "blur(0px)", opacity: 1, transition: transitions.standard, y: 0 },
};