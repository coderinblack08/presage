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
      global: (props) => ({
        body: {
          fontSize: "14px",
        },
        ".ProseMirror": {
          lineHeight: "taller",
          color: "gray.600",
          fontSize: "md",
          h1: {
            color: "gray.900",
            fontSize: "3xl",
            fontWeight: "bold",
          },
          h2: {
            color: "gray.900",
            fontSize: "2xl",
            fontWeight: "bold",
          },
          h3: {
            color: "gray.900",
            fontSize: "xl",
            fontWeight: "bold",
          },
        },
        ".tiptap-editor": {
          py: 4,
          outline: "none",
        },
      }),
    },
  },
  withDefaultColorScheme({ colorScheme: "gray" })
);
