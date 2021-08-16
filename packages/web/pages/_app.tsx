import "../styles/globals.css";
import React from "react";
import { DefaultSeo } from "next-seo";
import type { AppProps } from "next/app";
import { Provider as UrqlProvider } from "urql";
import { IdProvider } from "@radix-ui/react-id";
import { client } from "../lib/createUrqlClient";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UrqlProvider value={client}>
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
      <IdProvider>
        <Component {...pageProps} />
      </IdProvider>
    </UrqlProvider>
  );
}

export default MyApp;
