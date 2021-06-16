module.exports = {
  purge: ["./modules/**/*.tsx", "./pages/**/*.tsx", "./components/**/*.tsx"],
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
      gray: {
        100: "#EEF1F4",
        200: "#ACB8CA",
        300: "#798CA5",
        400: "#435469",
        500: "#303D4E",
        600: "#1E242E",
        700: "#10151B",
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
    }),
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [
    require("tailwindcss-spinner")({
      className: "spinner",
      themeKey: "spinner",
    }),
  ],
};
