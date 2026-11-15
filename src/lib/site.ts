/**
 * Preços e piloto aprovados para publicação.
 * Valores mensais, em euros. O volume conta em minutos.
 * A caução do piloto é 29€, 69€ e 179€, do Starter ao Pro.
 */

export const PLANS = [
  {
    id: "Starter",
    name: "Starter",
    priceEur: 99,
    founderPriceEur: 69,
    depositEur: 29,
    minutesPerMonth: 400,
    extraMinuteEur: 0.11,
  },
  {
    id: "Growth",
    name: "Growth",
    priceEur: 199,
    founderPriceEur: 139,
    depositEur: 69,
    minutesPerMonth: 1000,
    extraMinuteEur: 0.11,
  },
  {
    id: "Pro",
    name: "Pro",
    priceEur: 499,
    founderPriceEur: 349,
    depositEur: 179,
    minutesPerMonth: 2500,
    extraMinuteEur: 0.11,
  },
] as const;

export type PlanId = (typeof PLANS)[number]["id"];

export const PILOT = {
  founderMonths: 6,
  founderSpots: 5,
} as const;

export const FOUNDER_CTA = "Quero o preço de fundador";

export function formatEuro(amount: number): string {
  if (Number.isInteger(amount)) return String(amount);
  const [whole, frac] = amount.toFixed(2).split(".");
  return `${whole},${frac}`;
}

function joinPt(parts: string[]): string {
  if (parts.length <= 1) return parts[0] ?? "";
  return `${parts.slice(0, -1).join(", ")} e ${parts[parts.length - 1]}`;
}

export function listPricesSentence(): string {
  const parts = PLANS.map(
    plan =>
      `${plan.name} a ${plan.priceEur}€/mês com ${plan.minutesPerMonth} minutos`
  );
  return `${joinPt(parts)}.`;
}

export function extraMinuteSentence(): string {
  const groups = new Map<string, string[]>();
  for (const plan of PLANS) {
    const amount = `${formatEuro(plan.extraMinuteEur)}€`;
    const names = groups.get(amount) ?? [];
    names.push(plan.name);
    groups.set(amount, names);
  }

  const parts = Array.from(groups.entries()).map(([amount, names]) => {
    const who =
      names.length === 1
        ? `no ${names[0]}`
        : `no ${names.slice(0, -1).join(", no ")} e no ${names[names.length - 1]}`;
    return `${amount} ${who}`;
  });

  return `Minuto extra: ${parts.join(". ")}.`;
}

export function founderPricesSentence(): string {
  const parts = PLANS.map(
    plan => `${plan.name} a ${plan.founderPriceEur}€/mês`
  );
  return `${joinPt(parts)}.`;
}

export const PILOT_SENTENCES = [
  "Duas semanas grátis.",
  `A caução depende do plano: ${PLANS.map(plan => `${plan.name} ${plan.depositEur}€`).join(", ")}. É devolvida se avançar para um plano.`,
  `O preço de fundador é só para os primeiros ${PILOT.founderSpots} clientes e dura ${PILOT.founderMonths} meses.`,
  founderPricesSentence(),
] as const;

/** FAQ visível e schema FAQPage (SEO / AEO). */
export const FAQ_ITEMS = [
  [
    "O que é um atendedor de chamadas com IA?",
    "É um sistema que atende o telefone da empresa com inteligência artificial, em português. A Linea responde, marca consultas ou reservas e regista o recado quando ninguém da equipa pode atender.",
  ],
  [
    "A Linea automatiza reservas por telefone?",
    "Sim. A Linea atende a chamada, consulta a disponibilidade, confirma a marcação e envia a confirmação por SMS. Serve clínicas, restaurantes, oficinas e outros negócios em Portugal.",
  ],
  [
    "Posso cancelar quando quiser?",
    "Sim. O cancelamento fica disponível a qualquer momento.",
  ],
  [
    "O que conta num minuto de chamada?",
    `Conta o tempo da chamada atendida. O minuto extra custa ${formatEuro(PLANS[0].extraMinuteEur)} € em todos os planos.`,
  ],
  [
    "A caução cobre as chamadas do piloto?",
    "Depende do plano e está na tabela do piloto. É devolvida se avançar para um plano.",
  ],
  [
    "A Linea substitui a equipa?",
    "Atende quando ninguém atende. Não substitui uma decisão que só uma pessoa da empresa pode tomar.",
  ],
  ["Em que língua responde?", "Em português, no número da empresa."],
] as const;
