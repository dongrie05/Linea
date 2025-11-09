import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contacto - Linea | Atendedor de Chamadas com IA",
  description:
    "Entre em contacto com a Linea para começar a usar o melhor atendedor de chamadas automático com IA em Portugal. Configuração em 1 dia!",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://dongrie05.github.io/Linea/formulario/",
  },
};

export default function FormularioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
