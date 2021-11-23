import { extendTheme, withDefaultColorScheme } from "@chakra-ui/react";

const FALLBACK_FONTS =
  "system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji";

export const theme = extendTheme(
  {
    fonts: {
      body: `Inter, ${FALLBACK_FONTS}`,
      heading: `Eudoxus Sans, ${FALLBACK_FONTS}`,
    },
    components: {
      Button: {
        // {
        //   _focus: { dropShadow: "none" },
        //   _focusVisible: { boxShadow: "outline" },
        // },
      },
    },
    styles: {
      global: {
        body: {
          fontSize: "14px",
          fontWeight: "medium",
        },
      },
    },
  },
  withDefaultColorScheme({ colorScheme: "gray" })
);
