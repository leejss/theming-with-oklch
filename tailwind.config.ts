import { generateTwClasses } from "./src/lib/utils";
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
        accent: generateTwClasses("accent"),
        primary: generateTwClasses("primary"),
        secondary: generateTwClasses("secondary"),
        error: generateTwClasses("error"),
      },
    },
  },
  plugins: [],
} satisfies Config;
