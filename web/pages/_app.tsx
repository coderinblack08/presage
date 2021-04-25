import Head from "next/head";
import React from "react";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Presage</title>
        <link rel="shortcut icon" href={require("../public/favicon.ico")} />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
