"use client";

import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import { springDrop, springSettle } from "@/lib/motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const LINES = [
  { who: "Cliente", text: "Bom dia. Tem vaga para um corte na quinta?" },
  { who: "Linea", text: "Tenho às 15:00. Confirmo?" },
  { who: "Cliente", text: "Sim, pode ser." },
] as const;

const BARS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

function StreamText({ text, reduced }: { text: string; reduced: boolean }) {
  const total = text.split(" ").length;
  const [count, setCount] = useState(reduced ? total : 0);

  useEffect(() => {
    const words = text.split(" ");
    if (reduced) {
      setCount(words.length);
      return;
    }
    setCount(0);
    let index = 0;
    const id = window.setInterval(() => {
      index += 1;
      setCount(index);
      if (index >= words.length) window.clearInterval(id);
    }, 70);
    return () => window.clearInterval(id);
  }, [reduced, text]);

  const done = count >= total;

  return (
    <span>
      {text.split(" ").slice(0, count).join(" ")}
      {!done && !reduced ? <span className="caret" aria-hidden="true" /> : null}
    </span>
  );
}

function Waveform({ live, voice }: { live: boolean; voice: "idle" | "talk" }) {
  return (
    <div
      className={`wave ${live ? "is-live" : ""} ${voice === "talk" ? "is-talk" : ""}`}
      aria-hidden="true"
    >
      {BARS.map(bar => (
        <i key={bar} style={{ animationDelay: `${(bar % 7) * 0.08}s` }} />
      ))}
    </div>
  );
}

/**
 * Exemplo de interface, construído em HTML. Não é uma chamada real.
 * O ciclo mostra a onda, a transcrição a entrar e a marcação a cair na agenda.
 */
export default function CallStage() {
  const reduced = useReducedMotion();
  const frame = useRef<HTMLElement>(null);
  const [step, setStep] = useState(5);
  const [shift, setShift] = useState(0);
  const { scrollYProgress } = useScroll({
    target: frame,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [shift, -shift]);

  useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const wide = window.matchMedia("(min-width: 1024px)").matches;
    setShift(reduce || !wide ? 0 : 22);
  }, []);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduced || media.matches) {
      setStep(5);
      return;
    }

    let alive = true;
    const ids: number[] = [];
    const later = (fn: () => void, ms: number) => {
      const id = window.setTimeout(() => {
        if (alive) fn();
      }, ms);
      ids.push(id);
    };

    const play = () => {
      setStep(0);
      later(() => setStep(1), 480);
      later(() => setStep(2), 1100);
      later(() => setStep(3), 2500);
      later(() => setStep(4), 3600);
      later(() => setStep(5), 4500);
      later(play, 7800);
    };

    later(play, 700);

    return () => {
      alive = false;
      ids.forEach(id => window.clearTimeout(id));
    };
  }, [reduced]);

  const status =
    step <= 0
      ? "À espera"
      : step === 1
        ? "Chamada a entrar"
        : step >= 5
          ? "Marcado"
          : "Em chamada";
  const live = step >= 1 && step < 5;
  const voice = step === 3 ? "talk" : "idle";

  return (
    <motion.figure ref={frame} className="w-full max-w-[26rem]" style={{ y }}>
      <div className="product-card" aria-hidden="true">
        <div className="flex items-center justify-between border-b border-line px-5 py-3 sm:px-6">
          <p className="flex items-center gap-2 text-[0.8125rem] uppercase tracking-[0.08em] text-blue">
            <span className={`call-dot ${live ? "is-live" : ""}`} />
            Exemplo
          </p>
          <p className="caption">Quinta</p>
        </div>

        <div className="px-5 pb-5 pt-4 sm:px-6 sm:pb-6">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="caption">Chamada</p>
              <p
                className={`mt-1 text-[1.05rem] font-semibold tracking-[-0.015em] ${
                  step === 1 ? "text-cyan" : ""
                }`}
              >
                {status}
              </p>
            </div>
            <Waveform live={live && !reduced} voice={voice} />
          </div>

          <div className="mt-4 min-h-[9.75rem] border-t border-line pt-4">
            <p className="caption">Transcrição</p>
            <ul className="mt-3 space-y-3">
              <AnimatePresence initial={false}>
                {LINES.map((line, index) =>
                  step >= index + 2 ? (
                    <motion.li
                      key={line.text}
                      initial={reduced ? false : { opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={reduced ? { duration: 0 } : springSettle}
                      className={`grid grid-cols-[4.5rem_1fr] gap-3 text-[0.95rem] leading-snug ${
                        line.who === "Linea"
                          ? "rounded-lg bg-blue/15 px-2 py-1"
                          : ""
                      }`}
                    >
                      <span
                        className={
                          line.who === "Linea"
                            ? "font-semibold text-blue"
                            : "text-muted"
                        }
                      >
                        {line.who}
                      </span>
                      <StreamText text={line.text} reduced={reduced} />
                    </motion.li>
                  ) : null
                )}
              </AnimatePresence>
            </ul>
          </div>

          <div className="mt-2 border-t border-line pt-4">
            <p className="caption">Agenda</p>
            <div className="mt-3 min-h-[3.25rem]">
              <AnimatePresence initial={false}>
                {step >= 5 ? (
                  <motion.div
                    key="booking"
                    initial={
                      reduced ? false : { opacity: 0, y: -28, scale: 0.96 }
                    }
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={reduced ? { duration: 0 } : springDrop}
                    className="flex items-center justify-between gap-3 rounded-xl bg-blue-fill px-3 py-2.5 text-blue-ink"
                  >
                    <div className="min-w-0">
                      <p className="text-[0.95rem] font-semibold tracking-[-0.015em]">
                        Corte
                      </p>
                      <p className="text-[0.8125rem]">Marcado · quinta</p>
                    </div>
                    <p className="text-[0.95rem] font-semibold tabular-nums">
                      15:00
                    </p>
                  </motion.div>
                ) : (
                  <p className="caption py-2">Ainda sem marcação</p>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
      <figcaption className="caption mt-3 max-w-[26rem]">
        Exemplo encenado. Um cliente pede um corte. A Linea confirma quinta às
        15:00 e a marcação aparece na agenda.
      </figcaption>
    </motion.figure>
  );
}
