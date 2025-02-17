import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "var(--primary)",
        primaryDark: "var(--primary-dark)",
        surface: "var(--surface)",
        surfaceDark: "var(--surface-dark)",
        textSecondary: "var(--text-secondary)",
      },
      backdropBlur: {
        sm: '4px',
      },
      backgroundColor: {
        'gray-900/50': 'rgba(17, 24, 39, 0.5)',
      },
      borderColor: {
        'gray-800': 'rgba(31, 41, 55, 1)',
      },keyframes: {
        'glitch-1': {
          '0%, 100%': { opacity: '0' },
          '50%': { opacity: '0.25' },
          '25%, 75%': { opacity: '0.5' },
        },
        'glitch-2': {
          '0%, 100%': { opacity: '0' },
          '25%': { opacity: '0.25' },
          '50%, 75%': { opacity: '0.5' },
        },
      },
      animation: {
        'glitch-1': 'glitch-1 4s infinite',
        'glitch-2': 'glitch-2 4s infinite',
      },
    },
  },
  plugins: [],
} satisfies Config;