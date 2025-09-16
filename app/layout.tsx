import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Linea - Assistente Telefónico com IA",
  description:
    "O primeiro assistente telefónico com Inteligência Artificial em Portugal que responde, agenda e organiza chamadas automaticamente.",
  keywords:
    "IA, inteligência artificial, atendimento telefónico, Portugal, automatização, chatbot, assistente virtual",
  authors: [{ name: "Linea" }],
  openGraph: {
    title: "Linea - Assistente Telefónico com IA",
    description: "Poupe até 70% em custos de atendimento com a nossa IA.",
    type: "website",
    locale: "pt_PT",
  },
  twitter: {
    card: "summary_large_image",
    title: "Linea - Assistente Telefónico com IA",
    description: "Poupe até 70% em custos de atendimento com a nossa IA.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
