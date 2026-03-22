/**
 * Motion design system — tokens consistentes para animações premium.
 * Princípios: clareza sobre espetáculo, feedback rápido, continuidade suave.
 */

// Duração (ms)
export const motionDuration = {
  fast: 200,
  base: 400,
  slow: 600,
  section: 800,
} as const;

// Easing (CSS / Framer)
export const motionEasing = {
  standard: [0.4, 0, 0.2, 1] as const,
  emphasized: [0.2, 0, 0, 1] as const,
  exit: [0.4, 0, 1, 1] as const,
  spring: [0.34, 1.56, 0.64, 1] as const,
} as const;

// Stagger para listas/grids
export const motionStagger = {
  fast: 0.05,
  base: 0.08,
  slow: 0.12,
} as const;

// Variantes Framer Motion reutilizáveis
export const fadeInUp = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: motionDuration.base / 1000,
      ease: motionEasing.standard,
    },
  },
};

export const fadeInLeft = {
  hidden: { opacity: 0, x: -32 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: motionDuration.base / 1000,
      ease: motionEasing.standard,
    },
  },
};

export const fadeInRight = {
  hidden: { opacity: 0, x: 32 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: motionDuration.base / 1000,
      ease: motionEasing.standard,
    },
  },
};

export const staggerContainer = (
  delayChildren = 0.1,
  staggerChildren = 0.08
) => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { delayChildren, staggerChildren },
  },
});

export const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: motionDuration.base / 1000,
      ease: motionEasing.standard,
    },
  },
};

// Hover/tap — scale subtil
export const hoverScale = { scale: 1.03 };
export const tapScale = { scale: 0.98 };
