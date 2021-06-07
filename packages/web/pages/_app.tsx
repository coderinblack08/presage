import { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";
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
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
