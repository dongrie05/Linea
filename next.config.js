/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  basePath: process.env.NODE_ENV === "production" ? "/Linea" : "",
  assetPrefix: process.env.NODE_ENV === "production" ? "/Linea/" : "",
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
