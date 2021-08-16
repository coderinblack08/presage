import type { NextPage } from "next";
import { withUrqlClient } from "next-urql";
import React from "react";
import { createUrqlClient } from "../lib/createUrqlClient";
import { LandingPage } from "../modules/landing-page";
import { useMeQuery } from "../src/generated/graphql";

const Home: NextPage = () => {
  const [{ data: user }] = useMeQuery();

  if (user) {
    return <></>;
  }

  return <LandingPage />;
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Home);
