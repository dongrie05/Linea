"use client";

import { animate } from "motion/react";
import { useEffect, useRef } from "react";
import { easeOut } from "@/lib/motion";

const LINES = [
  ["O", "paciente", "liga."],
  ["A", "Linea", "atende."],
] as const;

export default function HeroTitle() {
  const rootRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const words = Array.from(root.querySelectorAll<HTMLElement>(".hero-word"));
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    let cancelled = false;
    const run = async () => {
      try {
        await document.fonts.ready;
      } catch {
        /* a fonte de recurso chega na mesma */
      }
      if (cancelled) return;
      const room = Math.max(0, 400 - performance.now());
      const delay = Math.min(0.12, room / 1000);
      words.forEach((el, index) => {
        animate(
          el,
          { opacity: [0, 1], y: [8, 0], filter: ["blur(8px)", "blur(0px)"] },
          {
            duration: 0.6,
            delay: delay + index * 0.04,
            ease: easeOut,
          }
        );
      });
    };
    void run();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <h1
      ref={rootRef}
      className="display-hero mx-auto mt-5 max-w-[14ch] sm:max-w-none lg:mx-0"
    >
      {LINES.map((line, lineIndex) => (
        <span
          key={line.join("-")}
          className={lineIndex === 0 ? "block" : "mt-3 block"}
        >
          {line.map((word, wordIndex) => (
            <span key={word} className="hero-word">
              {word}
              {wordIndex < line.length - 1 ? "\u00A0" : ""}
            </span>
          ))}
        </span>
      ))}
    </h1>
  );
}
