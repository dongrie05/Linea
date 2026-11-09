/**
 * Origem canónica do site publicado na raiz de linea.dongrielabs.com.
 * NEXT_PUBLIC_SITE_URL só é necessário se a coordenação quiser outro host.
 */
const DEFAULT_SITE_URL = "https://linea.dongrielabs.com";

export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL || DEFAULT_SITE_URL
).replace(/\/+$/, "");
