import "@fontsource/inter";
import { IdProvider } from "@radix-ui/react-id";
import type { AppProps } from "next/app";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import { defaultQueryFn } from "../lib/utils/defaultQueryFn";
import "../styles/globals.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      staleTime: 1000 * 60 * 5,
      queryFn: defaultQueryFn(),
    },
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <IdProvider>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <Component {...pageProps} />
        </Hydrate>
      </QueryClientProvider>
    </IdProvider>
  );
}

export default MyApp;
