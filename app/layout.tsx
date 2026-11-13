import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { PILOT, PLANS, formatEuro } from "@/lib/site";
import { siteUrl } from "@/lib/site-url";

const mona = localFont({
  src: "../src/fonts/mona-sans.woff2",
  weight: "200 900",
  display: "swap",
  variable: "--font-mona",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default:
      "Atendedor de Chamadas IA | Atendimento Telefónico Automático Portugal - Linea",
    template: "%s | Linea - Atendimento Telefónico IA",
  },
  description: `A Linea atende o telefone, marca consultas e envia a confirmação por SMS. De dia e de noite. Planos desde 99€ por mês.`,
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
      "Atendedor de chamadas para empresas em Portugal. Planos desde 99€ por mês, com minutos incluídos.",
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
      "Atendedor de chamadas para empresas em Portugal. A Linea atende e regista a marcação ou o recado.",
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
      "Atendedor de chamadas para empresas em Portugal. A Linea atende a chamada, responde em português e regista a marcação ou o recado.",
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
        telephone: ["+351-927-699-882", "+351-964-000-234"],
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
      "Atendimento da chamada no número da empresa",
      "Resposta em português",
      "Registo da marcação ou do recado",
      "Planos com minutos incluídos",
    ],
  };

  return (
    <html lang="pt" className={mona.variable}>
      <head>
        <link rel="canonical" href={`${siteUrl}/`} />
        <meta name="theme-color" content="#0A0C10" />
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
      <body>{children}</body>
    </html>
  );
}
