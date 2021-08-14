const { gray } = require("tailwindcss/colors");

module.exports = {
  purge: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./modules/**/*.{js,ts,jsx,tsx}",
  ],
  mode: "jit",
  darkMode: false, // or 'media' or 'class'
  theme: {
    spinner: (theme) => ({
      default: {
        color: theme("colors.gray.900"),
        size: "1em",
        border: "2px",
        speed: "500ms",
      },
      light: {
        color: theme("colors.gray.100"),
        size: "1em",
        border: "2px",
        speed: "500ms",
      },
    }),
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
      transparent: "transparent",
      white: "#FFFFFF",
      black: "#000000",
      gray,
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require("tailwindcss-spinner")({
      className: "spinner",
      themeKey: "spinner",
    }),
    require("@tailwindcss/forms")({
      strategy: "class",
    }),
    require("@tailwindcss/typography"),
  ],
};
