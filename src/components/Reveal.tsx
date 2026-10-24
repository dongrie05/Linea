"use client";

import { animate } from "framer-motion";
import { useEffect, useRef } from "react";

/**
 * Entrada ao scroll. O CSS esconde o bloco só com movimento ligado e com JS.
 * Com movimento reduzido o bloco fica quieto.
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
          { opacity: [0, 1], y: [8, 0], filter: ["blur(8px)", "blur(0px)"] },
          { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }
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
