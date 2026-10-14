"use client";

import { animate } from "framer-motion";
import { useEffect, useRef } from "react";
import { springSettle } from "@/lib/motion";

/**
 * Entrada ao scroll. O CSS esconde o bloco só com movimento ligado e com JS.
 * A mola parte do valor já no ecrã. Com movimento reduzido o bloco fica quieto.
 */
export default function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        obs.disconnect();
        animate(
          el,
          { opacity: [0, 1], y: [16, 0] },
          { ...springSettle, delay }
        );
      },
      { threshold: 0.18 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);

  return (
    <div ref={ref} className={`reveal ${className}`}>
      {children}
    </div>
  );
}
