const colors = require("tailwindcss/colors");

module.exports = {
  content: [
    "./pages/**/*.{ts,js,jsx,tsx}",
    "./components/**/*.{ts,js,jsx,tsx}",
    "./modules/**/*.{ts,js,jsx,tsx}",
  ],
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
    extend: {
      colors: {
        gray: colors.neutral,
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms")({ strategy: "class" }),
    // require("@tailwindcss/typography"),
  ],
};
