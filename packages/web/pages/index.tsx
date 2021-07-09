import React from "react";
import { useQuery } from "react-query";
import { Layout } from "../components/Layout";
import { User } from "../lib/types";
import { ExplorePage } from "../modules/home/ExplorePage";
import { LandingPage } from "../modules/home/LandingPage";

const HomePage: React.FC = () => {
  const { data: me } = useQuery<User>("/me");
  return <Layout>{!me ? <LandingPage /> : <ExplorePage />}</Layout>;
};

export default HomePage;
