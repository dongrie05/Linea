import localFont from "next/font/local";

/**
 * Mona Sans variável (wdth, opsz, wght), ficheiro oficial SIL OFL 1.1.
 * O binário não foi alterado. O nome do ficheiro é só o caminho local.
 * JetBrains Mono 400 e 500, também SIL OFL 1.1, sem itálico.
 * next/font incorpora as fontes no export estático. Não há pedido à Google em runtime.
 * Só a Mona Sans entra no preload.
 */
export const monaSans = localFont({
  src: "../fonts/MonaSans-Variable.woff2",
  display: "swap",
  weight: "200 900",
  style: "normal",
  adjustFontFallback: "Arial",
  preload: true,
  variable: "--font-mona",
  fallback: ["Arial", "sans-serif"],
  declarations: [{ prop: "font-stretch", value: "75% 125%" }],
});

export const jetbrainsMono = localFont({
  src: [
    {
      path: "../fonts/JetBrainsMono-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/JetBrainsMono-Medium.woff2",
      weight: "500",
      style: "normal",
    },
  ],
  display: "swap",
  adjustFontFallback: false,
  preload: false,
  variable: "--font-jetbrains",
  fallback: ["ui-monospace", "monospace"],
});
