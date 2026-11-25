import { asset } from "@/lib/asset";

/**
 * Dados da entidade que aparecem nas páginas legais.
 * Empresário em nome individual. Os valores entre parênteses retos ficam por
 * preencher antes de publicar.
 */
export const LEGAL_ENTITY = {
  name: "Gonçalo Duarte Dongrie de Carvalho",
  nif: "[NIF]",
  address: "[Morada (domicílio fiscal)]",
} as const;

/** Data da última revisão das páginas legais. */
export const LEGAL_UPDATED = "25 de novembro de 2026";

export const LEGAL_LINKS = [
  { href: asset("/privacidade/"), label: "Política de Privacidade" },
  { href: asset("/termos/"), label: "Termos e Condições" },
  { href: asset("/cookies/"), label: "Política de Cookies" },
  {
    href: asset("/protecao-de-dados/"),
    label: "Segurança e Proteção de Dados",
  },
] as const;
