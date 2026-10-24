/**
 * Factos do produto que o site pode afirmar.
 * Preços e volumes de chamadas vêm da oferta já descrita no código.
 * Não acrescentar métricas de clientes, satisfação ou poupança.
 */

export const SITE_URL = "https://dongrie05.github.io/Linea";

/** Igual a `basePath` em next.config.js. O export estático vive em /Linea. */
export const BASE_PATH = process.env.NODE_ENV === "production" ? "/Linea" : "";

export function publicPath(path: string) {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${BASE_PATH}${normalized}`;
}

/**
 * TODO(owner): colocar o ficheiro de áudio em public/audio/exemplo.mp3
 * (exemplo encenado, cerca de 30 segundos). Sem o ficheiro, a secção
 * mostra um estado vazio e não tenta reproduzir nada.
 */
export const EXAMPLE_AUDIO_PATH = "/audio/exemplo.mp3";

export const PLANS = [
  {
    id: "Starter",
    name: "Starter",
    priceEur: 99,
    callsPerMonth: 250,
  },
  {
    id: "Growth",
    name: "Growth",
    priceEur: 199,
    callsPerMonth: 500,
  },
  {
    id: "Pro",
    name: "Pro",
    priceEur: 899,
    callsPerMonth: 2500,
  },
] as const;

export type PlanId = (typeof PLANS)[number]["id"];

/** Preço de chamada extra já indicado na página de preços anterior. */
export const EXTRA_CALL_EUR = 0.25;

/**
 * Termos do programa piloto, num único sítio.
 *
 * TODO(owner): confirmar antes de tratar isto como oferta fechada.
 * - maxBusinesses: vagas da primeira leva
 * - founderPriceEur: valor em euros, ou null enquanto não houver número
 * - includesSetup: se a configuração fica incluída
 * - setupNotes: o que a configuração cobre (ainda vazio)
 * - status: mudar para "confirmed" só depois da confirmação
 */
export const PILOT_OFFER = {
  maxBusinesses: 10,
  founderPriceEur: null as number | null,
  includesSetup: true,
  setupNotes: "",
  status: "pending-confirmation" as "pending-confirmation" | "confirmed",
};

/**
 * D3: a tabela 99 €, 199 € e 899 € fica fora da página até ao fim do piloto.
 * Os valores continuam em PLANS para o formulário.
 */
export const SHOW_PUBLIC_PRICING = false;

export const NAV_ITEMS = [
  { href: "/#ouvir", label: "Ouvir" },
  { href: "/#o-que-faz", label: "O que faz" },
  { href: "/#piloto", label: "Piloto" },
  { href: "/#perguntas", label: "Perguntas" },
] as const;
