import theme, { heroui } from "@heroui/theme";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
    "node_modules/@heroui/toast/**/*.js",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    heroui()
  ],
};
