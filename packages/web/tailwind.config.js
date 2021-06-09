module.exports = {
  purge: [
    "./modules/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  mode: "jit",
  darkMode: false,
  theme: {
    colors: {
      "gray-100": "#e3e8ee",
      "gray-200": "#b6c0cf",
      "gray-300": "#77889f",
      "gray-600": "#3e4861",
      "gray-700": "#283046",
      "gray-800": "#1e2333",
      "gray-900": "#0e1421",
      primary: "#547cf5",
      "faint-primary": "#7a9afc",
      "white-primary": "#dce5fe",
      white: "#ffffff",
      black: "#000000",
    },
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
      body: [
        "DM Sans",
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
    spinner: () => ({
      default: {
        color: "var(--color-gray-100)",
        size: "1em",
        border: "2px",
        speed: "500ms",
      },
      md: {
        color: "var(--color-gray-100)",
        size: "1.5em",
        border: "2px",
        speed: "500ms",
      },
    }),
    extend: {
      gridTemplateColumns: {
        "player-desktop": "1fr 2fr 1fr",
        "player-mobile": "1fr 3fr 1fr",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require("@tailwindcss/line-clamp"),
    require("tailwindcss-spinner")({
      className: "spinner",
      themeKey: "spinner",
    }),
  ],
};
