const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}", "./index.html"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", ...defaultTheme.fontFamily.sans],
        title: ["Aboreto", "Inter", ...defaultTheme.fontFamily.sans],
        slogan: ["Bebas Neue", "Inter", ...defaultTheme.fontFamily.sans]
      },
      colors: {
        "dark-border": "#878787",
        "light-border": "#D9D9D9",
        main: "#17AFF0",
        accent: "#19C93F",
        "dark-accent": "#16b639",
        background: "#F4F4F4",
      },
    },
  },
  plugins: [],
};
