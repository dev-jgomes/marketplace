import type { Config } from "tailwindcss";
import animatePlugin from "tailwindcss-animate";

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{ts,tsx}", "./.storybook/**/*.{ts,tsx}"],
  theme: {
    extend: {
      brand: {
        main: "var(--brand-main)",
      },
    },
  },
  plugins: [animatePlugin],
} satisfies Config;

export default config;
