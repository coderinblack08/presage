import React from "react";
import { Layout } from "../components/Layout";
import { ExplorePage } from "../modules/home/ExplorePage";

const HomePage: React.FC = () => {
  return (
    <Layout>
      <ExplorePage />
    </Layout>
  );
};

export default HomePage;
