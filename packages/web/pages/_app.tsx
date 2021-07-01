import React from "react";
import { ReactQueryDevtools } from "react-query/devtools";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";
import { Hydrate } from "react-query/hydration";
import { fetcher } from "../lib/fetcher";
import "../styles/globals.css";
import { AuthProvider } from "../components/AuthProvider";
import { AudioPlayerProvider } from "react-use-audio-player";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      staleTime: 1000 * 60 * 5,
      queryFn: fetcher,
    },
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <AudioPlayerProvider>
          <AuthProvider>
            <Component {...pageProps} />
            <ReactQueryDevtools />
          </AuthProvider>
        </AudioPlayerProvider>
      </Hydrate>
    </QueryClientProvider>
  );
}

export default MyApp;
