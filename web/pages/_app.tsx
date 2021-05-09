import { AppProps } from "next/app";
import Head from "next/head";
import React from "react";
import { SoundBitePlayer } from "../components/SoundBitePlayer";
import { UserProvider } from "../stores/auth";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <Head>
        <title>Presage</title>
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
      </Head>
      <Component {...pageProps} />
      <SoundBitePlayer />
    </UserProvider>
  );
}

export default MyApp;
