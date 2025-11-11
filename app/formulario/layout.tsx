import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contacto - Atendedor de Chamadas IA | Linea Portugal",
  description:
    "Atendedor de chamadas com IA em Portugal. Atendimento telefónico automático 24/7. Entre em contacto com a Linea - o melhor atendedor de chamadas automático. Configuração em 1 dia!",
  keywords: [
    "atendedor de chamadas",
    "atendedor de chamadas IA",
    "atendimento telefónico automático",
    "atendedor automático de chamadas",
    "atendimento telefónico IA Portugal",
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
    canonical: "https://dongrie05.github.io/Linea/formulario/",
  },
  openGraph: {
    title: "Contacto - Atendedor de Chamadas IA | Linea",
    description:
      "Atendedor de chamadas com IA em Portugal. Atendimento telefónico automático 24/7. Configuração em 1 dia!",
    url: "https://dongrie05.github.io/Linea/formulario/",
    type: "website",
  },
};

export default function FormularioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
