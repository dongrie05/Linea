/** @type {import('next').NextConfig} */

/**
 * GitHub Pages (dongrie05.github.io/Linea) só reencaminha para linea.dongrielabs.com.
 * O site é servido na raiz pela Vercel. BASE_PATH permite alojar a aplicação
 * num subcaminho quando necessário.
 */
function resolveBasePath() {
  if (process.env.BASE_PATH !== undefined) {
    const raw = process.env.BASE_PATH.trim();
    if (raw === "" || raw === "/") return "";
    const withLeading = raw.startsWith("/") ? raw : `/${raw}`;
    return withLeading.replace(/\/+$/, "");
  }

  return "";
}

const basePath = resolveBasePath();

const nextConfig = {
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
    serverComponentsExternalPackages: ["postgres"],
  },
  // Configurações de SEO
  compress: true,
  poweredByHeader: false, // Remove o header X-Powered-By para segurança
  generateEtags: true, // Gera ETags para melhor cache
};

module.exports = nextConfig;
