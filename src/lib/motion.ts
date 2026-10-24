/**
 * Curvas e molas da especificação de movimento.
 * ease out: cubic-bezier(0.22, 1, 0.36, 1)
 * ease in-out: cubic-bezier(0.65, 0, 0.35, 1)
 */

export const easeOut = [0.22, 1, 0.36, 1] as const;

export const springSettle = {
  type: "spring" as const,
  stiffness: 260,
  damping: 30,
};

export const springDrop = {
  type: "spring" as const,
  stiffness: 380,
  damping: 26,
};

export const fadeTransition = {
  duration: 0.2,
  ease: easeOut,
};

export const tapScale = { scale: 0.98 };
