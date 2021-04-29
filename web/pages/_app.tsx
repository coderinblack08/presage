import { AppProps } from "next/app";
import Head from "next/head";
import React from "react";
import { UserProvider } from "../stores/auth";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <Head>
        <title>Presage</title>
        <link rel="shortcut icon" href={require("../public/favicon.ico")} />
      </Head>
      <Component {...pageProps} />
    </UserProvider>
  );
}

export default MyApp;
