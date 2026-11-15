import type { Metadata } from "next";
import { siteUrl } from "@/lib/site-url";

const formularioUrl = `${siteUrl}/formulario/`;

export const metadata: Metadata = {
  title: "Pedir Atendedor de Chamadas IA | Contacto Linea Portugal",
  description:
    "Peça o atendedor de chamadas com IA da Linea. Automatize reservas e marcações por telefone. Configuração rápida. Portugal.",
  keywords: [
    "atendedor de chamadas",
    "atendedor de chamadas IA",
    "automatizar reservas por telefone",
    "atendimento telefónico automático",
    "contacto Linea",
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
    canonical: formularioUrl,
  },
  openGraph: {
    title: "Pedir Atendedor de Chamadas IA | Linea",
    description:
      "Peça o atendedor de chamadas com IA. Automatize reservas por telefone. Portugal.",
    url: formularioUrl,
    type: "website",
    images: [
      {
        url: `${siteUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Linea - Atendedor de chamadas com IA",
      },
    ],
  },
};

export default function FormularioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
