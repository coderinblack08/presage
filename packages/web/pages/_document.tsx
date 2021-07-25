import Document, { Html, Head, Main, NextScript } from "next/document";
import { isDev } from "../lib/constants";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          {isDev() ? (
            <script
              async
              defer
              data-website-id="2a301202-2b75-4dd6-b0aa-06e2aa2cbbd5"
              src="http://localhost:3001/umami.js"
            />
          ) : null}
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
