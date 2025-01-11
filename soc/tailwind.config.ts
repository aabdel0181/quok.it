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
      },
      backdropBlur: {
        sm: '4px',
      },
      backgroundColor: {
        'gray-900/50': 'rgba(17, 24, 39, 0.5)',
      },
      borderColor: {
        'gray-800': 'rgba(31, 41, 55, 1)',
      },
    },
  },
  plugins: [],
} satisfies Config;