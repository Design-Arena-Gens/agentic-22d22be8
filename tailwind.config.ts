import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./lib/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#f2f8ff",
          100: "#dbeeff",
          200: "#b8dcff",
          300: "#8ac3ff",
          400: "#4a9eff",
          500: "#1f7ff5",
          600: "#0f61d8",
          700: "#0a4bb0",
          800: "#0f428c",
          900: "#113970"
        }
      }
    }
  },
  plugins: [],
};

export default config;
