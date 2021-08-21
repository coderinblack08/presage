import type { NextPage } from "next";
import { withUrqlClient } from "next-urql";
import React from "react";
import { useMeQuery } from "../generated/graphql";
import { createUrqlClient } from "../lib/createUrqlClient";
import { Layout } from "../modules/dashboard/Layout";
import { LandingPage } from "../modules/landing-page/LandingPage";

const Home: NextPage = () => {
  const [{ data: user }] = useMeQuery();

  if (user?.me) {
    return <Layout></Layout>;
  }

  return <LandingPage />;
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Home);
