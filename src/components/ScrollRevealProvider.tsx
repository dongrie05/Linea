"use client";

import { useScrollReveal } from "./ScrollReveal";

/**
 * Deve ser usado na página principal para ativar as animações de scroll.
 * Colocar no topo do main ou no layout da página inicial.
 */
export default function ScrollRevealProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useScrollReveal();
  return <>{children}</>;
}
