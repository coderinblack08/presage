/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "../../packages/ui/src/**/*.{ts,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./modules/**/*.{js,ts,jsx,tsx}",
    "./editor/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: { zinc: require("tailwindcss/colors").zinc },
      fontFamily: {
        sans: ["Inter", ...require("tailwindcss/defaultTheme").fontFamily.sans],
        display: [
          "Eudoxus Sans",
          ...require("tailwindcss/defaultTheme").fontFamily.sans,
        ],
      },
      typography: {
        DEFAULT: {
          css: {
            "code::before": {
              content: '""',
            },
            "code::after": {
              content: '""',
            },
            "blockquote p:first-of-type::before": {
              content: '""',
            },
            "blockquote p:last-of-type::after": {
              content: '""',
            },
          },
        },
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms")({ strategy: "class" }),
  ],
};
