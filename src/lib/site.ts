/**
 * Preços e período experimental aprovados para publicação.
 * Valores mensais, em euros. O volume conta em minutos.
 * A caução do período experimental é 29€, 89€ e 179€, do Starter ao Pro.
 * Mensagens incluídas (WhatsApp ou SMS) no Growth e no Pro.
 */

export const PLANS = [
  {
    id: "Starter",
    name: "Starter",
    priceEur: 99,
    founderPriceEur: 74,
    depositEur: 29,
    minutesPerMonth: 400,
    messagesPerMonth: 0,
    extraMinuteEur: 0.3,
  },
  {
    id: "Growth",
    name: "Growth",
    priceEur: 249,
    founderPriceEur: 189,
    depositEur: 89,
    minutesPerMonth: 1000,
    messagesPerMonth: 400,
    extraMinuteEur: 0.25,
  },
  {
    id: "Pro",
    name: "Pro",
    priceEur: 499,
    founderPriceEur: 374,
    depositEur: 179,
    minutesPerMonth: 2500,
    messagesPerMonth: 1000,
    extraMinuteEur: 0.25,
  },
] as const;

export type PlanId = (typeof PLANS)[number]["id"];

export const PILOT = {
  /** Meses com o preço especial. */
  specialMonths: 3,
  /** Duração do período experimental. */
  trialWeeks: 2,
} as const;

/** Texto dele, palavra por palavra. */
export const SPECIAL_NOTE =
  "Preço especial nos primeiros 3 meses. Experimente a LINEA durante 2 semanas.";

/** Nota por baixo do preço especial em cada cartão. */
export const SPECIAL_VALID_NOTE = "Válido nos primeiros 3 meses";

/** Botões que levam ao pedido. */
export const TRIAL_CTA = "Pedir período experimental";
/** Botões que levam aos preços. */
export const PLANS_CTA = "Ver planos";
export const PLANS_PRICES_CTA = "Ver planos e preços";

/** Nota sobre as mensagens incluídas, por cima dos cartões. */
export const MESSAGES_NOTE = "As mensagens incluídas são por WhatsApp ou SMS.";

/** Junto de cada frase que fala em confirmações (o Starter não inclui mensagens). */
export const CONFIRM_NOTE =
  "As confirmações por WhatsApp ou SMS dependem do plano.";

export function planMessagesLabel(messagesPerMonth: number): string {
  return messagesPerMonth > 0
    ? `${messagesPerMonth} mensagens por WhatsApp ou SMS`
    : "Sem mensagens incluídas";
}

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

/** Ex.: "0,30 € no Starter e 0,25 € no Growth e no Pro" */
export function extraMinutePrices(): string {
  const groups = new Map<string, string[]>();
  for (const plan of PLANS) {
    const amount = `${formatEuro(plan.extraMinuteEur)} €`;
    const names = groups.get(amount) ?? [];
    names.push(plan.name);
    groups.set(amount, names);
  }
  return joinPt(
    Array.from(groups.entries()).map(
      ([amount, names]) => `${amount} ${joinPt(names.map(n => `no ${n}`))}`
    )
  );
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
  `Preço especial nos primeiros ${PILOT.specialMonths} meses.`,
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
    "Sim. A Linea atende a chamada, consulta a disponibilidade, confirma a marcação e envia a confirmação por WhatsApp ou SMS, conforme o plano. Serve clínicas, restaurantes, oficinas e outros negócios em Portugal.",
  ],
  [
    "Posso cancelar quando quiser?",
    "Sim. O cancelamento fica disponível a qualquer momento.",
  ],
  [
    "Como são contabilizados os minutos de chamada?",
    `Os minutos incluídos correspondem ao tempo de chamada atendido pela LINEA. O objetivo é resolver o pedido de quem liga com a maior eficácia possível. Se ultrapassar os minutos do seu plano, cada minuto adicional custa ${extraMinutePrices()}.`,
  ],
  [
    "As mensagens por WhatsApp ou SMS estão incluídas?",
    "O Growth inclui 400 mensagens por mês e o Pro inclui 1 000, por WhatsApp ou SMS. O Starter não inclui mensagens.",
  ],
  [
    "A caução cobre as chamadas do período experimental?",
    "As condições dependem do plano escolhido. Consulte a tabela do período experimental para ver o valor da caução. A caução é devolvida se avançar para um plano.",
  ],
  [
    "A Linea substitui a equipa?",
    "Atende quando ninguém atende. Não substitui uma decisão que só uma pessoa da empresa pode tomar.",
  ],
  ["Em que língua responde?", "Em português, no número da empresa."],
] as const;
