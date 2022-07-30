import { ThemeProvider } from "next-themes";
import { httpBatchLink } from "@trpc/client/links/httpBatchLink";
import { withTRPC } from "@trpc/next";
import { KBarProvider } from "kbar";
import { SessionProvider } from "next-auth/react";
import { AppType } from "next/dist/shared/lib/utils";
import { FunctionComponent } from "react";
import { Toaster } from "react-hot-toast";
import superjson from "superjson";
import { AppRouter } from "../server/routers/_app";
import "../styles/globals.css";
import "../styles/lowlight.css";
// import "@benrbray/prosemirror-math/style/math.css";
// import "katex/dist/katex.min.css";
import { useRouter } from "next/router";
import { MdHome, MdSavings, MdSubscriptions } from "react-icons/md";
import { CommandPallette } from "../modules/kbar/CommandPallette";

const MyApp: AppType = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const C = Component as FunctionComponent;
  const router = useRouter();

  return (
    <ThemeProvider enableSystem={false} attribute="class">
      <KBarProvider
        actions={[
          {
            id: "dashboard",
            name: "Dashboard",
            icon: <MdHome size={22} />,
            perform: () => router.push("/dashboard"),
          },
          {
            id: "rewards",
            name: "Rewards",
            icon: <MdSavings size={22} />,
            perform: () => router.push("/rewards"),
          },
          {
            id: "monetization",
            name: "Monetization",
            icon: <MdSubscriptions size={22} />,
            perform: () => router.push("/monetization"),
          },
        ]}
      >
        <CommandPallette />
        <SessionProvider session={session}>
          <Toaster />
          <C {...pageProps} />
        </SessionProvider>
      </KBarProvider>
    </ThemeProvider>
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
        // loggerLink({
        //   enabled: (opts) =>
        //     process.env.NODE_ENV === "development" ||
        //     (opts.direction === "down" && opts.result instanceof Error),
        // }),
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
