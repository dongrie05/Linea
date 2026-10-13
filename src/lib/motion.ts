/**
 * Springs no estilo da interface da Apple, traduzidas para o Framer Motion.
 * Por omissão: amortecimento crítico (bounce 0), resposta ~0,4 s.
 * bounce só no gesto com peso, como a marcação a cair na agenda.
 */

export const springSettle = {
  type: "spring" as const,
  bounce: 0,
  duration: 0.4,
};

export const springDrop = {
  type: "spring" as const,
  bounce: 0.18,
  duration: 0.45,
};

export const fadeTransition = {
  duration: 0.2,
  ease: "easeOut" as const,
};

export const tapScale = { scale: 0.97 };
