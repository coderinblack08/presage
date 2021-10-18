const { gray, warmGray } = require("tailwindcss/colors");

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
      red: "#EF4444",
      transparent: "transparent",
      white: "#FFFFFF",
      black: "#000000",
      warmGray,
      gray,
    },
    screens: {
      xs: "420px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme("colors.gray.600"),
            lineHeight: "2rem",
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
            h1: {
              fontWeight: 700,
              fontSize: theme("fontSize.3xl"),
              lineHeight: theme("lineHeight.relaxed"),
            },
            h2: {
              marginTop: "0px",
              fontSize: theme("fontSize.2xl"),
              lineHeight: theme("lineHeight.relaxed"),
            },
            h3: {
              fontSize: theme("fontSize.xl"),
              lineHeight: theme("lineHeight.relaxed"),
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
