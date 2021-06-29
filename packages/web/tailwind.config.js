module.exports = {
  purge: [
    "./modules/**/*.tsx",
    "./pages/**/*.tsx",
    "./components/**/*.tsx",
    "./stories/**/*.tsx",
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
    },
    colors: {
      white: "#FFFFFF",
      black: "#000000",
      transparent: "transparent",
      gray: {
        100: "#EEF0F2",
        200: "#BCC3CD",
        300: "#8E9AAA",
        400: "#4D5568",
        500: "#323848",
        600: "#202430",
        700: "#13151D",
      },
      primary: {
        DEFAULT: "#F3BE52",
        light: "#F9D489",
      },
    },
    spinner: (theme) => ({
      default: {
        color: theme("colors.gray.100"),
        size: "1em",
        border: "2px",
        speed: "500ms",
      },
      dark: {
        color: theme("colors.gray.700"),
        size: "1em",
        border: "2px",
        speed: "500ms",
      },
      primary: {
        color: theme("colors.primary.DEFAULT"),
        size: "1em",
        border: "2px",
        speed: "500ms",
      },
    }),
    extend: {
      maxWidth: {
        "8xl": "88rem",
      },
      screens: {
        sxl: "1224px",
      },
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
  ],
};
