"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import { useEffect } from "react";

const particlePositions = [
  "left-[7%] top-[16%]",
  "left-[14%] top-[38%]",
  "left-[21%] top-[73%]",
  "left-[28%] top-[24%]",
  "left-[34%] top-[57%]",
  "left-[41%] top-[12%]",
  "left-[47%] top-[82%]",
  "left-[53%] top-[35%]",
  "left-[59%] top-[65%]",
  "left-[64%] top-[18%]",
  "left-[69%] top-[48%]",
  "left-[74%] top-[77%]",
  "left-[79%] top-[29%]",
  "left-[85%] top-[58%]",
  "left-[91%] top-[15%]",
  "left-[95%] top-[81%]",
] as const;

export function WorkspaceParticles() {
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  useEffect(() => {
    function updateParallax(event: PointerEvent) {
      cursorX.set(event.clientX / window.innerWidth - 0.5);
      cursorY.set(event.clientY / window.innerHeight - 0.5);
    }

    window.addEventListener("pointermove", updateParallax, { passive: true });

    return () => window.removeEventListener("pointermove", updateParallax);
  }, [cursorX, cursorY]);

  return (
    <div aria-hidden="true" className="workspace-particles pointer-events-none absolute inset-0 overflow-hidden">
      {particlePositions.map((position, index) => <WorkspaceParticle key={position} index={index} position={position} x={cursorX} y={cursorY} />)}
    </div>
  );
}

type WorkspaceParticleProps = {
  index: number;
  position: string;
  x: ReturnType<typeof useMotionValue<number>>;
  y: ReturnType<typeof useMotionValue<number>>;
};

function WorkspaceParticle({ index, position, x, y }: WorkspaceParticleProps) {
  const depth = 8 + (index % 4) * 5;
  const parallaxX = useTransform(x, (value) => value * depth);
  const parallaxY = useTransform(y, (value) => value * depth);

  return (
    <motion.span
      animate={{ opacity: [0.12, 0.66, 0.12], scale: [0.8, 1.18, 0.8] }}
      className={`absolute size-1 rounded-full bg-os-accent/70 ${position}`}
      style={{ x: parallaxX, y: parallaxY }}
      transition={{ delay: index * 0.15, duration: 5.4, ease: "easeInOut", repeat: Infinity }}
    />
  );
}