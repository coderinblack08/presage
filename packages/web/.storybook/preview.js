import "../styles/globals.css";
import { themes } from "@storybook/theming";

export const parameters = {
  backgrounds: {
    default: "dark-gray",
    values: [
      {
        name: "dark-gray",
        value: "#10151B",
      },
    ],
  },
  darkMode: themes,
};
