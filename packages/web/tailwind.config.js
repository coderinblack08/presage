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
      mono: require("tailwindcss/defaultConfig").theme.fontFamily.mono,
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
      red: "#EF4444",
      transparent: "transparent",
      gray: require("tailwindcss/colors").gray,
      primary: {
        DEFAULT: "#F3BE52",
        light: "#F9D489",
      },
    },
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
    extend: {
      maxWidth: {
        "8xl": "92rem",
      },
      screens: {
        sxl: "1224px",
      },
      scale: {
        80: "0.8",
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            pre: {
              backgroundColor: theme("colors.gray.800"),
              padding: "1.5rem",
              borderRadius: 8,
              code: {
                fontWeight: "700 !important",
              },
              "::selection": {
                backgroundColor: theme("colors.gray.200"),
                color: theme("colors.gray.800"),
              },
            },
          },
        },
      }),
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
