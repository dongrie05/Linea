/* O kit visual pede folhas e módulos nesta ordem, não o next/font nem o next/script. */
/* eslint-disable @next/next/no-css-tags, @next/next/no-sync-scripts, @next/next/no-page-custom-font */
import type { Metadata } from "next";
import "./globals.css";
import { PILOT, PLANS, formatEuro } from "@/lib/site";
import { siteUrl } from "@/lib/site-url";

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
      "Atendimento da chamada no número da empresa",
      "Resposta em português",
      "Registo da marcação ou do recado",
      "Planos com minutos incluídos",
    ],
  };

  return (
    <html
      lang="pt"
      data-type="software"
      suppressHydrationWarning
      data-radius="soft"
      data-buttons="pill"
      data-motion=""
    >
      <head>
        <link rel="canonical" href={`${siteUrl}/`} />
        <meta name="theme-color" content="#0A0C10" />
        <meta name="site-kind" content="software" />
        <meta name="page-type" content="software" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://cdn.jsdelivr.net/fontsource/css/mona-sans:vf@5.2.5/latin-wght-normal.min.css"
          rel="stylesheet"
        />
        <link rel="stylesheet" href="/assets/system.css" />
        <link rel="stylesheet" href="/assets/ui/cards.css" />
        <link rel="stylesheet" href="/assets/ui/base.css" />
        <link rel="stylesheet" href="/assets/ui/voice/fragment.css" />
        <link rel="stylesheet" href="/assets/ui/window/fragment.css" />
        <link rel="stylesheet" href="/assets/ui/chat/fragment.css" />
        <link rel="stylesheet" href="/assets/motion/motion.css" />
        <link rel="stylesheet" href="/assets/backgrounds/backgrounds.css" />
        <link rel="stylesheet" href="/assets/layout/layout.css" />
        <link rel="stylesheet" href="/assets/icons/icon.css" />
        <link rel="stylesheet" href="/assets/diagrams/diagram.css" />
        <link
          rel="stylesheet"
          href="/assets/moments/letters-assemble/moment.css"
        />
        <link
          rel="stylesheet"
          href="/assets/moments/line-carries-colour/moment.css"
        />
        <link rel="stylesheet" href="/assets/page.css" />
        <style>{`:root {
  --p-bg: #0A0C10; --p-surface: #0F1217; --p-ink: #F2F4F8; --p-muted: #9AA3B5;
  --p-accent: #2F7DEB; --p-accent-ink: #F2F4F8; --p-action: #5B9BF0; --p-action-ink: #0A0C10;
  --p-inv-bg: #F2F4F8; --p-inv-surface: #E6E9EF; --p-inv-ink: #0A0C10; --p-inv-muted: #5C6574;
  --p-inv-accent: #2F7DEB; --p-inv-accent-ink: #F2F4F8; --p-inv-action: #2F7DEB; --p-inv-action-ink: #F2F4F8;
  --p-line: #1C212B; --p-elevated: #141821; --p-voice: #C6F3FF;
  --p-success: #3DD68C; --p-warning: #FFB547; --p-error: #FF686B;
  --font-display: "Mona Sans", system-ui, sans-serif;
  --font-text: "Mona Sans", system-ui, sans-serif;
  --font-mono: "Mona Sans", system-ui, sans-serif;
  --display-weight: 650;
  --display-tracking: -0.03em;
  --display-tracking-xl: -0.035em;
  --ly-scale: 1;
}`}</style>
        <script
          dangerouslySetInnerHTML={{
            __html:
              "document.documentElement.classList.add('m-enter');setTimeout(function(){document.documentElement.classList.add('m-enter-done')},700);document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('.nav__toggle');if(!b)return;var n=b.closest('.nav');var open=!n.classList.contains('is-open');n.classList.toggle('is-open',open);b.setAttribute('aria-expanded',String(open));});",
          }}
        />
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
      <body>
        {children}
        <script type="module" src="/assets/backgrounds/backgrounds.js" />
        <script type="module" src="/assets/system.js" />
        <script type="module" src="/assets/motion/motion.js" />
        <script type="module" src="/assets/layout/layout.js" />
        <script type="module" src="/assets/ui/ui.js" />
        <script type="module" src="/assets/diagrams/mount.js" />
        <script type="module" src="/assets/reveal.js" />
      </body>
    </html>
  );
}
