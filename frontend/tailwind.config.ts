import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class", // <-- ADD THIS LINE
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}", "./app/**/*.{js,ts,jsx,tsx,mdx}"],
  // ... rest of your config
};
export default config;
