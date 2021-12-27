import { ChakraProvider } from "@chakra-ui/react";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import type { AppProps } from "next/app";
import { IdProvider } from "@radix-ui/react-id";
import { defaultQueryFn } from "../lib/utils/defaultQueryFn";
import "@fontsource/inter";
import "../styles/globals.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      staleTime: 1000 * 60 * 5,
      queryFn: defaultQueryFn(),
    },
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <IdProvider>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <Component {...pageProps} />
        </Hydrate>
      </QueryClientProvider>
    </IdProvider>
  );
}

export default MyApp;
