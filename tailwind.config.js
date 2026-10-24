/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        surface: "rgb(var(--c-surface) / <alpha-value>)",
        section: "rgb(var(--c-section) / <alpha-value>)",
        elevated: "rgb(var(--c-elevated) / <alpha-value>)",
        ink: "rgb(var(--c-ink) / <alpha-value>)",
        muted: "rgb(var(--c-muted) / <alpha-value>)",
        faint: "rgb(var(--c-faint) / <alpha-value>)",
        line: "rgb(var(--c-line) / <alpha-value>)",
        "line-strong": "rgb(var(--c-line-strong) / <alpha-value>)",
        brand: "rgb(var(--c-brand) / <alpha-value>)",
        blue: "rgb(var(--c-blue) / <alpha-value>)",
        "blue-fill": "rgb(var(--c-blue-fill) / <alpha-value>)",
        "blue-ink": "rgb(var(--c-blue-ink) / <alpha-value>)",
        voice: "rgb(var(--c-voice) / <alpha-value>)",
        ok: "rgb(var(--c-ok) / <alpha-value>)",
        warn: "rgb(var(--c-warn) / <alpha-value>)",
        danger: "rgb(var(--c-danger) / <alpha-value>)",
        accent: "rgb(var(--c-blue-fill) / <alpha-value>)",
        "accent-ink": "rgb(var(--c-blue-ink) / <alpha-value>)",
      },
      fontFamily: {
        sans: ["var(--font-mona)", "Arial", "sans-serif"],
        mono: ["var(--font-jetbrains)", "ui-monospace", "monospace"],
      },
      maxWidth: {
        measure: "40rem",
        page: "68rem",
      },
    },
  },
  plugins: [],
};
