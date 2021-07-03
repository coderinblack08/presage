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
      purple: "#9F66FF",
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
        color: theme("colors.gray.600"),
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
      scale: {
        80: "0.8",
      },
      typography(theme) {
        return {
          DEFAULT: {
            css: {
              color: theme("colors.gray.200"),
              '[class~="lead"]': { color: theme("colors.gray.300") },
              a: { color: theme("colors.gray.100") },
              strong: { color: theme("colors.gray.100") },
              "ol > li::before": {
                color: theme("colors.gray.300"),
              },
              "ul > li::before": {
                backgroundColor: theme("colors.gray.300"),
              },
              hr: { borderColor: theme("colors.gray.500") },
              blockquote: {
                color: theme("colors.gray.100"),
                borderLeftColor: theme("colors.gray.500"),
              },
              h1: { color: theme("colors.gray.100") },
              h2: { color: theme("colors.gray.100") },
              h3: { color: theme("colors.gray.100") },
              h4: { color: theme("colors.gray.100") },
              code: { color: theme("colors.gray.100") },
              "a code": { color: theme("colors.gray.100") },
              pre: {
                color: theme("colors.gray.200"),
                backgroundColor: theme("colors.gray.600"),
              },
              thead: {
                color: theme("colors.gray.100"),
                borderBottomColor: theme("colors.gray.600"),
              },
              "tbody tr": { borderBottomColor: theme("colors.gray.600") },
            },
          },
        };
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
    require("@tailwindcss/typography"),
  ],
};
