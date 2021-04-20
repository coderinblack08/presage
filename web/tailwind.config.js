module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
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
      transparent: "transparent",
      white: "#FFFFFF",
      black: "#13141C",
      "darker-gray": "#282F42",
      "dark-gray": "#4E5873",
      gray: "#717A94",
      "light-gray": "#ACB3C9",
      "lighter-gray": "#E4E7F1",
      primary: "#547CF5",
      "faint-primary": "#7A9AFC",
      "white-primary": "#D4DFFF",
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
