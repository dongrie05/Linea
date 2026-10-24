import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";

const description =
  "Fale com o Gonçalo sobre a Linea na sua clínica dentária. O pedido abre no WhatsApp ou no email. Não fica gravado neste site.";

export const metadata: Metadata = {
  title: "Fale comigo",
  description,
  keywords: [
    "assistente telefónico",
    "clínica dentária",
    "piloto linea",
    "Portugal",
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
    title: "Fale comigo | Linea",
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
