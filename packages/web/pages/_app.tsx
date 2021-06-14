import { AppProps } from "next/app";
import Head from "next/head";
import "rc-slider/assets/index.css";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { Hydrate } from "react-query/hydration";
import { AudioPlayerProvider } from "react-use-audio-player";
import { AuthProvider } from "../components/AuthProvider";
import { fetcher } from "../lib/fetcher";
import { PresagePlayer } from "../modules/player/PresagePlayer";
import { usePlayerStore } from "../store/usePlayerStore";
import "../styles/globals.css";

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
            <div className={presage ? "md:pb-28 pb-36" : "pb-10"}>
              <Component {...pageProps} />
            </div>
            <PresagePlayer />
          </AudioPlayerProvider>
          <ReactQueryDevtools initialIsOpen={false} />
        </AuthProvider>
      </Hydrate>
    </QueryClientProvider>
  );
}

export default MyApp;
