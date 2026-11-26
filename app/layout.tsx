import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { FAQ_ITEMS, PILOT, PLANS, formatEuro } from "@/lib/site";
import { siteUrl } from "@/lib/site-url";

const mona = localFont({
  src: "../src/fonts/mona-sans.woff2",
  weight: "200 900",
  display: "swap",
  variable: "--font-mona",
});

const titleDefault =
  "Atendedor de Chamadas IA | Atendimento Telefónico Automático Portugal - Linea";
const description =
  "Atendedor de chamadas com IA em Portugal. A Linea atende o telefone, marca consultas e reservas, e envia a confirmação por SMS. Planos desde 99€ por mês.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: titleDefault,
    template: "%s | Linea - Atendedor de Chamadas IA",
  },
  description,
  keywords: [
    "atendedor de chamadas",
    "atendedor de chamadas IA",
    "atendedor de chamadas com AI",
    "atendedor de chamadas automático",
    "atendimento telefónico IA",
    "atendimento telefónico automático",
    "automatizar reservas por telefone",
    "automatizar reservas por chamadas",
    "assistente telefónico Portugal",
    "IA atendimento",
    "marcação de consultas por telefone",
    "atendedor virtual",
    "sistema de atendimento automático",
    "atendimento 24/7",
    "chatbot telefónico",
    "inteligência artificial Portugal",
    "atendimento telefónico inteligente",
    "IA para telefone",
    "linea",
  ].join(", "),
  authors: [{ name: "Linea", url: siteUrl }],
  creator: "Linea",
  publisher: "Linea",
  alternates: {
    canonical: `${siteUrl}/`,
  },
  openGraph: {
    title:
      "Linea - Atendedor de Chamadas com IA | Atendimento Telefónico Automático",
    description,
    url: siteUrl,
    siteName: "Linea",
    type: "website",
    locale: "pt_PT",
    images: [
      {
        url: `${siteUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Linea - Atendedor de chamadas com IA em Portugal",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Linea - Atendedor de Chamadas com IA Portugal",
    description:
      "Atendedor de chamadas para empresas em Portugal. Atende, marca e confirma por SMS.",
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
  category: "technology",
  other: {
    "geo.region": "PT",
    "geo.placename": "Portugal",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const orgId = `${siteUrl}/#organization`;
  const websiteId = `${siteUrl}/#website`;
  const appId = `${siteUrl}/#software`;
  const serviceId = `${siteUrl}/#service`;

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": orgId,
        name: "Linea",
        url: siteUrl,
        logo: {
          "@type": "ImageObject",
          url: `${siteUrl}/logo.png`,
        },
        description:
          "Atendedor de chamadas com IA para empresas em Portugal. Atende, marca consultas e reservas, confirma por SMS.",
        parentOrganization: {
          "@type": "Organization",
          "@id": "https://dongrielabs.com/#org",
          name: "Dongrie Labs",
          url: "https://dongrielabs.com/",
        },
        areaServed: {
          "@type": "Country",
          name: "Portugal",
        },
        contactPoint: [
          {
            "@type": "ContactPoint",
            telephone: "+351-927-699-882",
            contactType: "sales",
            availableLanguage: ["Portuguese", "pt-PT"],
            areaServed: "PT",
          },
          {
            "@type": "ContactPoint",
            telephone: "+351-964-000-234",
            contactType: "customer service",
            availableLanguage: ["Portuguese", "pt-PT"],
            areaServed: "PT",
          },
        ],
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: siteUrl,
        name: "Linea",
        description,
        inLanguage: "pt-PT",
        publisher: { "@id": orgId },
        potentialAction: {
          "@type": "ReserveAction",
          target: `${siteUrl}/formulario/`,
          name: "Pedir período experimental",
        },
      },
      {
        "@type": "SoftwareApplication",
        "@id": appId,
        name: "Linea - Atendedor de Chamadas com IA",
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        url: siteUrl,
        image: `${siteUrl}/og-image.jpg`,
        datePublished: "2024-01-16",
        dateModified: "2026-11-25",
        inLanguage: "pt-PT",
        description,
        keywords:
          "atendedor de chamadas, atendedor de chamadas IA, automatizar reservas por telefone, atendimento telefónico automático",
        provider: { "@id": orgId },
        offers: PLANS.map(plan => ({
          "@type": "Offer",
          name: `${plan.name} - Atendedor de chamadas`,
          price: String(plan.priceEur),
          priceCurrency: "EUR",
          description: `${plan.minutesPerMonth} minutos por mês. ${plan.messagesPerMonth > 0 ? `${plan.messagesPerMonth} mensagens por WhatsApp ou SMS por mês.` : "Sem mensagens incluídas."} Minuto extra a ${formatEuro(plan.extraMinuteEur)} €. Preço especial de ${plan.founderPriceEur} € por mês nos primeiros ${PILOT.specialMonths} meses. Período experimental de ${PILOT.trialWeeks} semanas.`,
          availability: "https://schema.org/InStock",
          url: `${siteUrl}/#precos`,
        })),
        featureList: [
          "Atendedor de chamadas no número da empresa",
          "Resposta em português",
          "Automatização de reservas e marcações por telefone",
          "Confirmação por SMS",
          "Planos com minutos incluídos",
        ],
      },
      {
        "@type": "Service",
        "@id": serviceId,
        name: "Atendedor de chamadas com IA",
        serviceType: "Atendimento telefónico automático",
        provider: { "@id": orgId },
        areaServed: {
          "@type": "Country",
          name: "Portugal",
        },
        description:
          "Serviço de atendedor de chamadas com inteligência artificial. Atende, marca consultas e reservas, e confirma por SMS.",
        url: siteUrl,
        offers: {
          "@type": "AggregateOffer",
          priceCurrency: "EUR",
          lowPrice: String(PLANS[0].priceEur),
          highPrice: String(PLANS[PLANS.length - 1].priceEur),
          offerCount: PLANS.length,
        },
      },
      {
        "@type": "FAQPage",
        "@id": `${siteUrl}/#faq`,
        mainEntity: FAQ_ITEMS.map(([question, answer]) => ({
          "@type": "Question",
          name: question,
          acceptedAnswer: {
            "@type": "Answer",
            text: answer,
          },
        })),
      },
    ],
  };

  return (
    <html lang="pt-PT" className={mona.variable}>
      <head>
        <meta name="theme-color" content="#0A0C10" />
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
