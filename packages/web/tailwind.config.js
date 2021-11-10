const { trueGray, purple } = require("tailwindcss/colors");

module.exports = {
  purge: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "../ui/src/components/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./modules/**/*.{js,ts,jsx,tsx}",
  ],
  mode: "jit",
  darkMode: false,
  theme: {
    fontFamily: {
      sans: [
        "Inter",
        "-apple-system",
        "BlinkMacSystemFont",
        "Segoe UI",
        "Roboto",
        "Helvetica",
        "Arial",
        "sans-serif",
      ],
      display: [
        "Eudoxus Sans",
        "Inter",
        "-apple-system",
        "BlinkMacSystemFont",
        "Segoe UI",
        "Roboto",
        "Helvetica",
        "Arial",
        "sans-serif",
      ],
    },
    colors: {
      gray: trueGray,
      purple: purple,
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
