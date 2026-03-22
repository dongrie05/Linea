"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

const REVEAL_SELECTOR = "[data-scroll-reveal]";

/**
 * Inicializa animações de scroll com GSAP ScrollTrigger.
 * Respeita prefers-reduced-motion.
 */
export function useScrollReveal() {
  const reducedMotion = useReducedMotion();
  const inited = useRef(false);

  useEffect(() => {
    if (reducedMotion || inited.current) return;

    const els = document.querySelectorAll(REVEAL_SELECTOR);
    if (!els.length) return;

    inited.current = true;

    els.forEach((el, i) => {
      const delay = Math.min(i * 0.08, 0.4);
      gsap.set(el, { y: 48, opacity: 0 });
      gsap.to(el, {
        y: 0,
        opacity: 1,
        duration: 0.85,
        ease: "power3.out",
        delay,
        scrollTrigger: {
          trigger: el,
          start: "top 88%",
          end: "bottom 12%",
          toggleActions: "play none none none",
        },
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
      inited.current = false;
    };
  }, [reducedMotion]);
}
