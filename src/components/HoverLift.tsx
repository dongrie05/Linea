"use client";

import { m } from "motion/react";
import { springSettle } from "@/lib/motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export default function HoverLift({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  const reduced = useReducedMotion();

  return (
    <m.div
      className={className}
      whileHover={reduced ? undefined : { y: -2 }}
      transition={springSettle}
    >
      {children}
    </m.div>
  );
}
