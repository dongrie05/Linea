/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        surface: "rgb(var(--c-surface) / <alpha-value>)",
        elevated: "rgb(var(--c-elevated) / <alpha-value>)",
        ink: "rgb(var(--c-ink) / <alpha-value>)",
        muted: "rgb(var(--c-muted) / <alpha-value>)",
        line: "rgb(var(--c-line) / <alpha-value>)",
        accent: "rgb(var(--c-accent) / <alpha-value>)",
        "accent-ink": "rgb(var(--c-accent-ink) / <alpha-value>)",
        pine: "rgb(var(--c-pine) / <alpha-value>)",
        "pine-ink": "rgb(var(--c-pine-ink) / <alpha-value>)",
        wood: "rgb(var(--c-wood) / <alpha-value>)",
        "wood-ink": "rgb(var(--c-wood-ink) / <alpha-value>)",
        warm: "rgb(var(--c-warm) / <alpha-value>)",
        "warm-fill": "rgb(var(--c-warm-fill) / <alpha-value>)",
        "warm-fill-ink": "rgb(var(--c-warm-fill-ink) / <alpha-value>)",
        sand: "rgb(var(--c-sand) / <alpha-value>)",
        paper: "rgb(var(--c-paper) / <alpha-value>)",
      },
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "system-ui",
          "sans-serif",
        ],
      },
      maxWidth: {
        measure: "40rem",
        page: "68rem",
      },
    },
  },
  plugins: [],
};
