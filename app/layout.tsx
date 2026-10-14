import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";
import { CONTACT_EMAIL, CONTACT_PHONE_E164 } from "@/lib/contact";
import { PLANS, SITE_URL } from "@/lib/site";

const description =
  "A Linea atende chamadas, responde a perguntas e marca compromissos, em português, para pequenos negócios em Portugal. Planos de 99€, 199€ e 899€ por mês.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Linea | Atendedor de chamadas com IA para empresas em Portugal",
    template: "%s | Linea",
  },
  description,
  keywords: [
    "atendedor de chamadas",
    "atendedor de chamadas IA",
    "atendimento telefónico",
    "assistente telefónico Portugal",
    "marcações por telefone",
    "linea",
  ].join(", "),
  authors: [{ name: "Dongrie Labs", url: SITE_URL }],
  creator: "Dongrie Labs",
  publisher: "Dongrie Labs",
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: "Linea | Atendedor de chamadas com IA",
    description,
    url: SITE_URL,
    siteName: "Linea",
    type: "website",
    locale: "pt_PT",
  },
  twitter: {
    card: "summary_large_image",
    title: "Linea | Atendedor de chamadas com IA",
    description,
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
};

export const viewport: Viewport = {
  themeColor: "#07080C",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Linea",
    description,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    url: SITE_URL,
    inLanguage: "pt-PT",
    provider: {
      "@type": "Organization",
      name: "Dongrie Labs",
      url: SITE_URL,
      email: CONTACT_EMAIL,
      contactPoint: {
        "@type": "ContactPoint",
        telephone: CONTACT_PHONE_E164,
        contactType: "sales",
        availableLanguage: ["Portuguese"],
        areaServed: "PT",
      },
    },
    offers: PLANS.map(plan => ({
      "@type": "Offer",
      name: plan.name,
      price: String(plan.priceEur),
      priceCurrency: "EUR",
      description: `${plan.callsPerMonth} chamadas por mês`,
      url: `${SITE_URL}/formulario/?plano=${plan.id}`,
    })),
  };

  return (
    <html lang="pt">
      <head>
        <Script id="js-flag" strategy="beforeInteractive">
          {`document.documentElement.classList.add("js")`}
        </Script>
        <link rel="canonical" href={SITE_URL} />
        <meta name="geo.region" content="PT" />
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
