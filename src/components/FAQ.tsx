"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { fadeTransition, springSettle } from "@/lib/motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const FAQS = [
  {
    question: "E o RGPD?",
    answer:
      "Uma chamada pode ter nomes, números e o motivo do contacto. Este site ainda não publica uma política de privacidade. O tratamento desses dados tem de cumprir o RGPD. Se precisar do detalhe antes de avançar, pergunte no formulário.",
  },
  {
    question: "Uso o meu número?",
    answer:
      "A descrição do produto diz que a Linea usa a linha que a empresa já tem, fixa ou móvel, sem instalar equipamento. O site não explica o passo técnico de como o número fica ligado.",
  },
  {
    question: "O que acontece se a IA não souber?",
    answer:
      "A chamada pode ser passada para si, com o que foi dito na conversa. Também pode definir respostas para perguntas habituais do seu ramo. A Linea é uma IA: o que diz pode estar errado, e uma marcação importante deve ser confirmada por si.",
  },
  {
    question: "Em que línguas responde?",
    answer:
      "O produto está descrito como atendimento em português. O site anterior dizia que respondia em várias línguas, sem as nomear, e o menu de idiomas não mudava a página. Neste momento só há português.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  const reduced = useReducedMotion();
  const baseId = useId();

  return (
    <section id="faq" className="section-anchor">
      <div className="mx-auto max-w-page px-5 py-20 sm:px-8 sm:py-28">
        <div className="max-w-measure">
          <h2 className="section-title">Perguntas</h2>
        </div>
        <div className="mt-10 max-w-measure border-t border-line">
          {FAQS.map((item, index) => {
            const isOpen = open === index;
            const panelId = `${baseId}-panel-${index}`;
            const buttonId = `${baseId}-button-${index}`;
            return (
              <div key={item.question} className="border-b border-line">
                <h3>
                  <button
                    id={buttonId}
                    type="button"
                    className="flex min-h-11 w-full items-center justify-between gap-4 py-4 text-left text-[1.125rem] font-semibold tracking-[-0.015em]"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpen(isOpen ? null : index)}
                  >
                    {item.question}
                    <span className="caption" aria-hidden="true">
                      {isOpen ? "Fechar" : "Abrir"}
                    </span>
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={panelId}
                      role="region"
                      aria-labelledby={buttonId}
                      initial={
                        reduced ? { opacity: 0 } : { height: 0, opacity: 0 }
                      }
                      animate={
                        reduced
                          ? { opacity: 1 }
                          : { height: "auto", opacity: 1 }
                      }
                      exit={
                        reduced ? { opacity: 0 } : { height: 0, opacity: 0 }
                      }
                      transition={reduced ? fadeTransition : springSettle}
                      className="overflow-hidden"
                    >
                      <p className="pb-5 text-muted">{item.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
