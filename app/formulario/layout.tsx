import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";

const description =
  "Peça para entrar no piloto da Linea. A Linea atende chamadas, responde a perguntas e marca compromissos, em português.";

export const metadata: Metadata = {
  title: "Entrar no piloto",
  description,
  keywords: [
    "atendedor de chamadas",
    "atendedor de chamadas IA",
    "piloto linea",
    "assistente telefónico Portugal",
  ].join(", "),
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: `${SITE_URL}/formulario/`,
  },
  openGraph: {
    title: "Entrar no piloto | Linea",
    description,
    url: `${SITE_URL}/formulario/`,
    type: "website",
    locale: "pt_PT",
  },
};

export default function FormularioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
