import defaultTheme from "tailwindcss/defaultTheme";
import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          base: "#FFDE03",
          accent: "#0336FF",
          pink: "#FF0266",
        },
      },
      fontFamily: {
        sans: ["Rubik", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [
    // hover effect that only applies when the device has a pointer
    plugin(({ addVariant }) =>
      addVariant(
        "pointer-hover",
        "@media (hover: hover) and (pointer: fine) { &:hover }",
      ),
    ),
  ],
} satisfies Config;
