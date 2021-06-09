import React from "react";
import { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";
import { AudioPlayerProvider } from "react-use-audio-player";
import { AuthProvider } from "../components/AuthProvider";
import { fetcher } from "../lib/fetcher";
import "rc-slider/assets/index.css";
import "../styles/globals.css";
import { PresagePlayer } from "../modules/player/PresagePlayer";

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
      <AuthProvider>
        <AudioPlayerProvider>
          <Component {...pageProps} />
          <PresagePlayer />
        </AudioPlayerProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
