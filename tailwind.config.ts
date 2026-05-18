import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "var(--color-primary)",
          dark:    "var(--color-primary-dark)",
          light:   "var(--color-primary-light)",
          200:     "var(--color-primary-200)",
          100:     "var(--color-primary-100)",
          50:      "var(--color-primary-50)",
          900:     "var(--color-primary-900)",
        },
        cta: {
          DEFAULT: "var(--color-cta)",
          hover:   "var(--color-cta-hover)",
          dark:    "var(--color-cta-dark)",
          light:   "var(--color-cta-light)",
          200:     "var(--color-cta-200)",
          100:     "var(--color-cta-100)",
        },
        neutral: {
          DEFAULT: "var(--color-neutral)",
          dark:    "var(--color-neutral-dark)",
          light:   "var(--color-neutral-light)",
          200:     "var(--color-neutral-200)",
          100:     "var(--color-neutral-100)",
        },
        brand: {
          dark:   "var(--color-dark)",
          border: "var(--color-border)",
          muted:  "var(--color-text-muted)",
          subtle: "var(--color-bg-subtle)",
        },
        success: {
          DEFAULT: "var(--color-success)",
          bg:      "var(--color-success-bg)",
        },
        danger: {
          DEFAULT: "var(--color-danger)",
          bg:      "var(--color-danger-bg)",
        },
        warning: {
          DEFAULT: "var(--color-warning)",
          bg:      "var(--color-warning-bg)",
        },
      },
    },
  },
  plugins: [],
};

export default config;
