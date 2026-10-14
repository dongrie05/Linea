"use client";

import { motion } from "framer-motion";
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
    <motion.div
      className={className}
      whileHover={reduced ? undefined : { y: -4 }}
      transition={springSettle}
    >
      {children}
    </motion.div>
  );
}
