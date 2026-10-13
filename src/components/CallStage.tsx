"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { fadeTransition, springDrop, springSettle } from "@/lib/motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const LINES = [
  { who: "Cliente", text: "Bom dia. Tem vaga para um corte na quinta?" },
  { who: "Linea", text: "Tenho às 15:00. Confirmo?" },
  { who: "Cliente", text: "Sim, pode ser." },
] as const;

/**
 * Exemplo de interface, construído em HTML. Não é uma chamada real.
 * O ciclo mostra a chamada a entrar, a transcrição e a marcação na agenda.
 */
export default function CallStage() {
  const reduced = useReducedMotion();
  const [step, setStep] = useState(4);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduced || media.matches) {
      setStep(4);
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
      later(() => setStep(1), 550);
      later(() => setStep(2), 1300);
      later(() => setStep(3), 2000);
      later(() => setStep(4), 2750);
      later(play, 6800);
    };

    later(play, 700);

    return () => {
      alive = false;
      ids.forEach(id => window.clearTimeout(id));
    };
  }, [reduced]);

  const transition = reduced ? { duration: 0 } : springSettle;
  const visibleLines = step >= 4 ? 3 : step >= 3 ? 2 : step >= 2 ? 1 : 0;
  const status =
    step <= 0 ? "À espera" : step === 1 ? "Chamada a entrar" : "Em chamada";

  return (
    <figure className="w-full max-w-[26rem]">
      <div className="product-card p-5 sm:p-6" aria-hidden="true">
        <div className="flex items-center justify-between">
          <p className="caption uppercase tracking-[0.08em]">Exemplo</p>
          <p className="caption">Quinta</p>
        </div>

        <div className="mt-5 flex items-center justify-between gap-3 border-b border-line pb-4">
          <div>
            <p className="caption">Chamada</p>
            <p className="mt-1 text-[1.05rem] font-semibold tracking-[-0.015em]">
              {status}
            </p>
          </div>
          <span
            className={`call-dot ${step === 1 ? "is-live" : ""}`}
            style={{ opacity: step === 0 ? 0.35 : 1 }}
          />
        </div>

        <div className="mt-4 min-h-[9.5rem]">
          <p className="caption">Transcrição</p>
          <ul className="mt-3 space-y-3">
            <AnimatePresence initial={false}>
              {LINES.slice(0, visibleLines).map(line => (
                <motion.li
                  key={line.text}
                  initial={reduced ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={reduced ? { duration: 0 } : transition}
                  className="grid grid-cols-[4.5rem_1fr] gap-3 text-[0.95rem] leading-snug"
                >
                  <span className="text-muted">{line.who}</span>
                  <span>{line.text}</span>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        </div>

        <div className="mt-2 border-t border-line pt-4">
          <p className="caption">Agenda</p>
          <div className="mt-3 min-h-[3.25rem]">
            <AnimatePresence initial={false}>
              {step >= 4 ? (
                <motion.div
                  key="booking"
                  initial={reduced ? false : { opacity: 0, y: -14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={reduced ? fadeTransition : springDrop}
                  className="flex items-center justify-between gap-3 rounded-xl border border-line bg-surface px-3 py-2.5"
                >
                  <div className="min-w-0">
                    <p className="text-[0.95rem] font-semibold tracking-[-0.015em]">
                      Corte
                    </p>
                    <p className="caption">Marcado · quinta</p>
                  </div>
                  <p className="text-[0.95rem] tabular-nums">15:00</p>
                </motion.div>
              ) : (
                <p className="caption py-2">Ainda sem marcação</p>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
      <figcaption className="caption mt-3 max-w-[26rem]">
        Exemplo encenado. Um cliente pede um corte. A Linea confirma quinta às
        15:00 e a marcação aparece na agenda.
      </figcaption>
    </figure>
  );
}
