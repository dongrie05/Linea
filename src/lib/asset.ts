const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** Caminho de um ficheiro em public/, com o prefixo do GitHub Pages quando existe. */
export function asset(path: string): string {
  return `${basePath}${path}`;
}
