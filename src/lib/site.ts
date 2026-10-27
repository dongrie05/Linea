/**
 * Preços e piloto aprovados para publicação.
 * Valores mensais, em euros. O volume conta em minutos.
 */

export const PLANS = [
  {
    id: "Starter",
    name: "Starter",
    priceEur: 99,
    founderPriceEur: 69,
    minutesPerMonth: 400,
    extraMinuteEur: 0.3,
  },
  {
    id: "Growth",
    name: "Growth",
    priceEur: 199,
    founderPriceEur: 139,
    minutesPerMonth: 1000,
    extraMinuteEur: 0.25,
  },
  {
    id: "Pro",
    name: "Pro",
    priceEur: 499,
    founderPriceEur: 349,
    minutesPerMonth: 2500,
    extraMinuteEur: 0.25,
  },
] as const;

export type PlanId = (typeof PLANS)[number]["id"];

export const PILOT = {
  depositEur: 29,
  founderDiscountPercent: 30,
  founderMonths: 12,
} as const;

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
  `A caução é de ${PILOT.depositEur}€. É devolvida se avançar para um plano.`,
  `Quem entra no piloto fica com o preço de fundador. O desconto é de ${PILOT.founderDiscountPercent}% e mantém-se fixo durante ${PILOT.founderMonths} meses.`,
  founderPricesSentence(),
] as const;
