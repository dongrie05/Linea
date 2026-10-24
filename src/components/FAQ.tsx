"use client";

import { useId, useState } from "react";
import Link from "next/link";
import { AnimatePresence, m } from "motion/react";
import Pending from "@/components/Pending";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { fadeTransition, springSettle } from "@/lib/motion";

const FAQS: {
  question: string;
  answer: React.ReactNode;
  pending?: string;
}[] = [
  {
    question: "A Linea substitui a receção?",
    answer:
      "Não. Atende o que a receção não consegue atender. Quando alguém pede para falar com uma pessoa, toma recado.",
  },
  {
    question: "Fico com o meu número?",
    answer:
      "Sim. A Linea usa o reencaminhamento da sua operadora. Os pacientes ligam para o número de sempre.",
  },
  {
    question: "Funciona com telefone fixo?",
    answer:
      "Depende da operadora e da central telefónica. Nos telemóveis NOS e Vodafone os códigos estão documentados. No fixo confirmamos caso a caso, antes de começar.",
  },
  {
    question: "E se a Linea não souber responder?",
    answer:
      "Diz que não sabe e toma recado: nome, telemóvel e motivo. Não inventa.",
  },
  {
    question: "Que agenda usa?",
    answer: "Google Calendar.",
    pending: "Outros softwares de gestão de clínica, ou nenhum por agora.",
  },
  {
    question: "A chamada é gravada?",
    answer:
      "Não, por defeito. Fica a transcrição e um resumo para a clínica, com prazo de apagamento.",
    pending: "Prazo de apagamento.",
  },
  {
    question: "Em que língua fala?",
    answer: "Português de Portugal.",
    pending: "Outras línguas, só depois de testadas.",
  },
  {
    question: "Quanto custa?",
    answer: (
      <>
        Durante o piloto, o valor está por decidir. Depois, o preço de fundador.
        Está tudo na secção{" "}
        <Link href="/#piloto" className="link">
          Piloto
        </Link>
        .
      </>
    ),
    pending: "Custo do piloto.",
  },
  {
    question: "Quem está por trás da Linea?",
    answer:
      "Eu, Gonçalo Dongrie. Trabalho por conta própria e sou eu que configuro cada clínica. Fala diretamente comigo.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  const reduced = useReducedMotion();
  const baseId = useId();

  return (
    <section id="perguntas" className="section-anchor">
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
                    <m.div
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
                      <div className="pb-5 text-muted">
                        <p>{item.answer}</p>
                        {item.pending ? (
                          <Pending>{item.pending}</Pending>
                        ) : null}
                      </div>
                    </m.div>
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
