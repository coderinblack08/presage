import { IdProvider } from "@radix-ui/react-id";
import { DefaultSeo } from "next-seo";
import type { AppProps } from "next/app";
import React from "react";
import { SWRConfig } from "swr";
import "../lib/firebase";
import "../lib/queries";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
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
        <SWRConfig>
          <Component {...pageProps} />
        </SWRConfig>
      </IdProvider>
    </>
  );
}

export default MyApp;
