import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://dongrie05.github.io/Linea";

  return [
    {
      url: `${baseUrl}/`,
    },
    {
      url: `${baseUrl}/formulario/`,
    },
  ];
}
