import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AnimationFallback from "@/components/AnimationFallback";
import { PILOT, PLANS, formatEuro } from "@/lib/site";

const inter = Inter({ subsets: ["latin"] });

const siteUrl = "https://dongrie05.github.io/Linea";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default:
      "Atendedor de Chamadas IA | Atendimento Telefónico Automático Portugal - Linea",
    template: "%s | Linea - Atendimento Telefónico IA",
  },
  description: `Atendedor de chamadas com IA em Portugal. O melhor atendedor de chamadas automático com Inteligência Artificial. Atendimento telefónico IA 24/7. Resposta em 2 segundos. Poupe 70% em custos! Piloto de duas semanas, com caução de ${PILOT.depositEur}€.`,
  keywords: [
    "atendedor de chamadas",
    "atendedor de chamadas IA",
    "atendedor de chamadas automático",
    "atendimento telefónico IA",
    "atendimento telefónico automático",
    "assistente telefónico Portugal",
    "IA atendimento",
    "atendedor automático de chamadas",
    "automatização chamadas",
    "chatbot telefónico",
    "atendimento 24/7",
    "poupar custos atendimento",
    "inteligência artificial Portugal",
    "atendimento telefónico inteligente",
    "sistema de atendimento automático",
    "atendedor virtual",
    "IA para telefone",
    "atendimento telefónico barato",
    "atendimento automático português",
    "linea",
  ].join(", "),
  authors: [{ name: "Linea", url: siteUrl }],
  creator: "Linea",
  publisher: "Linea",
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    title:
      "Linea - Atendimento Telefónico IA Portugal | Atendedor de Chamadas Automático",
    description:
      "Linea - O melhor atendedor de chamadas com IA em Portugal. Poupe 70% em custos! Atendimento telefónico automático 24/7. Resposta em 2 segundos.",
    url: siteUrl,
    siteName: "Linea",
    type: "website",
    locale: "pt_PT",
    images: [
      {
        url: `${siteUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Linea - Atendimento Telefónico IA Portugal",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Linea - Atendimento Telefónico IA Portugal | Atendedor de Chamadas",
    description:
      "Linea - O melhor atendedor de chamadas com IA em Portugal. Poupe 70% em custos! Atendimento automático 24/7.",
    images: [`${siteUrl}/og-image.jpg`],
  },
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
  verification: {
    // Adicione aqui o código de verificação do Google Search Console quando tiver
    // google: "seu-codigo-de-verificacao",
  },
  category: "technology",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Linea - Atendedor de Chamadas com IA | Atendimento Telefónico Automático",
    description:
      "Linea é o melhor atendedor de chamadas automático com Inteligência Artificial em Portugal. Atendimento telefónico IA 24/7. Resposta em 2 segundos. Poupe até 70% em custos de atendimento.",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    url: siteUrl,
    datePublished: "2024-01-16",
    dateModified: "2025-01-27",
    keywords:
      "linea, atendedor de chamadas, atendimento telefónico IA, atendimento automático, IA Portugal",
    about: {
      "@type": "Thing",
      name: "Atendimento Telefónico com Inteligência Artificial",
    },
    provider: {
      "@type": "Organization",
      name: "Linea",
      url: siteUrl,
      logo: `${siteUrl}/logo.png`,
      sameAs: [
        // Adicione aqui links para redes sociais quando tiver
      ],
      address: {
        "@type": "PostalAddress",
        addressCountry: "PT",
        addressLocality: "Portugal",
      },
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+351-927-699-882",
        contactType: "customer service",
        availableLanguage: ["Portuguese", "pt"],
        areaServed: "PT",
      },
    },
    offers: PLANS.map(plan => ({
      "@type": "Offer",
      name: `${plan.name}. Atendedor de chamadas`,
      price: String(plan.priceEur),
      priceCurrency: "EUR",
      description: `${plan.minutesPerMonth} minutos por mês. Minuto extra a ${formatEuro(plan.extraMinuteEur)}€. Preço de fundador ${plan.founderPriceEur}€ por mês durante ${PILOT.founderMonths} meses, para quem entra no piloto.`,
      availability: "https://schema.org/InStock",
    })),
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
        <link rel="canonical" href={siteUrl} />
        <meta name="theme-color" content="#0369a1" />
        <meta name="geo.region" content="PT" />
        <meta name="geo.placename" content="Portugal" />
        <meta name="language" content="Portuguese" />
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
