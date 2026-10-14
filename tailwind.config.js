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
        blue: "rgb(var(--c-blue) / <alpha-value>)",
        "blue-fill": "rgb(var(--c-blue-fill) / <alpha-value>)",
        "blue-ink": "rgb(var(--c-blue-ink) / <alpha-value>)",
        violet: "rgb(var(--c-violet) / <alpha-value>)",
        cyan: "rgb(var(--c-cyan) / <alpha-value>)",
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
