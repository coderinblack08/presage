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
          position: "relative",
          zIndex: 0,
          lineHeight: "taller",
          color: "gray.600",
          fontSize: "md",
          "&:focus": {
            outline: "none",
          },
          ".is-empty::before": {
            content: "attr(data-placeholder)",
            color: "gray.400",
            float: "left",
            pointerEvents: "none",
            height: 0,
          },
          "> * + *": {
            marginTop: "0.75em",
          },
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
          "ul, ol": {
            padding: "0 1.2rem",
          },
          a: {
            textDecoration: "underline",
            color: "blue.500",
          },
          hr: {
            borderColor: "gray.200",
            my: 5,
          },
          "blockquote p:first-of-type::before": {
            content: "open-quote",
          },
          "blockquote p:last-of-type::after": {
            content: "close-quote",
          },
          blockquote: {
            fontWeight: "500",
            fontStyle: "italic",
            borderLeft: "4px",
            borderColor: "gray.100",
            pl: 5,
            quotes: '"\\201C""\\201D""\\2018""\\2019"',
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
