import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";
import Grain from "@/components/Grain";
import MotionRoot from "@/components/MotionRoot";
import { CONTACT_EMAIL, CONTACT_PHONE_E164 } from "@/lib/contact";
import { jetbrainsMono, monaSans } from "@/lib/fonts";
import { BASE_PATH, SITE_URL } from "@/lib/site";

const description =
  "A Linea atende o telefone de clínicas dentárias em Portugal. Responde em português de Portugal, com a informação da clínica, e marca a consulta na agenda.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Linea | Assistente telefónico para clínicas dentárias",
    template: "%s | Linea",
  },
  description,
  keywords: [
    "assistente telefónico",
    "clínica dentária",
    "atendimento telefónico",
    "marcações",
    "Portugal",
    "linea",
  ].join(", "),
  authors: [{ name: "Gonçalo Dongrie", url: SITE_URL }],
  creator: "Gonçalo Dongrie",
  alternates: {
    canonical: SITE_URL,
  },
  icons: {
    icon: [{ url: `${BASE_PATH}/favicon.svg`, type: "image/svg+xml" }],
    apple: [
      {
        url: `${BASE_PATH}/brand/linea-app-icon.svg`,
        type: "image/svg+xml",
      },
    ],
  },
  openGraph: {
    title: "Linea | Assistente telefónico para clínicas dentárias",
    description,
    url: SITE_URL,
    siteName: "Linea",
    type: "website",
    locale: "pt_PT",
  },
  twitter: {
    card: "summary_large_image",
    title: "Linea | Assistente telefónico para clínicas dentárias",
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
  themeColor: "#0A0C10",
  colorScheme: "dark",
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
      "@type": "Person",
      name: "Gonçalo Dongrie",
      email: CONTACT_EMAIL,
      telephone: CONTACT_PHONE_E164,
    },
  };

  return (
    <html
      lang="pt-PT"
      className={`${monaSans.variable} ${jetbrainsMono.variable}`}
    >
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
      <body>
        <Grain />
        <MotionRoot>{children}</MotionRoot>
      </body>
    </html>
  );
}
