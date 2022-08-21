const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}", "./index.html"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        "dark-border": "#17AFF0",
        "light-border": "#878787",
        main: "#17AFF0",
        accent: "#19C93F",
        background: "#F4F4F4",
      },
    },
  },
  plugins: [],
};
