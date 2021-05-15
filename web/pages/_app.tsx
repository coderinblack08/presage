import { AppProps } from "next/app";
import Head from "next/head";
import React from "react";
import { AudioPlayerProvider } from "react-use-audio-player";
import { SoundBitePlayer } from "../components/player/SoundBitePlayer";
import { UserProvider } from "../stores/auth";
import "../styles/globals.css";

function App({ Component, pageProps }: AppProps) {
  return (
    <AudioPlayerProvider>
      <UserProvider>
        <Head>
          <title>Presage</title>
          <meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />
          <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        </Head>
        <Component {...pageProps} />
        <SoundBitePlayer />
      </UserProvider>
    </AudioPlayerProvider>
  );
}

export default App;
