import { DefaultSeo } from "next-seo";
import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
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
          <link
            rel="preload"
            href="/fonts/eudoxus-sans-var.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            href="/fonts/inter-var.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
