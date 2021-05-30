import { AppProps } from "next/app";
import Head from "next/head";
import React from "react";
import { AudioPlayerProvider } from "react-use-audio-player";
import { SWRConfig } from "swr";
import { Navbar } from "../components/Navbar";
import { SoundBitePlayer } from "../components/player/SoundBitePlayer";
import { ProfileModal } from "../modules/login/ProfileModal";
import { UserProvider as SupabaseUserProvider } from "../stores/auth";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";
import { UserProvider } from "../stores/user";
import "../styles/globals.css";
import "../lib/firebase";

const link = createUploadLink({
  uri: "http://localhost:4000/graphql",
  credentials: "include",
});

export const client = new ApolloClient({
  link,
  ssrMode: typeof window === "undefined",
  cache: new InMemoryCache(),
});

function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <SWRConfig value={{ revalidateOnFocus: false }}>
        <AudioPlayerProvider>
          <SupabaseUserProvider>
            <UserProvider>
              <Head>
                <title>Presage</title>
                <meta
                  httpEquiv="Content-Type"
                  content="text/html;charset=UTF-8"
                />
                <link rel="icon" href="/favicon.ico" type="image/x-icon" />
              </Head>
              <Navbar />
              <ProfileModal />
              <Component {...pageProps} />
              <SoundBitePlayer />
            </UserProvider>
          </SupabaseUserProvider>
        </AudioPlayerProvider>
      </SWRConfig>
    </ApolloProvider>
  );
}

export default App;
