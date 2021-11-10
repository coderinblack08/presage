import "../src/styles.css";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  backgrounds: {
    default: "dark",
    values: [
      {
        name: "dark",
        value: "#090E1A",
      },
    ],
  },
};
