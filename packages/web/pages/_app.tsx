import React from "react";
import Head from "next/head";
import { AppProps } from "next/app";
import { Hydrate } from "react-query/hydration";
import { QueryClient, QueryClientProvider } from "react-query";
import { AudioPlayerProvider } from "react-use-audio-player";
import { AuthProvider } from "../components/AuthProvider";
import { fetcher } from "../lib/fetcher";
import "rc-slider/assets/index.css";
import "../styles/globals.css";
import { PresagePlayer } from "../modules/player/PresagePlayer";
import { usePlayerStore } from "../store/usePlayerStore";

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
  const presage = usePlayerStore((x) => x.presage);

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <AuthProvider>
          <AudioPlayerProvider>
            <Head>
              <title>Presage</title>
              <link rel="icon" href="/favicon.ico" type="image/x-icon" />
            </Head>
            <div className={presage ? "pb-28" : "pb-10"}>
              <Component {...pageProps} />
            </div>
            <PresagePlayer />
          </AudioPlayerProvider>
        </AuthProvider>
      </Hydrate>
    </QueryClientProvider>
  );
}

export default MyApp;
