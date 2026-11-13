/** @type {import('next').NextConfig} */

/**
 * GitHub Pages continua em https://dongrie05.github.io/Linea/ (prefixo /Linea).
 * A Vercel define VERCEL=1 e publica na raiz de https://linea.dongrielabs.com.
 * BASE_PATH explícito ganha aos dois: vazio = raiz; /Linea = Pages.
 */
function resolveBasePath() {
  if (process.env.BASE_PATH !== undefined) {
    const raw = process.env.BASE_PATH.trim();
    if (raw === "" || raw === "/") return "";
    const withLeading = raw.startsWith("/") ? raw : `/${raw}`;
    return withLeading.replace(/\/+$/, "");
  }

  if (process.env.VERCEL === "1") return "";
  if (process.env.NODE_ENV === "production") return "/Linea";
  return "";
}

const basePath = resolveBasePath();

const nextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  basePath,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  assetPrefix: basePath ? `${basePath}/` : "",
  pageExtensions: ["ts", "tsx", "js", "jsx"],
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
  // Configurações de SEO
  compress: true,
  poweredByHeader: false, // Remove o header X-Powered-By para segurança
  generateEtags: true, // Gera ETags para melhor cache
};

module.exports = nextConfig;
