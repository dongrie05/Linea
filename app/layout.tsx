import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AnimationFallback from "@/components/AnimationFallback";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Atendimento Telefónico IA Portugal | Linea",
  description:
    "Poupe 70% em custos! IA portuguesa que atende chamadas 24/7. Resposta em 2s. Experimente grátis hoje!",
  keywords:
    "atendimento telefónico IA, assistente telefónico Portugal, IA atendimento, automatização chamadas, chatbot telefónico, atendimento 24/7, poupar custos atendimento, inteligência artificial Portugal",
  authors: [{ name: "Linea" }],
  openGraph: {
    title: "Atendimento Telefónico IA Portugal | Linea",
    description:
      "Poupe 70% em custos! IA portuguesa que atende chamadas 24/7. Resposta em 2s.",
    type: "website",
    locale: "pt_PT",
  },
  twitter: {
    card: "summary_large_image",
    title: "Atendimento Telefónico IA Portugal | Linea",
    description:
      "Poupe 70% em custos! IA portuguesa que atende chamadas 24/7. Resposta em 2s.",
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
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Linea - Atendimento Telefónico IA",
    description:
      "IA portuguesa que atende chamadas 24/7. Resposta em 2 segundos. Poupe até 70% em custos de atendimento.",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    url: "https://dongrie05.github.io/Linea/",
    datePublished: "2024-01-16",
    dateModified: "2024-01-16",
    offers: [
      {
        "@type": "Offer",
        name: "Starter",
        price: "99",
        priceCurrency: "EUR",
        description: "250 chamadas por mês",
        availability: "https://schema.org/InStock",
      },
      {
        "@type": "Offer",
        name: "Growth",
        price: "199",
        priceCurrency: "EUR",
        description: "500 chamadas por mês",
        availability: "https://schema.org/InStock",
      },
      {
        "@type": "Offer",
        name: "Pro",
        price: "899",
        priceCurrency: "EUR",
        description: "2500 chamadas por mês",
        availability: "https://schema.org/InStock",
      },
    ],
    provider: {
      "@type": "Organization",
      name: "Linea",
      url: "https://dongrie05.github.io/Linea/",
      address: {
        "@type": "PostalAddress",
        addressCountry: "PT",
      },
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+351-927-699-882",
        contactType: "customer service",
        availableLanguage: "Portuguese",
      },
    },
    featureList: [
      "Atendimento telefónico 24/7",
      "Resposta em 2 segundos",
      "Português natural",
      "Agendamento automático",
      "Encaminhamento inteligente",
      "Relatórios detalhados",
      "Configuração em 1 dia",
      "Suporte técnico português",
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: "150",
      bestRating: "5",
      worstRating: "1",
    },
  };

  return (
    <html lang="pt">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      </head>
      <body className={inter.className}>
        <AnimationFallback />
        {children}
      </body>
    </html>
  );
}
