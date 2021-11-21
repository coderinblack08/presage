import { extendTheme, withDefaultColorScheme } from "@chakra-ui/react";
import { createBreakpoints } from "@chakra-ui/theme-tools";

const breakpoints = createBreakpoints({
  sm: "30em",
  md: "48em",
  lg: "62em",
  xl: "80em",
  "2xl": "96em",
});

export const theme = extendTheme(
  {
    breakpoints,
    fonts: {
      body: "Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji",
    },
    components: {
      Button: {
        // {
        //   _focus: { dropShadow: "none" },
        //   _focusVisible: { boxShadow: "outline" },
        // },
      },
    },
  },
  withDefaultColorScheme({ colorScheme: "gray" })
);
