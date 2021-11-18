import React from "react";
import type { AppProps } from "next/app";
import { IdProvider } from "@radix-ui/react-id";
import { QueryClient, QueryClientProvider } from "react-query";
import { defaultQueryFn } from "../lib/defaultQueryFn";
import "../styles/globals.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      staleTime: 60 * 1000 * 5,
      queryFn: defaultQueryFn(),
    },
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <IdProvider>
        <Component {...pageProps} />
      </IdProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
