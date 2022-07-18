import "tippy.js/animations/scale.css";
import "tippy.js/dist/tippy.css";

import { httpBatchLink } from "@trpc/client/links/httpBatchLink";
import { loggerLink } from "@trpc/client/links/loggerLink";
import { withTRPC } from "@trpc/next";
import { SessionProvider } from "next-auth/react";
import { AppType } from "next/dist/shared/lib/utils";
import { FunctionComponent } from "react";
import { Toaster } from "react-hot-toast";
import { RecoilRoot } from "recoil";
import superjson from "superjson";
import { AppRouter } from "../server/routers/_app";
import "../styles/globals.css";

const MyApp: AppType = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const C = Component as FunctionComponent;
  return (
    <RecoilRoot>
      <SessionProvider session={session}>
        <Toaster />
        <C {...pageProps} />
      </SessionProvider>
    </RecoilRoot>
  );
};

export default withTRPC<AppRouter>({
  config({}) {
    /**
     * If you want to use SSR, you need to use the server's full URL
     * @link https://trpc.io/docs/ssr
     */
    const url = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}/api/trpc`
      : "http://localhost:8080/api/trpc";

    return {
      links: [
        loggerLink({
          enabled: (opts) =>
            process.env.NODE_ENV === "development" ||
            (opts.direction === "down" && opts.result instanceof Error),
        }),
        httpBatchLink({ url }),
      ],
      transformer: superjson,
      /**
       * @link https://react-query.tanstack.com/reference/QueryClient
       */
      // queryClientConfig: { defaultOptions: { queries: { staleTime: 60 } } },
    };
  },
  /**
   * @link https://trpc.io/docs/ssr
   */
  ssr: false,
})(MyApp);
