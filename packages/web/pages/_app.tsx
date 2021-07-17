import { DefaultSeo } from "next-seo";
import { ReactQueryDevtools } from "react-query/devtools";
import type { AppProps } from "next/app";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Hydrate } from "react-query/hydration";
import { AudioPlayerProvider } from "react-use-audio-player";
import { AuthProvider } from "../components/AuthProvider";
import { fetcher } from "../lib/fetcher";
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
  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <AudioPlayerProvider>
          <AuthProvider>
            <DefaultSeo
              title="Presage"
              description="An open-source Medium alternative built for referral podcasts and blogs"
              canonical="https://joinpresage.com"
              additionalMetaTags={[
                {
                  content: "width=device-width, initial-scale=1",
                  name: "viewport",
                },
              ]}
              openGraph={{
                type: "website",
                url: "https://joinpresage.com",
                locale: "en_IE",
                site_name: "Presage",
                description:
                  "An open-source Medium alternative built for referral podcasts and blogs",
                images: [
                  {
                    url: "/static/thumbnail.png",
                    width: 1440,
                    height: 900,
                    alt:
                      "Presage is an open-source Medium alternative built for referral podcasts and blogs",
                  },
                ],
                title: "Presage",
              }}
            />
            <Component {...pageProps} />
            <ReactQueryDevtools />
          </AuthProvider>
        </AudioPlayerProvider>
      </Hydrate>
    </QueryClientProvider>
  );
}

export default MyApp;
